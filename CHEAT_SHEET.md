# ChoiceEase: Hackathon Cheat Sheet 🚀

## 60-Minute Timeline

| Time | Task | Owner | Status |
|------|------|-------|--------|
| **0-5** | `npm install` + create `.env` + test `node server.js` | Person A | ⬜ |
| **5-20** | Build & test `decision_engine.js` (test with curl) | Person A | ⬜ |
| **5-20** | Build `index.html` + CSS + form logic | Person B | ⬜ |
| **20-30** | Frontend calls backend API + display response | Both | ⬜ |
| **30-45** | Test all 4 decision types + polish UI | Both | ⬜ |
| **45-55** | Screen recording for demo video | Both | ⬜ |
| **55-60** | Final Devpost writeup + submit | Both | ⬜ |

---

## Person A: Backend Checklist

### Setup (5 min)
```bash
npm install
echo "ANTHROPIC_API_KEY=sk-YOUR-KEY" > .env
node server.js
# Should see: ✅ ChoiceEase server running on http://localhost:3000
```

### Build `decision_engine.js` (10 min)
- ✅ Import Anthropic SDK
- ✅ Create 4 functions:
  - `quickDecision(input)`
  - `structuredComparison(decision, options[])`
  - `complexDecision(input)`
  - `generateOptions(input)`
- ✅ Each function calls Claude Sonnet 4
- ✅ Each returns plain text (not JSON)

### Test with curl (5 min)
```bash
curl -X POST http://localhost:3000/api/decide \
  -H "Content-Type: application/json" \
  -d '{"type":"quick","input":"should I work out?"}'
```
Should return: `{"success":true,"response":"..."}`

### Key Prompt Pattern
All prompts follow this structure:
```
You are a supportive decision assistant for neurodivergent individuals.

User's decision: "{userInput}"

Provide [specific structure]:
[numbered steps or bullet points]

Format: Use bullet points. Keep it under 150 words.
```

---

## Person B: Frontend Checklist

### Structure (5 min)
- ✅ One `index.html` with embedded CSS + JS (no build step)
- ✅ 5 screens: Home → Decision Type → Input → Loading → Result
- ✅ All logic in vanilla JavaScript (no frameworks)

### Screens to Build (10 min each)
1. **Home** — 4 buttons for decision types + disclaimer
2. **Quick Decision** — Textarea input + submit
3. **Structured Comparison** — Decision + options inputs
4. **Complex Decision** — Large textarea input
5. **I'm Stuck** — Large textarea input
6. **Result** — Display Claude response + back button

### API Integration (5 min)
```javascript
const response = await fetch('http://localhost:3000/api/decide', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ type, input, options })
});
const data = await response.json();
document.getElementById('result').textContent = data.response;
```

### Key CSS Classes
- `.screen` — page/section (only one has `.active`)
- `.submit-btn` — styled button
- `.result-box` — bordered container for Claude response
- `.disclaimer` — small gray text at bottom

### Mobile Test
- Browser DevTools → Toggle device toolbar
- Set width to 375px
- Verify readable and clickable

---

## Key Files

| File | Owner | Lines | Purpose |
|------|-------|-------|---------|
| `server.js` | Person A | ~50 | Express routes |
| `decision_engine.js` | Person A | ~80 | Claude prompts + calls |
| `index.html` | Person B | ~400 | Frontend (HTML+CSS+JS) |
| `.env` | Both | 1 | `ANTHROPIC_API_KEY=sk-...` |

---

## API Endpoint

### POST /api/decide
```json
{
  "type": "quick|structured|complex|stuck",
  "input": "decision question",
  "options": ["A", "B", "C"]
}
```

Response:
```json
{
  "success": true,
  "response": "Claude's formatted response"
}
```

---

## Common Errors & Fixes

| Error | Fix |
|-------|-----|
| "Cannot find module '@anthropic-sdk/sdk'" | `npm install` |
| "ANTHROPIC_API_KEY is undefined" | Create `.env` file with key |
| "Cannot fetch from localhost:3000" | Is server running? `npm start` |
| "Weird characters in response" | Claude output is fine; it's plain text |
| "Page won't load" | Is `index.html` being served? Try `python3 -m http.server 8000` |

---

## Quick Testing

### Backend Only (curl)
```bash
curl -X POST http://localhost:3000/api/decide \
  -H "Content-Type: application/json" \
  -d '{"type":"quick","input":"should I rest?"}'
```

### Frontend Only (before backend)
- Open `index.html` directly
- Test form validation (submit button disabled until input filled)
- Test screen navigation (Home → Quick Decision → Result)

### End-to-End
1. Run `npm start` in one terminal
2. Serve `index.html` in another terminal
3. Open http://localhost:8000/index.html
4. Fill form and submit
5. See Claude response appear

---

## Devpost Submission

### Required
- [ ] GitHub repo link
- [ ] Demo video (screen recording, <3 min)
- [ ] Writeup (copy from `DEVPOST_WRITEUP.md`)

### Nice-to-Have
- [ ] Clean code with comments
- [ ] `.gitignore` with `.env` and `node_modules/`
- [ ] Working API key in demo

### What to Show in Video
1. Start server: `npm start`
2. Open `index.html` in browser
3. Click "Quick Decision" → fill form → show result
4. Click "Structured Comparison" → show result
5. Mention: "All 4 decision types work"
6. End with: "Built for neurodivergent users experiencing decision fatigue"

---

## Winning Tips

1. **Claude is your MVP** — Great prompts > polished UI
2. **Test early** — Don't wait until the end
3. **Keep it simple** — Vanilla JS, no dependencies needed
4. **Accessibility first** — Clear text, good contrast, no flashing
5. **Document assumptions** — "Why did you make this choice?"
6. **Be honest about safeguards** — "What could go wrong? Here's how we handle it."

---

## Resources

- **PRD:** `PRD_CLAUDE_DESKTOP.md` (detailed specs)
- **Setup:** `QUICK_START.md` (step-by-step guide)
- **README:** `README.md` (full project documentation)
- **Prompts:** Copy from `decision_engine.js`
- **Design:** See `index.html` inline styles

---

## Team Communication

### Person A Pings
- "Backend ready for testing" → Person B can start calling API
- "Added new decision type" → Person B adds button in home screen
- "Claude is timing out" → Check `max_tokens`, might need to reduce output length

### Person B Pings
- "Frontend structure done, ready to integrate" → Person A runs `npm start`
- "Getting 404 on /api/decide" → Check server running + POST endpoint path
- "Need to shorten Claude responses" → Person A updates prompt (remove details)

---

## Good Luck! 🚀

Remember: **The goal is a working prototype, not perfection.**

If you finish early, polish:
- Better error messages
- Loading animations (subtle)
- Mobile responsiveness testing
- Copy refinement (make it more supportive)
- Add a "Try another decision" button without page reset

You've got this! 💪
