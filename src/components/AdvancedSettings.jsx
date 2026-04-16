import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function AdvancedSettings({ settings, setSettings }) {
  const [isOpen, setIsOpen] = useState(false);

  const tones = ['Cinematic', 'Emotional', 'Epic', 'Cute', 'Dramatic', 'Dark Fantasy', 'Wholesome', 'Action', 'Slice of Life', 'Luxury', 'Educational'];
  const languages = ['English', 'Japanese', 'Spanish', 'French', 'German'];

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div style={{ marginTop: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-md)', overflow: 'hidden' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '1rem', 
          background: 'var(--bg-card)', 
          border: 'none', 
          color: 'var(--text-primary)', 
          cursor: 'pointer',
          fontWeight: '600'
        }}
      >
        <span>Advanced Output Settings</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <div style={{ padding: '1.5rem', background: 'var(--bg-primary)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Tone</label>
            <select 
              value={settings.tone}
              onChange={(e) => handleChange('tone', e.target.value)}
              style={{ padding: '0.5rem', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)', outline: 'none' }}
            >
              <option value="">Default/Auto</option>
              {tones.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Style Intensity</label>
            <select 
              value={settings.intensity}
              onChange={(e) => handleChange('intensity', e.target.value)}
              style={{ padding: '0.5rem', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)', outline: 'none' }}
            >
              <option value="high">High (Default)</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Language</label>
            <select 
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
              style={{ padding: '0.5rem', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)', outline: 'none' }}
            >
              {languages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

        </div>
      )}
    </div>
  );
}
