import React from 'react';
import { Chart as ChartJS, BarElement, ScatterController, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Title } from 'chart.js';
import { Bar, Scatter } from 'react-chartjs-2';
import { BarChart3, Presentation } from 'lucide-react';

ChartJS.register(BarElement, ScatterController, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Title);

const darkOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: '#e2e8f0' } }
  },
  scales: {
    y: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#94a3b8' } },
    x: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#94a3b8' } }
  }
};

const Analytics = () => {
  const deptData = {
    labels: ['Emergency', 'ICU', 'Surgery', 'OPD', 'Pediatrics', 'Gen Medicine'],
    datasets: [
      {
        label: 'Average Burnout Score',
        data: [78, 82, 65, 45, 50, 55],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)', // Emergency
          'rgba(239, 68, 68, 0.9)', // ICU
          'rgba(245, 158, 11, 0.8)', // Surgery
          'rgba(16, 185, 129, 0.8)', // OPD
          'rgba(16, 185, 129, 0.8)', // Peds
          'rgba(245, 158, 11, 0.8)'  // Gen Med
        ],
        borderRadius: 6
      }
    ]
  };

  const scatterData = {
    datasets: [{
      label: 'Doctors (Workload vs Stress)',
      data: Array.from({ length: 40 }, () => ({
        x: Math.random() * 60 + 30, // Workload Hours
        y: Math.random() * 8 + 2    // Stress Level 1-10
      })),
      backgroundColor: 'rgba(0, 240, 255, 0.6)',
      borderColor: '#00f0ff',
      pointRadius: 6,
      pointHoverRadius: 8
    }]
  };

  const scatterOptions = {
    ...darkOptions,
    scales: {
      x: { ...darkOptions.scales.x, title: { display: true, text: 'Weekly Work Hours', color: '#94a3b8' } },
      y: { ...darkOptions.scales.y, title: { display: true, text: 'Reported Stress Level', color: '#94a3b8' }, suggestedMin: 0, suggestedMax: 10 }
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Deep Insights & Analytics</h2>
        <button className="btn-secondary"><Presentation size={18} style={{ marginRight: '8px' }} /> Export Report</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginBottom: '24px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', color: 'var(--text-main)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={20} color="var(--primary)" /> Department-wise Burnout Analysis
          </h3>
          <div style={{ height: '350px' }}>
            <Bar data={deptData} options={darkOptions} />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', color: 'var(--text-main)', marginBottom: '20px' }}>Workload vs. Stress Correlation</h3>
          <div style={{ height: '300px' }}>
            <Scatter data={scatterData} options={scatterOptions} />
          </div>
        </div>
        
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '18px', color: 'var(--text-main)', marginBottom: '20px' }}>Key Findings</h3>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'rgba(239,68,68,0.1)', borderLeft: '4px solid var(--danger)', padding: '16px', borderRadius: '4px 8px 8px 4px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--danger)' }}>Critical ICU & Emergency Overload</h4>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>Doctors in Emergency and ICU are averaging stress levels &gt; 8, correlating heavily with consecutive night shifts.</p>
            </div>
            <div style={{ background: 'rgba(245,158,11,0.1)', borderLeft: '4px solid var(--warning)', padding: '16px', borderRadius: '4px 8px 8px 4px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--warning)' }}>Documentation Burden</h4>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>54% of moderate burnout cases stem from documentation delays exceeding 4 hours post-shift.</p>
            </div>
            <div style={{ background: 'rgba(16,185,129,0.1)', borderLeft: '4px solid var(--safe)', padding: '16px', borderRadius: '4px 8px 8px 4px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--safe)' }}>Pediatrics Stabilization</h4>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>The recent policy to cap OPD hours has reduced strain in Pediatrics by 15%.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
