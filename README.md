VIDEOLINK : https://drive.google.com/drive/folders/1hnv8V8RzTv679ecLoRcwI9dQ4rrOZ85f


# ChoiceEase: Decision Fatigue Relief for Neurodivergent Minds

> An AI-powered decision assistant designed specifically for people experiencing decision fatigue. Powered by Llama 3.1 8B Instruct via the HuggingFace Inference API.

## 🎯 The Problem

Decision fatigue is a documented psychological phenomenon where decision quality deteriorates after making many choices. For neurodivergent individuals (ADHD, autism, anxiety), this effect is amplified due to:

- Executive function challenges (each decision requires more cognitive energy)
- Analysis paralysis (too many options = overwhelming)
- Perfectionism (fear of making "wrong" decisions)
- Context switching costs (decision-making is exhausting)

**Result:** Simple decisions become sources of severe anxiety, procrastination, and shame.

---

## 💡 The Solution

**ChoiceEase** provides structured decision frameworks powered by Llama to:

1. **Reduce cognitive load** — No blank page paralysis
2. **Offer personalized guidance** — Tailored to each user's neurotype, values, and current mood
3. **Support all decision types** — From "what to eat" to major life choices
4. **Acknowledge complexity** — Permission to change your mind, no perfect answers

### Four Decision Frameworks

| Framework | Best For | Output |
|-----------|----------|--------|
| **Quick Decision** | Daily/simple choices | 3 options + recommendation |
| **Structured Comparison** | Weighing multiple options | Pros/cons/effort for each |
| **Complex Decision** | Big life decisions | Values alignment + priority mapping |
| **I'm Stuck** | Blank slate/overwhelm | 5-6 creative new options |

### Personalization Layer

Before generating a response, ChoiceEase augments every prompt with:

- **User profile** (set once, stored in browser localStorage): neurotype (ADHD, autism, anxiety…), core values (rest, connection, progress…), sensitivities (overstimulation, perfectionism, time-blindness, rejection sensitivity)
- **Current mood** (picked at the start of each decision): energy level (low / medium / high) and optional emotional state (calm, focused, anxious, overwhelmed, numb)

The model applies explicit adaptation rules — e.g. if energy is low, it biases toward rest and low-effort options and avoids "push through" framing; if perfectionism is flagged, it gives explicit permission to pick "good enough".

---

## 🛠 Tech Stack

- **Frontend:** Vanilla HTML/CSS/JavaScript (no build step), Google Fonts (Fredoka + M PLUS Rounded 1c + Caveat + Klee One)
- **Backend:** Node.js + Express
- **AI:** Meta Llama 3.1 8B Instruct via HuggingFace Inference Providers router (raw `fetch`)
- **Persistence:** Browser `localStorage` for profile, last mood, and theme preference
- **Theming:** Lo-fi Ghibli palette — warm paper background with moss, forest, and sunset-orange accents; subtle paper texture; breathing companion animation; dark mode with system preference detection; respects `prefers-reduced-motion`
- **Deployment:** Local, deployable to Vercel / Render / Fly

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- HuggingFace account + access token (`hf_...`) — https://huggingface.co/settings/tokens
- Accept the Llama 3.1 8B Instruct license: https://huggingface.co/meta-llama/Meta-Llama-3.1-8B-Instruct

### Setup (5 minutes)

1. **Clone & Install**
   ```bash
   git clone https://github.com/sharle21/claude-hackathon.git
   cd claude-hackathon
   npm install
   ```

2. **Add API Key**
   ```bash
   cp .env.example .env
   # Edit .env and set HF_TOKEN=hf_your_token_here
   ```

3. **Start Server**
   ```bash
   npm start
   # Server runs on http://localhost:3000
   ```

4. **Open Frontend**
   ```bash
   # In another terminal, serve index.html
   # Option A: Click index.html in file explorer
   # Option B: python3 -m http.server 8000
   # Then visit: http://localhost:8000/index.html
   ```

5. **Test It**
   - On first visit, fill out the profile (neurotype / values / sensitivities)
   - Pick a decision type (e.g. "⚡ Quick Decision")
   - Answer the mood check (energy + optional emotion)
   - Type something like "Should I go to the gym today?"
   - Click "Show me some options"
   - See a response tailored to your profile + current mood ✨

---

## 📁 Project Structure

