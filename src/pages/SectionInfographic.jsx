import { useState } from 'react';
import { generateContent } from '../services/gemini';
import OutputDisplay from '../components/OutputDisplay';
import AdvancedSettings from '../components/AdvancedSettings';
import { LineChart, Loader2 } from 'lucide-react';

export default function SectionInfographic() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [settings, setSettings] = useState({ tone: '', intensity: 'high', language: 'English' });
  const [error, setError] = useState('');
  
  const [topic, setTopic] = useState('');
  const [purpose, setPurpose] = useState('');
  const [visualStyle, setVisualStyle] = useState('');
  const [orientation, setOrientation] = useState('Vertical');
  const [artStyle, setArtStyle] = useState('Modern Anime');

  const generateInfographic = async (specificSection = null) => {
    if (!topic) {
      setError("Please enter a topic.");
      return;
    }

    setLoading(true);
    setError('');

    const basePrompt = `
      You are an expert Anime Infographic Designer. 
      Generate a comprehensive prompt for creating an anime-themed infographic based on the user's inputs.
      
      INPUTS:
      - Topic: ${topic}
      - Purpose: ${purpose || 'General informative guide'}
      - Visual Style: ${visualStyle || 'Standard anime aesthetic'}
      - Orientation: ${orientation}
      - Art Style: ${artStyle}
      
      REQUIREMENTS:
      1. GENERATE A MEGA-PROMPT (1000+ words): Exhaustively define the infographic layout.
         - ORIENTATION & ASPECT RATIO: Specifically design the layout for a ${orientation} format.
         - ART STYLE & AESTHETIC: Deeply incorporate the ${artStyle} styling throughout.
         - GRAPHIC LANGUAGE: Use of icons, vector ornaments, geometric vs. organic shapes.
         - TITLE HIERARCHY: Specific font weighting, kerning style, title placement.
         - DATA BLOCKS: Layout of charts, comparison grids, or profile cards.
         - COLOR THEORY: Primary, secondary, and accent palettes with specific hex-code intents.
         - CALLOUTS: Detailed descriptions of pointer styles, legend blocks, and social-media-friendly flow.
      2. GENERATE A CAPTION: A Facebook caption optimized for infographics.
      3. GENERATE TAGS: SEO-optimized tags.
      4. Apply settings: Tone: ${settings.tone || 'Auto'}, Intensity: ${settings.intensity}, Language: ${settings.language}.
      5. SAFETY: Brand safe, no explicit content.

      ${specificSection ? `NOTE: REGENERATE ONLY the '${specificSection}' part of the package.` : ''}
    `;

    try {
      const data = await generateContent({ prompt: basePrompt });
      if (specificSection && result) {
        setResult({ ...result, [specificSection]: data[specificSection] });
      } else {
        setResult(data);
      }
    } catch (err) {
      setError(err.message || 'Failed to generate content.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <LineChart color="var(--accent-primary)" /> Infographic Designer
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Design highly readable and engaging anime-themed infographics.</p>
      </div>

      <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--border-radius-lg)', marginBottom: '2rem' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Orientation</label>
              <select 
                value={orientation}
                onChange={(e) => setOrientation(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
              >
                <option value="Vertical">Vertical (Mobile/Reels)</option>
                <option value="Horizontal">Horizontal (Desktop/Post)</option>
                <option value="Square">Square (Instagram/Facebook)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Art Style Preset</label>
              <select 
                value={artStyle}
                onChange={(e) => setArtStyle(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
              >
                <option value="Modern Anime">Modern Anime (Sharp/Vibrant)</option>
                <option value="Retro/90s">Retro 90s (Grainy/Crt)</option>
                <option value="Cyberpunk">Cyberpunk (Neon/Dark)</option>
                <option value="Watercolor">Watercolor (Soft/Textured)</option>
                <option value="Minimalist Vector">Minimalist Vector (Flat UI)</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Topic / Character / Series *</label>
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., The Evolution of Super Saiyan, Jujutsu Kaisen Cursed Energy Explained"
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Infographic Purpose</label>
            <input 
              type="text" 
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g., Timeline, Power Scaling, Beginner Guide, Relationship Chart"
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Custom Visual Style (Optional)</label>
            <input 
              type="text" 
              value={visualStyle}
              onChange={(e) => setVisualStyle(e.target.value)}
              placeholder="e.g., Sci-fi UI, Fantasy parchment, Neon signs"
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>
        </div>

        <AdvancedSettings settings={settings} setSettings={setSettings} />
        
        <button 
          onClick={() => generateInfographic()}
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
          {loading ? <><Loader2 className="lucide-spin" size={20} /> Designing Layout...</> : <><LineChart size={20} /> Generate Infographic Prompt</>}
        </button>

        {error && <div style={{ marginTop: '1rem', color: 'var(--error)', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: 'var(--border-radius-sm)' }}>{error}</div>}
      </div>

      <OutputDisplay result={result} onRegenerateAll={() => generateInfographic()} onRegenerateSection={(section) => generateInfographic(section)} />
    </div>
  );
}
