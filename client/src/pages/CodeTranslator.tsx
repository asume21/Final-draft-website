import { useState } from "react";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function CodeTranslator() {
  const [sourceCode, setSourceCode] = useState("");
  const [sourceLang, setSourceLang] = useState("javascript");
  const [targetLang, setTargetLang] = useState("python");
  const [provider, setProvider] = useState("grok");

  const translateMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/translate", {
        code: sourceCode,
        sourceLang,
        targetLang,
        provider
      });
      return response.json();
    }
  });

  const handleTranslate = () => {
    if (sourceCode.trim()) {
      translateMutation.mutate();
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
              <Link href="/code-translator" className="nav-link active">Code Translator</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4">🔄 Code Translator</h1>
          <p style={{ color: '#9CA3AF' }}>Convert code between programming languages with AI</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Settings */}
          <div className="card">
            <h3 className="font-bold mb-4">Translation Settings</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="form-group">
                <label className="form-label">Source Language</label>
                <select 
                  className="form-select" 
                  value={sourceLang} 
                  onChange={(e) => setSourceLang(e.target.value)}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                  <option value="rust">Rust</option>
                  <option value="go">Go</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Target Language</label>
                <select 
                  className="form-select" 
                  value={targetLang} 
                  onChange={(e) => setTargetLang(e.target.value)}
                >
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                  <option value="rust">Rust</option>
                  <option value="go">Go</option>
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

          {/* Input */}
          <div className="card">
            <h3 className="font-bold mb-4">Source Code</h3>
            <textarea
              className="form-textarea"
              style={{ minHeight: '200px', fontFamily: 'monospace' }}
              placeholder={`Enter your ${sourceLang} code here...`}
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
            />
            <div className="flex justify-center mt-4">
              <button 
                className="btn btn-primary"
                onClick={handleTranslate}
                disabled={translateMutation.isPending || !sourceCode.trim()}
              >
                {translateMutation.isPending ? "Translating..." : "Translate Code"}
              </button>
            </div>
          </div>

          {/* Output */}
          {translateMutation.data && (
            <div className="card">
              <h3 className="font-bold mb-4">Translated Code ({targetLang})</h3>
              <textarea
                className="form-textarea"
                style={{ minHeight: '200px', fontFamily: 'monospace' }}
                value={translateMutation.data.translatedCode || ""}
                readOnly
              />
              <div className="flex justify-center mt-4">
                <button 
                  className="btn btn-secondary"
                  onClick={() => navigator.clipboard.writeText(translateMutation.data.translatedCode)}
                >
                  Copy Code
                </button>
              </div>
            </div>
          )}

          {translateMutation.error && (
            <div className="card" style={{ borderColor: '#EF4444' }}>
              <h3 className="font-bold mb-2" style={{ color: '#EF4444' }}>Error</h3>
              <p style={{ color: '#9CA3AF' }}>Failed to translate code. Please try again.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}