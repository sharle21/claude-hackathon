// server.js
// Run with: node server.js
// Then test with: curl -X POST http://localhost:3000/api/decide -H "Content-Type: application/json" -d '{"type":"quick","input":"should I work out today?"}'

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const decisionEngine = require('./decision_engine');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'ChoiceEase server is running' });
});

// Main decision endpoint
app.post('/api/decide', async (req, res) => {
  try {
    const { type, input, options, context } = req.body;

    if (!type || !input) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: type, input',
      });
    }

    let response;

    switch (type) {
      case 'quick':
        response = await decisionEngine.quickDecision(input, context);
        break;
      case 'structured':
        if (!options || options.length === 0) {
          return res.status(400).json({
            success: false,
            error: 'Structured comparison requires options array',
          });
        }
        response = await decisionEngine.structuredComparison(input, options, context);
        break;
      case 'complex':
        response = await decisionEngine.complexDecision(input, context);
        break;
      case 'stuck':
        response = await decisionEngine.generateOptions(input, context);
        break;
      default:
        return res.status(400).json({
          success: false,
          error: `Unknown decision type: ${type}. Use: quick, structured, complex, stuck`,
        });
    }

    res.json({ success: true, response });
  } catch (error) {
    console.error('Error in /api/decide:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`✅ ChoiceEase server running on http://localhost:${PORT}`);
  console.log(`📝 Try: curl -X POST http://localhost:${PORT}/api/decide -H "Content-Type: application/json" -d '{"type":"quick","input":"should I go to the gym?"}'`);
});
