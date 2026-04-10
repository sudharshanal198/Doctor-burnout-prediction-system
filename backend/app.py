from flask import Flask, request, jsonify
import pickle
import numpy as np
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017/")
db = client["hospital_ai"]
doctors_collection = db["doctors"]

model = pickle.load(open("../model/burnout_model.pkl", "rb"))

labels = ["Low", "Moderate", "High"]


@app.route("/")
def home():
    return "Doctor Burnout Prediction & Workload Balancer API Running"


def extract_features(data):

    return [[
        data.get("department"),
        data.get("hospital_type"),
        data.get("shift_type"),
        data.get("experience_years"),
        data.get("work_hours"),
        data.get("patients_per_day"),
        data.get("after_hours_logins"),
        data.get("night_shifts"),
        data.get("consecutive_days"),
        data.get("documentation_delay"),
        data.get("stress_level"),
        data.get("job_satisfaction"),
        data.get("sleep_hours")
    ]]


@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    features = extract_features(data)

    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0]

    risk_score = int(np.max(probability) * 100)
    risk_level = labels[prediction]

    if risk_level == "High":

        recommendation = [
            "Reduce OPD patient load",
            "Assign mandatory rest day",
            "Avoid night shifts",
            "Redistribute workload"
        ]

    elif risk_level == "Moderate":

        recommendation = [
            "Monitor workload",
            "Reduce consecutive duty days"
        ]

    else:

        recommendation = [
            "Workload within safe limits"
        ]

    doctor_record = {

        "doctor_id": data.get("doctor_id"),
        "department": data.get("department"),
        "hospital_type": data.get("hospital_type"),
        "shift_type": data.get("shift_type"),
        "experience_years": data.get("experience_years"),
        "work_hours": data.get("work_hours"),
        "patients_per_day": data.get("patients_per_day"),
        "after_hours_logins": data.get("after_hours_logins"),
        "night_shifts": data.get("night_shifts"),
        "consecutive_days": data.get("consecutive_days"),
        "documentation_delay": data.get("documentation_delay"),
        "stress_level": data.get("stress_level"),
        "job_satisfaction": data.get("job_satisfaction"),
        "sleep_hours": data.get("sleep_hours"),
        "burnout_risk_score": risk_score,
        "burnout_risk_level": risk_level

    }

    doctors_collection.insert_one(doctor_record)

    return jsonify({

        "doctor_id": data.get("doctor_id"),
        "burnout_risk_score": risk_score,
        "burnout_risk_level": risk_level,
        "recommendations": recommendation

    })


@app.route("/hospital_dashboard", methods=["GET"])
def hospital_dashboard():

    doctors = list(doctors_collection.find({}, {"_id": 0}))

    high = 0
    moderate = 0
    low = 0

    results = []

    for doctor in doctors:

        features = extract_features(doctor)

        prediction = model.predict(features)[0]

        risk = labels[prediction]

        if risk == "High":
            high += 1
        elif risk == "Moderate":
            moderate += 1
        else:
            low += 1

        results.append({

            "doctor_id": doctor.get("doctor_id"),
            "burnout_risk": risk

        })

    redistribution = []

    high_doctors = [d for d in results if d["burnout_risk"] == "High"]
    low_doctors = [d for d in results if d["burnout_risk"] == "Low"]

    for high_doc in high_doctors:

        if low_doctors:

            receiver = low_doctors[0]

            redistribution.append({

                "from_doctor": high_doc["doctor_id"],
                "to_doctor": receiver["doctor_id"],
                "patients_shifted": 30

            })

    return jsonify({

        "hospital_summary": {

            "high_risk_doctors": high,
            "moderate_risk_doctors": moderate,
            "low_risk_doctors": low

        },

        "doctor_predictions": results,
        "workload_redistribution": redistribution

    })


@app.route("/burnout_trend", methods=["POST"])
def burnout_trend():

    weekly_scores = request.json.get("weekly_scores")

    trend = []

    for i in range(1, len(weekly_scores)):

        change = weekly_scores[i] - weekly_scores[i - 1]

        trend.append(change)

    increasing = all(t > 0 for t in trend)

    if increasing:
        status = "Burnout Risk Increasing"
    else:
        status = "Stable"

    return jsonify({

        "weekly_scores": weekly_scores,
        "trend_status": status

    })

if __name__ == "__main__":
    app.run(debug=True)