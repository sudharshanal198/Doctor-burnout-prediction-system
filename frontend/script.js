const API_BASE = "http://127.0.0.1:5000";

let riskChart;
let trendChart;

function initCharts() {
  const riskCtx = document.getElementById("riskChart").getContext("2d");
  riskChart = new Chart(riskCtx, {
    type: "pie",
    data: {
      labels: ["High", "Moderate", "Low"],
      datasets: [{
        data: [0, 0, 0]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });

  const trendCtx = document.getElementById("trendChart").getContext("2d");
  trendChart = new Chart(trendCtx, {
    type: "line",
    data: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [{
        label: "Burnout Score",
        data: [0, 0, 0, 0],
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function predictDoctor() {
  const payload = {
    doctor_id: document.getElementById("doctor_id").value,
    department: Number(document.getElementById("department").value),
    hospital_type: Number(document.getElementById("hospital_type").value),
    shift_type: Number(document.getElementById("shift_type").value),
    experience_years: Number(document.getElementById("experience_years").value),
    work_hours: Number(document.getElementById("work_hours").value),
    patients_per_day: Number(document.getElementById("patients_per_day").value),
    after_hours_logins: Number(document.getElementById("after_hours_logins").value),
    night_shifts: Number(document.getElementById("night_shifts").value),
    consecutive_days: Number(document.getElementById("consecutive_days").value),
    documentation_delay: Number(document.getElementById("documentation_delay").value),
    stress_level: Number(document.getElementById("stress_level").value),
    job_satisfaction: Number(document.getElementById("job_satisfaction").value),
    sleep_hours: Number(document.getElementById("sleep_hours").value)
  };

  fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("resultDoctor").textContent = data.doctor_id || "-";
      document.getElementById("riskScore").textContent = data.burnout_risk_score ?? "-";
      document.getElementById("riskLevel").textContent = data.burnout_risk_level ?? "-";

      const list = document.getElementById("recommendationsList");
      list.innerHTML = "";
      (data.recommendations || []).forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
      });
    })
    .catch(err => {
      alert("Prediction failed. Check backend server.");
      console.error(err);
    });
}

function loadHospitalDashboard() {

  fetch(`${API_BASE}/hospital_dashboard`)
    .then(res => res.json())
    .then(data => {

      const summary = data.hospital_summary || {};
      const high = summary.high_risk_doctors || 0;
      const moderate = summary.moderate_risk_doctors || 0;
      const low = summary.low_risk_doctors || 0;
      const total = high + moderate + low;

      document.getElementById("highDoctors").textContent = high;
      document.getElementById("moderateDoctors").textContent = moderate;
      document.getElementById("lowDoctors").textContent = low;
      document.getElementById("totalDoctors").textContent = total;

      riskChart.data.datasets[0].data = [high, moderate, low];
      riskChart.update();

    })
    .catch(err => {
      alert("Hospital dashboard load failed. Check backend server.");
      console.error(err);
    });
}

function checkTrend() {
  const scores = [
    Number(document.getElementById("week1").value),
    Number(document.getElementById("week2").value),
    Number(document.getElementById("week3").value),
    Number(document.getElementById("week4").value)
  ];

  fetch(`${API_BASE}/burnout_trend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ weekly_scores: scores })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("trendStatus").textContent = data.trend_status || "-";
      trendChart.data.datasets[0].data = data.weekly_scores || [0, 0, 0, 0];
      trendChart.update();
    })
    .catch(err => {
      alert("Trend analysis failed. Check backend server.");
      console.error(err);
    });
}

window.onload = function () {
  initCharts();
  loadHospitalDashboard();
};