import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import * as Tone from "tone";

export default function BeatStudio() {
  const [genre, setGenre] = useState("hip-hop");
  const [tempo, setTempo] = useState("120");
  const [provider, setProvider] = useState("grok");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  
  // Sequencer state
  const [sequence, setSequence] = useState({
    kick: Array(16).fill(false),
    snare: Array(16).fill(false),
    hihat: Array(16).fill(false),
    openhat: Array(16).fill(false)
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [sequencerPlaying, setSequencerPlaying] = useState(false);

  const generateBeatMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/generate-beat", {
        genre,
        tempo: parseInt(tempo),
        provider
      });
      return response.json();
    }
  });

  // Initialize drum sounds
  const [drums, setDrums] = useState<any>(null);

  useEffect(() => {
    if (audioStarted && !drums) {
      const drumKit = {
        kick: new Tone.MembraneSynth().toDestination(),
        snare: new Tone.NoiseSynth({
          noise: { type: "white" },
          envelope: { attack: 0.001, decay: 0.2, sustain: 0 }
        }).toDestination(),
        hihat: new Tone.MetalSynth({
          frequency: 200,
          envelope: { attack: 0.001, decay: 0.1, release: 0.01 },
          harmonicity: 5.1,
          modulationIndex: 32,
          resonance: 4000,
          octaves: 1.5
        }).toDestination(),
        openhat: new Tone.MetalSynth({
          frequency: 400,
          envelope: { attack: 0.001, decay: 0.3, release: 0.1 },
          harmonicity: 3.1,
          modulationIndex: 16,
          resonance: 2000,
          octaves: 1
        }).toDestination()
      };
      setDrums(drumKit);
    }
  }, [audioStarted, drums]);

  const startAudio = async () => {
    if (!audioStarted) {
      await Tone.start();
      setAudioStarted(true);
    }
  };

  const toggleStep = (instrument: keyof typeof sequence, step: number) => {
    setSequence(prev => ({
      ...prev,
      [instrument]: prev[instrument].map((active, index) => 
        index === step ? !active : active
      )
    }));
  };

  const playSequencer = async () => {
    await startAudio();
    if (!drums) return;

    setSequencerPlaying(true);
    Tone.Transport.bpm.value = parseInt(tempo);
    
    let stepIndex = 0;
    
    const sequencerLoop = new Tone.Sequence((time) => {
      // Update current step for visual feedback
      setCurrentStep(stepIndex);
      
      // Play sounds for active steps
      const instrumentKeys = Object.keys(sequence) as (keyof typeof sequence)[];
      instrumentKeys.forEach(instrument => {
        if (sequence[instrument][stepIndex]) {
          if (instrument === 'kick') {
            drums.kick.triggerAttackRelease("C1", "8n", time);
          } else if (instrument === 'snare') {
            drums.snare.triggerAttackRelease("4n", time);
          } else if (instrument === 'hihat') {
            drums.hihat.triggerAttackRelease("C5", "32n", time);
          } else if (instrument === 'openhat') {
            drums.openhat.triggerAttackRelease("C5", "16n", time);
          }
        }
      });
      
      stepIndex = (stepIndex + 1) % 16;
    }, Array(16).fill(0).map((_, i) => i), "16n");

    sequencerLoop.start(0);
    Tone.Transport.start();
  };

  const stopSequencer = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    setSequencerPlaying(false);
    setCurrentStep(0);
  };

  const clearSequence = () => {
    setSequence({
      kick: Array(16).fill(false),
      snare: Array(16).fill(false),
      hihat: Array(16).fill(false),
      openhat: Array(16).fill(false)
    });
  };

  const playDrumSound = (instrument: keyof typeof sequence) => {
    if (!drums || !audioStarted) return;
    
    if (instrument === 'kick') {
      drums.kick.triggerAttackRelease("C1", "8n");
    } else if (instrument === 'snare') {
      drums.snare.triggerAttackRelease("4n");
    } else if (instrument === 'hihat') {
      drums.hihat.triggerAttackRelease("C5", "32n");
    } else if (instrument === 'openhat') {
      drums.openhat.triggerAttackRelease("C5", "16n");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav>
        <div className="container">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold" style={{ color: '#14B8A6' }}>CodedSwitch</Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="nav-link">Dashboard</Link>
              <Link href="/beat-studio" className="nav-link active">Beat Studio</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4">🥁 Beat Studio</h1>
          <p style={{ color: '#9CA3AF' }}>Create custom beats and drum patterns</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Beat Settings */}
          <div className="card">
            <h3 className="font-bold mb-4">Beat Configuration</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="form-group">
                <label className="form-label">Genre</label>
                <select 
                  className="form-select" 
                  value={genre} 
                  onChange={(e) => setGenre(e.target.value)}
                >
                  <option value="hip-hop">Hip Hop</option>
                  <option value="trap">Trap</option>
                  <option value="house">House</option>
                  <option value="techno">Techno</option>
                  <option value="rock">Rock</option>
                  <option value="jazz">Jazz</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Tempo (BPM)</label>
                <input
                  type="number"
                  className="form-input"
                  value={tempo}
                  onChange={(e) => setTempo(e.target.value)}
                  min="60"
                  max="200"
                />
              </div>
              <div className="form-group">
                <label className="form-label">AI Provider</label>
                <select 
                  className="form-select" 
                  value={provider} 
                  onChange={(e) => setProvider(e.target.value)}
                >
                  <option value="grok">xAI Grok</option>
                  <option value="gemini">Google Gemini</option>
                </select>
              </div>
            </div>
          </div>

          {/* Drum Sequencer */}
          <div className="card">
            <h3 className="font-bold mb-4">Step Sequencer</h3>
            {!audioStarted ? (
              <div className="text-center">
                <button className="btn btn-primary" onClick={startAudio}>
                  Start Audio System
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Transport Controls */}
                <div className="flex justify-center items-center space-x-4">
                  <button 
                    className="play-btn"
                    onClick={sequencerPlaying ? stopSequencer : playSequencer}
                  >
                    {sequencerPlaying ? "⏹️" : "▶️"}
                  </button>
                  <span className="text-sm" style={{ color: '#9CA3AF' }}>
                    {sequencerPlaying ? `Playing Step ${currentStep + 1}` : "Ready to play"}
                  </span>
                  <button className="btn btn-secondary" onClick={clearSequence}>
                    Clear
                  </button>
                </div>

                {/* Sequencer Grid */}
                <div className="space-y-3">
                  {(Object.keys(sequence) as (keyof typeof sequence)[]).map(instrument => (
                    <div key={instrument} className="flex items-center space-x-2">
                      <button
                        className="btn btn-secondary"
                        style={{ minWidth: '80px' }}
                        onClick={() => playDrumSound(instrument)}
                      >
                        {instrument.charAt(0).toUpperCase() + instrument.slice(1)}
                      </button>
                      <div className="flex space-x-1">
                        {sequence[instrument].map((active, stepIndex) => (
                          <button
                            key={stepIndex}
                            className="w-8 h-8 rounded border"
                            style={{
                              backgroundColor: active ? '#14B8A6' : 
                                             currentStep === stepIndex && sequencerPlaying ? '#3B82F6' : 
                                             '#2A2A2A',
                              borderColor: '#444'
                            }}
                            onClick={() => toggleStep(instrument, stepIndex)}
                          >
                            {stepIndex + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pattern Controls */}
                <div className="flex justify-center space-x-4">
                  <button 
                    className="btn btn-secondary"
                    onClick={() => {
                      // Load a basic hip-hop pattern
                      setSequence({
                        kick: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
                        snare: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
                        hihat: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
                        openhat: [false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true]
                      });
                    }}
                  >
                    Load Hip-Hop Pattern
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => {
                      // Load a house pattern
                      setSequence({
                        kick: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
                        snare: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
                        hihat: [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true],
                        openhat: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false]
                      });
                    }}
                  >
                    Load House Pattern
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Generate Beat */}
          <div className="card">
            <h3 className="font-bold mb-4">Generate Custom Beat</h3>
            <div className="text-center">
              <button 
                className="btn btn-primary"
                onClick={() => generateBeatMutation.mutate()}
                disabled={generateBeatMutation.isPending}
              >
                {generateBeatMutation.isPending ? "Generating..." : "Generate Beat Pattern"}
              </button>
            </div>
          </div>

          {/* Generated Beat Output */}
          {generateBeatMutation.data && (
            <div className="card">
              <h3 className="font-bold mb-4">Generated Beat Pattern</h3>
              <div className="form-group">
                <textarea
                  className="form-textarea"
                  value={generateBeatMutation.data.pattern || ""}
                  readOnly
                  style={{ fontFamily: 'monospace' }}
                />
              </div>
              <div className="text-center">
                <button className="btn btn-secondary">
                  Export Pattern
                </button>
              </div>
            </div>
          )}

          {generateBeatMutation.error && (
            <div className="card" style={{ borderColor: '#EF4444' }}>
              <h3 className="font-bold mb-2" style={{ color: '#EF4444' }}>Error</h3>
              <p style={{ color: '#9CA3AF' }}>Failed to generate beat. Please try again.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}