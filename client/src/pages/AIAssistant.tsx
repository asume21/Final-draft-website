import { useState } from "react";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("coding");
  const [provider, setProvider] = useState("grok");
  const [chatHistory, setChatHistory] = useState<Array<{question: string, answer: string}>>([]);

  const askAssistantMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/ask-assistant", {
        question,
        category,
        provider
      });
      return response.json();
    },
    onSuccess: (data) => {
      setChatHistory(prev => [...prev, { question, answer: data.answer }]);
      setQuestion("");
    }
  });

  const handleAsk = () => {
    if (question.trim()) {
      askAssistantMutation.mutate();
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
              <Link href="/ai-assistant" className="nav-link active">AI Assistant</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4">🤖 AI Assistant</h1>
          <p style={{ color: '#9CA3AF' }}>Get help with coding and music theory</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Chat Interface */}
          <div className="card">
            <h3 className="font-bold mb-4">Ask the Assistant</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select 
                    className="form-select" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="coding">Programming & Code</option>
                    <option value="music">Music Theory</option>
                    <option value="general">General Help</option>
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
              <div className="form-group">
                <label className="form-label">Your Question</label>
                <textarea
                  className="form-textarea"
                  placeholder="Ask me anything about coding, music theory, or how to use CodedSwitch..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button 
                  className="btn btn-primary"
                  onClick={handleAsk}
                  disabled={askAssistantMutation.isPending || !question.trim()}
                >
                  {askAssistantMutation.isPending ? "Thinking..." : "Ask Assistant"}
                </button>
              </div>
            </div>
          </div>

          {/* Chat History */}
          {chatHistory.length > 0 && (
            <div className="card">
              <h3 className="font-bold mb-4">Conversation History</h3>
              <div className="space-y-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {chatHistory.map((chat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#2A2A2A' }}>
                      <div className="font-medium mb-2" style={{ color: '#14B8A6' }}>You:</div>
                      <p>{chat.question}</p>
                    </div>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#1A1A1A' }}>
                      <div className="font-medium mb-2" style={{ color: '#9CA3AF' }}>Assistant:</div>
                      <p>{chat.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {askAssistantMutation.error && (
            <div className="card" style={{ borderColor: '#EF4444' }}>
              <h3 className="font-bold mb-2" style={{ color: '#EF4444' }}>Error</h3>
              <p style={{ color: '#9CA3AF' }}>Failed to get response from assistant. Please try again.</p>
            </div>
          )}

          {/* Quick Help */}
          <div className="card">
            <h3 className="font-bold mb-4">Quick Help Topics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Coding Help</h4>
                <ul style={{ color: '#9CA3AF' }}>
                  <li>• Debug code errors</li>
                  <li>• Explain programming concepts</li>
                  <li>• Best practices</li>
                  <li>• Code optimization</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Music Theory</h4>
                <ul style={{ color: '#9CA3AF' }}>
                  <li>• Chord progressions</li>
                  <li>• Scale theory</li>
                  <li>• Rhythm patterns</li>
                  <li>• Composition tips</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}