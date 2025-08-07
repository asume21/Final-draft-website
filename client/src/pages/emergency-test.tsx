export default function EmergencyTest() {
  return (
    <div style={{ 
      backgroundColor: '#1a1a1a', 
      color: 'white', 
      minHeight: '100vh', 
      padding: '2rem',
      fontFamily: 'Arial, sans-serif' 
    }}>
      <h1 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
        CodedSwitch - EMERGENCY TEST
      </h1>
      
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          This page uses inline styles to bypass any CSS issues
        </p>
        
        <div style={{ marginBottom: '2rem' }}>
          <a href="/dashboard" style={{ 
            backgroundColor: '#8B5CF6', 
            color: 'white', 
            padding: '1rem 2rem', 
            textDecoration: 'none', 
            borderRadius: '8px',
            marginRight: '1rem',
            display: 'inline-block'
          }}>
            Go to Dashboard
          </a>
          
          <a href="/beat-studio" style={{ 
            backgroundColor: '#EC4899', 
            color: 'white', 
            padding: '1rem 2rem', 
            textDecoration: 'none', 
            borderRadius: '8px',
            display: 'inline-block'
          }}>
            Go to Beat Studio
          </a>
        </div>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ 
          backgroundColor: '#374151', 
          padding: '1.5rem', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>💻 Code Translator</h3>
          <p>Transform code between languages</p>
        </div>
        
        <div style={{ 
          backgroundColor: '#374151', 
          padding: '1.5rem', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>🎵 Music Studio</h3>
          <p>Create beats and melodies</p>
        </div>
        
        <div style={{ 
          backgroundColor: '#374151', 
          padding: '1.5rem', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>⚡ CodeBeat Fusion</h3>
          <p>Turn code into music</p>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <p style={{ color: '#10B981', fontSize: '1.2rem', fontWeight: 'bold' }}>
          ✅ If you can see this content, React is working correctly!
        </p>
        <p style={{ color: '#F59E0B', marginTop: '1rem' }}>
          The issue was with CSS/Tailwind classes not rendering properly
        </p>
      </div>
    </div>
  );
}