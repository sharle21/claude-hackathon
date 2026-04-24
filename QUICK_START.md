# ChoiceEase: Quick Start Guide

## ⚡ 5-Minute Setup

### Prerequisites
- Node.js 18+ installed
- Your Anthropic API key (`sk-...`)

### Step 1: Install Dependencies (1 min)
```bash
npm install
```

This installs:
- `express` (web server)
- `@anthropic-sdk/sdk` (Claude API)
- `cors` (allow local requests)
- `dotenv` (environment variables)

### Step 2: Create `.env` File (1 min)
```bash
# Create a file named ".env" in this directory
# Add your API key:
ANTHROPIC_API_KEY=sk-your-actual-api-key-here
```

**⚠️ IMPORTANT:** 
- Never commit `.env` to GitHub
- Keep your API key secret
- For hackathon, paste it in the prompt: "Here's my API key for testing: sk-..."

### Step 3: Start the Server (Person A) (1 min)
```bash
npm start
# or: node server.js
```

You should see:
```
✅ ChoiceEase server running on http://localhost:3000
📝 Try: curl -X POST http://localhost:3000/api/decide ...
```

**Test it:**
```bash
curl -X POST http://localhost:3000/api/decide \
  -H "Content-Type: application/json" \
  -d '{"type":"quick","input":"should I go to the gym today?"}'
```

You should get back a JSON response with Claude's decision guidance.

### Step 4: Open Frontend (Person B) (1 min)
In a **separate terminal**:
```bash
# Open the HTML file directly in your browser
# Option 1: Click on index.html in your file explorer
# Option 2: Use VS Code "Live Server" extension
# Option 3: From terminal:
python3 -m http.server 8000
# Then visit: http://localhost:8000/index.html
```

### Step 5: Test End-to-End (1 min)
1. Open http://localhost:8000/index.html (or wherever you served it)
2. Click "Quick Decision"
3. Type "Should I drink more water?"
4. Click "Get Suggestions"
5. 🎉 You should see Claude's response!

---

## 📋 File Structure

```
choiceease/
├── package.json                 # NPM dependencies
├── .env                        # API key (don't commit!)
├── server.js                   # Express server (Person A)
├── decision_engine.js          # Claude integration (Person A)
├── index.html                  # Frontend (Person B)
├── README.md                   # This file
└── .gitignore                  # (add: .env, node_modules/)
```

---

## 🔧 How It Works

### Frontend → Backend Flow
1. User fills form on `index.html` (runs in browser)
2. Submits via `fetch()` POST to `http://localhost:3000/api/decide`
3. `server.js` receives request
4. Calls appropriate function in `decision_engine.js`
5. `decision_engine.js` calls Claude Sonnet 4 API
6. Claude returns structured guidance (plain text)
7. Response sent back to frontend
8. Frontend displays result

### Example Request
```json
{
  "type": "quick",
  "input": "Should I call my friend today?"
}
```

### Example Response
```json
{
  "success": true,
  "response": "Here are three options:\n• Yes, reach out → Connection matters. Even a quick message helps.\n• Not today, but tomorrow → Respecting your energy is valid...\n..."
}
```

---

## 🐛 Troubleshooting

### "Cannot find module '@anthropic-sdk/sdk'"
```bash
npm install
```

### "ANTHROPIC_API_KEY is not defined"
- Check `.env` file exists in the directory
- API key should be: `ANTHROPIC_API_KEY=sk-...` (no spaces)
- Restart server after creating `.env`

### "Cannot fetch from localhost:3000"
- Is the server running? Check terminal for ✅ message
- Try: `curl http://localhost:3000/health` (should return `{"status":"ok"}`)
- If it fails, server isn't running

### "Getting JSON parsing errors"
- Claude might return extra text. Check raw response in browser console (F12 → Network tab)
- If Claude's response has extra text, it's captured in the `response` field correctly

### CORS errors in browser
- Make sure `server.js` has `app.use(cors())` (it does by default)
- Refresh browser after restarting server

---

## 🚀 For the Hackathon

### What to Submit on Devpost
1. **GitHub repo** with all files (add `.gitignore` with `.env` and `node_modules/`)
2. **Demo video** (screen recording):
   - Start server with `npm start`
   - Open `index.html` in browser
   - Fill a form and show Claude's response
   - Show all 4 decision types working (~2 min video)
3. **README** (this file, updated with your team info)
4. **Writeup** (see `DEVPOST_WRITEUP.md`)

### API Usage Tips
- Each decision call = ~$0.01 (Sonnet 4 is cheap for hackathons)
- Avoid making 100s of test calls in a row
- If you hit rate limits: wait a few minutes

---

## 📚 API Reference

### POST /api/decide

**Request:**
```json
{
  "type": "quick|structured|complex|stuck",
  "input": "user's decision question",
  "options": ["option1", "option2", "option3"]  // only for structured
}
```

**Response (Success):**
```json
{
  "success": true,
  "response": "Claude's formatted response..."
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Error message"
}
```

### GET /health

Quick check if server is running.

**Response:**
```json
{
  "status": "ok",
  "message": "ChoiceEase server is running"
}
```

---

## 💡 Tips for Person A (Backend)

1. Test with `curl` before connecting frontend
2. Add console.logs to debug Claude responses
3. Keep prompt templates clear and scannable
4. If Claude times out, increase `max_tokens` (but it costs more)
5. Error handling is important—users will see your error messages

## 💡 Tips for Person B (Frontend)

1. Test form logic locally first (before backend works)
2. Use browser DevTools (F12) → Network tab to see API requests
3. Test on mobile viewport (680px) to check responsiveness
4. Keep text short and scannable
5. Don't over-style—clarity > beauty for neurodivergent users

---

## 🎯 Success Metrics

- [ ] Server starts without errors
- [ ] All 4 decision types return Claude responses
- [ ] Frontend displays responses cleanly
- [ ] No console errors in browser
- [ ] Works on mobile (680px viewport)
- [ ] Demo video is under 3 minutes
- [ ] API key is not committed to GitHub

---

## ❓ Questions?

- Check the **PRD** (`PRD_CLAUDE_DESKTOP.md`) for detailed specs
- Claude can help debug—describe the error and share relevant code

Good luck! 🚀
