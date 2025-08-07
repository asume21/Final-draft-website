export default function SimpleLandingWorking() {
  console.log("SimpleLandingWorking is rendering...");
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-center mb-6">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            CodedSwitch
          </span>
        </h1>
        
        <p className="text-xl text-center text-gray-300 mb-8">
          The world's first AI-powered platform that bridges code and music creation
        </p>
        
        <div className="flex justify-center space-x-4 mb-12">
          <a href="/dashboard" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold">
            🚀 Launch CodedSwitch
          </a>
          <a href="https://github.com/asume21/Codedswitch-minimal" target="_blank" rel="noopener noreferrer" 
             className="border border-gray-600 hover:border-purple-400 text-white px-6 py-3 rounded-lg font-semibold">
            📂 View on GitHub
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              💻
            </div>
            <h3 className="text-lg font-semibold mb-2">Code Translator</h3>
            <p className="text-gray-400">Transform code between languages with AI precision</p>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-pink-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              🎵
            </div>
            <h3 className="text-lg font-semibold mb-2">Music Studio</h3>
            <p className="text-gray-400">Create beats and melodies with AI collaboration</p>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-cyan-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              ⚡
            </div>
            <h3 className="text-lg font-semibold mb-2">CodeBeat Fusion</h3>
            <p className="text-gray-400">Turn your code into music and vice versa</p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">Powered by Modern AI</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="bg-gray-800 px-3 py-1 rounded-full text-sm border border-gray-700">React ⚛️</span>
            <span className="bg-gray-800 px-3 py-1 rounded-full text-sm border border-gray-700">xAI Grok 🧠</span>
            <span className="bg-gray-800 px-3 py-1 rounded-full text-sm border border-gray-700">Tone.js 🎵</span>
            <span className="bg-gray-800 px-3 py-1 rounded-full text-sm border border-gray-700">TypeScript 📝</span>
          </div>
        </div>
      </div>
    </div>
  );
}