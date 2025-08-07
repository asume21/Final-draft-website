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

export default function WorkingDashboardReal() {
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
      color: "#f59e0b"
    },
    {
      title: "Music Studio",
      description: "Full music production",
      icon: Music,
      href: "/music-studio",
      color: "#22c55e"
    },
    {
      title: "AI Assistant",
      description: "Get intelligent help",
      icon: Bot,
      href: "/ai-assistant",
      color: "#8b5cf6"
    }
  ];

  const recentProjects = [
    {
      name: "React to Vue Translation",
      type: "Code Translation",
      timestamp: "2 hours ago",
      status: "completed"
    },
    {
      name: "Hip-Hop Beat Generation",
      type: "Music Creation",
      timestamp: "5 hours ago",
      status: "completed"
    },
    {
      name: "JavaScript Melody",
      type: "CodeBeat Fusion",
      timestamp: "1 day ago",
      status: "completed"
    }
  ];

  const stats = [
    { label: "Code Translations", value: "24", trend: "+12%" },
    { label: "Music Generations", value: "18", trend: "+8%" },
    { label: "AI Assists", value: "42", trend: "+15%" },
    { label: "CodeBeat Fusions", value: "6", trend: "+25%" }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: 'white', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '4px' }}>{stat.label}</p>
                  <p style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: 0 }}>{stat.value}</p>
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
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href} style={{ textDecoration: 'none' }}>
                <div style={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155', 
                  borderRadius: '8px', 
                  padding: '24px', 
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = action.color;
                  e.currentTarget.style.boxShadow = `0 8px 25px ${action.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#334155';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    backgroundColor: `${action.color}20`, 
                    borderRadius: '8px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginBottom: '16px' 
                  }}>
                    <action.icon style={{ color: action.color, width: '24px', height: '24px' }} />
                  </div>
                  <h3 style={{ fontWeight: '600', marginBottom: '8px', color: 'white', fontSize: '18px' }}>{action.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
          
          {/* Recent Projects */}
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <Clock style={{ marginRight: '8px', width: '20px', height: '20px', color: '#06b6d4' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: 0 }}>Recent Projects</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {recentProjects.map((project, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '16px', 
                  backgroundColor: '#0f172a', 
                  borderRadius: '6px',
                  border: '1px solid #1e293b'
                }}>
                  <div>
                    <p style={{ fontWeight: '500', color: 'white', margin: '0 0 4px 0' }}>{project.name}</p>
                    <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>{project.type}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      backgroundColor: '#22c55e20', 
                      color: '#22c55e', 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '10px', 
                      fontWeight: '500',
                      marginBottom: '4px'
                    }}>
                      {project.status}
                    </div>
                    <p style={{ color: '#64748b', fontSize: '11px', margin: 0 }}>{project.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audio System Status */}
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <Music style={{ marginRight: '8px', width: '20px', height: '20px', color: '#22c55e' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: 0 }}>Audio System</h3>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '12px' }}>System Status: All Components Online</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ backgroundColor: '#22c55e', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '11px' }}>✓ Tone.js Ready</span>
                <span style={{ backgroundColor: '#06b6d4', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '11px' }}>✓ Web Audio API</span>
                <span style={{ backgroundColor: '#7c3aed', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '11px' }}>✓ AI Integration</span>
                <span style={{ backgroundColor: '#ec4899', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '11px' }}>✓ Beat Engine</span>
              </div>
            </div>

            {/* Audio Visualization Placeholder */}
            <div style={{ 
              height: '100px', 
              backgroundColor: '#0f172a', 
              borderRadius: '6px', 
              border: '1px solid #1e293b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', alignItems: 'end', gap: '2px', height: '60px' }}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: '3px',
                      height: `${Math.random() * 50 + 10}px`,
                      backgroundColor: '#06b6d4',
                      borderRadius: '1px',
                      opacity: 0.7,
                      animation: `pulse ${Math.random() * 2 + 1}s ease-in-out infinite alternate`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}