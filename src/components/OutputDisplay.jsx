import { useState } from 'react';
import { Copy, Plus, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';

const OutputBox = ({ title, content, isMainPrompt, onRegenerate, staggerIndex = 1 }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = content ? content.split(/\s+/).filter(word => word.length > 0).length : 0;
  const charCount = content ? content.length : 0;

  return (
    <div id={isMainPrompt ? "masterwork-prompt" : undefined} className={`glass animate-fade-up animate-stagger-${staggerIndex}`} style={{ marginBottom: '1.5rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)', overflow: 'hidden', opacity: 0 }}>
      <div style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>{title}</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-primary)', padding: '0.2rem 0.5rem', borderRadius: '1rem' }}>
            {isMainPrompt ? `${wordCount} words` : `${charCount} chars`}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {onRegenerate && (
            <button onClick={onRegenerate} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '0.4rem 0.75rem', borderRadius: 'var(--border-radius-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}>
              <RefreshCw size={14} /> Regenerate
            </button>
          )}
          <button onClick={handleCopy} style={{ background: 'var(--accent-primary)', border: 'none', color: 'white', padding: '0.4rem 0.75rem', borderRadius: 'var(--border-radius-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}>
            <Copy size={14} /> {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      <div style={{ padding: '1rem', whiteSpace: 'pre-wrap', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
        {content}
      </div>
    </div>
  );
};

export default function OutputDisplay({ result, onRegenerateAll, onRegenerateSection }) {
  if (!result) return null;

  const handleCopyAll = () => {
    const text = `PROMPT:\n${result.prompt}\n\nCAPTION:\n${result.caption}\n\nTAGS:\n${result.tags}`;
    navigator.clipboard.writeText(text);
  };

  const CheckItem = ({ label, passed }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
      {passed ? <CheckCircle2 size={16} color="var(--success)" /> : <XCircle size={16} color="var(--error)" />}
      <span style={{ color: passed ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{label}</span>
    </div>
  );

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem' }}>Generated Content Package</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={onRegenerateAll} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.5rem 1rem', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', fontWeight: '500' }}>
            Generate Again
          </button>
          <button onClick={handleCopyAll} style={{ background: 'var(--accent-primary)', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', fontWeight: '500' }}>
            Copy All
          </button>
        </div>
      </div>

      <OutputBox title="Main Prompt" content={result.prompt} isMainPrompt={true} onRegenerate={() => onRegenerateSection('prompt')} staggerIndex={1} />
      <OutputBox title="Facebook Caption" content={result.caption} onRegenerate={() => onRegenerateSection('caption')} staggerIndex={2} />
      <OutputBox title="SEO Tags" content={result.tags} onRegenerate={() => onRegenerateSection('tags')} staggerIndex={3} />

      {result.checklist && (
        <div className="animate-fade-up animate-stagger-4" style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-card)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)', opacity: 0 }}>
          <h4 style={{ marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Prompt Quality Checklist</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            <CheckItem label="1000+ Words Masterwork" passed={result.checklist.wordCountMet} />
            <CheckItem label="Technical Composition" passed={result.checklist.compositionIncluded} />
            <CheckItem label="Lighting Callouts" passed={result.checklist.lightingIncluded} />
            <CheckItem label="Platform-Safe Wording" passed={result.checklist.safeWording} />
          </div>
        </div>
      )}
    </div>
  );
}
