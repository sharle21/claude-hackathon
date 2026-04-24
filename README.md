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
2. **Offer intelligent guidance** — LLM considers context & neurodivergent needs
3. **Support all decision types** — From "what to eat" to major life choices
4. **Acknowledge complexity** — Permission to change your mind, no perfect answers

### Four Decision Frameworks

| Framework | Best For | Output |
|-----------|----------|--------|
| **Quick Decision** | Daily/simple choices | 3 options + recommendation |
| **Structured Comparison** | Weighing multiple options | Pros/cons/effort for each |
| **Complex Decision** | Big life decisions | Values alignment + priority mapping |
| **I'm Stuck** | Blank slate/overwhelm | 5-6 creative new options |

---

## 🛠 Tech Stack

- **Frontend:** Vanilla HTML/CSS/JavaScript (no build step)
- **Backend:** Node.js + Express
- **AI:** Meta Llama 3.1 8B Instruct via HuggingFace Inference API (`@huggingface/inference`)
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
   - Click "Quick Decision"
   - Type "Should I go to the gym today?"
   - Click "Get Suggestions"
   - See the model's response ✨

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
  "options": ["A", "B", "C"]  // only for "structured"
}
```

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
- **Minimal design** (reduces sensory overload)
- **Clear structure** (scaffolding for decision-making)
- **Permission language** ("no perfect answer," "you can change your mind")
- **Scannable output** (no walls of text)
- **No animations** (cognitive accessibility)

### For Developers
- **No build step** (run HTML directly, express server easily)
- **The LLM does the heavy lifting** (prompts are the product)
- **Easy to extend** (add new decision types in `decision_engine.js`)
- **Privacy-first** (runs locally, no data collection)

---

## ⚙️ How It Works

### 1. User Interaction
User fills a form with their decision question and selects a framework.

### 2. Frontend → Backend
Frontend sends POST request to `/api/decide` with decision type + input.

### 3. Decision Engine
Backend calls appropriate decision function in `decision_engine.js`.

### 4. Llama Integration
Decision function crafts a tailored prompt and calls Llama 3.1 8B via HuggingFace:
```javascript
const response = await client.chatCompletion({
  model: "meta-llama/Meta-Llama-3.1-8B-Instruct",
  max_tokens: 1000,
  messages: [
    { role: "system", content: "You are a supportive decision assistant for neurodivergent individuals..." },
    { role: "user", content: userPrompt },
  ],
});
```

### 5. Response Handling
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

## 📬 Contact

- **Team:** [Your names]
- **GitHub:** [your-repo-url]
- **Demo:** [video link if you have it]
- **Feedback:** [email or contact method]

---

**Made with 💙 for overwhelmed brains.**

