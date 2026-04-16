import React from 'react';

const LandingPage = ({ onStart }) => {
  const steps = [
    { num: '1', title: 'Choose Format', text: 'Select from 10+ specialized anime post templates.' },
    { num: '2', title: 'Refine Context', text: 'Customize anime titles, tones, and art styles.' },
    { num: '3', title: 'Forge JSON', text: 'Generate a structured data prompt in seconds.' },
    { num: '4', title: 'Open Gemini', text: 'Paste the JSON into AI and get viral content.' },
  ];

  const postTypes = [
    { icon: '⚔️', title: 'Versus Battle', desc: 'Settle the greatest power scaling debates.' },
    { icon: '😂', title: 'Relatable Meme', desc: 'Highly shareable fan-centric humor.' },
    { icon: '📊', title: 'Top 10 Ranking', desc: 'Opinionated lists that drive comments.' },
    { icon: '❓', title: 'Guess the Anime', desc: 'Gamify your feed with trivia challenges.' },
    { icon: '💬', title: 'Anime Quote', desc: 'Emotional and motivational aesthetic posts.' },
    { icon: '🎯', title: 'Choose One', desc: 'Binary decisions that force engagement.' },
    { icon: '💖', title: 'Waifu Discussion', desc: 'Appreciate fan-favorite characters.' },
    { icon: '📺', title: 'Recommendation', desc: 'Build community trust with niche titles.' },
    { icon: '🔥', title: 'Viral Hot Take', desc: 'Trigger the algorithm with controversial views.' },
    { icon: '📺', title: 'Scene Recap', desc: 'Distill epic moments into viral briefs.' },
  ];

  const artStyles = [
    { id: 'cinematic', title: 'Cinematic Anime', img: 'cinematic-anime-style' },
    { id: 'manga', title: 'Manga Panel', img: 'manga-panel-style' },
    { id: 'neon', title: 'Neon Edit', img: 'neon-edit-style' },
    { id: 'minimal', title: 'Minimalist Social', img: 'minimalist-social-card' },
  ];

  const mockJson = `{
  "role": "anime_creator",
  "goal": "increase_engagement",
  "post_type": "versus_battle",
  "topic": "Gojo vs Sakuna",
  "audience": "shonen_fans",
  "tone": "hype"
}`;

  return (
    <div className="landing-page-v3 animate-fade-in">
      {/* Hero Section */}
      <section className="hero-v3">
        <div className="container hero-layout-split">
          <div className="hero-content-v3">
            <div className="hero-badge-v3">🔥 Version 3.0 Live</div>
            <h1>Create Better Anime <br/>Facebook Posts <span className="accent-text">Faster</span></h1>
            <p className="hero-subtitle-v3">
              Build structured JSON prompts for captions, hashtags, and AI visuals. 
              Architect viral content for your anime page with industrial precision.
            </p>
            <div className="hero-action-group-v2">
              <button className="btn btn-primary btn-lg" onClick={onStart}>Start Creating</button>
              <button className="btn btn-secondary btn-lg" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>See How It Works</button>
            </div>
          </div>
          <div className="hero-visual-v3">
            <div className="premium-mockup-frame">
              <img src="/hero_v3.png" alt="Anime Studio Mockup" className="hero-img-mock" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-v3 bg-alt">
        <div className="container">
          <div className="section-header-v3">
            <h2>The Viral <span className="accent-text">Workflow</span></h2>
            <p>A streamlined four-step process designed for high-volume creators.</p>
          </div>
          <div className="steps-grid">
            {steps.map(step => (
              <div key={step.num} className="step-card">
                <div className="step-number">{step.num}</div>
                <h3>{step.title}</h3>
                <p className="text-muted">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 Post Types Section */}
      <section className="section-v3">
        <div className="container">
          <div className="section-header-v3">
            <h2>Specialized <span className="accent-text">Formats</span></h2>
            <p>10 unique content generators optimized for Facebook algorithm triggers.</p>
          </div>
          <div className="formats-grid-v3">
            {postTypes.map(pt => (
              <div key={pt.title} className="format-pill-card">
                <div className="fmt-icon">{pt.icon}</div>
                <div className="fmt-info">
                  <h4>{pt.title}</h4>
                  <p>{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Styles Section */}
      <section className="section-v3 bg-alt">
        <div className="container">
          <div className="section-header-v3">
            <h2>Visual <span className="accent-text">Art Direction</span></h2>
            <p>Detailed art briefs included in every pack for DALL-E, Midjourney, or Flux.</p>
          </div>
          <div className="styles-preview-grid">
            {artStyles.map(style => (
              <div key={style.id} className="style-preview-card">
                <div className={`sp-img preview-bg ${style.img}`}></div>
                <div className="sp-body">
                  <h4>{style.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JSON Preview Section */}
      <section className="section-v3">
        <div className="container">
          <div className="hero-layout-split">
            <div className="hero-content">
              <h2>Structured <span className="accent-text">JSON Output</span></h2>
              <p className="hero-subtitle-v3">
                No more messy paragraphs. Get a clean, structured payload that Gemini 1.5 Pro understands perfectly for consistent, high-fidelity results.
              </p>
              <div className="expected-deliverables" style={{ marginBottom: '2rem' }}>
                <div className="deliv-item"><span>✅</span> Machine-Readable Prompting</div>
                <div className="deliv-item"><span>✅</span> Consistent Multi-Caption Output</div>
                <div className="deliv-item"><span>✅</span> Direct AI Instructions</div>
              </div>
            </div>
            <div className="json-preview-showcase">
              <div className="code-header">
                <div className="code-dots"><span className="dot-red"></span><span className="dot-yel"></span><span className="dot-grn"></span></div>
                <span className="doc-badge">output.json</span>
              </div>
              <div className="json-code-block" style={{ fontSize: '0.8rem' }}>
                <span className="json-braces">{'{'}</span><br/>
                &nbsp;&nbsp;<span className="json-key">"role"</span>: <span className="json-string">"anime_creator"</span>,<br/>
                &nbsp;&nbsp;<span className="json-key">"post_type"</span>: <span className="json-string">"versus_battle"</span>,<br/>
                &nbsp;&nbsp;<span className="json-key">"topic"</span>: <span className="json-string">"Gojo vs Sukuna"</span>,<br/>
                &nbsp;&nbsp;<span className="json-key">"platform"</span>: <span className="json-string">"facebook"</span><br/>
                <span className="json-braces">{'}'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-v3 bg-primary" style={{ background: 'var(--primary)', color: 'white', border: 'none' }}>
        <div className="container footer-content-v3">
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>Ready to Scale Your Anime Page?</h2>
          <p style={{ opacity: 0.9, marginBottom: '2.5rem', fontSize: '1.2rem' }}>Join the next generation of anime content creators today.</p>
          <button className="btn btn-secondary btn-lg" style={{ background: 'white', color: 'var(--primary)', fontWeight: 800 }} onClick={onStart}>
            Launch Creator Studio
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
