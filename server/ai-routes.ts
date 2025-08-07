import type { Express } from "express";
import OpenAI from "openai";

// Initialize AI providers
const grok = new OpenAI({ 
  baseURL: "https://api.x.ai/v1", 
  apiKey: process.env.XAI_API_KEY 
});

const gemini = new OpenAI({ 
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/", 
  apiKey: process.env.GEMINI_API_KEY 
});

export function registerAIRoutes(app: Express) {
  
  // Generate beat patterns
  app.post("/api/generate-beat", async (req, res) => {
    try {
      const { genre, bpm, provider = 'grok' } = req.body;
      
      const aiClient = provider === 'gemini' ? gemini : grok;
      const model = provider === 'gemini' ? 'gemini-pro' : 'grok-2-1212';
      
      const prompt = `Generate a ${genre} beat pattern for ${bpm} BPM. Return a JSON array of 16 boolean values representing a kick drum pattern where true = hit, false = no hit. Make it sound authentic for ${genre} music.

Example format: {"pattern": [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false]}

Genre: ${genre}
BPM: ${bpm}`;

      const response = await aiClient.chat.completions.create({
        model,
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        max_tokens: 500
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      
      // Validate pattern
      if (Array.isArray(result.pattern) && result.pattern.length === 16) {
        res.json({ pattern: result.pattern, provider });
      } else {
        throw new Error('Invalid pattern generated');
      }
      
    } catch (error) {
      console.error('Beat generation error:', error);
      res.status(500).json({ error: 'Failed to generate beat' });
    }
  });

  // Generate lyrics
  app.post("/api/generate-lyrics", async (req, res) => {
    try {
      const { genre, mood, theme, provider = 'grok' } = req.body;
      
      const aiClient = provider === 'gemini' ? gemini : grok;
      const model = provider === 'gemini' ? 'gemini-pro' : 'grok-2-1212';
      
      const prompt = `Write song lyrics in ${genre} style with a ${mood} mood about ${theme}. 
      
Include:
- [Verse 1] with 4-6 lines
- [Chorus] with 4 lines  
- [Verse 2] with 4-6 lines
- [Bridge] with 2-4 lines

Make it authentic ${genre} style, ${mood} in mood, focused on the theme: ${theme}`;

      const response = await aiClient.chat.completions.create({
        model,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800
      });

      const lyrics = response.choices[0].message.content;
      
      res.json({ lyrics, provider, genre, mood, theme });
      
    } catch (error) {
      console.error('Lyrics generation error:', error);
      res.status(500).json({ error: 'Failed to generate lyrics' });
    }
  });

  // Translate code
  app.post("/api/translate-code", async (req, res) => {
    try {
      const { sourceCode, sourceLang, targetLang, provider = 'grok' } = req.body;
      
      const aiClient = provider === 'gemini' ? gemini : grok;
      const model = provider === 'gemini' ? 'gemini-pro' : 'grok-2-1212';
      
      const prompt = `Translate this ${sourceLang} code to ${targetLang}. 
      
Maintain the same functionality and logic while adapting to ${targetLang} syntax and conventions.
Include appropriate comments explaining the translation.

Source Code (${sourceLang}):
${sourceCode}

Translate to: ${targetLang}`;

      const response = await aiClient.chat.completions.create({
        model,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2000
      });

      const translatedCode = response.choices[0].message.content;
      
      res.json({ 
        translatedCode, 
        provider, 
        sourceLang, 
        targetLang,
        original: sourceCode
      });
      
    } catch (error) {
      console.error('Code translation error:', error);
      res.status(500).json({ error: 'Failed to translate code' });
    }
  });

  // AI Assistant chat
  app.post("/api/ai-chat", async (req, res) => {
    try {
      const { message, history = [], provider = 'grok' } = req.body;
      
      const aiClient = provider === 'gemini' ? gemini : grok;
      const model = provider === 'gemini' ? 'gemini-pro' : 'grok-2-1212';
      
      const systemPrompt = `You are CodedSwitch AI Assistant, an expert in both programming and music creation. 
      
You help users with:
- Code debugging and optimization
- Music theory and composition
- Beat creation and rhythm patterns
- Code-to-music transformations
- Programming language translations
- Audio synthesis and production techniques

Be helpful, concise, and technical when appropriate. Focus on practical solutions.`;

      const messages = [
        { role: "system", content: systemPrompt },
        ...history.slice(-10), // Keep last 10 messages for context
        { role: "user", content: message }
      ];

      const response = await aiClient.chat.completions.create({
        model,
        messages,
        max_tokens: 1000
      });

      const reply = response.choices[0].message.content;
      
      res.json({ 
        reply, 
        provider,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('AI chat error:', error);
      res.status(500).json({ error: 'Failed to process chat message' });
    }
  });

  // Generate code-to-music mapping
  app.post("/api/code-to-music", async (req, res) => {
    try {
      const { code, language, scale = 'C Major', provider = 'grok' } = req.body;
      
      const aiClient = provider === 'gemini' ? gemini : grok;
      const model = provider === 'gemini' ? 'gemini-pro' : 'grok-2-1212';
      
      const prompt = `Analyze this ${language} code and create a musical mapping in ${scale} scale.

Map code elements to music:
- Functions → Bass notes
- Variables → Melody notes  
- Loops → Repeated patterns
- Conditionals → Chord changes
- Comments → Rests

Return JSON with:
- analysis: object with counts of each element
- musical_mapping: object explaining the mapping
- composition: array of musical events with timing

Code:
${code}`;

      const response = await aiClient.chat.completions.create({
        model,
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        max_tokens: 1500
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      
      res.json({ 
        ...result,
        provider,
        language,
        scale,
        originalCode: code
      });
      
    } catch (error) {
      console.error('Code-to-music error:', error);
      res.status(500).json({ error: 'Failed to analyze code for music generation' });
    }
  });
}