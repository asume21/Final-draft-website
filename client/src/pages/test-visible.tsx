export default function TestVisible() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#ff0000',
      color: 'white',
      fontSize: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
        CODEDSWITCH TEST
      </h1>
      <p>If you can see this red screen, React is working!</p>
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => window.location.href = '/dashboard'}
          style={{
            backgroundColor: 'white',
            color: 'black',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Go to Dashboard
        </button>
        <button 
          onClick={() => window.location.href = '/beat-studio'}
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Go to Beat Studio
        </button>
      </div>
    </div>
  );
}