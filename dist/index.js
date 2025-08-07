// server/index.ts
import express2 from "express";
import path3 from "path";
import { fileURLToPath as fileURLToPath2 } from "url";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users = /* @__PURE__ */ new Map();
  projects = /* @__PURE__ */ new Map();
  codeTranslations = /* @__PURE__ */ new Map();
  musicGenerations = /* @__PURE__ */ new Map();
  // User operations
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }
  async getUserByEmail(email) {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = {
      ...insertUser,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.users.set(id, user);
    return user;
  }
  // Project operations
  async getProject(id) {
    return this.projects.get(id);
  }
  async getUserProjects(userId) {
    return Array.from(this.projects.values()).filter((project) => project.userId === userId);
  }
  async createProject(insertProject) {
    const id = randomUUID();
    const project = {
      ...insertProject,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date(),
      isPublic: insertProject.isPublic ?? null
    };
    this.projects.set(id, project);
    return project;
  }
  async updateProject(id, updates) {
    const project = this.projects.get(id);
    if (!project) return void 0;
    const updatedProject = {
      ...project,
      ...updates,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }
  async deleteProject(id) {
    return this.projects.delete(id);
  }
  // Code translation operations
  async getCodeTranslation(id) {
    return this.codeTranslations.get(id);
  }
  async getUserCodeTranslations(userId) {
    return Array.from(this.codeTranslations.values()).filter(
      (translation) => translation.userId === userId
    );
  }
  async createCodeTranslation(insertTranslation) {
    const id = randomUUID();
    const translation = {
      ...insertTranslation,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      userId: insertTranslation.userId ?? null
    };
    this.codeTranslations.set(id, translation);
    return translation;
  }
  // Music generation operations
  async getMusicGeneration(id) {
    return this.musicGenerations.get(id);
  }
  async getUserMusicGenerations(userId) {
    return Array.from(this.musicGenerations.values()).filter(
      (generation) => generation.userId === userId
    );
  }
  async createMusicGeneration(insertGeneration) {
    const id = randomUUID();
    const generation = {
      ...insertGeneration,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      userId: insertGeneration.userId ?? null
    };
    this.musicGenerations.set(id, generation);
    return generation;
  }
};
var storage = new MemStorage();

// server/routes.ts
import { z } from "zod";

// server/gemini.ts
import { GoogleGenAI } from "@google/genai";
var ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
async function translateCodeWithGemini(sourceCode, sourceLanguage, targetLanguage) {
  const prompt = `Translate the following ${sourceLanguage} code to ${targetLanguage}. Only return the translated code without explanations:

${sourceCode}`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
  });
  return response.text || "Translation failed";
}
async function generateLyricsWithGemini(prompt, mood = "neutral", genre = "pop") {
  const systemPrompt = `You are a talented lyricist. Generate lyrics based on the given prompt with the specified mood and genre.
Mood: ${mood}
Genre: ${genre}

Generate complete song lyrics with verses, chorus, and bridge sections.`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    config: {
      systemInstruction: systemPrompt
    },
    contents: prompt
  });
  return response.text || "Lyric generation failed";
}
async function generateBeatWithGemini(style, tempo = 120) {
  try {
    const systemPrompt = `You are a music producer. Generate a beat pattern for the style "${style}" at ${tempo} BPM.
Return a JSON object with:
- pattern: array of 16 numbers (0 or 1) representing the beat pattern
- tempo: the BPM
- samples: array of drum sample names
- description: brief description of the beat

Respond with valid JSON only.`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            pattern: { type: "array", items: { type: "number" } },
            tempo: { type: "number" },
            samples: { type: "array", items: { type: "string" } },
            description: { type: "string" }
          },
          required: ["pattern", "tempo", "samples", "description"]
        }
      },
      contents: `Generate a ${style} beat at ${tempo} BPM`
    });
    const rawJson = response.text;
    if (rawJson) {
      const data = JSON.parse(rawJson);
      return data;
    } else {
      throw new Error("Empty response from model");
    }
  } catch (error) {
    throw new Error(`Failed to generate beat: ${error}`);
  }
}
async function convertCodeToMusicWithGemini(code, language) {
  try {
    const systemPrompt = `You are a creative AI that converts code structures into musical patterns.
Analyze the given ${language} code and convert it to music by:
- Converting variable names, function calls, and structure into melody notes (MIDI numbers 60-84)
- Converting loops, conditions, and flow control into rhythm patterns (0s and 1s)
- Determining musical key and tempo based on code complexity

Return JSON with:
- melody: array of MIDI note numbers (60-84)
- rhythm: array of 0s and 1s for rhythm pattern
- tempo: BPM based on code complexity
- key: musical key (like "C major", "A minor")
- description: explanation of the conversion process

Respond with valid JSON only.`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            melody: { type: "array", items: { type: "number" } },
            rhythm: { type: "array", items: { type: "number" } },
            tempo: { type: "number" },
            key: { type: "string" },
            description: { type: "string" }
          },
          required: ["melody", "rhythm", "tempo", "key", "description"]
        }
      },
      contents: `Convert this ${language} code to music:

${code}`
    });
    const rawJson = response.text;
    if (rawJson) {
      const data = JSON.parse(rawJson);
      return data;
    } else {
      throw new Error("Empty response from model");
    }
  } catch (error) {
    throw new Error(`Failed to convert code to music: ${error}`);
  }
}
async function getAIAssistanceWithGemini(message, context = "") {
  const systemPrompt = `You are an AI assistant specialized in both programming and music creation. 
Help users with coding questions, music theory, creative projects, and the intersection of technology and music.
Be helpful, creative, and provide practical advice.

${context ? `Context: ${context}` : ""}`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    config: {
      systemInstruction: systemPrompt
    },
    contents: message
  });
  return response.text || "I'm having trouble responding right now. Please try again.";
}

