# URGENT: Render Deployment Fix Required

## Current Issue
Your Render deployment is failing because the build command can't find `vite` and `esbuild`.

## IMMEDIATE FIX NEEDED IN RENDER DASHBOARD

### Step 1: Update Build Command
Go to your Render dashboard → Your CodedSwitch service → Settings → Build & Deploy

**Replace the current build command with:**
```bash
npm ci && npx vite build && npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
```

**Keep the start command as:**
```bash
npm start
```

### Step 2: Set Environment Variables
In Render dashboard → Environment Variables, add:
- `XAI_API_KEY` = Your xAI API key (the one that works in Replit)
- `GEMINI_API_KEY` = Your Google Gemini API key
- `DATABASE_URL` = Your Neon Database connection string
- `NODE_ENV` = production

### Step 3: Redeploy
Click "Manual Deploy" to trigger a new build with the fixed command.

## Why This Fixes It
The `npx` prefix tells Node.js to look for build tools in your project's node_modules folder, even when they're in devDependencies.

## Your Audio System Status
✅ All audio improvements are in your GitHub repository
✅ xAI Grok integration is working
✅ Tone.js synthesized drums are implemented
✅ Web Audio API compliance with Start Audio buttons

Once you update the build command in Render, your complete CodedSwitch platform will deploy successfully.