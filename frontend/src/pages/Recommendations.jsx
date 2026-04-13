import React from 'react';
import { Lightbulb, Coffee, CalendarPlus, FileText, Moon, UserCheck } from 'lucide-react';

const Recommendations = () => {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>AI-Driven Recommendations</h2>
        <p style={{ color: 'var(--text-muted)' }}>System-wide proactive suggestions to mitigate physician burnout, sorted by impact.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <RecCard 
          icon={<Coffee size={32} color="var(--warning)" />}
          title="Mandatory Recovery Blocks"
          impact="High Impact"
          impactColor="var(--warning)"
          desc="Implement hard lockouts in the scheduling system post 5 consecutive night shifts to enforce a minimum 48-hour recovery."
        />
        <RecCard 
          icon={<FileText size={32} color="var(--primary)" />}
          title="AI Scribes for Documentation"
          impact="High Impact"
          impactColor="var(--danger)"
          desc="Roll out AI transcription tools to Emergency and ICU staff to reduce documentation burden by estimated 60%."
        />
        <RecCard 
          icon={<CalendarPlus size={32} color="var(--safe)" />}
          title="Flexible Shift Trading"
          impact="Medium Impact"
          impactColor="var(--safe)"
          desc="Launch the decentralized shift-trading app to improve control and autonomy over working hours for junior residents."
        />
        <RecCard 
          icon={<UserCheck size={32} color="var(--accent-purple)" />}
          title="Wellness Check-ins"
          impact="Medium Impact"
          impactColor="var(--accent-purple)"
          desc="Automatically route doctors with trailing 4-week burnout scores above 75 to the chief wellness officer for 1:1 sessions."
        />
        <RecCard 
          icon={<Moon size={32} color="#00f0ff" />}
          title="Optimal Sleep Training"
          impact="Long-term"
          impactColor="var(--text-muted)"
          desc="Provide quarterly circadian rhythm management seminars for all staff members assigned to rotational shifts."
        />
      </div>
    </div>
  );
};

const RecCard = ({ icon, title, desc, impact, impactColor }) => (
  <div className="glass-panel" style={{ padding: '24px', display: 'flex', gap: '20px', transition: 'all 0.3s ease' }}>
    <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '16px', height: 'fit-content' }}>
      {icon}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--text-main)' }}>{title}</h3>
        <span style={{ fontSize: '12px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '99px', background: `${impactColor}22`, color: impactColor, border: `1px solid ${impactColor}55` }}>
          {impact}
        </span>
      </div>
      <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: 'var(--text-muted)' }}>{desc}</p>
      <button style={{ marginTop: '16px', background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-main)', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', transition: '0.2s' }} onMouseOver={e => Object.assign(e.target.style, {background: 'rgba(255,255,255,0.1)'})} onMouseOut={e => Object.assign(e.target.style, {background: 'transparent'})}>
        Review Implementation Plan
      </button>
    </div>
  </div>
);

export default Recommendations;
