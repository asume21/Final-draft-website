import { Link } from "wouter";

export default function Analytics() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav>
        <div className="container">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold" style={{ color: '#14B8A6' }}>CodedSwitch</Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="nav-link">Dashboard</Link>
              <Link href="/analytics" className="nav-link active">Analytics</Link>
              <Link href="/settings" className="nav-link">Settings</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4">📊 Analytics</h1>
          <p style={{ color: '#9CA3AF' }}>Track your creative progress and usage statistics</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Usage Statistics */}
          <div className="card">
            <h3 className="font-bold mb-4">Usage Overview</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#14B8A6' }}>42</div>
                <p style={{ color: '#9CA3AF' }}>Code Translations</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#14B8A6' }}>18</div>
                <p style={{ color: '#9CA3AF' }}>Beats Generated</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#14B8A6' }}>7</div>
                <p style={{ color: '#9CA3AF' }}>Songs Created</p>
              </div>
            </div>
          </div>

          {/* Tool Usage */}
          <div className="card">
            <h3 className="font-bold mb-4">Tool Usage Breakdown</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Code Translator</span>
                  <span style={{ color: '#9CA3AF' }}>62%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ backgroundColor: '#14B8A6', width: '62%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Beat Studio</span>
                  <span style={{ color: '#9CA3AF' }}>28%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ backgroundColor: '#14B8A6', width: '28%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Lyric Lab</span>
                  <span style={{ color: '#9CA3AF' }}>10%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ backgroundColor: '#14B8A6', width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 className="font-bold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="text-lg">🔄</div>
                <div className="flex-1">
                  <p>Translated JavaScript to Python</p>
                  <p className="text-sm" style={{ color: '#9CA3AF' }}>2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-lg">🥁</div>
                <div className="flex-1">
                  <p>Generated Hip-Hop beat pattern</p>
                  <p className="text-sm" style={{ color: '#9CA3AF' }}>5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-lg">🎵</div>
                <div className="flex-1">
                  <p>Created lyrics for "Summer Vibes"</p>
                  <p className="text-sm" style={{ color: '#9CA3AF' }}>1 day ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Provider Usage */}
          <div className="card">
            <h3 className="font-bold mb-4">AI Provider Preferences</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#2A2A2A' }}>
                <div className="text-xl font-bold" style={{ color: '#14B8A6' }}>xAI Grok</div>
                <p style={{ color: '#9CA3AF' }}>65% usage</p>
              </div>
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#2A2A2A' }}>
                <div className="text-xl font-bold" style={{ color: '#14B8A6' }}>Google Gemini</div>
                <p style={{ color: '#9CA3AF' }}>35% usage</p>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="card">
            <h3 className="font-bold mb-4">Export Data</h3>
            <div className="flex justify-center space-x-4">
              <button className="btn btn-secondary">Export CSV</button>
              <button className="btn btn-secondary">Generate Report</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}