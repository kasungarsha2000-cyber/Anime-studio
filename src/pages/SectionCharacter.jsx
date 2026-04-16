import { useState, useEffect } from 'react';
import { generateContent, analyzeLayout, researchCharacter, generateCharacterSheet, editCharacterSheet } from '../services/gemini';
import OutputDisplay from '../components/OutputDisplay';
import AdvancedSettings from '../components/AdvancedSettings';
import ImageUpload from '../components/ImageUpload';
import { UserCircle, Loader2, Sparkles, Download, RefreshCw, Send } from 'lucide-react';

export default function SectionCharacter() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [result, setResult] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [charDetails, setCharDetails] = useState(null);
  const [layoutDesc, setLayoutDesc] = useState('');
  const [settings, setSettings] = useState({ tone: '', intensity: 'high', language: 'English' });
  const [error, setError] = useState('');
  
  const [charName, setCharName] = useState('');
  const [charDesc, setCharDesc] = useState('');
  const [outfitTheme, setOutfitTheme] = useState('');
  const [imageData, setImageData] = useState(null);
  const [imageType, setImageType] = useState('');
  const [refinePrompt, setRefinePrompt] = useState('');
  const [pendingResume, setPendingResume] = useState(false);
  const [rechargeAttempts, setRechargeAttempts] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [showFallback, setShowFallback] = useState(false);

  // Responsive Listener
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleImageUpload = (data, type) => {
    setImageData(data);
    setImageType(type);
  };

  const generateArchitect = async (specificSection = null) => {
    if (!imageData) {
      setError("Please upload a character reference sheet first.");
      return;
    }
    if (!charName) {
      setError("Please enter a character name.");
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      if (!specificSection) {
        setResult(null);
        setGeneratedImage(null);
      }

      // Step 1: Analyze Template Layout (Stable 2.5-flash)
      setStatus('Analyzing layout template...');
      const layout = await analyzeLayout(imageData, imageType);
      setLayoutDesc(layout);

      // Step 2: Conduct Forensic Character Research (Stable 2.5-flash)
      setStatus(`Researching ${charName}...`);
      const details = await researchCharacter(charName, charDesc + " " + outfitTheme);
      setCharDetails(details);

      // Step 3: Generate Text Content FIRST (Prompt, Caption, Tags)
      // This ensures the user has a fallback if the image model hits quota
      setStatus('Finalizing masterwork prompts...');
      const basePrompt = `
        You are an expert Anime Character Architect. 
        Create a detailed content package for the character: ${charName}.
        Details: ${details.appearance}
        Layout Analysis: ${layout}
        
        REQUIREMENTS:
        1. GENERATE A MASTERWORK PROMPT (1000+ words): Exhaustively describe the character sheet we are architecting.
        2. GENERATE A CAPTION: Optimized for Facebook.
        3. GENERATE TAGS: SEO-optimized.
        4. Apply settings: Tone: ${settings.tone || 'Auto'}, Intensity: ${settings.intensity}, Language: ${settings.language}.
      `;
      
      const textData = await generateContent({ prompt: basePrompt });
      
      if (specificSection && result) {
        setResult({ ...result, [specificSection]: textData[specificSection] });
      } else {
        setResult(textData);
      }

      // Step 4: Visual Generation Removed
      setStatus('');
    } catch (err) {
      console.error(err);
      const errorStr = (err.message || err.toString() || '').toLowerCase();
      
      if (errorStr.includes('429') || errorStr.includes('quota') || errorStr.includes('exceeded')) {
        setError("Google API Quota Exhausted. All backup nodes are rate-limited. Please wait 24 hours or supply fresh keys.");
      } else {
        setError(errorStr);
      }
    } finally {
      setLoading(false);
      setStatus('');
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1rem' }}>
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '900', letterSpacing: '-0.02em' }}>
          <UserCircle size={32} color="var(--accent-primary)" /> Character Architect Studio
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Forensic character sheet generation with precise layout mapping.</p>
        <div style={{ marginTop: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 'bold' }}>
          <Sparkles size={12} /> High Stability Mode Active
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {/* Input Form */}
        <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--border-radius-lg)', border: '1px solid rgba(255,255,255,0.1)' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Character Identity *</label>
              <input 
                type="text" 
                value={charName}
                onChange={(e) => setCharName(e.target.value)}
                placeholder="e.g., Kael the Shadowblade"
                style={{ width: '100%', padding: '0.85rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', fontSize: '1rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Forensic Description</label>
              <textarea 
                value={charDesc}
                onChange={(e) => setCharDesc(e.target.value)}
                placeholder="Brief lore, personality, or physical traits..."
                rows={3}
                style={{ width: '100%', padding: '0.85rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', resize: 'vertical', fontSize: '1rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Outfit / Theme Override</label>
              <input 
                type="text" 
                value={outfitTheme}
                onChange={(e) => setOutfitTheme(e.target.value)}
                placeholder="e.g., Cyberpunk streetwear, Elven armor"
                style={{ width: '100%', padding: '0.85rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', fontSize: '1rem' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
             <ImageUpload onImageUpload={handleImageUpload} label="Template Reference *" />
          </div>

          <AdvancedSettings settings={settings} setSettings={setSettings} />
          
           <button 
            onClick={() => generateArchitect()}
            disabled={loading}
            className={loading ? "btn-loading" : ""}
            style={{ 
              marginTop: '1.5rem',
              width: '100%', 
              padding: '1.1rem', 
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', 
              color: 'white', 
              border: 'none', 
              borderRadius: 'var(--border-radius-md)', 
              fontSize: '1.1rem',
              fontWeight: '900',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.75rem',
              opacity: loading ? 0.9 : 1,
              boxShadow: '0 8px 20px -4px var(--accent-glow)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              transition: 'all 0.3s ease'
            }}
          >
            {loading ? (
              <><Loader2 className="lucide-spin" size={20} /> Processing...</>
            ) : (
              <><Sparkles size={20} /> Architect Sheet</>
            )}
          </button>

          {error && (
            <div className="animate-fade-up" style={{ marginTop: '1.25rem', color: 'var(--error)', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: 'var(--border-radius-md)', fontSize: '0.9rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              {error}
            </div>
          )}
        </div>
      </div>

      {result && (
        <div style={{ marginTop: '4rem', paddingBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
             <h2 style={{ fontSize: '1.5rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-primary)' }}>Architecture Schematics</h2>
             <p style={{ color: 'var(--text-secondary)' }}>Forensic data and expansion prompts for your character.</p>
          </div>
          <OutputDisplay 
            result={result} 
            onRegenerateAll={() => generateArchitect()} 
            onRegenerateSection={(section) => generateArchitect(section)} 
          />
        </div>
      )}
    </div>
  );
}
