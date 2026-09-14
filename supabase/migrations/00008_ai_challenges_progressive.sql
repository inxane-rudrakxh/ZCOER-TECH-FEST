-- Migration for Progressive AI Challenges

DO $$
DECLARE
    v_ai_game_id UUID;
BEGIN
    SELECT id INTO v_ai_game_id FROM games WHERE slug = 'ai' LIMIT 1;

    IF v_ai_game_id IS NOT NULL THEN
        -- Add new columns if they don't exist
        BEGIN
            ALTER TABLE ai_challenges ADD COLUMN difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard'));
            ALTER TABLE ai_challenges ADD COLUMN time_limit_minutes INTEGER DEFAULT 5;
        EXCEPTION
            WHEN duplicate_column THEN
                NULL;
        END;

        -- Clear existing AI challenges
        DELETE FROM ai_challenges WHERE game_id = v_ai_game_id;

        -- Insert Low Difficulty
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (
            v_ai_game_id,
            'The JSON Enforcer',
            'Write a prompt that commands the AI to translate a given natural language date (e.g., "next Friday at noon") into a strict JSON object with keys "year", "month", "day", "hour", "minute". If the date is impossible, it must return a JSON object with a single key "error". The AI is notoriously bad at sticking to JSON formats and often includes conversational text. Write the most rigid prompt possible to enforce this JSON-only rule.',
            'LIVE',
            'easy',
            3
        );

        -- Insert Medium Difficulty
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (
            v_ai_game_id,
            'The Security Analyzer',
            'You are building a security scanner. Write a prompt that instructs the AI to analyze a given SQL query string and return exactly the word "TRUE" if it contains a potential SQL injection vulnerability, and exactly "FALSE" if it is completely safe. It must analyze deep logic, not just look for keywords like DROP, and it must never output any other text. Provide the system prompt.',
            'LIVE',
            'medium',
            5
        );

        -- Insert High Difficulty
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (
            v_ai_game_id,
            'The Strict Output Constraint',
            'You need to write a prompt that forces the AI to review a poorly written piece of Python code. However, you must instruct the AI to ONLY output the fully refactored, highly optimized code. The AI must NOT output any explanations, markdown formatting (no ```python blocks), pleasantries, or comments. The output must be perfectly executable text as-is. Write your most bulletproof prompt.',
            'LIVE',
            'hard',
            7
        );
    END IF;
END $$;
