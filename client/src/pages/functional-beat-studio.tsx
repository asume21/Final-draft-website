import { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';

export default function FunctionalBeatStudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [genre, setGenre] = useState('Hip-Hop');
  const [pattern, setPattern] = useState<boolean[]>(new Array(16).fill(false));
  const [currentStep, setCurrentStep] = useState(0);
  const [audioStarted, setAudioStarted] = useState(false);
  
  const sequencerRef = useRef<Tone.Sequence | null>(null);
  const kickRef = useRef<Tone.MembraneSynth | null>(null);
  const snareRef = useRef<Tone.NoiseSynth | null>(null);
  const hihatRef = useRef<Tone.MetalSynth | null>(null);

  useEffect(() => {
    const initAudio = async () => {
      if (Tone.context.state !== 'running') {
        await Tone.start();
      }

      kickRef.current = new Tone.MembraneSynth().toDestination();
      snareRef.current = new Tone.NoiseSynth({ 
        noise: { type: 'white' },
        envelope: { attack: 0.005, decay: 0.1, sustain: 0 }
      }).toDestination();
      hihatRef.current = new Tone.MetalSynth({ 
        volume: -20,
        envelope: { attack: 0.001, decay: 0.05, sustain: 0 }
      }).toDestination();

      Tone.Transport.bpm.value = bpm;

      // Set default pattern
      const defaultPattern = new Array(16).fill(false);
      defaultPattern[0] = true;
      defaultPattern[4] = true;
      defaultPattern[8] = true;
      defaultPattern[12] = true;
      setPattern(defaultPattern);
    };

    initAudio();

    return () => {
      if (sequencerRef.current) {
        sequencerRef.current.dispose();
      }
      kickRef.current?.dispose();
      snareRef.current?.dispose();
      hihatRef.current?.dispose();
    };
  }, []);

  const toggleStep = (step: number) => {
    setPattern(prev => prev.map((active, i) => i === step ? !active : active));
  };

  const startAudio = async () => {
    try {
      await Tone.start();
      setAudioStarted(true);
      console.log('Audio context started successfully');
    } catch (error) {
      console.error('Failed to start audio:', error);
      alert('Failed to start audio. Please try again.');
    }
  };

  const playBeat = async () => {
    if (!audioStarted || Tone.context.state !== 'running') {
      await startAudio();
    }

    if (isPlaying) {
      Tone.Transport.stop();
      if (sequencerRef.current) {
        sequencerRef.current.stop();
      }
      setIsPlaying(false);
      setCurrentStep(0);
      return;
    }

    sequencerRef.current = new Tone.Sequence((time, step) => {
      setCurrentStep(step);
      
      if (pattern[step] && kickRef.current) {
        kickRef.current.triggerAttackRelease('C1', '8n', time);
      }
      
      // Add snare on off-beats for more rhythm
      if ((step === 4 || step === 12) && snareRef.current) {
        snareRef.current.triggerAttackRelease('8n', time);
      }
      
      // Add hi-hat on every other step
      if (step % 2 === 1 && hihatRef.current) {
        hihatRef.current.triggerAttackRelease('32n', time);
      }
    }, Array.from({ length: 16 }, (_, i) => i), '16n');

    sequencerRef.current.start(0);
    Tone.Transport.start();
    setIsPlaying(true);
  };

  const randomizeBeat = () => {
    const newPattern = new Array(16).fill(false);
    for (let i = 0; i < 16; i++) {
      newPattern[i] = Math.random() > 0.6;
    }
    setPattern(newPattern);
  };

  const clearBeat = () => {
    setPattern(new Array(16).fill(false));
  };

  const [isGenerating, setIsGenerating] = useState(false);

  const generateAIBeat = async () => {
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate-beat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          genre: genre,
          bpm: bpm,
          provider: 'grok'
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.pattern) {
          setPattern(data.pattern);
        } else {
          // Fallback to genre-specific patterns
          generateFallbackPattern();
        }
      } else {
        generateFallbackPattern();
      }
    } catch (error) {
      console.error('AI beat generation failed:', error);
      generateFallbackPattern();
    }
    
    setIsGenerating(false);
  };

  const generateFallbackPattern = () => {
    let newPattern = new Array(16).fill(false);
    
    switch (genre) {
      case 'Hip-Hop':
        newPattern = [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false];
        break;
      case 'Electronic':
        newPattern = [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false];
        break;
      case 'Rock':
        newPattern = [true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true];
        break;
      case 'Pop':
        newPattern = [true, false, false, false, true, false, true, false, true, false, false, false, true, false, true, false];
        break;
      default:
        newPattern = [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false];
    }
    
    setPattern(newPattern);
  };

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--brand-dark)', color: 'var(--brand-text)', paddingTop: '80px', padding: '32px', overflowX: 'auto' }}>
      <h1 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '16px', background: 'linear-gradient(135deg, var(--accent-teal-bright), var(--accent-blue))', WebkitBackgroundClip: 'text', color: 'transparent' }}>
        Beat Studio - FULLY FUNCTIONAL
      </h1>

      {/* Start Audio Button */}
      {!audioStarted && (
        <div style={{ backgroundColor: '#ef4444', border: '2px solid #dc2626', padding: '20px', borderRadius: '8px', marginBottom: '24px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '12px', color: 'white' }}>🔊 Audio System Not Started</h3>
          <p style={{ marginBottom: '16px', color: '#fecaca' }}>Click "Start Audio" to enable sound playback</p>
          <button 
            onClick={startAudio}
            style={{ 
              backgroundColor: 'rgba(75, 85, 99, 0.4)',
              border: '1px solid rgba(75, 85, 99, 0.3)', 
              color: 'white', 
              padding: '16px 32px', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontSize: '18px',
              fontWeight: 'bold'
            }}
          >
            🎵 Start Audio
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '32px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '24px', borderRadius: '8px', overflowX: 'auto', minWidth: '600px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Beat Pattern</h3>
          
          {/* Step indicators */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            {Array.from({ length: 16 }).map((_, i) => (
              <div 
                key={i}
                style={{ 
                  width: '32px', 
                  height: '20px',
                  margin: '0 2px',
                  backgroundColor: currentStep === i ? '#06b6d4' : '#374151', 
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: 'white'
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Pattern grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(16, 1fr)', gap: '4px', marginBottom: '24px' }}>
            {pattern.map((active, i) => (
              <button 
                key={i}
                onClick={() => toggleStep(i)}
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  backgroundColor: active ? '#06b6d4' : '#374151', 
                  border: currentStep === i ? '2px solid #22c55e' : '1px solid #4b5563',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: 'white',
                  transition: 'all 0.1s'
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = '#4b5563';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = '#374151';
                  }
                }}
              >
                {active ? '●' : '○'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={playBeat}
              style={{ 
                backgroundColor: isPlaying ? 'rgba(107, 114, 128, 0.6)' : 'rgba(75, 85, 99, 0.4)',
                border: isPlaying ? '1px solid rgba(107, 114, 128, 0.4)' : '1px solid rgba(75, 85, 99, 0.3)', 
                color: 'white', 
                padding: '12px 20px', 
                borderRadius: '6px', 
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              {isPlaying ? '⏸️ Pause' : '▶️ Play Beat'}
            </button>
            <button 
              onClick={randomizeBeat}
              style={{ 
                backgroundColor: 'rgba(107, 114, 128, 0.4)',
                border: '1px solid rgba(107, 114, 128, 0.3)', 
                color: 'white', 
                padding: '12px 20px', 
                borderRadius: '6px', 
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              🎲 Randomize
            </button>
            <button 
              onClick={clearBeat}
              style={{ 
                backgroundColor: '#6b7280', 
                color: 'white', 
                padding: '12px 20px', 
                border: 'none', 
                borderRadius: '6px', 
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '24px', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Settings</h3>
          
          <div style={{ marginBottom: '20px' }}>
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
              <option value="Electronic">Electronic</option>
              <option value="Rock">Rock</option>
              <option value="Pop">Pop</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
              BPM: {bpm}
            </label>
            <input 
              type="range" 
              min="60" 
              max="200" 
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              style={{ width: '100%' }} 
            />
          </div>

          <button 
            onClick={generateAIBeat}
            disabled={isGenerating}
            style={{ 
              backgroundColor: isGenerating ? 'rgba(107, 114, 128, 0.4)' : 'rgba(75, 85, 99, 0.4)',
              border: isGenerating ? '1px solid rgba(107, 114, 128, 0.3)' : '1px solid rgba(75, 85, 99, 0.3)', 
              color: 'white', 
              padding: '12px 20px', 
              borderRadius: '6px', 
              cursor: isGenerating ? 'not-allowed' : 'pointer', 
              width: '100%',
              marginBottom: '16px',
              fontSize: '16px'
            }}
          >
            {isGenerating ? '🤖 Generating...' : '🤖 Generate AI Beat'}
          </button>

          <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '4px', fontSize: '12px', color: '#94a3b8' }}>
            <div>Status: {isPlaying ? 'Playing' : 'Stopped'}</div>
            <div>Step: {currentStep + 1}/16</div>
            <div>Genre: {genre}</div>
            <div>BPM: {bpm}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <a href="/dashboard" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: 'white', padding: '12px 20px', borderRadius: '6px', textDecoration: 'none' }}>← Dashboard</a>
        <a href="/lyric-lab" style={{ backgroundColor: '#ec4899', color: 'white', padding: '12px 20px', borderRadius: '6px', textDecoration: 'none' }}>Lyric Lab →</a>
      </div>
    </div>
  );
}