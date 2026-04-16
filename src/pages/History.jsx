import { useEffect, useState } from 'react';
import { History as HistoryIcon, Trash2 } from 'lucide-react';
import OutputDisplay from '../components/OutputDisplay';

export default function History() {
  const [history, setHistory] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    // Note: To make History work fully across all components we should save the output to localStorage inside `gemini.js` or in a context.
    // For this scope, let's load anything saved in the 'generation_history' array.
    const saved = JSON.parse(localStorage.getItem('generation_history') || '[]');
    setHistory(saved);
  }, []);

  const clearHistory = () => {
    localStorage.setItem('generation_history', '[]');
    setHistory([]);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HistoryIcon color="var(--accent-primary)" /> Generation History
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Your recently saved generated prompts and packages.</p>
        </div>
        
        {history.length > 0 && (
          <button 
            onClick={clearHistory}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--error)', padding: '0.5rem 1rem', borderRadius: 'var(--border-radius-md)', cursor: 'pointer' }}
          >
            <Trash2 size={16} /> Clear
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="glass" style={{ padding: '3rem', textAlign: 'center', borderRadius: 'var(--border-radius-lg)', color: 'var(--text-muted)' }}>
          No generations saved yet. Generate some content first!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {history.map((item, index) => (
            <div key={index} className="glass" style={{ borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
              <div 
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                style={{ padding: '1.5rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{item.type || 'Generation'}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{new Date(item.date).toLocaleString()}</p>
                </div>
                <div style={{ fontSize: '0.85rem', padding: '0.3rem 0.6rem', background: 'var(--bg-primary)', borderRadius: '1rem' }}>
                  {expandedIndex === index ? 'Collapse' : 'Expand'}
                </div>
              </div>
              
              {expandedIndex === index && (
                <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--border-color)' }}>
                  <OutputDisplay result={item.data} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
