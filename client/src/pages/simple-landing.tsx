import { Link } from "wouter";
import { Button } from "@/components/ui/button";

// This landing page is specifically designed to be stable and never crash

export default function SimpleLanding() {
  return (
    <div className="min-h-screen bg-github-dark text-github-text">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              CodedSwitch
            </span>
          </h1>
          <p className="text-xl text-github-text-secondary mb-4 max-w-3xl mx-auto">
            The world's first AI-powered platform that bridges{" "}
            <span className="text-purple-400 font-mono">code</span> and{" "}
            <span className="text-pink-400">music</span> creation
          </p>
          <p className="text-lg text-github-text-secondary mb-12 max-w-2xl mx-auto">
            Switch seamlessly between programming languages, musical genres, and creative modes with AI assistance
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/dashboard">
              <Button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg hover:scale-105 transition-transform shadow-lg">
                🚀 Launch CodedSwitch
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto px-8 py-4 border-github-border hover:border-cyan-400 transition-colors"
              asChild
            >
              <a href="https://github.com/asume21/Codedswitch-minimal" target="_blank" rel="noopener noreferrer">
                📂 View on GitHub
              </a>
            </Button>
          </div>

          {/* Simple Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-github-secondary/50 border border-github-border rounded-lg p-6 hover:border-purple-500/50 transition-colors">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                💻
              </div>
              <h3 className="text-lg font-semibold mb-2">Code Translator</h3>
              <p className="text-github-text-secondary text-sm">Transform code between languages with AI precision</p>
            </div>
            
            <div className="bg-github-secondary/50 border border-github-border rounded-lg p-6 hover:border-pink-500/50 transition-colors">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                🎵
              </div>
              <h3 className="text-lg font-semibold mb-2">Music Studio</h3>
              <p className="text-github-text-secondary text-sm">Create beats and melodies with AI collaboration</p>
            </div>
            
            <div className="bg-github-secondary/50 border border-github-border rounded-lg p-6 hover:border-cyan-500/50 transition-colors">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                ⚡
              </div>
              <h3 className="text-lg font-semibold mb-2">CodeBeat Fusion</h3>
              <p className="text-github-text-secondary text-sm">Turn your code into music and vice versa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-github-secondary/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-cyan-400">Powered by Modern Tech</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["React ⚛️", "xAI Grok 🧠", "Tone.js 🎵", "TypeScript 📝", "Tailwind 🎨", "Node.js 🟢"].map((tech, index) => (
              <div key={index} className="bg-github-dark px-4 py-2 rounded-full border border-github-border text-sm">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}