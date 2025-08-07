import { useState } from 'react';

export default function FunctionalCodeTranslator() {
  const [sourceCode, setSourceCode] = useState('');
  const [translatedCode, setTranslatedCode] = useState('');
  const [sourceLang, setSourceLang] = useState('JavaScript');
  const [targetLang, setTargetLang] = useState('Python');
  const [isTranslating, setIsTranslating] = useState(false);
  const [aiProvider, setAiProvider] = useState('Grok');

  const translateCode = async () => {
    if (!sourceCode.trim()) {
      alert('Please enter some code to translate');
      return;
    }

    setIsTranslating(true);
    
    try {
      const response = await fetch('/api/code/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceCode: sourceCode,
          sourceLanguage: sourceLang,
          targetLanguage: targetLang,
          aiProvider: aiProvider.toLowerCase()
        })
      });

      if (response.ok) {
        const data = await response.json();
        setTranslatedCode(data.translatedCode);
      } else {
        throw new Error('Translation failed');
      }
    } catch (error) {
      console.error('Translation error:', error);
      // Fallback to example translation
      const fallbackTranslation = `// Translation using ${aiProvider} AI failed
// This is a fallback example translation from ${sourceLang} to ${targetLang}

${sourceCode}

// The actual AI would analyze the code structure, convert syntax patterns,
// handle language-specific features, and maintain functionality.`;
      
      setTranslatedCode(fallbackTranslation);
      alert('AI translation temporarily unavailable. Showing example.');
    }
    
    setIsTranslating(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Code copied to clipboard!');
  };

  const swapLanguages = () => {
    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);
    
    const tempCode = sourceCode;
    setSourceCode(translatedCode);
    setTranslatedCode(tempCode);
  };

  const clearAll = () => {
    setSourceCode('');
    setTranslatedCode('');
  };

  const loadExample = () => {
    const examples: { [key: string]: string } = {
      'JavaScript': `function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

for (let i = 0; i < 10; i++) {
    console.log(\`fib(\${i}) = \${fibonacci(i)}\`);
}`,
      'Python': `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

for i in range(10):
    print(f"fib({i}) = {fibonacci(i)}")`,
      'Java': `public class Fibonacci {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            System.out.println("fib(" + i + ") = " + fibonacci(i));
        }
    }
}`,
      'C++': `#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    for (int i = 0; i < 10; i++) {
        cout << "fib(" << i << ") = " << fibonacci(i) << endl;
    }
    return 0;
}`
    };

    setSourceCode(examples[sourceLang] || examples['JavaScript']);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--brand-dark)', color: 'var(--brand-text)', paddingTop: '80px', padding: '32px' }}>
      <h1 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '16px', background: 'linear-gradient(135deg, var(--accent-teal-bright), var(--accent-blue))', WebkitBackgroundClip: 'text', color: 'transparent' }}>
        Code Translator - FULLY FUNCTIONAL
      </h1>

      {/* AI Provider & Controls */}
      <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>AI Provider</label>
            <select 
              value={aiProvider}
              onChange={(e) => setAiProvider(e.target.value)}
              style={{ padding: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '4px', color: 'white' }}
            >
              <option value="Grok">xAI Grok</option>
              <option value="Gemini">Google Gemini</option>
            </select>
          </div>
          <button 
            onClick={swapLanguages}
            style={{ 
              backgroundColor: '#06b6d4', 
              color: 'white', 
              padding: '8px 16px', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              marginTop: '18px'
            }}
          >
            🔄 Swap
          </button>
          <button 
            onClick={loadExample}
            style={{ 
              backgroundColor: 'rgba(20, 184, 166, 0.2)',
              border: '1px solid rgba(20, 184, 166, 0.3)', 
              color: 'white', 
              padding: '8px 16px', 
              borderRadius: '4px', 
              cursor: 'pointer',
              marginTop: '18px'
            }}
          >
            📄 Load Example
          </button>
          <button 
            onClick={clearAll}
            style={{ 
              backgroundColor: '#6b7280', 
              color: 'white', 
              padding: '8px 16px', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              marginTop: '18px'
            }}
          >
            🗑️ Clear All
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '24px', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', margin: 0 }}>Source Code</h3>
            <button 
              onClick={() => copyToClipboard(sourceCode)}
              style={{ 
                backgroundColor: '#374151', 
                color: 'white', 
                padding: '4px 8px', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              📋 Copy
            </button>
          </div>
          <select 
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '8px', 
              backgroundColor: '#0f172a', 
              border: '1px solid #334155', 
              borderRadius: '4px', 
              color: 'white', 
              marginBottom: '16px' 
            }}
          >
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="C++">C++</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Go">Go</option>
            <option value="Rust">Rust</option>
          </select>
          <textarea 
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            placeholder="Paste your code here..."
            style={{ 
              width: '100%', 
              height: '300px', 
              padding: '12px', 
              backgroundColor: '#0f172a', 
              border: '1px solid #334155', 
              borderRadius: '4px', 
              color: 'white', 
              fontFamily: 'monospace',
              fontSize: '14px',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '24px', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', margin: 0 }}>Translated Code</h3>
            <button 
              onClick={() => copyToClipboard(translatedCode)}
              disabled={!translatedCode}
              style={{ 
                backgroundColor: translatedCode ? '#374151' : '#6b7280', 
                color: 'white', 
                padding: '4px 8px', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: translatedCode ? 'pointer' : 'not-allowed',
                fontSize: '12px'
              }}
            >
              📋 Copy
            </button>
          </div>
          <select 
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '8px', 
              backgroundColor: '#0f172a', 
              border: '1px solid #334155', 
              borderRadius: '4px', 
              color: 'white', 
              marginBottom: '16px' 
            }}
          >
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Java">Java</option>
            <option value="C++">C++</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Go">Go</option>
            <option value="Rust">Rust</option>
          </select>
          <div style={{ 
            width: '100%', 
            height: '300px', 
            padding: '12px', 
            backgroundColor: '#0f172a', 
            border: '1px solid #334155', 
            borderRadius: '4px', 
            color: '#94a3b8', 
            fontFamily: 'monospace',
            fontSize: '14px',
            overflow: 'auto',
            whiteSpace: 'pre-wrap'
          }}>
            {isTranslating ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#06b6d4' }}>
                <div>🤖 AI is translating your code...</div>
              </div>
            ) : (
              translatedCode || 'Translated code will appear here...'
            )}
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <button 
          onClick={translateCode}
          disabled={isTranslating || !sourceCode.trim()}
          style={{ 
            backgroundColor: (isTranslating || !sourceCode.trim()) ? '#6b7280' : '#7c3aed', 
            color: 'white', 
            padding: '16px 32px', 
            border: 'none', 
            borderRadius: '8px', 
            fontSize: '18px', 
            cursor: (isTranslating || !sourceCode.trim()) ? 'not-allowed' : 'pointer',
            minWidth: '200px'
          }}
        >
          {isTranslating ? '🤖 Translating...' : `🤖 Translate with ${aiProvider}`}
        </button>
      </div>

      <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '16px', borderRadius: '8px', marginBottom: '32px' }}>
        <h4 style={{ fontSize: '16px', marginBottom: '12px' }}>Translation Features:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', fontSize: '14px', color: '#94a3b8' }}>
          <div>✓ Syntax conversion</div>
          <div>✓ Variable naming</div>
          <div>✓ Function structure</div>
          <div>✓ Type handling</div>
          <div>✓ Import/Include statements</div>
          <div>✓ Language-specific optimizations</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <a href="/dashboard" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: 'white', padding: '12px 20px', borderRadius: '6px', textDecoration: 'none' }}>← Dashboard</a>
        <a href="/beat-studio" style={{ backgroundColor: '#06b6d4', color: 'white', padding: '12px 20px', borderRadius: '6px', textDecoration: 'none' }}>Beat Studio →</a>
      </div>
    </div>
  );
}