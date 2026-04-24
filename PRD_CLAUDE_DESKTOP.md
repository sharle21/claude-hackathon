# ChoiceEase: Decision Fatigue Bot - PRD for Claude Desktop
**For 2-person hackathon team | 1 hour to MVP**

---

## Overview
**ChoiceEase** is a Claude-powered decision assistant designed for neurodivergent users experiencing decision fatigue. It runs on **Claude Desktop** using Claude Code, allowing for rapid iteration and real-world testing.

**Target Users:** Neurodivergent individuals (ADHD, autism, anxiety) who experience analysis paralysis or executive dysfunction around daily/complex decisions.

**Core Value Prop:** Reduce decision fatigue by providing structured frameworks + Claude's intelligent guidance (not just decision trees—actual reasoning).

---

## Technical Stack
- **Claude Desktop** (already installed)
- **Claude Code** (terminal-based agentic coding)
- **Node.js** (backend for API calls)
- **Simple HTML/CSS/Vanilla JS** (no build step needed; can be served locally)
- **Anthropic API** (claude-sonnet-4-20250514)

---

## Team Split (Person A & Person B)

### Person A: Backend + Claude Integration (30 mins)
**Goal:** Build the decision engine that calls Claude API with tailored prompts.

**Deliverables:**
1. Create `decision_engine.js`:
   - Initialize Anthropic client (uses env var `ANTHROPIC_API_KEY`)
   - Build 4 decision prompt templates:
     - `quickDecision(userInput)` → returns structured 3-option response
     - `structuredComparison(decision, options[])` → pros/cons/effort for each
     - `complexDecision(userInput)` → values + options alignment
     - `generateOptions(userInput)` → creative option generation
   - Each function calls Claude Sonnet 4, returns plain text (formatted for scanning)
   - Error handling: graceful fallback messages

2. Create `server.js` (Express):
   - Simple Node.js server on `localhost:3000`
   - Endpoint `/api/decide` accepts POST with `{ type, input, options }`
   - Calls appropriate function from `decision_engine.js`
   - Returns JSON: `{ success: bool, response: string, error?: string }`
   - CORS enabled for local testing

3. Test locally:
   - `curl -X POST http://localhost:3000/api/decide -H "Content-Type: application/json" -d '{"type": "quick", "input": "should I go to the gym?"}'`
   - Verify Claude responds with structured guidance

**Key Constraints:**
- No external dependencies beyond `express` and `@anthropic-sdk/sdk`
- Prompts must ask Claude to output plain text (not JSON) to avoid parsing issues
- Each prompt should include: "Keep it brief. Use bullet points. Acknowledge there's no perfect answer."

---

### Person B: Frontend + UX (30 mins)
**Goal:** Build a clean, accessible interface that neurodivergent users won't find overwhelming.

**Deliverables:**
1. Create `index.html`:
   - Single-page app (no React/build step)
   - 5 screens: Home → Decision Type → Input → Loading → Result
   - Navigation via simple state machine (no routing library)
   - Vanilla JS to handle form submission and API calls

2. Home Screen:
   - Title: "ChoiceEase"
   - Subtitle: "A decision-making assistant for overwhelmed brains"
   - 4 buttons (no cards/fluff):
     - "⚡ Quick Decision" → "Need a fast answer? Get 3 options in 30 seconds."
     - "📋 Structured Comparison" → "Compare options with pros, cons & effort levels."
     - "🧩 Complex Decision" → "Big decisions with values alignment."
     - "🤔 I'm Stuck" → "Generate new options when you're blank."
   - Footer: Disclaimer in 12px gray text

3. Input Screens (one template for all):
   - Back button (← Home)
   - Title + brief explanation (1 sentence)
   - Textarea for user input (placeholder text specific to each type)
   - For "Structured Comparison": secondary input for "Options (comma-separated)"
   - Submit button (disabled until input filled)
   - Loading state: "Thinking..." or "Analyzing..."

