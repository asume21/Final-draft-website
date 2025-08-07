import { useState } from "react";
import { Link } from "wouter";

export default function Settings() {
  const [defaultProvider, setDefaultProvider] = useState("grok");
  const [theme, setTheme] = useState("dark");
  const [autoSave, setAutoSave] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    // Save settings to localStorage or API
    localStorage.setItem('settings', JSON.stringify({
      defaultProvider,
      theme,
      autoSave,
      notifications
    }));
    alert('Settings saved successfully!');
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
              <Link href="/analytics" className="nav-link">Analytics</Link>
              <Link href="/settings" className="nav-link active">Settings</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4">⚙️ Settings</h1>
          <p style={{ color: '#9CA3AF' }}>Customize your CodedSwitch experience</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* AI Provider Settings */}
          <div className="card">
            <h3 className="font-bold mb-4">AI Provider Preferences</h3>
            <div className="form-group">
              <label className="form-label">Default AI Provider</label>
              <select 
                className="form-select" 
                value={defaultProvider} 
                onChange={(e) => setDefaultProvider(e.target.value)}
              >
                <option value="grok">xAI Grok (Recommended)</option>
                <option value="gemini">Google Gemini</option>
              </select>
              <p className="text-sm mt-2" style={{ color: '#9CA3AF' }}>
                Choose your preferred AI provider for all tools. You can override this per request.
              </p>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="card">
            <h3 className="font-bold mb-4">Appearance</h3>
            <div className="form-group">
              <label className="form-label">Theme</label>
              <select 
                className="form-select" 
                value={theme} 
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="dark">Dark (Current)</option>
                <option value="light">Light</option>
                <option value="auto">Auto (System)</option>
              </select>
            </div>
          </div>

          {/* Workflow Settings */}
          <div className="card">
            <h3 className="font-bold mb-4">Workflow Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="form-label">Auto-save Projects</label>
                  <p className="text-sm" style={{ color: '#9CA3AF' }}>Automatically save your work every few minutes</p>
                </div>
                <input
                  type="checkbox"
                  checked={autoSave}
                  onChange={(e) => setAutoSave(e.target.checked)}
                  className="w-4 h-4"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="form-label">Notifications</label>
                  <p className="text-sm" style={{ color: '#9CA3AF' }}>Receive notifications about completed tasks</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="w-4 h-4"
                />
              </div>
            </div>
          </div>

          {/* Audio Settings */}
          <div className="card">
            <h3 className="font-bold mb-4">Audio Settings</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label">Default Volume</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="75"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Audio Quality</label>
                <select className="form-select">
                  <option value="high">High (Recommended)</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low (Faster)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data & Privacy */}
          <div className="card">
            <h3 className="font-bold mb-4">Data & Privacy</h3>
            <div className="space-y-4">
              <button className="btn btn-secondary">Download My Data</button>
              <button className="btn btn-secondary">Clear Cache</button>
              <button className="btn btn-secondary" style={{ borderColor: '#EF4444', color: '#EF4444' }}>
                Delete Account
              </button>
            </div>
          </div>

          {/* Save Settings */}
          <div className="card text-center">
            <button className="btn btn-primary" onClick={handleSave}>
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}