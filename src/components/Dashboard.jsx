import React from 'react';
import { POST_TYPES } from '../lib/constants';

const Dashboard = ({ onSelect }) => {
  return (
    <div className="dashboard-page container animate-fade-in">
      <header className="dashboard-hero">
        <div className="hero-badge-v3" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>SELECT A WORKFLOW</div>
        <h1>Choose Your <span className="accent-text">Content Format</span></h1>
        <p className="hero-subtitle-v3" style={{ margin: '0 auto' }}>
          Select a specialized production engine to architect high-engagement posts for your anime franchise.
        </p>
      </header>

      <div className="post-format-grid">
        {POST_TYPES.map((type) => (
          <div
            key={type.id}
            className="format-card"
            onClick={() => onSelect(type)}
          >
            <div className="format-icon-box" style={{ background: 'var(--bg-card)', color: 'var(--primary)' }}>
              {type.icon}
            </div>
            <div className="format-info">
              <h3>{type.title}</h3>
              <p className="format-description">{type.description}</p>
              
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="doc-badge" style={{ background: 'var(--bg-card)', color: 'var(--primary)', borderColor: 'var(--primary-glow)' }}>
                  GOAL: {type.engagement_goal.toUpperCase()}
                </span>
                <span className="doc-badge" style={{ opacity: 0.7 }}>PRO-READY</span>
              </div>
            </div>
            
            <div className="format-hover-action">
              <span>Enter Studio Architect</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
