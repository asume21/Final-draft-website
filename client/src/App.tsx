import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/layout/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import CodeTranslator from "@/pages/code-translator";
import LyricLab from "@/pages/lyric-lab";
import BeatStudio from "@/pages/beat-studio";
import MusicStudio from "@/pages/music-studio";
import CodeBeatStudio from "@/pages/codebeat-studio";
import AIAssistant from "@/pages/ai-assistant";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
});

function Router() {
  console.log("Router is rendering...");
  
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Switch>
        <Route path="/">
          <WorkingLanding />
        </Route>
        <Route path="/dashboard">
          <AppLayout>
            <Dashboard />
          </AppLayout>
        </Route>
        <Route path="/code-translator">
          <AppLayout>
            <CodeTranslator />
          </AppLayout>
        </Route>
        <Route path="/lyric-lab">
          <AppLayout>
            <LyricLab />
          </AppLayout>
        </Route>
        <Route path="/beat-studio">
          <AppLayout>
            <BeatStudio />
          </AppLayout>
        </Route>
        <Route path="/music-studio">
          <AppLayout>
            <MusicStudio />
          </AppLayout>
        </Route>
        <Route path="/codebeat-studio">
          <AppLayout>
            <CodeBeatStudio />
          </AppLayout>
        </Route>
        <Route path="/ai-assistant">
          <AppLayout>
            <AIAssistant />
          </AppLayout>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

function WorkingLanding() {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8">
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
              <a href="/dashboard" className="text-white hover:text-purple-400 px-4 py-2 rounded bg-slate-800 hover:bg-slate-700">
                Dashboard
              </a>
              <a href="/beat-studio" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
                Start Creating
              </a>
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
              <a href="/dashboard" className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-4 rounded-lg font-semibold inline-block">
                Launch CodedSwitch
              </a>
              <a href="https://github.com/asume21/Final-draft-website" target="_blank" rel="noopener noreferrer" 
                 className="border border-slate-600 hover:border-purple-400 text-white text-lg px-8 py-4 rounded-lg font-semibold inline-block">
                View on GitHub
              </a>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Code Translator</h3>
              <p className="text-slate-400">
                Transform code between programming languages with AI precision. 
                From Python to JavaScript, C++ to Rust - seamless translation.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 hover:border-pink-500/50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-pink-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎵</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Beat Studio</h3>
              <p className="text-slate-400">
                Create professional beats with AI collaboration. 
                Generate drum patterns, basslines, and melodies with intelligent assistance.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-cyan-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">CodeBeat Fusion</h3>
              <p className="text-slate-400">
                Revolutionary feature that converts code structures into musical patterns. 
                Turn algorithms into rhythms and functions into melodies.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 hover:border-green-500/50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎤</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Lyric Lab</h3>
              <p className="text-slate-400">
                Generate intelligent lyrics with mood and genre specifications. 
                From rap verses to melodic hooks, create with AI assistance.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 hover:border-orange-500/50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-orange-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎹</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Music Studio</h3>
              <p className="text-slate-400">
                Full-featured music production environment. 
                Compose, arrange, and produce complete tracks with AI-powered tools.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">AI Assistant</h3>
              <p className="text-slate-400">
                Intelligent coding and music assistance. 
                Get help with programming challenges and music theory guidance.
              </p>
            </div>
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

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <Sidebar />
      {children}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;