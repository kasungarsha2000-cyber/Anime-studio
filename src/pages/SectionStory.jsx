import { useState } from 'react';
import { generateContent } from '../services/gemini';
import OutputDisplay from '../components/OutputDisplay';
import AdvancedSettings from '../components/AdvancedSettings';
import { Film, Loader2 } from 'lucide-react';

export default function SectionStory() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [settings, setSettings] = useState({ tone: 'Cinematic', intensity: 'high', language: 'English' });
  const [error, setError] = useState('');
  
  const [scenario, setScenario] = useState('');
  const [mood, setMood] = useState('');
  const [camera, setCamera] = useState('');
  const [environment, setEnvironment] = useState('');

  const generateStory = async (specificSection = null) => {
    if (!scenario) {
      setError("Please enter a user scenario.");
      return;
    }

    setLoading(true);
    setError('');

    const basePrompt = `
      You are an expert Anime Video Storyboard Director. 
      Generate a comprehensive prompt for creating an 8-second anime-style short video based on the user's inputs.
      
      INPUTS:
      - Scenario: ${scenario}
      - Mood: ${mood || 'Dynamic'}
      - Camera Style: ${camera || 'Standard tracking shot'}
      - Environment: ${environment || 'Detailed anime background'}
      
      REQUIREMENTS:
      1. GENERATE A MEGA-PROMPT (1000+ words): Exhaustively describe the 8-second video.
         - TEMPORAL PROGRESSION: Describe the action in 1-second intervals (0-1s, 1-2s, etc.).
         - CAMERA CHOREOGRAPHY: Precise lens movements (trucking, panning, crane shots), focus pulls, and rack focus points.
         - MOTION PHYSICS: How hair, clothing, and background elements react to the character's movement.
         - EMOTIONAL BEATS: Key facial transitions during the 8 seconds.
         - VISUAL EFFECTS: Particles, lens flares, motion blur, and cinematic rendering specifications.
      2. GENERATE A CAPTION: A Facebook caption for short-form video engagement.
      3. GENERATE TAGS: SEO-optimized tags.
      4. Apply settings: Tone: ${settings.tone}, Intensity: ${settings.intensity}, Language: ${settings.language}.
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
          <Film color="var(--accent-primary)" /> Video Story Generator
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Direct cinematic 8-second anime shots with complex motion controls.</p>
      </div>

      <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--border-radius-lg)', marginBottom: '2rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Action / Scenario *</label>
            <textarea 
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              placeholder="e.g., A samurai slowly draws his glowing blade while rain falls densely around him. He dashes forward..."
              rows={3}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', resize: 'vertical' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Mood / Emotion</label>
            <input 
              type="text" 
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="e.g., Melancholic, High adrenaline, Ethereal"
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Camera Style</label>
              <input 
                type="text" 
                value={camera}
                onChange={(e) => setCamera(e.target.value)}
                placeholder="e.g., Drone sweep, Dolly zoom"
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Environment</label>
              <input 
                type="text" 
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                placeholder="e.g., Neon city alley, Ruined temple"
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>
          </div>
        </div>

        <AdvancedSettings settings={settings} setSettings={setSettings} />
        
        <button 
          onClick={() => generateStory()}
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
          {loading ? <><Loader2 className="lucide-spin" size={20} /> Directing Scene...</> : <><Film size={20} /> Generate Video Prompt</>}
        </button>

        {error && <div style={{ marginTop: '1rem', color: 'var(--error)', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: 'var(--border-radius-sm)' }}>{error}</div>}
      </div>

      <OutputDisplay result={result} onRegenerateAll={() => generateStory()} onRegenerateSection={(section) => generateStory(section)} />
    </div>
  );
}