4. Result Screen:
   - Back button (← New Decision)
   - Response from Claude in a left-bordered box (readable, scannable)
   - Footer reminder: "💡 This is just a framework. Your gut feeling matters."
   - No clutter, no extra UI

5. Styling:
   - Simple CSS (no Tailwind, no build step)
   - Colors: light grays, one accent color (blue for buttons)
   - Font: system fonts (San Francisco, Segoe UI fallback)
   - Mobile-responsive: stack on small screens, max-width 600px on desktop
   - Accessibility: proper semantic HTML, ARIA labels where needed
   - **Sensory-friendly:** no animations, no hover effects that distract, good contrast

6. API Integration:
   - On form submit, POST to `http://localhost:3000/api/decide`
   - Show loading spinner / text
   - Display response in Result screen
   - Error state: show user-friendly error message + "Try again" button

**Key Constraints:**
- NO external JS libraries (except maybe `fetch` polyfill if needed—use native fetch)
- NO CSS framework—write plain CSS in `<style>` tag
- Keep HTML under 500 lines total
- Images: none (text-only, clean)
- Responsive design: test on mobile (680px viewport)

---

## MVP Feature List (In Order of Priority)

### MVP 1 (Both ready in 30 mins):
- [ ] **Person A:** Backend server + 4 Claude decision functions working
- [ ] **Person B:** HTML home page + one working input screen + result display
- [ ] **Integration:** Frontend calls backend API, displays Claude response

### MVP 2 (Next 15 mins, whichever person finishes first):
- [ ] All 4 decision types fully wired (Quick, Structured, Complex, Stuck)
- [ ] Improved UX: clear transitions between screens
- [ ] Error handling on frontend

### MVP 3 (If time, polish):
- [ ] Mobile responsiveness tested
- [ ] Better loading states
- [ ] Disclaimer/safety info clearly visible
- [ ] Copy refinement (language that feels supportive, not clinical)

---

## File Structure
```
choiceease/
├── package.json
├── server.js              (Person A)
├── decision_engine.js     (Person A)
├── index.html             (Person B)
├── styles.css             (Person B)
├── app.js                 (Person B - vanilla JS for form handling)
└── .env                   (ANTHROPIC_API_KEY=sk-...)
```

---

## Quick Start (First 5 Minutes)

### Person A:
```bash
cd choiceease
npm init -y
npm install express @anthropic-sdk/sdk cors dotenv
# Create server.js, decision_engine.js
# Test: node server.js → should see "Server running on :3000"
```

### Person B:
```bash
# In same directory, create:
# - index.html (with <style> and <script> inline)
# - app.js (vanilla JS)
# 
# Open index.html in browser during development
# (Can test frontend static first, then integrate API calls)
```

### Integration (Minute 10):
- Person A confirms `/api/decide` endpoint works
- Person B adds fetch call in `app.js`
- Test: fill form on frontend → see Claude response

---

## Prompt Templates (Person A Reference)

### 1. Quick Decision
```
You are a supportive decision-making assistant for neurodivergent individuals who experience decision fatigue.

The user needs help deciding: "{userInput}"

Provide:
1. Three simple options or a clear recommendation
2. One key reason for each option (be concise—2-3 words)
3. A gentle nudge toward what might work best
4. A reminder that there's no "perfect" answer

Format: Use bullet points. Keep it under 150 words. Be direct, not flowery.
```

### 2. Structured Comparison
```
You are a supportive decision-making assistant for neurodivergent individuals.

Decision: "{decision}"
Options: {options joined by comma}

For each option, provide:
- A 1-sentence summary
- 2-3 pros (bullet points)
- 2-3 cons (bullet points)
- Difficulty/effort: Easy / Moderate / Hard

Then give a 1-paragraph gentle recommendation based on reducing overwhelm.

Format: Use bullet points. Keep each section scannable. No walls of text.
```

