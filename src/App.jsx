import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import PromptBuilder from './components/PromptBuilder';
import OutputScreen from './components/OutputScreen';
import { DEFAULT_SETTINGS } from './lib/constants';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedPostType, setSelectedPostType] = useState(null);
  const [formData, setFormData] = useState(DEFAULT_SETTINGS);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [notification, setNotification] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('studio-theme') || 'dark';
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('studio-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Load saved draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('animePromptDraft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Failed to load draft', e);
      }
    }
  }, []);

  const saveDraft = () => {
    localStorage.setItem('animePromptDraft', JSON.stringify(formData));
    showNotification('Draft saved successfully!');
  };

  const loadDraft = () => {
    const savedDraft = localStorage.getItem('animePromptDraft');
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft));
      showNotification('Draft restored!');
    } else {
      showNotification('No saved draft found.', 'error');
    }
  };

  const clearForm = () => {
    setFormData(DEFAULT_SETTINGS);
    showNotification('Form cleared.');
  };

  const handleStart = () => setCurrentView('dashboard');

  const handleSelectPostType = (postType) => {
    setSelectedPostType(postType);
    const typeDefaults = {};
    postType.fields?.forEach(f => {
      if (f.default !== undefined) typeDefaults[f.id] = f.default;
    });
    setFormData(prev => ({ ...prev, ...typeDefaults, postTypeId: postType.id }));
    setCurrentView('builder');
  };

  const handleGenerate = (prompt) => {
    setGeneratedPrompt(prompt);
    setCurrentView('output');
  };

  const handleBackToDashboard = () => setCurrentView('dashboard');
  const handleBackToBuilder = () => setCurrentView('builder');

  const scrollToWorkflow = () => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const el = document.querySelector('.bg-alt');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector('.bg-alt');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onStart={handleStart} />;
      case 'dashboard':
        return <Dashboard onSelect={handleSelectPostType} />;
      case 'builder':
        return (
          <PromptBuilder
            postType={selectedPostType}
            formData={formData}
            setFormData={setFormData}
            onGenerate={handleGenerate}
            onBack={handleBackToDashboard}
            onSave={saveDraft}
            onLoad={loadDraft}
            onClear={clearForm}
            onTypeSwitch={handleSelectPostType}
          />
        );
      case 'output':
        return (
          <OutputScreen
            prompt={generatedPrompt}
            onBack={handleBackToBuilder}
            onNew={handleBackToDashboard}
          />
        );
      default:
        return <LandingPage onStart={handleStart} />;
    }
  };

  return (
    <div className="app-shell">
      {/* Nav */}
      <nav className="studio-nav">
        <div className="container nav-inner">
          <div className="logo-brand" onClick={() => { setCurrentView('landing'); setIsMobileMenuOpen(false); }}>
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="brand-name">Anime Content Studio</span>
          </div>

          <div className="nav-links">
            <button className={`nav-link ${currentView === 'landing' ? 'active' : ''}`} onClick={() => setCurrentView('landing')}>Home</button>
            <button className={`nav-link ${currentView === 'builder' ? 'active' : ''}`} onClick={() => { if (selectedPostType) setCurrentView('builder'); else showNotification('Select a post type first!', 'info'); }}>Builder</button>
            <button className={`nav-link ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentView('dashboard')}>Post Types</button>
            <button className="nav-link" onClick={scrollToWorkflow}>How it Works</button>
            <button className={`nav-link ${currentView === 'output' ? 'active' : ''}`} onClick={() => { if (generatedPrompt) setCurrentView('output'); else showNotification('Generate a prompt first!', 'info'); }}>Output Preview</button>
          </div>

          <div className="nav-user">
            <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => { setCurrentView('dashboard'); setIsMobileMenuOpen(false); }}>
              Start Creating
            </button>
            <button className={`mobile-toggle ${isMobileMenuOpen ? 'is-open' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'is-open' : ''}`}>
        <button className={`mobile-nav-link ${currentView === 'landing' ? 'active' : ''}`} onClick={() => { setCurrentView('landing'); setIsMobileMenuOpen(false); }}>Home</button>
        <button className={`mobile-nav-link ${currentView === 'builder' ? 'active' : ''}`} onClick={() => { if (selectedPostType) setCurrentView('builder'); else showNotification('Select a post type first!', 'info'); setIsMobileMenuOpen(false); }}>Builder</button>
        <button className={`mobile-nav-link ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => { setCurrentView('dashboard'); setIsMobileMenuOpen(false); }}>Post Types</button>
        <button className="mobile-nav-link" onClick={scrollToWorkflow}>How it Works</button>
        <button className={`mobile-nav-link ${currentView === 'output' ? 'active' : ''}`} onClick={() => { if (generatedPrompt) setCurrentView('output'); else showNotification('Generate a prompt first!', 'info'); setIsMobileMenuOpen(false); }}>Output Preview</button>
      </div>

      <main className="studio-main">
        {notification && (
          <div className={`global-notification ${notification.type} animate-fade-in`}>
            {notification.message}
          </div>
        )}
        {renderView()}
      </main>

      <footer className="studio-footer">
        <div className="container">
          <p>© 2026 Anime Content Studio — Your AI Prompt Forge</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
