-- Migration to update the AI Prompt Challenge to the "JSON Enforcer" scenario
UPDATE ai_challenges 
SET 
  title = 'The JSON Enforcer',
  scenario_description = 'Write a prompt that commands the AI to translate a given natural language date (e.g., "next Friday at noon") into a strict JSON object with keys "year", "month", "day", "hour", "minute". If the date is impossible, it must return a JSON object with a single key "error". The AI is notoriously bad at sticking to JSON formats and often includes conversational text. Write the most rigid prompt possible to enforce this JSON-only rule.'
WHERE status = 'LIVE';
