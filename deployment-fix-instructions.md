# CRITICAL: Fix Render Build Command

## Issue
Render is misinterpreting the build command. You need to set the COMPLETE command.

## EXACT BUILD COMMAND TO USE
Copy this ENTIRE command into your Render dashboard:

```
npm ci && npx vite build --config vite.config.prod.ts && npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
```

## Steps
1. Go to Render dashboard
2. Your service → Settings → Build & Deploy  
3. DELETE the current build command completely
4. PASTE the full command above
5. Save and redeploy

## Start Command
Keep this as:
```
npm start
```

## Environment Variables
- XAI_API_KEY
- GEMINI_API_KEY  
- DATABASE_URL
- NODE_ENV = production

The issue was that Render got only part of the command. You need the FULL command with npm ci at the beginning.