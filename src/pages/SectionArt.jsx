import { useState } from 'react';
import { generateContent } from '../services/gemini';
import OutputDisplay from '../components/OutputDisplay';
import AdvancedSettings from '../components/AdvancedSettings';
import ImageUpload from '../components/ImageUpload';
import { PenTool, Loader2 } from 'lucide-react';

export default function SectionArt() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [settings, setSettings] = useState({ tone: '', intensity: 'high', language: 'English' });
  const [error, setError] = useState('');
  
  const [desc, setDesc] = useState('');
  const [pose, setPose] = useState('');
  const [imageData, setImageData] = useState(null);
  const [imageType, setImageType] = useState('');

  const handleImageUpload = (data, type) => {
    setImageData(data);
    setImageType(type);
  };

  const generateArtPrompt = async (specificSection = null) => {
    if (!desc) {
      setError("Please enter a character design description.");
      return;
    }

    setLoading(true);
    setError('');

    const basePrompt = `
      You are an expert Anime Pencil Art Director. 
      Generate a comprehensive prompt for creating a pencil drawing of the character.
      
      INPUTS:
      - Description: ${desc}
      - Pose/Mood: ${pose || 'Standard dynamic pose'}
      - Uploaded Image Context: ${imageData ? 'Use the uploaded image strictly as a STYLE REFERENCE (shading, lineweight, texture) not as the character itself.' : 'No style image uploaded. Default to high-quality manga-style pencil sketch.'}
      
      REQUIREMENTS:
      1. GENERATE A MEGA-PROMPT (1000+ words): Exhaustively describe the pencil art masterpiece.
         - TEXTURE & MEDIUM: Specific graphite grades (e.g., 4H for outlines, 6B for shadows), paper tooth (e.g., cold press, textured Bristol), and hand-smudge details.
         - LINE PHYSICS: Variable pressure, tapering, and line weights.
         - SHADING DEPTH: Detailed cross-hatching, stippling, and smooth blending techniques. 
         - ANATOMICAL PRECISION: Proportions, muscle silhouettes, and skeletal underpinnings.
         - COMPOSITION: Negative space usage, focal points, and artistic framing.
      2. GENERATE A CAPTION: A Facebook caption for sharing artist sketches.
      3. GENERATE TAGS: SEO-optimized tags.
      4. Apply settings: Tone: ${settings.tone || 'Auto'}, Intensity: ${settings.intensity}, Language: ${settings.language}.
      5. SAFETY: Brand safe, no explicit content.

      ${specificSection ? `NOTE: REGENERATE ONLY the '${specificSection}' part of the package.` : ''}
    `;

    try {
      const callData = imageData 
        ? { prompt: basePrompt, imageData, mimeType: imageType }
        : { prompt: basePrompt };
      const data = await generateContent(callData);
      
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
          <PenTool color="var(--accent-primary)" /> Pencil Art Generator
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Turn character descriptions into stunning manga-style pencil art prompts, influenced by your style references.</p>
      </div>

      <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--border-radius-lg)', marginBottom: '2rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Character Description *</label>
            <textarea 
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="e.g., A tall knight with messy hair, wearing a tattered trench coat and holding a massive broadsword."
              rows={3}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', resize: 'vertical' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Pose or Mood</label>
            <input 
              type="text" 
              value={pose}
              onChange={(e) => setPose(e.target.value)}
              placeholder="e.g., Resting sword on shoulder, looking away, somber"
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>
        </div>

        <ImageUpload onImageUpload={handleImageUpload} label="Upload Style Reference (Optional, influences shading/lines)" />

        <AdvancedSettings settings={settings} setSettings={setSettings} />
        
        <button 
          onClick={() => generateArtPrompt()}
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
          {loading ? <><Loader2 className="lucide-spin" size={20} /> Hatching Lines...</> : <><PenTool size={20} /> Generate Pencil Art Prompt</>}
        </button>

        {error && <div style={{ marginTop: '1rem', color: 'var(--error)', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: 'var(--border-radius-sm)' }}>{error}</div>}
      </div>

      <OutputDisplay result={result} onRegenerateAll={() => generateArtPrompt()} onRegenerateSection={(section) => generateArtPrompt(section)} />
    </div>
  );
}
