import { Link } from "wouter";

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav>
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold" style={{ color: '#14B8A6' }}>CodedSwitch</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="btn btn-primary">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Where Code Meets Music</h1>
          <p>Transform your code into music, translate between languages, and create beats with AI-powered tools</p>
          <div className="flex justify-center space-x-4">
            <Link href="/dashboard" className="btn btn-primary">Start Creating</Link>
            <Link href="#features" className="btn btn-secondary">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-8">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">Powerful Creative Tools</h2>
          <div className="tools-grid">
            <div className="tool-card">
              <div className="tool-icon">🔄</div>
              <h3 className="text-lg font-bold mb-2">Code Translator</h3>
              <p className="text-sm" style={{ color: '#9CA3AF' }}>Convert code between programming languages instantly</p>
            </div>
            <div className="tool-card">
              <div className="tool-icon">🎵</div>
              <h3 className="text-lg font-bold mb-2">Lyric Lab</h3>
              <p className="text-sm" style={{ color: '#9CA3AF' }}>Generate creative lyrics with AI assistance</p>
            </div>
            <div className="tool-card">
              <div className="tool-icon">🥁</div>
              <h3 className="text-lg font-bold mb-2">Beat Studio</h3>
              <p className="text-sm" style={{ color: '#9CA3AF' }}>Create custom beats and drum patterns</p>
            </div>
            <div className="tool-card">
              <div className="tool-icon">🎼</div>
              <h3 className="text-lg font-bold mb-2">Music Studio</h3>
              <p className="text-sm" style={{ color: '#9CA3AF' }}>Compose full musical arrangements</p>
            </div>
            <div className="tool-card">
              <div className="tool-icon">💻</div>
              <h3 className="text-lg font-bold mb-2">CodeBeat Studio</h3>
              <p className="text-sm" style={{ color: '#9CA3AF' }}>Turn code patterns into musical beats</p>
            </div>
            <div className="tool-card">
              <div className="tool-icon">🤖</div>
              <h3 className="text-lg font-bold mb-2">AI Assistant</h3>
              <p className="text-sm" style={{ color: '#9CA3AF' }}>Get help with coding and music theory</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 text-center">
        <div className="container">
          <h2 className="text-2xl font-bold mb-4">Ready to Create Something Amazing?</h2>
          <p className="text-lg mb-6" style={{ color: '#9CA3AF' }}>Join thousands of creators using CodedSwitch to bridge code and music</p>
          <Link href="/dashboard" className="btn btn-primary">Start Your Journey</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t" style={{ borderColor: '#2A2A2A' }}>
        <div className="container">
          <div className="text-center">
            <p style={{ color: '#9CA3AF' }}>&copy; 2025 CodedSwitch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}