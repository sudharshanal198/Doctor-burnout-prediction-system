import React, { useState } from 'react';
import { Stethoscope, Activity, User, Moon, Briefcase, Clock, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

const Analysis = () => {
  const [formData, setFormData] = useState({
    doctor_id: '',
    department: '0',
    hospital_type: '0',
    shift_type: '0',
    experience_years: 5,
    work_hours: 40,
    patients_per_day: 20,
    after_hours_logins: 2,
    night_shifts: 1,
    consecutive_days: 3,
    documentation_delay: 2,
    stress_level: 5,
    job_satisfaction: 5,
    sleep_hours: 7
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const payload = {
        doctor_id: formData.doctor_id,
        department: Number(formData.department),
        hospital_type: Number(formData.hospital_type),
        shift_type: Number(formData.shift_type),
        experience_years: Number(formData.experience_years),
        work_hours: Number(formData.work_hours),
        patients_per_day: Number(formData.patients_per_day),
        after_hours_logins: Number(formData.after_hours_logins),
        night_shifts: Number(formData.night_shifts),
        consecutive_days: Number(formData.consecutive_days),
        documentation_delay: Number(formData.documentation_delay),
        stress_level: Number(formData.stress_level),
        job_satisfaction: Number(formData.job_satisfaction),
        sleep_hours: Number(formData.sleep_hours)
      };

      const res = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error("API Error");
      const data = await res.json();
      setTimeout(() => {
        setResult(data);
        setLoading(false);
        toast.success('Prediction generated successfully!');
      }, 800); // Simulate network delay for nice UX
    } catch (err) {
      console.log("Prediction failed, using mock result", err);
      setTimeout(() => {
        toast.success('Generated mock prediction. Backend offline.');
        setResult({
          doctor_id: formData.doctor_id || "DOC-123",
          burnout_risk_score: 75,
          burnout_risk_level: "High Risk",
          recommendations: [
            "Mandatory 2-day break recommended immediately.",
            "Reduce consecutive night shifts.",
            "Schedule a wellness check-in."
          ]
        });
        setLoading(false);
      }, 800);
    }
  };

  const getMeterColor = (score) => {
    if (score > 66) return 'var(--danger)';
    if (score > 33) return 'var(--warning)';
    return 'var(--safe)';
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Individual Doctor Analysis</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', color: 'var(--primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <User size={20} /> Professional Details
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Doctor ID</label>
              <input id="doctor_id" type="text" className="form-input" placeholder="e.g. DOC-4092" value={formData.doctor_id} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Department</label>
              <select id="department" className="form-input" value={formData.department} onChange={handleChange}>
                <option value="0">Emergency</option>
                <option value="1">ICU</option>
                <option value="2">Surgery</option>
                <option value="3">OPD</option>
                <option value="4">Pediatrics</option>
                <option value="5">General Medicine</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Hospital Type</label>
              <select id="hospital_type" className="form-input" value={formData.hospital_type} onChange={handleChange}>
                <option value="0">Government</option>
                <option value="1">Private</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Shift Type</label>
              <select id="shift_type" className="form-input" value={formData.shift_type} onChange={handleChange}>
                <option value="0">Day</option>
                <option value="1">Night</option>
              </select>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)', margin: '24px 0' }} />

          <h3 style={{ fontSize: '18px', color: 'var(--primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity size={20} /> Workload & Stress Metrics
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <SliderInput id="experience_years" label="Experience Years" min={0} max={40} value={formData.experience_years} onChange={handleChange} />
            <SliderInput id="work_hours" label="Weekly Work Hours" min={20} max={100} value={formData.work_hours} onChange={handleChange} />
            <SliderInput id="patients_per_day" label="Patients Per Day" min={0} max={60} value={formData.patients_per_day} onChange={handleChange} />
            <SliderInput id="night_shifts" label="Night Shifts (per month)" min={0} max={15} value={formData.night_shifts} onChange={handleChange} />
            <SliderInput id="stress_level" label="Self-Reported Stress (1-10)" min={1} max={10} value={formData.stress_level} onChange={handleChange} />
            <SliderInput id="sleep_hours" label="Average Sleep Hours" min={2} max={12} value={formData.sleep_hours} onChange={handleChange} />
            <SliderInput id="job_satisfaction" label="Job Satisfaction (1-10)" min={1} max={10} value={formData.job_satisfaction} onChange={handleChange} />
            <SliderInput id="consecutive_days" label="Consecutive Duty Days" min={1} max={20} value={formData.consecutive_days} onChange={handleChange} />
            <SliderInput id="documentation_delay" label="Doc Delay (Hours)" min={0} max={10} value={formData.documentation_delay} onChange={handleChange} />
            <SliderInput id="after_hours_logins" label="After-Hours EHR Logins" min={0} max={20} value={formData.after_hours_logins} onChange={handleChange} />
          </div>

          <div style={{ marginTop: '32px', textAlign: 'right' }}>
            <button className="btn-primary" onClick={handlePredict} disabled={loading}>
              {loading ? (
                <><span className="spinner"></span> Processing AI Analysis...</>
              ) : (
                <><Activity size={18} /> Predict Burnout Risk</>
              )}
            </button>
          </div>
        </div>

        <div>
          <div className="glass-panel" style={{ padding: '24px', position: 'sticky', top: '90px' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={20} color="var(--primary)" /> Prediction Result
            </h3>
            
            {!result && !loading && (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                <Stethoscope size={48} opacity={0.3} style={{ marginBottom: '16px' }} />
                <p>Enter parameters and run prediction to see AI analysis.</p>
              </div>
            )}
            
            {loading && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0' }}>
                <div className="pulse-ring"></div>
                <p style={{ marginTop: '16px', color: 'var(--primary)' }}>Analyzing patterns...</p>
              </div>
            )}

            {result && !loading && (
               <div style={{ animation: 'fadeIn 0.5s ease' }}>
                 <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(0,0,0,0.3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: `4px solid ${getMeterColor(result.burnout_risk_score)}`, boxShadow: `0 0 20px ${getMeterColor(result.burnout_risk_score)}33`, position: 'relative' }}>
                      <span style={{ fontSize: '36px', fontWeight: 'bold' }}>{result.burnout_risk_score}</span>
                      <span style={{ position: 'absolute', bottom: '15px', fontSize: '12px', color: 'var(--text-muted)' }}>/100</span>
                    </div>
                    <h4 style={{ marginTop: '16px', fontSize: '20px', color: getMeterColor(result.burnout_risk_score) }}>{result.burnout_risk_level}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '4px 0 0 0' }}>Doctor: {result.doctor_id}</p>
                 </div>
                 
                 <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px' }}>
                   <h5 style={{ margin: '0 0 12px 0', color: 'var(--text-main)', fontSize: '14px' }}>AI Recommended Actions</h5>
                   <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                     {result.recommendations?.map((rec, i) => (
                       <li key={i}>{rec}</li>
                     ))}
                   </ul>
                 </div>
               </div>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        .spinner {
          width: 16px; height: 16px; border: 2px solid rgba(0,0,0,0.3); border-top-color: #000; border-radius: 50%;
          animation: spin 1s linear infinite; display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        
        .pulse-ring {
          width: 60px; height: 60px; borderRadius: 50%; background: rgba(0, 240, 255, 0.2);
          animation: pulse 1.5s ease-out infinite; box-shadow: 0 0 15px rgba(0,240,255,0.4);
        }
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const SliderInput = ({ id, label, min, max, value, onChange }) => (
  <div className="form-group">
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <label className="form-label">{label}</label>
      <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--primary)' }}>{value}</span>
    </div>
    <input id={id} type="range" min={min} max={max} value={value} onChange={onChange} />
  </div>
);

export default Analysis;
