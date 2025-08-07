import { useState } from "react";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function LyricLab() {
  const [theme, setTheme] = useState("");
  const [mood, setMood] = useState("upbeat");
  const [genre, setGenre] = useState("pop");
  const [provider, setProvider] = useState("grok");

  const generateLyricsMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/generate-lyrics", {
        theme,
        mood,
        genre,
        provider
      });
      return response.json();
    }
  });

  const handleGenerate = () => {
    if (theme.trim()) {
      generateLyricsMutation.mutate();
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
              <Link href="/lyric-lab" className="nav-link active">Lyric Lab</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4">🎵 Lyric Lab</h1>
          <p style={{ color: '#9CA3AF' }}>Generate creative lyrics with AI assistance</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Settings */}
          <div className="card">
            <h3 className="font-bold mb-4">Lyric Settings</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label">Theme/Topic</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter the theme or topic for your lyrics..."
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="form-group">
                  <label className="form-label">Mood</label>
                  <select 
                    className="form-select" 
                    value={mood} 
                    onChange={(e) => setMood(e.target.value)}
                  >
                    <option value="upbeat">Upbeat</option>
                    <option value="melancholic">Melancholic</option>
                    <option value="romantic">Romantic</option>
                    <option value="energetic">Energetic</option>
                    <option value="chill">Chill</option>
                    <option value="aggressive">Aggressive</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Genre</label>
                  <select 
                    className="form-select" 
                    value={genre} 
                    onChange={(e) => setGenre(e.target.value)}
                  >
                    <option value="pop">Pop</option>
                    <option value="rap">Rap</option>
                    <option value="rock">Rock</option>
                    <option value="country">Country</option>
                    <option value="r&b">R&B</option>
                    <option value="electronic">Electronic</option>
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
            <div className="text-center mt-4">
              <button 
                className="btn btn-primary"
                onClick={handleGenerate}
                disabled={generateLyricsMutation.isPending || !theme.trim()}
              >
                {generateLyricsMutation.isPending ? "Generating..." : "Generate Lyrics"}
              </button>
            </div>
          </div>

          {/* Generated Lyrics */}
          {generateLyricsMutation.data && (
            <div className="card">
              <h3 className="font-bold mb-4">Generated Lyrics</h3>
              <div className="form-group">
                <textarea
                  className="form-textarea"
                  style={{ minHeight: '300px' }}
                  value={generateLyricsMutation.data.lyrics || ""}
                  readOnly
                />
              </div>
              <div className="flex justify-center space-x-4">
                <button 
                  className="btn btn-secondary"
                  onClick={() => navigator.clipboard.writeText(generateLyricsMutation.data.lyrics)}
                >
                  Copy Lyrics
                </button>
                <button className="btn btn-secondary">
                  Export as PDF
                </button>
              </div>
            </div>
          )}

          {generateLyricsMutation.error && (
            <div className="card" style={{ borderColor: '#EF4444' }}>
              <h3 className="font-bold mb-2" style={{ color: '#EF4444' }}>Error</h3>
              <p style={{ color: '#9CA3AF' }}>Failed to generate lyrics. Please try again.</p>
            </div>
          )}

          {/* Lyric History */}
          <div className="card">
            <h3 className="font-bold mb-4">Recent Lyrics</h3>
            <p style={{ color: '#9CA3AF' }}>Your generated lyrics will appear here for easy access.</p>
          </div>
        </div>
      </div>
    </div>
  );
}