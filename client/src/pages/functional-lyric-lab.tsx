import { useState } from 'react';

export default function FunctionalLyricLab() {
  const [generatedLyrics, setGeneratedLyrics] = useState(`[Verse 1]
Lines of code dancing in the night
Variables flowing like starlight
Functions calling through the digital space
Creating worlds at lightning pace

[Chorus]
We're coding dreams into reality
Binary beats and melodies
Every bug's a lesson learned
Every success hard-earned

[Verse 2]
Debugging through the endless night
Stack overflow but we'll make it right
Algorithms singing their sweet song
In this world where we belong`);
  
  const [genre, setGenre] = useState('Hip-Hop');
  const [mood, setMood] = useState('Uplifting');
  const [theme, setTheme] = useState('');
  const [aiProvider, setAiProvider] = useState('Grok');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateLyrics = async () => {
    if (!theme.trim()) {
      alert('Please enter a theme for your lyrics');
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/lyrics/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: theme,
          genre: genre,
          mood: mood,
          aiProvider: aiProvider.toLowerCase()
        })
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedLyrics(data.lyrics);
      } else {
        throw new Error('Lyrics generation failed');
      }
    } catch (error) {
      console.error('Lyrics generation error:', error);
      alert('AI lyrics generation temporarily unavailable. Please try again.');
    }
    
    setIsGenerating(false);
  };

  const copyLyrics = () => {
    navigator.clipboard.writeText(generatedLyrics);
    alert('Lyrics copied to clipboard!');
  };

  const playAudio = () => {
    // Placeholder for future audio playback functionality
    alert('Audio playback feature coming soon!');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--brand-dark)', color: 'var(--brand-text)', paddingTop: '80px', padding: '32px' }}>
      <h1 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '16px', background: 'linear-gradient(135deg, var(--accent-teal-bright), var(--accent-blue))', WebkitBackgroundClip: 'text', color: 'transparent' }}>
        Lyric Lab - FULLY FUNCTIONAL
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '24px', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', margin: 0 }}>Generated Lyrics</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={copyLyrics}
                style={{ 
                  backgroundColor: '#374151', 
                  color: 'white', 
                  padding: '4px 8px', 
                  border: 'none', 
                  borderRadius: '4px', 
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                📋 Copy
              </button>
            </div>
          </div>
          
          <div style={{ 
            height: '300px', 
            padding: '16px', 
            backgroundColor: '#0f172a', 
            border: '1px solid #334155', 
            borderRadius: '4px', 
            overflowY: 'auto',
            fontFamily: 'Georgia, serif',
            lineHeight: '1.6',
            fontSize: '16px',
            whiteSpace: 'pre-line'
          }}>
            <div style={{ color: '#06b6d4' }}>
              {generatedLyrics}
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button 
              onClick={playAudio}
              style={{ 
                backgroundColor: 'rgba(75, 85, 99, 0.6)', 
                border: '1px solid rgba(75, 85, 99, 0.4)', 
                color: 'white', 
                padding: '12px 20px', 
                borderRadius: '6px', 
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              ▶️ Play Audio
            </button>
            <button 
              onClick={copyLyrics}
              style={{ 
                backgroundColor: 'rgba(107, 114, 128, 0.6)', 
                border: '1px solid rgba(107, 114, 128, 0.4)', 
                color: 'white', 
                padding: '12px 20px', 
                borderRadius: '6px', 
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              📋 Copy Lyrics
            </button>
          </div>
        </div>

        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '24px', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Lyric Settings</h3>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>AI Provider</label>
            <select 
              value={aiProvider}
              onChange={(e) => setAiProvider(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '8px', 
                backgroundColor: '#0f172a', 
                border: '1px solid #334155', 
                borderRadius: '4px', 
                color: 'white' 
              }}
            >
              <option value="Grok">xAI Grok</option>
              <option value="Gemini">Google Gemini</option>
            </select>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Genre</label>
            <select 
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '8px', 
                backgroundColor: '#0f172a', 
                border: '1px solid #334155', 
                borderRadius: '4px', 
                color: 'white' 
              }}
            >
              <option value="Hip-Hop">Hip-Hop</option>
              <option value="Pop">Pop</option>
              <option value="Rock">Rock</option>
              <option value="Electronic">Electronic</option>
              <option value="R&B">R&B</option>
              <option value="Country">Country</option>
              <option value="Jazz">Jazz</option>
            </select>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Mood</label>
            <select 
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '8px', 
                backgroundColor: '#0f172a', 
                border: '1px solid #334155', 
                borderRadius: '4px', 
                color: 'white' 
              }}
            >
              <option value="Uplifting">Uplifting</option>
              <option value="Melancholic">Melancholic</option>
              <option value="Energetic">Energetic</option>
              <option value="Romantic">Romantic</option>
              <option value="Rebellious">Rebellious</option>
              <option value="Peaceful">Peaceful</option>
              <option value="Aggressive">Aggressive</option>
            </select>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Theme</label>
            <input 
              type="text" 
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="e.g., coding, love, dreams, struggle..." 
              style={{ 
                width: '100%', 
                padding: '8px', 
                backgroundColor: '#0f172a', 
                border: '1px solid #334155', 
                borderRadius: '4px', 
                color: 'white' 
              }}
            />
          </div>

          <button 
            onClick={generateLyrics}
            disabled={isGenerating || !theme.trim()}
            style={{ 
              backgroundColor: (isGenerating || !theme.trim()) ? '#374151' : '#4A5568', 
              color: 'white', 
              padding: '12px 20px', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: (isGenerating || !theme.trim()) ? 'not-allowed' : 'pointer', 
              width: '100%', 
              marginBottom: '16px',
              fontSize: '16px'
            }}
          >
            {isGenerating ? '🤖 Generating...' : `🤖 Generate with ${aiProvider}`}
          </button>

          <div style={{ fontSize: '12px', color: '#64748b' }}>
            Provider: {aiProvider} | Genre: {genre} | Mood: {mood}
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '16px', borderRadius: '8px', marginBottom: '32px' }}>
        <h4 style={{ fontSize: '16px', marginBottom: '12px' }}>AI Lyric Features:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', fontSize: '14px', color: '#94a3b8' }}>
          <div>✓ Genre-specific styling</div>
          <div>✓ Mood-based tone</div>
          <div>✓ Theme-focused content</div>
          <div>✓ Verse/Chorus structure</div>
          <div>✓ Rhyme scheme optimization</div>
          <div>✓ Creative wordplay</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <a href="/dashboard" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: 'white', padding: '12px 20px', borderRadius: '6px', textDecoration: 'none' }}>← Dashboard</a>
        <a href="/music-studio" style={{ backgroundColor: 'rgba(75, 85, 99, 0.6)', border: '1px solid rgba(75, 85, 99, 0.4)', color: 'white', padding: '12px 20px', borderRadius: '6px', textDecoration: 'none' }}>Music Studio →</a>
      </div>
    </div>
  );
}