```
choiceease/
├── server.js                 # Express server + routes
├── decision_engine.js        # Llama (HF Inference) integration + prompts
├── index.html                # Frontend (all-in-one HTML)
├── package.json              # Dependencies
├── .env                      # HF_TOKEN (never commit)
├── .env.example              # Template for .env
├── .gitignore                # Ignore .env, node_modules
├── README.md                 # This file
├── QUICK_START.md            # Setup guide
├── PRD_CLAUDE_DESKTOP.md     # Detailed requirements
└── CHEAT_SHEET.md            # Quick reference
```

---

## 🔌 API Reference

### POST /api/decide
Main decision endpoint.

**Request:**
```json
{
  "type": "quick|structured|complex|stuck",
  "input": "What should I decide?",
  "options": ["A", "B", "C"],
  "context": {
    "profile": {
      "neurotype": ["ADHD", "anxiety"],
      "values": ["rest", "progress"],
      "sensitivities": ["perfectionism"]
    },
    "mood": {
      "energy": "low",
      "emotion": "overwhelmed"
    }
  }
}
```

`options` is only required for `structured`. `context` is optional — omit it and the model falls back to a generic supportive response.

**Response:**
```json
{
  "success": true,
  "response": "Model's structured guidance...",
  "error": null
}
```

### Supported Decision Types

#### `quick`
Minimal input, fast output.
- Input: user's decision question
- Output: 3 options + one-sentence reasons + recommendation

#### `structured`
Compare multiple options side-by-side.
- Input: decision + list of options
- Output: pros/cons/effort for each option + recommendation

#### `complex`
Big decisions with values alignment.
- Input: detailed decision context
- Output: values identification + option ratings (1-5) + recommendation

#### `stuck`
Generate new options when user is blank.
- Input: what user is stuck on + what they've considered
- Output: 5-6 creative but realistic options

---

## 🎨 Design Philosophy

### For Neurodivergent Users
- **Lo-fi Ghibli palette** — warm paper background, moss/forest greens, sunset-orange accents; optional dark mode
- **Floating card layout** — content sits on a single rounded card with a subtle paper-texture backdrop
- **Rounded, indie-game type** — Fredoka + M PLUS Rounded 1c + Caveat (handwritten accent)
- **Breathing companion** — a small leaf that gently pulses on the home screen, and a thinking cat while the model responds
- **Permission language** — "no perfect answer," "you can change your mind," "take a deep breath"
- **Scannable output** — no walls of text
- **Gentle motion only** — brief fade on screen transitions, slow breathing pulse on companion; full respect for `prefers-reduced-motion`
- **Mood-aware** — adapts recommendations to current energy and emotional state
- **Profile-aware** — tailors tone and suggestions to declared neurotype, values, and sensitivities

### For Developers
- **No build step** — plain HTML + CSS + JS, Express backend
- **Model-agnostic prompt layer** — `buildContextBlock()` in `decision_engine.js` composes the system prompt so you can swap the model or provider without touching the decision functions
- **Easy to extend** — add a new decision type by dropping a function into `decision_engine.js` and wiring one `switch` case in `server.js`
- **Privacy-first** — profile and mood live in the browser's `localStorage`; the only server-side I/O is the LLM call

---

## ⚙️ How It Works

### 1. Profile Setup (first visit)
A modal screen collects neurotype, values, and sensitivities. Saved to `localStorage` under `choiceease_profile`. Returning users skip this automatically.

### 2. Mood Check (before each decision)
The user picks an energy level (required) and optional emotional state. Saved to `localStorage` under `choiceease_last_mood`.

### 3. Frontend → Backend
Frontend sends POST to `/api/decide` with `{ type, input, options?, context: { profile, mood } }`.

### 4. Decision Engine
Backend calls the appropriate decision function in `decision_engine.js`.

### 5. Llama Integration
The decision function builds a system prompt combining the base instructions with `buildContextBlock(context)` and calls Llama 3.1 8B via the HuggingFace Inference Providers router:

```javascript
const res = await fetch('https://router.huggingface.co/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.HF_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'meta-llama/Llama-3.1-8B-Instruct',
    max_tokens: 1000,
    messages: [
      { role: 'system', content: systemPrompt }, // includes profile + mood + adaptation rules
      { role: 'user', content: userPrompt },
    ],
  }),
});
```

### 6. Response Handling
The model returns structured guidance (plain text) which is sent back to frontend and displayed.

