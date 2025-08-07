import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import * as Tone from "tone";

export default function MusicStudio() {
  const [composition, setComposition] = useState("");
  const [key, setKey] = useState("C");
  const [scale, setScale] = useState("major");
  const [provider, setProvider] = useState("grok");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState("piano");
  const [instruments, setInstruments] = useState<any>(null);
  const [currentChord, setCurrentChord] = useState<string[]>([]);

  const generateMusicMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/generate-music", {
        description: composition,
        key,
        scale,
        provider
      });
      return response.json();
    }
  });

  useEffect(() => {
    if (audioStarted && !instruments) {
      const instrumentKit = {
        piano: new Tone.Synth({
          oscillator: { type: "sine" },
          envelope: { attack: 0.1, decay: 0.2, sustain: 0.3, release: 1 }
        }).toDestination(),
        strings: new Tone.Synth({
          oscillator: { type: "sawtooth" },
          envelope: { attack: 0.3, decay: 0.1, sustain: 0.8, release: 2 }
        }).toDestination(),
        brass: new Tone.Synth({
          oscillator: { type: "square" },
          envelope: { attack: 0.1, decay: 0.1, sustain: 0.6, release: 0.8 }
        }).toDestination(),
        bass: new Tone.Synth({
          oscillator: { type: "triangle" },
          envelope: { attack: 0.05, decay: 0.2, sustain: 0.4, release: 1.5 }
        }).toDestination(),
        pad: new Tone.Synth({
          oscillator: { type: "sine" },
          envelope: { attack: 1, decay: 0.5, sustain: 0.7, release: 3 }
        }).toDestination()
      };
      setInstruments(instrumentKit);
    }
  }, [audioStarted, instruments]);

  const startAudio = async () => {
    if (!audioStarted) {
      await Tone.start();
      setAudioStarted(true);
    }
  };

  const playNote = (note: string) => {
    if (!instruments || !audioStarted) return;
    instruments[selectedInstrument].triggerAttackRelease(note, "4n");
  };

  const playChord = (chordNotes: string[]) => {
    if (!instruments || !audioStarted) return;
    setCurrentChord(chordNotes);
    chordNotes.forEach((note, index) => {
      setTimeout(() => {
        instruments[selectedInstrument].triggerAttackRelease(note, "2n");
      }, index * 50); // Slight delay for chord spread
    });
    
    // Clear current chord display after playing
    setTimeout(() => setCurrentChord([]), 2000);
  };

  const getScaleNotes = () => {
    const majorScale = [0, 2, 4, 5, 7, 9, 11]; // Semitone intervals for major scale
    const minorScale = [0, 2, 3, 5, 7, 8, 10]; // Semitone intervals for natural minor
    const intervals = scale === "major" ? majorScale : minorScale;
    
    const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const keyIndex = noteNames.indexOf(key);
    
    return intervals.map(interval => {
      const noteIndex = (keyIndex + interval) % 12;
      return noteNames[noteIndex] + "4";
    });
  };

  const getChords = () => {
    const scaleNotes = getScaleNotes();
    return [
      { name: "I", notes: [scaleNotes[0], scaleNotes[2], scaleNotes[4]] },
      { name: "ii", notes: [scaleNotes[1], scaleNotes[3], scaleNotes[5]] },
      { name: "iii", notes: [scaleNotes[2], scaleNotes[4], scaleNotes[6]] },
      { name: "IV", notes: [scaleNotes[3], scaleNotes[5], scaleNotes[0]] },
      { name: "V", notes: [scaleNotes[4], scaleNotes[6], scaleNotes[1]] },
      { name: "vi", notes: [scaleNotes[5], scaleNotes[0], scaleNotes[2]] },
    ];
  };

  const playMelody = async () => {
    await startAudio();
    if (!instruments) return;

    setIsPlaying(true);
    const scaleNotes = getScaleNotes();
    const melody = [...scaleNotes, scaleNotes[7] || scaleNotes[0] + "5"]; // Add octave note
    
    let noteIndex = 0;
    const playNote = () => {
      if (noteIndex < melody.length && isPlaying) {
        instruments[selectedInstrument].triggerAttackRelease(melody[noteIndex], "4n");
        noteIndex++;
        setTimeout(playNote, 500);
      } else {
        setIsPlaying(false);
      }
    };

    playNote();
  };

  const stopMelody = () => {
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
              <Link href="/music-studio" className="nav-link active">Music Studio</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4">🎼 Music Studio</h1>
          <p style={{ color: '#9CA3AF' }}>Compose full musical arrangements</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Composition Settings */}
          <div className="card">
            <h3 className="font-bold mb-4">Composition Settings</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label">Composition Description</label>
                <textarea
                  className="form-textarea"
                  placeholder="Describe the music you want to create (e.g., 'A peaceful piano melody for relaxation')..."
                  value={composition}
                  onChange={(e) => setComposition(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="form-group">
                  <label className="form-label">Instrument</label>
                  <select 
                    className="form-select" 
                    value={selectedInstrument} 
                    onChange={(e) => setSelectedInstrument(e.target.value)}
                  >
                    <option value="piano">Piano</option>
                    <option value="strings">Strings</option>
                    <option value="brass">Brass</option>
                    <option value="bass">Bass</option>
                    <option value="pad">Pad</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Key</label>
                  <select 
                    className="form-select" 
                    value={key} 
                    onChange={(e) => setKey(e.target.value)}
                  >
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Scale</label>
                  <select 
                    className="form-select" 
                    value={scale} 
                    onChange={(e) => setScale(e.target.value)}
                  >
                    <option value="major">Major</option>
                    <option value="minor">Minor</option>
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

          {/* Virtual Keyboard & Instruments */}
          <div className="card">
            <h3 className="font-bold mb-4">Virtual Keyboard ({selectedInstrument})</h3>
            {!audioStarted ? (
              <div className="text-center">
                <button className="btn btn-primary" onClick={startAudio}>
                  Start Audio System
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Current chord display */}
                {currentChord.length > 0 && (
                  <div className="text-center">
                    <span className="text-sm" style={{ color: '#14B8A6' }}>
                      Playing: {currentChord.join(' - ')}
                    </span>
                  </div>
                )}

                {/* Piano Keys */}
                <div className="flex justify-center space-x-1">
                  {getScaleNotes().map((note, index) => (
                    <button
                      key={note}
                      className="btn btn-secondary"
                      style={{ 
                        minWidth: '40px', 
                        height: '80px',
                        backgroundColor: '#2A2A2A',
                        borderColor: '#14B8A6'
                      }}
                      onClick={() => playNote(note)}
                    >
                      {note.replace('4', '')}
                    </button>
                  ))}
                </div>

                {/* Chord Buttons */}
                <div>
                  <h4 className="font-medium mb-2">Chord Progressions ({key} {scale})</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {getChords().map((chord, index) => (
                      <button
                        key={index}
                        className="btn btn-secondary"
                        onClick={() => playChord(chord.notes)}
                      >
                        {chord.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Demo Controls */}
                <div className="flex justify-center items-center space-x-4">
                  <button 
                    className="play-btn"
                    onClick={isPlaying ? stopMelody : playMelody}
                  >
                    {isPlaying ? "⏹️" : "▶️"}
                  </button>
                  <span className="text-sm" style={{ color: '#9CA3AF' }}>
                    {isPlaying ? "Playing scale..." : "Play scale demo"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Generate Music */}
          <div className="card">
            <h3 className="font-bold mb-4">Generate Composition</h3>
            <div className="text-center">
              <button 
                className="btn btn-primary"
                onClick={() => generateMusicMutation.mutate()}
                disabled={generateMusicMutation.isPending || !composition.trim()}
              >
                {generateMusicMutation.isPending ? "Composing..." : "Generate Music"}
              </button>
            </div>
          </div>

          {/* Generated Music */}
          {generateMusicMutation.data && (
            <div className="card">
              <h3 className="font-bold mb-4">Generated Composition</h3>
              <div className="form-group">
                <label className="form-label">Musical Notes</label>
                <textarea
                  className="form-textarea"
                  value={generateMusicMutation.data.notation || ""}
                  readOnly
                  style={{ fontFamily: 'monospace' }}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  value={generateMusicMutation.data.description || ""}
                  readOnly
                />
              </div>
              <div className="text-center">
                <button className="btn btn-secondary">
                  Export MIDI
                </button>
              </div>
            </div>
          )}

          {generateMusicMutation.error && (
            <div className="card" style={{ borderColor: '#EF4444' }}>
              <h3 className="font-bold mb-2" style={{ color: '#EF4444' }}>Error</h3>
              <p style={{ color: '#9CA3AF' }}>Failed to generate music. Please try again.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}