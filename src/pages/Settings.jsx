import { useState, useEffect } from 'react';
import { Key, Server } from 'lucide-react';

export default function Settings({ geminiKey, setGeminiKey }) {
  const [inputValue, setInputValue] = useState(geminiKey);
  const [saved, setSaved] = useState(false);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(localStorage.getItem('gemini_api_model') || 'gemini-1.5-pro');
  const [fetchingModels, setFetchingModels] = useState(false);
  const [modelError, setModelError] = useState('');

  // Fetch models whenever key changes
  useEffect(() => {
    if (geminiKey) {
      fetchAvailableModels(geminiKey);
    }
  }, [geminiKey]);

  const fetchAvailableModels = async (key) => {
    setFetchingModels(true);
    setModelError('');
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      
      const validModels = data.models
        ?.filter(m => m.supportedGenerationMethods?.includes('generateContent'))
        .map(m => m.name.replace('models/', ''));
        
      if (validModels && validModels.length > 0) {
        setModels(validModels);
        if (!validModels.includes(selectedModel)) {
          setSelectedModel(validModels[0]);
          localStorage.setItem('gemini_api_model', validModels[0]);
        }
      }
    } catch (err) {
      setModelError('Could not fetch models. ' + err.message);
    } finally {
      setFetchingModels(false);
    }
  };

  const handleSave = () => {
    localStorage.setItem('gemini_api_key', inputValue);
    localStorage.setItem('gemini_api_model', selectedModel);
    setGeminiKey(inputValue);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    fetchAvailableModels(inputValue);
  };

  const handleModelChange = (e) => {
    const newVal = e.target.value;
    setSelectedModel(newVal);
    localStorage.setItem('gemini_api_model', newVal);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Key size={24} /> API Settings
      </h1>
      
      <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--border-radius-lg)' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Anime Content Studio requires a Google Gemini API Key to dynamically generate 500+ word prompts and analyze your uploaded character design sheets.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>Google Gemini API Key</label>
          <input 
            type="password"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="AIzaSy..."
            style={{ 
              padding: '0.75rem 1rem', 
              borderRadius: 'var(--border-radius-md)', 
              border: '1px solid var(--border-color)', 
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              width: '100%',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
          />
        </div>

        {geminiKey && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--border-radius-md)' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Server size={18} /> Select Active Model
            </label>
            {fetchingModels ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Fetching available models...</p>
            ) : modelError ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--error)' }}>{modelError}</p>
            ) : (
              <select 
                value={selectedModel}
                onChange={handleModelChange}
                style={{ 
                  padding: '0.75rem', 
                  borderRadius: 'var(--border-radius-md)', 
                  border: '1px solid var(--border-color)', 
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  width: '100%'
                }}
              >
                {models.length > 0 ? (
                  models.map(m => <option key={m} value={m}>{m}</option>)
                ) : (
                  <>
                    <option value="gemini-1.5-pro">gemini-1.5-pro</option>
                    <option value="gemini-1.5-flash">gemini-1.5-flash</option>
                    <option value="gemini-1.5-pro-latest">gemini-1.5-pro-latest</option>
                  </>
                )}
              </select>
            )}
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Select a model compatible with your current API tier and region. If you get 429/404 errors, switch to another model here.
            </p>
          </div>
        )}

        <button 
          onClick={handleSave}
          style={{ 
            padding: '0.75rem 1.5rem', 
            backgroundColor: 'var(--accent-primary)', 
            color: 'white', 
            border: 'none', 
            borderRadius: 'var(--border-radius-md)', 
            cursor: 'pointer', 
            fontWeight: 'bold',
            width: '100%',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--accent-secondary)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--accent-primary)'}
        >
          {saved ? 'Saved Successfully!' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