---

## 🛡️ Safety & Safeguards

### Built-in Safeguards

1. **Disclaimer on home page**
   - "This tool reduces cognitive load, not your judgment"
   - "You know yourself best"

2. **Supportive language in prompts**
   - All prompts include: "acknowledge there's no perfect answer"
   - "Give permission to change their mind"
   - "Avoid judgment"

3. **Scope clarity**
   - Each decision type is labeled with its intended use
   - Not for medical/legal decisions (users choose appropriate type)

4. **Error handling**
   - Graceful fallback if the model call fails
   - User-friendly error messages

### Not In Scope

- **Medical advice** (tool explicitly avoids health/mental health diagnostics)
- **Legal advice** (requires professional)
- **Crisis intervention** (tool assumes user is safe)
- **Personalized therapy** (tool is decision support, not therapy)

---

## 📊 Example Conversations

### Example 1: Quick Decision
**Input:** "Should I call my friend today?"

**Output:**
```
Here are three options:

• Yes, reach out → Connection matters. Even a quick message counts.

• Not today, but tomorrow → Sometimes honoring your energy is the right call.

• Send a message instead of calling → Still connected, lower effort.

What feels most doable right now? Any of these is fine.
```

### Example 2: Structured Comparison
**Input:** Decision: "What should I do tonight?" | Options: "Go out with friends, Stay home & rest, Work on project"

**Output:**
```
Option 1: Go out with friends
- Summary: Spend time with others in a social setting
- Pros: Connection, novelty, lasting memories
- Cons: Requires energy, unpredictable duration, possible sensory overload
- Effort: Moderate

Option 2: Stay home & rest
- Summary: Give your brain and body recovery time
- Pros: Low energy required, peaceful, restorative
- Cons: Might feel isolating, FOMO possible
- Effort: Easy

Option 3: Work on project
- Summary: Make progress on something meaningful
- Pros: Accomplishment, progress, focused time
- Cons: Might be hard to stop, could tire you out
- Effort: Hard

Recommendation: If you're running on low energy, Option 2 is your answer. If you're feeling okay, either #1 or #3 works—what matters most to you tonight?
```

---

## 🧪 Testing

### Manual Testing
```bash
# Test backend with curl
curl -X POST http://localhost:3000/api/decide \
  -H "Content-Type: application/json" \
  -d '{"type":"quick","input":"should I exercise?"}'

# Should return:
# {"success":true,"response":"...model response..."}
```

### Browser Testing
1. Open http://localhost:8000/index.html
2. Click each decision type
3. Fill form and submit
4. Check browser console (F12) for errors
5. Verify model response displays correctly

### Responsiveness
Test on mobile viewport (680px):
- DevTools → Toggle device toolbar
- Set viewport to 375px width
- Verify all buttons and text are readable

---

## 📈 Future Features

- [ ] **Conversation history** — Revisit past decisions
- [ ] **Decision logging** — Track which decisions worked out
- [ ] **Mobile app** — iOS/Android versions
- [ ] **Calendar integration** — Suggest decision-friendly times
- [ ] **Task breakdown** — If decision leads to action items
- [ ] **Team decisions** — Collaborative choice-making
- [ ] **Personalization** — User preferences & decision history
- [ ] **Analytics** — Which decision frameworks work best (privacy-preserving)

---

## 🤝 Contributing

This is a hackathon project, but we welcome ideas:

1. **Found a bug?** Open an issue
2. **Have a feature idea?** Check existing issues or create one
3. **Want to improve prompts?** Suggestions welcome
4. **Design improvements?** Accessibility is priority

---

## 📝 License

MIT License — free to use and modify.

---

## 🏥 Track: Health & Wellbeing

This project was built for the **Anthropic Hackathon 2026** under the **Health & Wellbeing track**, addressing:
- **Problem:** Mental health support is expensive, inaccessible, and confusing. Decision fatigue is a hidden burden for neurodivergent individuals.
- **Solution:** Accessible, AI-powered decision support designed specifically for neurodivergent brains.
- **Impact:** Reduce decision paralysis, anxiety, and shame around "simple" choices.

---

## 🙏 Acknowledgments

- Meta for releasing Llama 3.1 open-weights
- HuggingFace for Inference API hosting
- Neurodivergent communities for feedback on UX
- Hackathon organizers for the opportunity

---

**Made with 💙 for overwhelmed brains.**

