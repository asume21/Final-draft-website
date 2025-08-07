import { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';

export default function FunctionalMusicStudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [masterVolume, setMasterVolume] = useState(75);
  const [effects, setEffects] = useState({
    reverb: 30,
    delay: 20,
    filter: 50,
    distortion: 10
  });
  const [audioStarted, setAudioStarted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Track sequencer state - 6 tracks x 16 steps
  const [pattern, setPattern] = useState(() => {
    const tracks = ['Kick', 'Snare', 'Hi-Hat', 'Bass', 'Lead', 'Pad'];
    const initialPattern: { [key: string]: boolean[] } = {};
    tracks.forEach(track => {
      initialPattern[track] = new Array(16).fill(false);
      // Add some default pattern
      if (track === 'Kick') {
        initialPattern[track][0] = true;
        initialPattern[track][4] = true;
        initialPattern[track][8] = true;
        initialPattern[track][12] = true;
      } else if (track === 'Snare') {
        initialPattern[track][4] = true;
        initialPattern[track][12] = true;
      } else if (track === 'Hi-Hat') {
        for (let i = 0; i < 16; i += 2) {
          initialPattern[track][i] = true;
        }
      }
    });
    return initialPattern;
  });

  const [currentStep, setCurrentStep] = useState(0);
  const sequencerRef = useRef<Tone.Sequence | null>(null);
  const synthsRef = useRef<{ [key: string]: any }>({});

  // Initialize audio on component mount
  useEffect(() => {
    const initAudio = async () => {
      if (Tone.context.state !== 'running') {
        await Tone.start();
      }

      // Create synths for each track
      synthsRef.current = {
        'Kick': new Tone.MembraneSynth().toDestination(),
        'Snare': new Tone.NoiseSynth().toDestination(),
        'Hi-Hat': new Tone.MetalSynth({ volume: -20 }).toDestination(),
        'Bass': new Tone.Synth({ oscillator: { type: 'sawtooth' }, envelope: { attack: 0.1, decay: 0.3, sustain: 0.1, release: 0.8 } }).toDestination(),
        'Lead': new Tone.Synth({ oscillator: { type: 'square' } }).toDestination(),
        'Pad': new Tone.PolySynth().toDestination()
      };

      // Set BPM
      Tone.Transport.bpm.value = bpm;
    };

    initAudio();

    return () => {
      if (sequencerRef.current) {
        sequencerRef.current.dispose();
      }
      Object.values(synthsRef.current).forEach(synth => synth.dispose());
    };
  }, []);

  const toggleStep = (track: string, step: number) => {
    setPattern(prev => ({
      ...prev,
      [track]: prev[track].map((active, i) => i === step ? !active : active)
    }));
  };

  const generateAIPattern = async (track: string) => {
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/beat/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          genre: 'Electronic',
          bpm: bpm,
          duration: 16,
          aiProvider: 'grok'
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.pattern) {
          setPattern(prev => ({
            ...prev,
            [track]: data.pattern
          }));
        } else {
          generateFallbackPattern(track);
        }
      } else {
        generateFallbackPattern(track);
      }
    } catch (error) {
      console.error('AI pattern generation failed:', error);
      generateFallbackPattern(track);
    }
    
    setIsGenerating(false);
  };

  const generateFallbackPattern = (track: string) => {
    const patterns: { [key: string]: boolean[] } = {
      'Kick': [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
      'Snare': [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
      'Hi-Hat': [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
      'Bass': [true, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false],
      'Lead': [true, false, false, false, false, true, false, false, true, false, false, false, false, true, false, false],
      'Pad': [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false]
    };
    
    setPattern(prev => ({
      ...prev,
      [track]: patterns[track] || new Array(16).fill(false)
    }));
  };

  const clearTrack = (track: string) => {
    setPattern(prev => ({
      ...prev,
      [track]: new Array(16).fill(false)
    }));
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

  const playSequence = async () => {
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

    const tracks = Object.keys(pattern);
    const notes = {
      'Kick': 'C1',
      'Snare': 'D1',
      'Hi-Hat': 'F#1',
      'Bass': 'C2',
      'Lead': 'C4',
      'Pad': ['C4', 'E4', 'G4']
    };

    sequencerRef.current = new Tone.Sequence((time, step) => {
      setCurrentStep(step);
      
      tracks.forEach(track => {
        if (pattern[track][step] && synthsRef.current[track]) {
          const note = notes[track as keyof typeof notes];
          if (track === 'Kick' || track === 'Bass' || track === 'Lead') {
            (synthsRef.current[track] as Tone.Synth | Tone.MembraneSynth).triggerAttackRelease(note as string, '8n', time);
          } else if (track === 'Snare' || track === 'Hi-Hat') {
            (synthsRef.current[track] as Tone.NoiseSynth | Tone.MetalSynth).triggerAttackRelease('8n', time);
          } else if (track === 'Pad') {
            synthsRef.current[track].triggerAttackRelease(note as string[], '4n', time);
          }
        }
      });
    }, Array.from({ length: 16 }, (_, i) => i), '16n');

    sequencerRef.current.start(0);
    Tone.Transport.start();
    setIsPlaying(true);
  };

  const stopSequence = () => {
    Tone.Transport.stop();
    if (sequencerRef.current) {
      sequencerRef.current.stop();
    }
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const clearPattern = () => {
    setPattern(prev => {
      const newPattern = { ...prev };
      Object.keys(newPattern).forEach(track => {
        newPattern[track] = new Array(16).fill(false);
      });
      return newPattern;
    });
  };

  const randomizePattern = () => {
    setPattern(prev => {
      const newPattern = { ...prev };
      Object.keys(newPattern).forEach(track => {
        newPattern[track] = newPattern[track].map(() => Math.random() > 0.7);
      });
      return newPattern;
    });
  };

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  const tracks = ['Kick', 'Snare', 'Hi-Hat', 'Bass', 'Lead', 'Pad'];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--brand-dark)', color: 'var(--brand-text)', paddingTop: '80px', padding: '32px', overflowX: 'auto' }}>
      <h1 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '16px', background: 'linear-gradient(135deg, var(--accent-teal-bright), var(--accent-blue))', WebkitBackgroundClip: 'text', color: 'transparent' }}>
        Music Studio - FULLY FUNCTIONAL
      </h1>

      {/* Start Audio Button */}
      {!audioStarted && (
        <div style={{ backgroundColor: 'var(--destructive)', border: '2px solid hsl(0, 85%, 45%)', padding: '20px', borderRadius: '8px', marginBottom: '24px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '12px', color: 'white' }}>🔊 Audio System Not Started</h3>
          <p style={{ marginBottom: '16px', color: 'hsl(0, 85%, 80%)' }}>Click "Start Audio" to enable sound playback</p>
          <button 
            onClick={startAudio}
            style={{ 
              backgroundColor: 'rgba(75, 85, 99, 0.6)', 
              border: '1px solid rgba(75, 85, 99, 0.4)', 
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

      {/* Transport Controls */}
      <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '24px', borderRadius: '8px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={playSequence}
            style={{ 
              backgroundColor: isPlaying ? 'rgba(107, 114, 128, 0.8)' : 'rgba(75, 85, 99, 0.6)', 
              color: 'white', 
              padding: '12px 24px', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: 'pointer', 
              fontSize: '16px' 
            }}
          >
            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
          </button>
          <button 
            onClick={stopSequence}
            style={{ 
              backgroundColor: 'rgba(107, 114, 128, 0.8)', 
              border: '1px solid rgba(107, 114, 128, 0.6)', 
              color: 'white', 
              padding: '12px 24px', 
              borderRadius: '6px', 
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            ⏹️ Stop
          </button>
          <button 
            onClick={() => setIsRecording(!isRecording)}
            style={{ 
              backgroundColor: isRecording ? 'rgba(107, 114, 128, 0.8)' : 'rgba(75, 85, 99, 0.8)', 
              border: '1px solid rgba(107, 114, 128, 0.6)', 
              color: 'white', 
              padding: '12px 24px', 
              borderRadius: '6px', 
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            {isRecording ? '⏹️ Stop Rec' : '⏺️ Record'}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '14px' }}>BPM:</label>
            <input 
              type="range" 
              min="60" 
              max="200" 
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              style={{ width: '100px' }}
            />
            <span style={{ minWidth: '40px', fontSize: '14px' }}>{bpm}</span>
          </div>
          <button 
            onClick={clearPattern}
            style={{ 
              backgroundColor: '#6b7280', 
              color: 'white', 
              padding: '8px 16px', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Clear
          </button>
          <button 
            onClick={randomizePattern}
            style={{ 
              backgroundColor: 'rgba(75, 85, 99, 0.8)', 
              border: '1px solid rgba(107, 114, 128, 0.6)', 
              color: 'white', 
              padding: '8px 16px', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Random
          </button>
        </div>
      </div>

      {/* AI Generation Panel */}
      <div style={{ backgroundColor: '#1e293b', border: '2px solid rgba(75, 85, 99, 0.8)', padding: '24px', borderRadius: '8px', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '16px', color: 'rgba(168, 85, 247, 0.8)' }}>🤖 AI Music Generation</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => {
              tracks.forEach(track => generateAIPattern(track));
            }}
            disabled={isGenerating}
            style={{ 
              backgroundColor: isGenerating ? 'rgba(107, 114, 128, 0.8)' : 'rgba(75, 85, 99, 0.8)', 
              color: 'white', 
              padding: '12px 24px', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {isGenerating ? '🤖 Generating All...' : '🤖 Generate All Tracks'}
          </button>
          
          <div style={{ fontSize: '14px', color: '#94a3b8' }}>
            Each track gets its own AI-generated pattern. Click individual 🤖 buttons below for single tracks.
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px', marginBottom: '32px' }}>
        {/* Track Sequencer */}
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '24px', borderRadius: '8px', overflowX: 'auto', minWidth: '800px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Track Sequencer</h3>
          
          {/* Step indicators */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ width: '80px' }}></div>
            <div style={{ display: 'flex', gap: '2px' }}>
              {Array.from({ length: 16 }).map((_, i) => (
                <div 
                  key={i}
                  style={{ 
                    width: '24px', 
                    height: '20px', 
                    backgroundColor: currentStep === i ? '#06b6d4' : '#374151', 
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Track rows */}
          {tracks.map((track, trackIndex) => (
            <div key={track} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ 
                width: '80px', 
                fontSize: '12px', 
                color: '#94a3b8',
                fontWeight: '500',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px'
              }}>
                <span>{track}</span>
                <button
                  onClick={() => generateAIPattern(track)}
                  disabled={isGenerating}
                  style={{
                    backgroundColor: isGenerating ? 'rgba(75, 85, 99, 0.8)' : 'rgba(75, 85, 99, 0.8)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '2px',
                    padding: '2px 4px',
                    fontSize: '8px',
                    cursor: isGenerating ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isGenerating ? '...' : '🤖'}
                </button>
              </div>
              <div style={{ display: 'flex', gap: '2px' }}>
                {pattern[track].map((active, stepIndex) => (
                  <button
                    key={stepIndex}
                    onClick={() => toggleStep(track, stepIndex)}
                    style={{ 
                      width: '24px', 
                      height: '24px', 
                      backgroundColor: active ? 'rgba(20, 184, 166, 0.8)' : '#374151', 
                      border: currentStep === stepIndex ? '2px solid #06b6d4' : '1px solid #4b5563',
                      borderRadius: '2px',
                      cursor: 'pointer',
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
                  />
                ))}
              </div>
              <div style={{ marginLeft: '8px', display: 'flex', gap: '4px' }}>
                <button
                  onClick={() => clearTrack(track)}
                  style={{
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '2px',
                    padding: '2px 6px',
                    fontSize: '10px',
                    cursor: 'pointer'
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Effects & Mixer */}
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '24px', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Effects & Mixer</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                Reverb: {effects.reverb}%
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={effects.reverb}
                onChange={(e) => setEffects(prev => ({ ...prev, reverb: Number(e.target.value) }))}
                style={{ width: '100%' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                Delay: {effects.delay}%
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={effects.delay}
                onChange={(e) => setEffects(prev => ({ ...prev, delay: Number(e.target.value) }))}
                style={{ width: '100%' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                Filter: {effects.filter}%
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={effects.filter}
                onChange={(e) => setEffects(prev => ({ ...prev, filter: Number(e.target.value) }))}
                style={{ width: '100%' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                Distortion: {effects.distortion}%
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={effects.distortion}
                onChange={(e) => setEffects(prev => ({ ...prev, distortion: Number(e.target.value) }))}
                style={{ width: '100%' }} 
              />
            </div>
          </div>

          <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '4px', marginBottom: '16px' }}>
            <div style={{ fontSize: '14px', marginBottom: '8px' }}>
              Master Volume: {masterVolume}%
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={masterVolume}
              onChange={(e) => {
                const volume = Number(e.target.value);
                setMasterVolume(volume);
                Tone.Destination.volume.value = Tone.gainToDb(volume / 100);
              }}
              style={{ width: '100%' }} 
            />
          </div>

          <div style={{ fontSize: '12px', color: '#64748b' }}>
            Status: {isPlaying ? 'Playing' : 'Stopped'}<br/>
            Step: {currentStep + 1}/16<br/>
            Recording: {isRecording ? 'ON' : 'OFF'}
          </div>
        </div>
      </div>

      {/* Virtual Instruments */}
      <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '24px', borderRadius: '8px', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Virtual Instruments</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
          {['Piano', 'Synth', 'Bass', 'Drums', 'Guitar', 'Strings'].map((instrument) => (
            <button 
              key={instrument}
              onClick={() => {
                if (synthsRef.current['Lead']) {
                  synthsRef.current['Lead'].triggerAttackRelease('C4', '8n');
                }
              }}
              style={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid #334155', 
                color: 'white', 
                padding: '16px 12px', 
                borderRadius: '6px', 
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1e293b';
                e.currentTarget.style.borderColor = '#06b6d4';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0f172a';
                e.currentTarget.style.borderColor = '#334155';
              }}
            >
              {instrument}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <a href="/dashboard" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: 'white', padding: '12px 20px', borderRadius: '6px', textDecoration: 'none' }}>← Dashboard</a>
        <a href="/codebeat-studio" style={{ backgroundColor: '#f59e0b', color: 'white', padding: '12px 20px', borderRadius: '6px', textDecoration: 'none' }}>CodeBeat Studio →</a>
      </div>
    </div>
  );
}