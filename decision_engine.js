// decision_engine.js
// Decision logic powered by Llama 3.1 8B via HuggingFace Inference

const { HfInference } = require('@huggingface/inference');

const client = new HfInference(process.env.HF_TOKEN);

const MODEL = 'meta-llama/Meta-Llama-3.1-8B-Instruct';

async function callLlama(systemPrompt, userPrompt) {
  try {
    const response = await client.chatCompletion({
      model: MODEL,
      max_tokens: 1000,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    });

    const text = response.choices[0]?.message?.content || 'No response received';
    return text;
  } catch (error) {
    console.error('HF Llama API error:', error.message);
    throw new Error(`HF Llama API error: ${error.message}`);
  }
}

// 1. QUICK DECISION
async function quickDecision(userInput) {
  const systemPrompt = `You are a supportive decision-making assistant for neurodivergent individuals who experience decision fatigue.

You help people make decisions by reducing cognitive load, not by being prescriptive. Be kind. Acknowledge there's no perfect answer.`;

  const userPrompt = `The user needs help deciding: "${userInput}"

Provide:
1. Three simple options or a clear yes/no/maybe recommendation
2. One key reason for each option (be concise—2-4 words)
3. A gentle nudge toward what might work best
4. A reminder that there's no "perfect" answer

Format: Use bullet points. Keep it under 150 words. Be direct, not flowery.`;

  return await callLlama(systemPrompt, userPrompt);
}

// 2. STRUCTURED COMPARISON
async function structuredComparison(decision, options) {
  const systemPrompt = `You are a supportive decision-making assistant for neurodivergent individuals.

Help them compare options clearly and reduce analysis paralysis. Be encouraging.`;

  const optionsList = options.join(', ');
  const userPrompt = `Decision: "${decision}"
Options: ${optionsList}

For EACH option, provide:
- A 1-sentence summary
- 2-3 pros (bullet points)
- 2-3 cons (bullet points)
- Difficulty/effort: Easy / Moderate / Hard

Then give a 1-paragraph gentle recommendation that acknowledges trade-offs.

Format: Use bullet points. Keep each section scannable. No walls of text.`;

  return await callLlama(systemPrompt, userPrompt);
}

// 3. COMPLEX DECISION
async function complexDecision(userInput) {
  const systemPrompt = `You are a supportive decision-making assistant for neurodivergent individuals.

Help them break down big decisions by identifying values, options, and alignment. Acknowledge that big decisions are hard and it's okay to feel stuck.`;

  const userPrompt = `Complex decision: "${userInput}"

Help break this down:
1. Identify 2-3 core values or priorities that likely matter (based on what they said)
2. List 3-4 realistic options
3. For each option, rate how well it aligns with their values (1-5 scale, where 5 = perfect alignment)
4. Summarize the clearest path forward in one paragraph

Remember: Neurodivergent individuals benefit from clear structure, permission to change their mind, and acknowledgment that some decisions create other decisions (and that's normal).

Format: Numbered steps. Use bullet points. Keep text scannable. No jargon.`;

  return await callLlama(systemPrompt, userPrompt);
}

// 4. GENERATE OPTIONS (I'M STUCK)
async function generateOptions(userInput) {
  const systemPrompt = `You are a creative but grounded decision assistant for neurodivergent individuals.

When someone is stuck, generate fresh ideas that are realistic and not overwhelming. Acknowledge that sometimes you just need to see new options.`;

  const userPrompt = `The user is stuck and needs fresh options for: "${userInput}"

Suggest 5-6 creative but practical options they might not have considered. For each:
- Brief description (1 sentence)
- One key benefit
- One realistic barrier (be honest about downsides)

Include at least one "unconventional" option they might not think of.

Format: Numbered list. Keep each option to 3 lines max. Be creative but realistic.`;

  return await callLlama(systemPrompt, userPrompt);
}

// Export all functions
module.exports = {
  quickDecision,
  structuredComparison,
  complexDecision,
  generateOptions,
};
