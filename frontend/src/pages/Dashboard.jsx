import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { Users, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

// Custom dark theme for ChartJS
const chartOptions = {
  plugins: {
    legend: {
      labels: { color: '#e2e8f0' }
    }
  }
};

const lineOptions = {
  responsive: true,
  plugins: {
    legend: { labels: { color: '#e2e8f0' } }
  },
  scales: {
    y: {
      grid: { color: 'rgba(255, 255, 255, 0.1)' },
      ticks: { color: '#94a3b8' }
    },
    x: {
      grid: { color: 'rgba(255, 255, 255, 0.1)' },
      ticks: { color: '#94a3b8' }
    }
  }
};

const Dashboard = () => {
  const [summary, setSummary] = useState({ high: 0, moderate: 0, low: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt to fetch from backend, otherwise fallback to mock data for UI showcase
    fetch('http://127.0.0.1:5000/hospital_dashboard')
      .then(res => res.json())
      .then(data => {
        const h = data.hospital_summary?.high_risk_doctors || 0;
        const m = data.hospital_summary?.moderate_risk_doctors || 0;
        const l = data.hospital_summary?.low_risk_doctors || 0;
        setSummary({ high: h, moderate: m, low: l, total: h + m + l });
        setLoading(false);
      })
      .catch((err) => {
        console.log("Backend offline, using mock data", err);
        setSummary({ high: 12, moderate: 34, low: 89, total: 135 });
        setLoading(false);
      });
  }, []);

  const donutData = {
    labels: ['High Risk', 'Moderate Risk', 'Low Risk'],
    datasets: [{
      data: [summary.high, summary.moderate, summary.low],
      backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
      borderColor: ['#0a0f1d', '#0a0f1d', '#0a0f1d'],
      borderWidth: 2,
      hoverOffset: 4
    }]
  };

  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Average Burnout Score',
      data: [45, 48, 52, 50],
      borderColor: '#00f0ff',
      backgroundColor: 'rgba(0, 240, 255, 0.2)',
      tension: 0.4,
      fill: true
    }]
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>Hospital Overview</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <MetricCard title="Doctors Monitored" value={summary.total} icon={<Users size={24} color="var(--primary)" />} />
        <MetricCard title="High Risk" value={summary.high} icon={<AlertTriangle size={24} color="var(--danger)" />} borderClass="border-danger" />
        <MetricCard title="Moderate Risk" value={summary.moderate} icon={<AlertCircle size={24} color="var(--warning)" />} borderClass="border-warning" />
        <MetricCard title="Low Risk" value={summary.low} icon={<CheckCircle2 size={24} color="var(--safe)" />} borderClass="border-safe" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '18px', color: 'var(--text-muted)' }}>Burnout Distribution</h3>
          <div style={{ height: '300px', display: 'flex', justifyContent: 'center' }}>
            <Doughnut data={donutData} options={chartOptions} />
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '18px', color: 'var(--text-muted)' }}>4-Week Burnout Trend</h3>
          <div style={{ height: '300px' }}>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const MetricCard = ({ title, value, icon, borderClass = '' }) => (
  <div className={`glass-panel ${borderClass}`} style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <div>
      <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500' }}>{title}</p>
      <h3 style={{ margin: 0, fontSize: '32px', fontWeight: '700' }}>{value}</h3>
    </div>
    <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '12px', borderRadius: '12px' }}>
      {icon}
    </div>
  </div>
);

export default Dashboard;
