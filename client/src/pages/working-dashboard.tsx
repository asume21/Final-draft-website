import { Link } from "wouter";
import { 
  Code, 
  Music, 
  Zap, 
  Bot, 
  TrendingUp, 
  Clock,
  Star,
  Play
} from "lucide-react";

export default function WorkingDashboard() {
  const quickActions = [
    {
      title: "Translate Code",
      description: "Convert code between languages",
      icon: Code,
      href: "/code-translator",
      color: "#7c3aed"
    },
    {
      title: "Generate Lyrics",
      description: "Create AI-powered lyrics",
      icon: Music,
      href: "/lyric-lab",
      color: "#ec4899"
    },
    {
      title: "Create Beat",
      description: "Generate musical beats",
      icon: Music,
      href: "/beat-studio",
      color: "#06b6d4"
    },
    {
      title: "CodeBeat Fusion",
      description: "Transform code into music",
      icon: Zap,
      href: "/codebeat-studio",
      color: "#7c3aed"
    }
  ];

  const stats = [
    { label: "Code Translations", value: "24", trend: "+12%" },
    { label: "Music Generations", value: "18", trend: "+8%" },
    { label: "AI Assists", value: "42", trend: "+15%" },
    { label: "CodeBeat Fusions", value: "6", trend: "+25%" }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: 'white', padding: '32px', paddingTop: '96px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '8px' }}>
            Welcome to <span style={{ background: 'linear-gradient(135deg, #c084fc, #f472b6)', WebkitBackgroundClip: 'text', color: 'transparent' }}>CodedSwitch</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '18px' }}>
            Your creative coding and music workspace
          </p>
        </div>

        {/* Stats Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '4px' }}>{stat.label}</p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>{stat.value}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#22c55e', fontSize: '14px' }}>
                  <TrendingUp style={{ width: '16px', height: '16px' }} />
                  <span>{stat.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href} style={{ textDecoration: 'none' }}>
                <div style={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155', 
                  borderRadius: '8px', 
                  padding: '24px', 
                  textAlign: 'center', 
                  cursor: 'pointer',
                  transition: 'transform 0.3s, border-color 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.borderColor = action.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = '#334155';
                }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    backgroundColor: `${action.color}20`, 
                    borderRadius: '8px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 16px auto' 
                  }}>
                    <action.icon style={{ color: action.color, width: '24px', height: '24px' }} />
                  </div>
                  <h3 style={{ fontWeight: '600', marginBottom: '8px', color: 'white' }}>{action.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '14px' }}>{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Audio Visualization Demo */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Audio System Status</h2>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                backgroundColor: '#22c55e20', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <Music style={{ color: '#22c55e', width: '24px', height: '24px' }} />
              </div>
              <div>
                <h3 style={{ fontWeight: '600', color: 'white', marginBottom: '4px' }}>Audio Engine Ready</h3>
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>Tone.js initialized - Ready for beat generation and playback</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ backgroundColor: '#22c55e', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>✓ Web Audio API</span>
              <span style={{ backgroundColor: '#06b6d4', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>✓ Tone.js v15.1.22</span>
              <span style={{ backgroundColor: '#7c3aed', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>✓ AI Integration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}