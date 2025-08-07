import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductionLanding() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                CodedSwitch
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white hover:text-purple-400" asChild>
                <a href="/dashboard">Dashboard</a>
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                <a href="/beat-studio">Start Creating</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                CodedSwitch
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              The world's first AI-powered platform that bridges programming and music creation. 
              Transform code into beats, lyrics into melodies, and ideas into symphonies.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-4" asChild>
                <a href="/dashboard">Launch CodedSwitch</a>
              </Button>
              <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 text-lg px-8 py-4" asChild>
                <a href="https://github.com/asume21/Final-draft-website" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-slate-900/50 border-slate-800 hover:border-purple-500/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💻</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Code Translator</h3>
                <p className="text-slate-400">
                  Transform code between programming languages with AI precision. 
                  From Python to JavaScript, C++ to Rust - seamless translation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 hover:border-pink-500/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-pink-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎵</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Beat Studio</h3>
                <p className="text-slate-400">
                  Create professional beats with AI collaboration. 
                  Generate drum patterns, basslines, and melodies with intelligent assistance.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 hover:border-cyan-500/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-cyan-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">CodeBeat Fusion</h3>
                <p className="text-slate-400">
                  Revolutionary feature that converts code structures into musical patterns. 
                  Turn algorithms into rhythms and functions into melodies.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 hover:border-green-500/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎤</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Lyric Lab</h3>
                <p className="text-slate-400">
                  Generate intelligent lyrics with mood and genre specifications. 
                  From rap verses to melodic hooks, create with AI assistance.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 hover:border-orange-500/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎹</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Music Studio</h3>
                <p className="text-slate-400">
                  Full-featured music production environment. 
                  Compose, arrange, and produce complete tracks with AI-powered tools.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 hover:border-blue-500/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🤖</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">AI Assistant</h3>
                <p className="text-slate-400">
                  Intelligent coding and music assistance. 
                  Get help with programming challenges and music theory guidance.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Technology Stack */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8 text-cyan-400">Powered by Cutting-Edge AI</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-full text-sm">React ⚛️</span>
              <span className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-full text-sm">xAI Grok 🧠</span>
              <span className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-full text-sm">Google Gemini ✨</span>
              <span className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-full text-sm">Tone.js 🎵</span>
              <span className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-full text-sm">TypeScript 📝</span>
              <span className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-full text-sm">Tailwind CSS 🎨</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}