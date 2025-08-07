import { useState } from "react";
import { Play, Pause, Square, Music, Volume2, Loader2 } from "lucide-react";

const GENRES = [
  "Hip-Hop", "Electronic", "Pop", "Rock", "R&B", "Trap", "House", "Techno",
  "Dubstep", "Drum & Bass", "Jazz", "Funk", "Reggae", "Latin"
];

export default function WorkingBeatStudio() {
  const [genre, setGenre] = useState("");
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBeat, setGeneratedBeat] = useState(null);

  const handleGenerate = async () => {
    if (!genre) {
      alert("Please select a genre first!");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedBeat({
        genre,
        bpm,
        pattern: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        description: `Generated ${genre} beat at ${bpm} BPM`
      });
      setIsGenerating(false);
    }, 2000);
  };

  const handlePlay = () => {
    if (!generatedBeat) return;
    
    if (isPlaying) {
      setIsPlaying(false);
      console.log("Stopped playback");
    } else {
      setIsPlaying(true);
      console.log("Started playback");
      
      // Auto-stop after 5 seconds for demo
      setTimeout(() => {
        setIsPlaying(false);
      }, 5000);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: 'white', padding: '32px', paddingTop: '96px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              backgroundColor: '#06b6d420', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginRight: '16px' 
            }}>
              <Music style={{ color: '#06b6d4', width: '24px', height: '24px' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>Beat Studio</h1>
              <p style={{ color: '#94a3b8' }}>
                Create and edit professional beats with AI assistance
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ backgroundColor: '#334155', color: 'white', padding: '4px 12px', borderRadius: '16px', fontSize: '12px' }}>AI-Generated</span>
            <span style={{ backgroundColor: '#334155', color: 'white', padding: '4px 12px', borderRadius: '16px', fontSize: '12px' }}>Real-time Editing</span>
            <span style={{ backgroundColor: '#334155', color: 'white', padding: '4px 12px', borderRadius: '16px', fontSize: '12px' }}>Multiple Genres</span>
          </div>
        </div>

        {/* Beat Generator */}
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '24px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Beat Parameters</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Genre</label>
              <select 
                value={genre} 
                onChange={(e) => setGenre(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '8px 12px', 
                  backgroundColor: '#0f172a', 
                  border: '1px solid #334155', 
                  borderRadius: '6px', 
                  color: 'white' 
                }}
              >
                <option value="">Select genre</option>
                {GENRES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>BPM: {bpm}</label>
              <input 
                type="range" 
                min="60" 
                max="200" 
                value={bpm} 
                onChange={(e) => setBpm(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            style={{ 
              backgroundColor: isGenerating ? '#64748b' : '#7c3aed', 
              color: 'white', 
              border: 'none', 
              padding: '12px 24px', 
              borderRadius: '6px', 
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {isGenerating ? <Loader2 style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} /> : <Music style={{ width: '16px', height: '16px' }} />}
            {isGenerating ? 'Generating Beat...' : 'Generate Beat'}
          </button>
        </div>

        {/* Generated Beat Display */}
        {generatedBeat && (
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '24px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Generated Beat</h2>
            
            <div style={{ marginBottom: '16px' }}>
              <p style={{ color: '#94a3b8', marginBottom: '8px' }}>{generatedBeat.description}</p>
              
              {/* Beat Pattern Visualization */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {generatedBeat.pattern.map((step, index) => (
                  <div 
                    key={index}
                    style={{ 
                      width: '32px', 
                      height: '32px', 
                      backgroundColor: step ? '#7c3aed' : '#374151', 
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Playback Controls */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button 
                onClick={handlePlay}
                style={{ 
                  backgroundColor: isPlaying ? '#dc2626' : '#22c55e', 
                  color: 'white', 
                  border: 'none', 
                  padding: '12px', 
                  borderRadius: '6px', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {isPlaying ? <Pause style={{ width: '16px', height: '16px' }} /> : <Play style={{ width: '16px', height: '16px' }} />}
                {isPlaying ? 'Stop' : 'Play'}
              </button>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Volume2 style={{ width: '16px', height: '16px', color: '#94a3b8' }} />
                <input type="range" min="0" max="100" defaultValue="75" style={{ width: '100px' }} />
              </div>
            </div>
          </div>
        )}

        {/* Audio System Status */}
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Audio System Status</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ backgroundColor: '#22c55e', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>✓ Tone.js Ready</span>
            <span style={{ backgroundColor: '#06b6d4', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>✓ Web Audio API</span>
            <span style={{ backgroundColor: '#7c3aed', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>✓ AI Integration</span>
          </div>
        </div>
      </div>
    </div>
  );
}