import { Link } from "wouter";

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav>
        <div className="container">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold" style={{ color: '#14B8A6' }}>CodedSwitch</Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="nav-link active">Dashboard</Link>
              <Link href="/analytics" className="nav-link">Analytics</Link>
              <Link href="/settings" className="nav-link">Settings</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4">Welcome to CodedSwitch</h1>
          <p style={{ color: '#9CA3AF' }}>Choose a tool to start creating amazing content</p>
        </div>

        {/* Main Tools */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold mb-4">Core Tools</h2>
            <div className="grid grid-cols-1 gap-6">
              <Link href="/code-translator" className="card hover:border-teal-500">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">🔄</div>
                  <div className="flex-1">
                    <h3 className="font-bold">Code Translator</h3>
                    <p className="text-sm" style={{ color: '#9CA3AF' }}>Convert code between programming languages</p>
                  </div>
                  <div className="text-sm" style={{ color: '#9CA3AF' }}>→</div>
                </div>
              </Link>

              <Link href="/lyric-lab" className="card hover:border-teal-500">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">🎵</div>
                  <div className="flex-1">
                    <h3 className="font-bold">Lyric Lab</h3>
                    <p className="text-sm" style={{ color: '#9CA3AF' }}>Generate creative lyrics and songs</p>
                  </div>
                  <div className="text-sm" style={{ color: '#9CA3AF' }}>→</div>
                </div>
              </Link>

              <Link href="/beat-studio" className="card hover:border-teal-500">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">🥁</div>
                  <div className="flex-1">
                    <h3 className="font-bold">Beat Studio</h3>
                    <p className="text-sm" style={{ color: '#9CA3AF' }}>Create custom beats and drum patterns</p>
                  </div>
                  <div className="text-sm" style={{ color: '#9CA3AF' }}>→</div>
                </div>
              </Link>

              <Link href="/music-studio" className="card hover:border-teal-500">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">🎼</div>
                  <div className="flex-1">
                    <h3 className="font-bold">Music Studio</h3>
                    <p className="text-sm" style={{ color: '#9CA3AF' }}>Compose full musical arrangements</p>
                  </div>
                  <div className="text-sm" style={{ color: '#9CA3AF' }}>→</div>
                </div>
              </Link>

              <Link href="/codebeat-studio" className="card hover:border-teal-500">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">💻</div>
                  <div className="flex-1">
                    <h3 className="font-bold">CodeBeat Studio</h3>
                    <p className="text-sm" style={{ color: '#9CA3AF' }}>Turn code patterns into musical beats</p>
                  </div>
                  <div className="text-sm" style={{ color: '#9CA3AF' }}>→</div>
                </div>
              </Link>

              <Link href="/ai-assistant" className="card hover:border-teal-500">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">🤖</div>
                  <div className="flex-1">
                    <h3 className="font-bold">AI Assistant</h3>
                    <p className="text-sm" style={{ color: '#9CA3AF' }}>Get help with coding and music theory</p>
                  </div>
                  <div className="text-sm" style={{ color: '#9CA3AF' }}>→</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4">
              <button className="card text-left hover:border-teal-500">
                <div className="flex items-center space-x-4">
                  <div className="text-xl">🔄</div>
                  <div>
                    <h4 className="font-medium">New Translation</h4>
                    <p className="text-sm" style={{ color: '#9CA3AF' }}>Convert code between languages</p>
                  </div>
                </div>
              </button>

              <button className="card text-left hover:border-teal-500">
                <div className="flex items-center space-x-4">
                  <div className="text-xl">🎵</div>
                  <div>
                    <h4 className="font-medium">Generate Beat</h4>
                    <p className="text-sm" style={{ color: '#9CA3AF' }}>Create a new drum pattern</p>
                  </div>
                </div>
              </button>

              <button className="card text-left hover:border-teal-500">
                <div className="flex items-center space-x-4">
                  <div className="text-xl">🎼</div>
                  <div>
                    <h4 className="font-medium">Code to Music</h4>
                    <p className="text-sm" style={{ color: '#9CA3AF' }}>Transform code into melodies</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}