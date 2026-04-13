import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, Stethoscope, LineChart, Lightbulb, User, Activity } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import Analytics from './pages/Analytics';
import Recommendations from './pages/Recommendations';
import './index.css';

const Sidebar = () => {
  return (
    <div style={{ width: '260px', background: 'var(--bg-sidebar)', borderRight: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-light)' }}>
        <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '12px', color: '#000' }}>
          <Activity size={24} />
        </div>
        <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: 'var(--primary)', textShadow: 'var(--shadow-glow)' }}>Physician AI</h2>
      </div>
      
      <nav style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <NavLink to="/" end className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} style={navStyle}>
          <LayoutDashboard size={20} /> Overview
        </NavLink>
        <NavLink to="/analysis" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} style={navStyle}>
          <Stethoscope size={20} /> Doctor Analysis
        </NavLink>
        <NavLink to="/analytics" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} style={navStyle}>
          <LineChart size={20} /> Insights & Analytics
        </NavLink>
        <NavLink to="/recommendations" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} style={navStyle}>
          <Lightbulb size={20} /> Recommendations
        </NavLink>
      </nav>
      
      <div style={{ padding: '24px', borderTop: '1px solid var(--border-light)' }}>
        <div className="glass-panel" style={{ padding: '16px', paddingBottom: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center' }}>
           <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>System Status</p>
           <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
             <span style={{ width: '8px', height: '8px', background: 'var(--safe)', borderRadius: '50%', boxShadow: '0 0 8px var(--safe)' }}></span>
             <span style={{ fontSize: '14px', fontWeight: 'bold' }}>All Systems Operational</span>
           </div>
        </div>
      </div>
    </div>
  );
};

const navStyle = {
  display: 'flex', 
  alignItems: 'center', 
  gap: '12px', 
  padding: '12px 16px', 
  borderRadius: '10px', 
  textDecoration: 'none', 
  color: 'var(--text-muted)',
  transition: 'all 0.2s',
  fontWeight: '500'
};

const navActiveStyle = `
  .nav-link:hover {
    background: rgba(255, 255, 255, 0.05);
    color: var(--text-main);
  }
  .nav-link.active {
    background: rgba(0, 240, 255, 0.1);
    color: var(--primary);
    border-right: 3px solid var(--primary);
  }
`;

const Topbar = () => {
  return (
    <header style={{ height: '70px', background: 'var(--bg-topbar)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 10 }}>
      <div>
        <h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Burnout Monitoring Dashboard</h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>Hospital Admin</p>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>Command Center</p>
        </div>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <User size={20} />
        </div>
      </div>
    </header>
  );
};

function App() {
  return (
    <BrowserRouter>
      <style>{navActiveStyle}</style>
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: { background: 'var(--bg-card)', border: '1px solid var(--border-light)', color: '#fff', backdropFilter: 'blur(10px)' },
          success: { iconTheme: { primary: 'var(--safe)', secondary: 'black' } },
          error: { iconTheme: { primary: 'var(--danger)', secondary: 'black' } }
        }} 
      />
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Topbar />
          <main className="page-container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/recommendations" element={<Recommendations />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
