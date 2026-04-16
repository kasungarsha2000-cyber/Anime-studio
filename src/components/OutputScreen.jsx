import React, { useState } from 'react';

const OutputScreen = ({ prompt, onBack, onNew }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAndOpen = async () => {
    const success = await handleCopy();
    if (success) {
      setTimeout(() => {
        window.open('https://gemini.google.com/app', '_blank');
      }, 800);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
      return true;
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy to clipboard.');
      return false;
    }
  };

  const renderHighlightedJson = (jsonStr) => {
    if (!jsonStr) return null;
    const parts = jsonStr.split(/(".*?"|[:{}\[\]]|true|false|null|\d+)/g);
    return parts.map((part, i) => {
      if (!part) return null;
      if (part.startsWith('"') && part.endsWith('"')) {
        const isKey = jsonStr[jsonStr.indexOf(part) + part.length] === ':';
        return <span key={i} className={isKey ? 'json-key' : 'json-string'}>{part}</span>;
      }
      if (/[:{}\[\]]/.test(part)) return <span key={i} className="json-braces">{part}</span>;
      if (/true|false/.test(part)) return <span key={i} className="json-boolean">{part}</span>;
      if (/\d+/.test(part)) return <span key={i} className="json-number">{part}</span>;
      return part;
    });
  };

  return (
    <div className="output-studio container animate-fade-in" style={{ padding: '4rem 2rem' }}>
      <header className="output-panel-header">
        <div>
          <div className="header-breadcrumbs">OUTPUT ENGINE / PRODUCTION READY</div>
          <h2 style={{ fontSize: '2.5rem' }}>Briefing <span className="accent-text">Synthesized</span></h2>
        </div>
        <button className="btn btn-secondary" onClick={onBack}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Architect
        </button>
      </header>

      <div className="output-studio-layout">
        <div className="output-document-panel">
          <div className="output-code-container">
            <div className="code-header">
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></span>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></span>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></span>
              </div>
              <span className="doc-badge" style={{ margin: '0 1rem' }}>STRUCTUREV3.JSON</span>
              <div style={{ marginLeft: 'auto' }}>
                <button className="btn btn-secondary btn-sm" onClick={handleCopy}>
                  {copied ? '✅ COPIED' : '📋 COPY JSON'}
                </button>
              </div>
            </div>
            <pre className="json-code-block" style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
              <code>{renderHighlightedJson(prompt)}</code>
            </pre>
          </div>
        </div>

        <aside className="output-action-panel">
          <div className="studio-card" style={{ padding: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column', margin: 0 }}>
            <div className="card-heading" style={{ marginBottom: '1.5rem', paddingBottom: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🚀</span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>DEPLOYMENT</h4>
            </div>
            
            <p className="text-muted" style={{ fontSize: '0.95rem', marginBottom: '2rem' }}>
              Your architecture is ready. Deploy this payload to Gemini 1.5 Pro for high-conversion anime content.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 'auto' }}>
              <button className="btn btn-primary btn-lg full-width" onClick={handleCopyAndOpen}>
                COPY + OPEN GEMINI
              </button>
              <div style={{ padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '16px' }}>
                <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.75rem', color: 'var(--primary)' }}>NEXT STEPS:</h5>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li>✨ Paste JSON into Gemini</li>
                  <li>✨ Generate 3x Captions</li>
                  <li>✨ Refine AI Image Prompts</li>
                  <li>✨ Deploy to Facebook</li>
                </ul>
              </div>
              <button className="btn btn-ghost full-width" onClick={onNew}>FORGE NEW CONCEPT</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default OutputScreen;