### 3. Complex Decision
```
You are a supportive decision-making assistant for neurodivergent individuals.

Complex decision: "{userInput}"

Help break this down:
1. Identify 2-3 core values or priorities that likely matter (based on what user said)
2. List 3-4 realistic options
3. For each option, rate how well it aligns with their values (1-5 scale)
4. Summarize the clearest path forward in one paragraph

Remember: Neurodivergent individuals benefit from clear structure, permission to change their mind, and acknowledgment that some decisions create other decisions (and that's normal).

Format: Numbered steps. Bullet points. Keep text scannable. No jargon.
```

### 4. I'm Stuck (Generate Options)
```
The user is stuck and needs help generating options for: "{userInput}"

Suggest 5-6 creative but practical options they might not have considered. For each:
- Brief description (1 sentence)
- One key benefit
- One realistic barrier

Include at least one "unconventional" option they might not think of.

Format: Numbered list. One paragraph per option. Be creative but realistic.
```

---

## Testing Checklist (Last 5 Minutes)

### Person A:
- [ ] Server starts without errors
- [ ] `/api/decide` endpoint responds to POST requests
- [ ] Claude API calls complete (check network logs)
- [ ] Response format is clean text (not JSON)
- [ ] Error handling works (test with invalid API key)

### Person B:
- [ ] All 4 decision types accessible from home
- [ ] Form submission works without errors
- [ ] Loading state displays
- [ ] Result screen shows Claude response clearly
- [ ] Back button resets form
- [ ] Mobile view looks reasonable (use browser DevTools)

### Integration:
- [ ] Submit form on frontend → Claude response appears
- [ ] All 4 decision types produce relevant responses
- [ ] No console errors
- [ ] Works offline gracefully (error message if API fails)

---

## Safeguards & Disclaimers

### Built-in Safeguards:
1. **Disclaimer on home page:** "This tool reduces cognitive load, not your judgment. You know yourself best."
2. **System prompts:** All Claude calls include "there's no perfect answer" language
3. **Output format:** Structured, scannable output to prevent misinterpretation
4. **Scope clarity:** Each decision type is labeled (daily decisions vs. complex decisions)

### Not In Scope (But Mention in Devpost):
- Medical/psychiatric advice (tool explicitly avoids this)
- Legal/financial decisions (could be future feature with disclaimers)
- Real-time safety interventions (tool assumes user is safe; no crisis detection)

---

## Devpost Submission Checklist

Before submitting on Devpost:
- [ ] GitHub repo created with both files
- [ ] README.md with setup instructions (npm install, run server.js, open index.html)
- [ ] Short demo video (screen recording: fill form → get Claude response)
- [ ] Writeup completed:
  - [ ] Who: Neurodivergent individuals experiencing decision fatigue
  - [ ] Why: Executive function challenges + decision paralysis = significant quality-of-life issue
  - [ ] How: Claude Sonnet + structured templates + neurodivergent-friendly design
  - [ ] Safeguards: Disclaimers, supportive language, scope clarity
  - [ ] Next: Database to save decisions, mobile app, integration with calendar/task tools
- [ ] Code is clean and documented (comments on key functions)

---

## Time Allocation (60 mins total)

| Time | Owner | Task |
|------|-------|------|
| 0-5 min | Both | Setup: npm install, create files, env var |
| 5-20 min | Person A | Build server.js + decision_engine.js (test with curl) |
| 5-20 min | Person B | Build index.html + vanilla JS (test form flows) |
| 20-30 min | Both | Integrate API calls, test end-to-end |
| 30-45 min | Both | Polish + test all 4 decision types |
| 45-55 min | Both | Record demo video, test on mobile |
| 55-60 min | Both | Final Devpost writeup, submit |

---

## Notes for Success

1. **Keep it simple.** No build step, no framework magic. Vanilla HTML/JS = faster iteration.
2. **Test locally first.** Use `curl` to test backend before frontend calls it.
3. **Claude is your star.** Spend time on prompts, not UI polish. Good prompts = better product.
4. **Accessibility > aesthetics.** For neurodivergent users, clarity beats design.
5. **Document assumptions.** If you make a decision (e.g., "max 5 options"), note it.

Good luck! 🚀