// server/grok.ts
import OpenAI from "openai";
var openai = new OpenAI({ baseURL: "https://api.x.ai/v1", apiKey: process.env.XAI_API_KEY });
async function translateCodeWithGrok(sourceCode, sourceLanguage, targetLanguage) {
  const prompt = `Translate the following ${sourceLanguage} code to ${targetLanguage}. Only return the translated code without explanations:

${sourceCode}`;
  const response = await openai.chat.completions.create({
    model: "grok-2-1212",
    messages: [{ role: "user", content: prompt }]
  });
  return response.choices[0].message.content || "Translation failed";
}
async function generateLyricsWithGrok(prompt, mood = "neutral", genre = "pop") {
  const systemPrompt = `You are a talented and witty lyricist with Grok's signature humor and creativity. Generate lyrics based on the given prompt with the specified mood and genre.
Mood: ${mood}
Genre: ${genre}

Generate complete song lyrics with verses, chorus, and bridge sections. Add some clever wordplay and unexpected twists that make the lyrics memorable.`;
  const response = await openai.chat.completions.create({
    model: "grok-2-1212",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt }
    ]
  });
  return response.choices[0].message.content || "Lyric generation failed";
}
async function generateBeatWithGrok(style, tempo = 120) {
  try {
    const response = await openai.chat.completions.create({
      model: "grok-2-1212",
      messages: [
        {
          role: "system",
          content: `You are a music producer with Grok's creative flair. Generate a beat pattern for the style "${style}" at ${tempo} BPM.
Return a JSON object with:
- pattern: array of 16 numbers (0 or 1) representing the beat pattern
- tempo: the BPM
- samples: array of drum sample names
- description: brief description of the beat with some witty commentary

Respond with JSON in this format: { "pattern": [array], "tempo": number, "samples": [array], "description": "string" }`
        },
        {
          role: "user",
          content: `Generate a ${style} beat at ${tempo} BPM`
        }
      ],
      response_format: { type: "json_object" }
    });
    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      pattern: Array.isArray(result.pattern) ? result.pattern : [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      tempo: typeof result.tempo === "number" ? result.tempo : tempo,
      samples: Array.isArray(result.samples) ? result.samples : ["kick", "snare", "hihat"],
      description: typeof result.description === "string" ? result.description : `A groovy ${style} beat at ${tempo} BPM`
    };
  } catch (error) {
    throw new Error(`Failed to generate beat: ${error}`);
  }
}
async function convertCodeToMusicWithGrok(code, language) {
  try {
    const response = await openai.chat.completions.create({
      model: "grok-2-1212",
      messages: [
        {
          role: "system",
          content: `You are a creative AI with Grok's innovative thinking that converts code structures into musical patterns.
Analyze the given ${language} code and convert it to music by:
- Converting variable names, function calls, and structure into melody notes (MIDI numbers 60-84)
- Converting loops, conditions, and flow control into rhythm patterns (0s and 1s)
- Determining musical key and tempo based on code complexity
- Add some creative interpretation that makes the music interesting

Return JSON with:
- melody: array of MIDI note numbers (60-84)
- rhythm: array of 0s and 1s for rhythm pattern
- tempo: BPM based on code complexity
- key: musical key (like "C major", "A minor")
- description: explanation of the conversion process with some witty observations

Respond with JSON in this format: { "melody": [array], "rhythm": [array], "tempo": number, "key": "string", "description": "string" }`
        },
        {
          role: "user",
          content: `Convert this ${language} code to music:

${code}`
        }
      ],
      response_format: { type: "json_object" }
    });
    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      melody: Array.isArray(result.melody) ? result.melody : [60, 62, 64, 65, 67, 69, 71, 72],
      rhythm: Array.isArray(result.rhythm) ? result.rhythm : [1, 0, 1, 0, 1, 0, 1, 0],
      tempo: typeof result.tempo === "number" ? result.tempo : 120,
      key: typeof result.key === "string" ? result.key : "C major",
      description: typeof result.description === "string" ? result.description : "A musical interpretation of your code"
    };
  } catch (error) {
    throw new Error(`Failed to convert code to music: ${error}`);
  }
}
async function getAIAssistanceWithGrok(message, context = "") {
  const systemPrompt = `You are Grok, an AI assistant with wit, humor, and deep knowledge of both programming and music creation.
Help users with coding questions, music theory, creative projects, and the intersection of technology and music.
Be helpful, creative, and don't be afraid to add some humor and personality to your responses.
You're like having a brilliant, slightly sarcastic friend who happens to know everything about code and music.

${context ? `Context: ${context}` : ""}`;
  const response = await openai.chat.completions.create({
    model: "grok-2-1212",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message }
    ]
  });
  return response.choices[0].message.content || "I'm having trouble responding right now. Please try again.";
}

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow()
});
var projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  type: text("type").notNull(),
  // 'code', 'music', 'codebeat'
  content: jsonb("content").notNull(),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var codeTranslations = pgTable("code_translations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  sourceLanguage: text("source_language").notNull(),
  targetLanguage: text("target_language").notNull(),
  sourceCode: text("source_code").notNull(),
  translatedCode: text("translated_code").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var musicGenerations = pgTable("music_generations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  type: text("type").notNull(),
  // 'lyrics', 'beat', 'melody', 'codebeat'
  prompt: text("prompt").notNull(),
  result: jsonb("result").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true
});
var insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertCodeTranslationSchema = createInsertSchema(codeTranslations).omit({
  id: true,
  createdAt: true
});
var insertMusicGenerationSchema = createInsertSchema(musicGenerations).omit({
  id: true,
  createdAt: true
});

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app2.get("/api/ai/providers", (req, res) => {
    const providers = [
      {
        id: "grok",
        name: "xAI Grok",
        description: "Creative AI with wit, humor, and innovative thinking",
        features: ["Code Translation", "Lyric Generation", "Beat Creation", "Code-to-Music", "AI Assistant"],
        available: !!process.env.XAI_API_KEY
      },
      {
        id: "gemini",
        name: "Google Gemini",
        description: "Multimodal AI with strong creative and analytical capabilities",
        features: ["Code Translation", "Lyric Generation", "Beat Creation", "Code-to-Music", "AI Assistant"],
        available: !!process.env.GEMINI_API_KEY
      }
    ];
    console.log("API Keys Check:", {
      XAI_API_KEY: !!process.env.XAI_API_KEY,
      GEMINI_API_KEY: !!process.env.GEMINI_API_KEY,
      providers: providers.map((p) => ({ id: p.id, available: p.available }))
    });
    res.json(providers);
  });
  app2.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      res.status(400).json({
        message: "Failed to create user",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch user",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/code/translate", async (req, res) => {
    try {
      const schema = z.object({
        sourceCode: z.string().min(1),
        sourceLanguage: z.string().min(1),
        targetLanguage: z.string().min(1),
        userId: z.string().optional(),
        aiProvider: z.enum(["gemini", "grok"]).default("grok")
      });
      const { sourceCode, sourceLanguage, targetLanguage, userId, aiProvider } = schema.parse(req.body);
      let result;
      switch (aiProvider) {
        case "gemini":
          result = await translateCodeWithGemini(sourceCode, sourceLanguage, targetLanguage);
          break;
        default:
          result = await translateCodeWithGrok(sourceCode, sourceLanguage, targetLanguage);
      }
      const translatedCodeResult = typeof result === "string" ? result : result.translatedCode;
      if (userId) {
        const translation = await storage.createCodeTranslation({
          userId,
          sourceLanguage,
          targetLanguage,
          sourceCode,
          translatedCode: translatedCodeResult
        });
        res.json({ translatedCode: translatedCodeResult, id: translation.id });
      } else {
        res.json({ translatedCode: translatedCodeResult });
      }
    } catch (error) {
      res.status(500).json({
        message: "Failed to translate code",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.get("/api/users/:userId/translations", async (req, res) => {
    try {
      const translations = await storage.getUserCodeTranslations(req.params.userId);
      res.json(translations);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch translations",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/lyrics/generate", async (req, res) => {
    try {
      const schema = z.object({
        prompt: z.string().min(1),
        genre: z.string().optional(),
        mood: z.string().optional(),
        userId: z.string().optional(),
        aiProvider: z.enum(["gemini", "grok"]).default("grok")
      });
      const { prompt, genre, mood, userId, aiProvider } = schema.parse(req.body);
      let result;
      switch (aiProvider) {
        case "gemini":
          result = { lyrics: await generateLyricsWithGemini(prompt, mood, genre) };
          break;
        default:
          result = { lyrics: await generateLyricsWithGrok(prompt, mood, genre) };
      }
      if (userId) {
        const generation = await storage.createMusicGeneration({
          userId,
          type: "lyrics",
          prompt,
          result
        });
        res.json({ ...result, id: generation.id });
      } else {
        res.json(result);
      }
    } catch (error) {
      res.status(500).json({
        message: "Failed to generate lyrics",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/lyrics/analyze", async (req, res) => {
    try {
      const schema = z.object({
        lyrics: z.string().min(1)
      });
      const { lyrics } = schema.parse(req.body);
      const result = await generateLyricsWithGrok(`Analyze these lyrics: ${lyrics}`, "analytical", "analysis");
      res.json(result);
    } catch (error) {
      res.status(500).json({
        message: "Failed to analyze lyrics",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/beat/generate", async (req, res) => {
    try {
      const schema = z.object({
        genre: z.string().min(1),
        bpm: z.number().min(60).max(200),
        duration: z.number().min(1).max(300),
        userId: z.string().optional(),
        aiProvider: z.enum(["gemini", "grok"]).default("grok")
      });
      const { genre, bpm, duration, userId, aiProvider } = schema.parse(req.body);
      let result;
      switch (aiProvider) {
        case "gemini":
          result = await generateBeatWithGemini(genre, bpm);
          break;
        default:
          result = await generateBeatWithGrok(genre, bpm);
      }
      if (userId) {
        const generation = await storage.createMusicGeneration({
          userId,
          type: "beat",
          prompt: `${genre} beat at ${bpm} BPM`,
          result
        });
        res.json({ ...result, id: generation.id });
      } else {
        res.json(result);
      }
    } catch (error) {
      res.status(500).json({
        message: "Failed to generate beat",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/codebeat/convert", async (req, res) => {
    try {
      const schema = z.object({
        code: z.string().min(1),
        language: z.string().min(1),
        userId: z.string().optional(),
        aiProvider: z.enum(["gemini", "grok"]).default("grok")
      });
      const { code, language, userId, aiProvider } = schema.parse(req.body);
      let result;
      switch (aiProvider) {
        case "gemini":
          result = await convertCodeToMusicWithGemini(code, language);
          break;
        default:
          result = await convertCodeToMusicWithGrok(code, language);
      }
      if (userId) {
        const generation = await storage.createMusicGeneration({
          userId,
          type: "codebeat",
          prompt: `Convert ${language} code to music`,
          result
        });
        res.json({ ...result, id: generation.id });
      } else {
        res.json(result);
      }
    } catch (error) {
      res.status(500).json({
        message: "Failed to convert code to music",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/ai/assist", async (req, res) => {
    try {
      const schema = z.object({
        question: z.string().min(1),
        context: z.string().optional(),
        aiProvider: z.enum(["gemini", "grok"]).default("grok")
      });
      const { question, context, aiProvider } = schema.parse(req.body);
      let result;
      switch (aiProvider) {
        case "gemini":
          result = { answer: await getAIAssistanceWithGemini(question, context) };
          break;
        default:
          result = { answer: await getAIAssistanceWithGrok(question, context) };
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({
        message: "Failed to get AI assistance",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/projects", async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      res.json(project);
    } catch (error) {
      res.status(400).json({
        message: "Failed to create project",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.get("/api/users/:userId/projects", async (req, res) => {
    try {
      const projects2 = await storage.getUserProjects(req.params.userId);
      res.json(projects2);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch projects",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.get("/api/users/:userId/music-generations", async (req, res) => {
    try {
      const generations = await storage.getUserMusicGenerations(req.params.userId);
      res.json(generations);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch music generations",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var vite_config_default = defineConfig({
  plugins: [react()],
  root: "client",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}

// server/index.ts
var __filename = fileURLToPath2(import.meta.url);
var __dirname2 = path3.dirname(__filename);
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    const publicPath = path3.join(__dirname2, "public");
    app.use(express2.static(publicPath, {
      maxAge: "1d",
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".css")) {
          res.setHeader("Content-Type", "text/css; charset=UTF-8");
          log(`CSS file served: ${filePath}`);
        }
      }
    }));
    app.get("*", (req, res) => {
      res.sendFile(path3.join(publicPath, "index.html"));
    });
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
