import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import * as Tone from "tone";

export default function CodeBeatStudio() {
  const [sourceCode, setSourceCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [beatStyle, setBeatStyle] = useState("electronic");
  const [provider, setProvider] = useState("grok");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);

  const generateCodeBeatMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/generate-codebeat", {
        code: sourceCode,
        language,
        beatStyle,
        provider
      });
      return response.json();
    }
  });

  const startAudio = async () => {
    if (!audioStarted) {
      await Tone.start();
      setAudioStarted(true);
    }
  };

  const playCodeBeat = async () => {
    await startAudio();
    
    // Create synthesizers for different code elements
    const functionSynth = new Tone.Synth({
      oscillator: { type: "square" },
      envelope: { attack: 0.1, decay: 0.1, sustain: 0.1, release: 0.1 }
    }).toDestination();
    
    const variableSynth = new Tone.Synth({
      oscillator: { type: "sine" },
      envelope: { attack: 0.05, decay: 0.2, sustain: 0, release: 0.1 }
    }).toDestination();

    setIsPlaying(true);

    // Simple pattern based on code structure
    const pattern = ["C4", "E4", "G4", "C5", "G4", "E4"];
    let noteIndex = 0;

    const playPattern = () => {
      if (noteIndex < pattern.length && isPlaying) {
        if (noteIndex % 2 === 0) {
          functionSynth.triggerAttackRelease(pattern[noteIndex], "8n");
        } else {
          variableSynth.triggerAttackRelease(pattern[noteIndex], "16n");
        }
        noteIndex++;
        setTimeout(playPattern, 300);
      } else {
        setIsPlaying(false);
      }
    };

    playPattern();
  };

  const stopCodeBeat = () => {
    setIsPlaying(false);
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
              <Link href="/codebeat-studio" className="nav-link active">CodeBeat Studio</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4">💻 CodeBeat Studio</h1>
          <p style={{ color: '#9CA3AF' }}>Turn code patterns into musical beats</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Code Input Settings */}
          <div className="card">
            <h3 className="font-bold mb-4">Code to Beat Settings</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label">Source Code</label>
                <textarea
                  className="form-textarea"
                  style={{ minHeight: '200px', fontFamily: 'monospace' }}
                  placeholder="Paste your code here to convert into a beat pattern..."
                  value={sourceCode}
                  onChange={(e) => setSourceCode(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="form-group">
                  <label className="form-label">Language</label>
                  <select 
                    className="form-select" 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                    <option value="rust">Rust</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Beat Style</label>
                  <select 
                    className="form-select" 
                    value={beatStyle} 
                    onChange={(e) => setBeatStyle(e.target.value)}
                  >
                    <option value="electronic">Electronic</option>
                    <option value="ambient">Ambient</option>
                    <option value="glitch">Glitch</option>
                    <option value="techno">Techno</option>
                    <option value="minimal">Minimal</option>
                  </select>
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
          </div>

          {/* Audio Controls */}
          <div className="card text-center">
            <h3 className="font-bold mb-4">Audio Controls</h3>
            <div className="audio-controls justify-center">
              {!audioStarted ? (
                <button className="btn btn-primary" onClick={startAudio}>
                  Start Audio System
                </button>
              ) : (
                <>
                  <button 
                    className="play-btn"
                    onClick={isPlaying ? stopCodeBeat : playCodeBeat}
                  >
                    {isPlaying ? "⏹️" : "▶️"}
                  </button>
                  <span>{isPlaying ? "Playing code beat..." : "Click to play demo code beat"}</span>
                </>
              )}
            </div>
          </div>

          {/* Generate CodeBeat */}
          <div className="card">
            <h3 className="font-bold mb-4">Generate CodeBeat</h3>
            <div className="text-center">
              <button 
                className="btn btn-primary"
                onClick={() => generateCodeBeatMutation.mutate()}
                disabled={generateCodeBeatMutation.isPending || !sourceCode.trim()}
              >
                {generateCodeBeatMutation.isPending ? "Analyzing..." : "Convert Code to Beat"}
              </button>
            </div>
          </div>

          {/* Generated CodeBeat */}
          {generateCodeBeatMutation.data && (
            <div className="card">
              <h3 className="font-bold mb-4">Generated CodeBeat</h3>
              <div className="form-group">
                <label className="form-label">Beat Pattern</label>
                <textarea
                  className="form-textarea"
                  value={generateCodeBeatMutation.data.pattern || ""}
                  readOnly
                  style={{ fontFamily: 'monospace' }}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Analysis</label>
                <textarea
                  className="form-textarea"
                  value={generateCodeBeatMutation.data.analysis || ""}
                  readOnly
                />
              </div>
              <div className="text-center space-x-4">
                <button className="btn btn-secondary">
                  Export Beat
                </button>
                <button className="btn btn-secondary">
                  Save Pattern
                </button>
              </div>
            </div>
          )}

          {generateCodeBeatMutation.error && (
            <div className="card" style={{ borderColor: '#EF4444' }}>
              <h3 className="font-bold mb-2" style={{ color: '#EF4444' }}>Error</h3>
              <p style={{ color: '#9CA3AF' }}>Failed to generate code beat. Please try again.</p>
            </div>
          )}

          {/* Code Pattern Legend */}
          <div className="card">
            <h3 className="font-bold mb-4">Code-to-Beat Mapping</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Code Elements</h4>
                <ul style={{ color: '#9CA3AF' }}>
                  <li>• Functions → Bass notes</li>
                  <li>• Variables → Mid tones</li>
                  <li>• Loops → Repeated patterns</li>
                  <li>• Conditionals → Rhythm breaks</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Beat Elements</h4>
                <ul style={{ color: '#9CA3AF' }}>
                  <li>• Indentation → Volume</li>
                  <li>• Line length → Note duration</li>
                  <li>• Comments → Silence/Rest</li>
                  <li>• Brackets → Accents</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}