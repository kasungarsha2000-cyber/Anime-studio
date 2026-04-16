import { useState } from 'react';
import { generateContent } from '../services/gemini';
import OutputDisplay from '../components/OutputDisplay';
import AdvancedSettings from '../components/AdvancedSettings';
import { Sparkles, Loader2 } from 'lucide-react';

export default function SectionViralPost() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [settings, setSettings] = useState({ tone: '', intensity: 'high', language: 'English' });
  const [error, setError] = useState('');

  const generatePost = async (specificSection = null) => {
    setLoading(true);
    setError('');
    
    // If specificSection is provided, we simulate regenerating just that section 
    // by asking Gemini to keep the context but improve that specific part.
    // For simplicity in this demo, regenerating basically calls the same prompt 
    // with an extra instruction if specificSection is provided.

    const basePrompt = `
      You are an expert Anime Meme & Content Strategist. Your task is to generate a highly engaging, viral-ready Facebook 'MEME' package based on a SPECIFIC, REAL trending anime. 
      Do NOT create generic "anime boy/girl" concepts. You MUST pick a highly popular, recognizable anime property (e.g. Jujutsu Kaisen, Solo Leveling, Frieren, Demon Slayer, Chainsaw Man).
      Focus on humor, relatability, 'Me When' scenarios, 'POV' jokes, or iconic tropes.
      
      REQUIREMENTS:
      1. Choose a MEME TREND angle and explicitly state it.
      2. GENERATE A MEGA-PROMPT (1000+ words): Exhaustive prompt for the MEME-WORTHY image. Make the design simple, but explicitly name the recognizable characters you are depicting.
      3. GENERATE A CAPTION: A Facebook caption mimicking viral posts, including emojis.
      4. GENERATE TAGS: SEO-optimized tags.
      5. Apply settings: Tone: ${settings.tone || 'Auto'}, Intensity: ${settings.intensity}, Language: ${settings.language}.

      ${specificSection ? `NOTE: REGENERATE ONLY the '${specificSection}' part.` : ''}
    `;

    try {
      const data = await generateContent({ prompt: basePrompt });
      
      // Merge with existing result if only regenerating a section
      if (specificSection && result) {
        setResult({ ...result, [specificSection]: data[specificSection] });
      } else {
        setResult(data);
      }
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
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles color="var(--accent-primary)" /> Viral Post Generator
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Instantly generate a complete, viral-ready anime topic and post package for Facebook.</p>
      </div>

      <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--border-radius-lg)', marginBottom: '2rem' }}>
        <AdvancedSettings settings={settings} setSettings={setSettings} />
        
        <button 
          onClick={() => generatePost()}
          disabled={loading}
          style={{ 
            marginTop: '1.5rem',
            width: '100%', 
            padding: '1rem', 
            background: 'var(--accent-primary)', 
            color: 'white', 
            border: 'none', 
            borderRadius: 'var(--border-radius-md)', 
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
            opacity: loading ? 0.8 : 1
          }}
        >
          {loading ? <><Loader2 className="lucide-spin" size={20} /> Generating Magic...</> : <><Sparkles size={20} /> Generate Viral Anime Post</>}
        </button>

        {error && <div className="animate-fade-up" style={{ marginTop: '1.25rem', color: 'var(--error)', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: 'var(--border-radius-md)', fontSize: '0.9rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</div>}
      </div>

      <OutputDisplay 
        result={result} 
        onRegenerateAll={() => generatePost()} 
        onRegenerateSection={(section) => generatePost(section)} 
      />
    </div>
  );
}
