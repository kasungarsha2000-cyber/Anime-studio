import React, { useState, useRef, useEffect } from 'react';
import { 
  POST_TYPES, 
  STRATEGIC_GOALS, 
  AUDIENCES, 
  LANGUAGES, 
  ART_STYLES, 
  VISUAL_FINISHES, 
  TEXT_OVERLAY_OPTIONS,
  PRESETS,
  VIRAL_IDEAS
} from '../lib/constants';
import { generateGeminiPrompt } from '../lib/PromptEngine';

// Custom Dropdown Component (Refined SaaS Style)
const StudioSelect = ({ options, value, onChange, placeholder = "Select option..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => (typeof opt === 'string' ? opt : opt.id) === value);
  const selectedLabel = selectedOption 
    ? (typeof selectedOption === 'string' ? selectedOption : selectedOption.label) 
    : value || placeholder;

  return (
    <div className={`studio-select-custom ${isOpen ? 'is-open' : ''}`} ref={containerRef}>
      <div className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span className="trigger-text">{selectedLabel}</span>
        <div className="trigger-chevron" style={{ opacity: 0.5 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </div>
      </div>
      
      {isOpen && (
        <div className="select-options-panel animate-fade-in" style={{ animationDuration: '0.2s' }}>
          {options.map((opt, i) => {
            const val = typeof opt === 'string' ? opt : (opt.id || opt.label);
            const label = typeof opt === 'string' ? opt : opt.label;
            const isSelected = val === value;
            
            return (
              <div 
                key={i} 
                className={`option-item ${isSelected ? 'active' : ''}`}
                onClick={() => {
                  onChange(val);
                  setIsOpen(false);
                }}
              >
                <span>{label}</span>
                {isSelected && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Sub-component for Visual Art Style Tiles (Enhanced Gallery Style)
const ArtStyleTile = ({ name, selected, onClick }) => {
  const styleClass = name.toLowerCase()
    .replace(/ anime style/g, '')
    .replace(/ style/g, '')
    .replace(/ /g, '-');

  return (
    <div className={`art-style-tile ${selected ? 'selected' : ''}`} onClick={() => onClick(name)}>
      <div className="tile-preview">
        <div className={`preview-bg ${styleClass}`}></div>
      </div>
      <div className="tile-info">
        <span>{name}</span>
      </div>
    </div>
  );
};

// Sub-component for Segmented Control Pills
const PillSelector = ({ options, value, onChange, label }) => {
  return (
    <div className="pill-selector-group">
      {label && <label className="field-label">{label}</label>}
      <div className="pills-container">
        {options.map(opt => {
          const optValue = typeof opt === 'string' ? opt : opt.id;
          const optLabel = typeof opt === 'string' ? opt : opt.label;
          return (
            <button 
              key={optValue}
              type="button"
              className={`pill-btn ${value === optValue ? 'active' : ''}`}
              onClick={() => onChange(optValue)}
            >
              {optLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const PromptBuilder = ({ 
  postType, 
  formData, 
  setFormData, 
  onGenerate, 
  onBack, 
  onSave, 
  onLoad, 
  onClear, 
  onTypeSwitch 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showViralLibrary, setShowViralLibrary] = useState(true);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleValueChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const applyPreset = (presetId) => {
    const preset = PRESETS.find(p => p.id === presetId);
    if (preset) {
      setFormData(prev => ({ ...prev, ...preset.config }));
    }
  };

  const applyViralPreset = (idea) => {
    // 1. Switch to mapped post type
    const mappedType = POST_TYPES.find(pt => pt.id === idea.mapped_type);
    if (mappedType) {
      onTypeSwitch(mappedType);
    }
    
    // 2. Clear current form and pre-fill with preset data
    setFormData(prev => ({
      ...prev,
      postTypeId: idea.mapped_type,
      goal: idea.goal,
      presetName: idea.id,
      presetGoal: idea.goal,
      mappedType: idea.mapped_type,
      topicSeed: idea.title,
      ...idea.config
    }));

    // Scroll to form or show feedback
    const formElement = document.getElementById('studio-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(generateGeminiPrompt(formData));
  };

  const renderField = (field) => {
    if (field.condition && !formData[field.condition]) return null;

    return (
      <div className="studio-field" key={field.id}>
        <label className="field-label">{field.label}</label>
        {field.type === 'select' ? (
          <StudioSelect 
            options={field.options} 
            value={formData[field.id] || field.default} 
            onChange={(val) => handleValueChange(field.id, val)} 
          />
        ) : field.type === 'checkbox' ? (
          <div className="pill-selector-group">
            <div className="pills-container">
              <button 
                type="button" 
                className={`pill-btn ${formData[field.id] ? 'active' : ''}`}
                onClick={() => handleValueChange(field.id, !formData[field.id])}
              >
                {formData[field.id] ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>
          </div>
        ) : (
          <input 
            className="studio-input"
            type={field.type === 'number' ? 'number' : 'text'} 
            name={field.id} 
            placeholder={field.placeholder}
            value={formData[field.id] || ''} 
            onChange={handleInputChange} 
          />
        )}
      </div>
    );
  };

  return (
    <div className="studio-container animate-fade-in">
      {/* 1. Workflow Steering (Left Sidebar) */}
      <aside className="studio-sidebar">
        <div className="sidebar-header">
          <h3>Workflows</h3>
        </div>
        <div className="sidebar-menu">
          {POST_TYPES.map(pt => (
            <div 
              key={pt.id} 
              className={`menu-item-v2 ${pt.id === postType.id ? 'active' : ''}`}
              onClick={() => onTypeSwitch(pt)}
            >
              <span className="item-icon">{pt.icon}</span>
              <span className="item-text">{pt.title}</span>
            </div>
          ))}
        </div>
        <div className="sidebar-footer">
          <button className="btn btn-secondary full-width" onClick={onBack}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Exit Studio
          </button>
        </div>
      </aside>

      {/* 2. Primary Architect (Center Panel) */}
      <div className="studio-center-panel" style={{ background: 'transparent' }}>
        <header className="panel-header" style={{ textAlign: 'left', maxWidth: '100%', margin: '0 0 3rem 0' }}>
          <div className="header-breadcrumbs">STUDIO ARCHITECT / {postType.title.toUpperCase()}</div>
          <h2 style={{ fontSize: '2.5rem' }}>Configure Content <span className="accent-text">Blueprint</span></h2>
          <p className="text-muted" style={{ marginTop: '1rem' }}>Fine-tune your anime content parameters for optimal Gemini performance.</p>
        </header>

        {/* Viral Ideas Area */}
        <section className="viral-library-section animate-fade-in" style={{ marginBottom: '4rem' }}>
          <div className="section-head-v3" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <div className="doc-badge" style={{ marginBottom: '0.5rem' }}>VIRAL STRATEGY HUB</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Anime Content Blueprints</h3>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => setShowViralLibrary(!showViralLibrary)}>
              {showViralLibrary ? 'Collapse Library' : 'Expand Library'}
            </button>
          </div>

          {showViralLibrary && (
            <div className="library-content-area">
              <div className="library-filters" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <div className="studio-search-wrapper" style={{ flex: 2, minWidth: '250px' }}>
                  <input 
                    type="text" 
                    className="studio-input" 
                    placeholder="Search viral ideas..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ padding: '12px 20px' }}
                  />
                </div>
                <div className="filter-chips" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', flex: 3 }}>
                  {['all', 'debate', 'funny', 'emotional', 'fandom', 'nostalgic', 'recommendation'].map(cat => (
                    <button 
                      key={cat}
                      className={`pill-btn btn-sm ${activeFilter === cat ? 'active' : ''}`}
                      onClick={() => setActiveFilter(cat)}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="viral-ideas-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {VIRAL_IDEAS
                  .filter(idea => activeFilter === 'all' || idea.category === activeFilter)
                  .filter(idea => idea.title.toLowerCase().includes(searchQuery.toLowerCase()) || idea.description.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(idea => (
                  <div key={idea.id} className="idea-card-v3" onClick={() => applyViralPreset(idea)}>
                    <div className="idea-card-tags" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span className="doc-badge" style={{ fontSize: '0.65rem', opacity: 0.8 }}>{idea.mapped_type.replace('_', ' ').toUpperCase()}</span>
                      <span className="doc-badge" style={{ fontSize: '0.65rem', background: 'var(--primary-glow)', color: 'var(--primary)' }}>{idea.goal.toUpperCase()}</span>
                    </div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>{idea.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{idea.description}</p>
                    <div className="idea-card-action" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem' }}>
                      <span>Apply Blueprint</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <form id="studio-form" onSubmit={handleSubmit}>
          {/* STEP 1: CONTEXT */}
          <div className="studio-card">
            <div className="card-heading">
              <span className="heading-icon">⚙️</span>
              <h4>PROJECT CONTEXT</h4>
            </div>
            <div className="field-row">
              <div className="studio-field flex-2">
                <label className="field-label">Target Anime / Franchise</label>
                <input 
                  className="studio-input"
                  type="text" name="animeName" required
                  value={formData.animeName || ''} onChange={handleInputChange}
                  placeholder="e.g. Solo Leveling, One Piece..."
                />
              </div>
              <div className="studio-field flex-1">
                <label className="field-label">Output Language</label>
                <StudioSelect 
                  options={LANGUAGES} 
                  value={formData.language} 
                  onChange={(val) => handleValueChange('language', val)} 
                />
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <PillSelector 
                label="Strategic Goal"
                options={STRATEGIC_GOALS}
                value={formData.goal}
                onChange={(val) => handleValueChange('goal', val)}
              />
            </div>
          </div>

          {/* STEP 2: DYNAMIC PARAMETERS */}
          <div className="studio-card">
            <div className="card-heading">
              <span className="heading-icon">{postType.icon}</span>
              <h4>{postType.title.toUpperCase()} PARAMETERS</h4>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {postType.fields.map(renderField)}
            </div>
          </div>

          {/* STEP 3: VISUAL DIRECTION */}
          <div className="studio-card">
            <div className="card-heading">
              <span className="heading-icon">🎨</span>
              <h4>VISUAL ART DIRECTION</h4>
            </div>
            <div className="art-styles-grid">
              {ART_STYLES.map(style => (
                <ArtStyleTile 
                  key={style}
                  name={style}
                  selected={formData.artStyle === style}
                  onClick={(val) => handleValueChange('artStyle', val)}
                />
              ))}
            </div>
            <div className="field-row" style={{ marginTop: '3rem' }}>
              <div className="studio-field">
                <label className="field-label">Visual Finish</label>
                <StudioSelect 
                  options={VISUAL_FINISHES} 
                  value={formData.visualFinish} 
                  onChange={(val) => handleValueChange('visualFinish', val)} 
                />
              </div>
              <div className="studio-field">
                <label className="field-label">Composition Polish</label>
                <StudioSelect 
                  options={TEXT_OVERLAY_OPTIONS} 
                  value={formData.textOverlay} 
                  onChange={(val) => handleValueChange('textOverlay', val)} 
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* 3. Brief Summary (Right Actions) */}
      <aside className="studio-sidebar" style={{ borderLeft: '1px solid var(--border)', borderRight: 'none' }}>
        <div className="sidebar-header">
          <h3>Brief Overview</h3>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: 'auto' }}>
          <div className="premium-mockup-frame" style={{ borderSize: '4px', borderRadius: '16px' }}>
            <div style={{ padding: '1.5rem', background: 'var(--bg-glass)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="text-muted" style={{ fontSize: '0.8rem' }}>COMPLEXITY</span>
                <span style={{ color: 'var(--primary)', fontWeight: 800 }}>PRO</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="text-muted" style={{ fontSize: '0.8rem' }}>VERSION</span>
                <span style={{ fontWeight: 800 }}>V3.0.4</span>
              </div>
              <div style={{ fontSize: '0.85rem', lineHeight: 1.4, opacity: 0.8 }}>
                Architecting a <span style={{ color: 'white' }}>{postType.title}</span> pack for <span style={{ color: 'white' }}>{formData.animeName || 'Universal'}</span>.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button type="submit" form="studio-form" className="btn btn-primary btn-lg full-width">
              Forge Content Brief
            </button>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="button" className="btn btn-secondary flex-1" onClick={onSave} title="Sync to Local Storage">Save Draft</button>
              <button type="button" className="btn btn-secondary flex-1" onClick={onLoad}>Restore</button>
            </div>
            <button type="button" className="btn btn-ghost full-width" onClick={onClear}>Reset Studio</button>
          </div>
        </div>

        <div className="sidebar-footer" style={{ border: 'none', padding: '0' }}>
          <div style={{ padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            ⚠️ <strong>Pro Tip:</strong> JSON output is optimized for Gemini 1.5 Pro. Paste the prompt directly into the AI for best results.
          </div>
        </div>
      </aside>
    </div>
  );
};

export default PromptBuilder;
