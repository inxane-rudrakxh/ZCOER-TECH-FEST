-- Seed script to populate initial game content for the 3 rounds.
-- Assuming 'quiz', 'debug', 'ai' slugs exist in the games table.

DO $$
DECLARE
    v_quiz_game_id UUID;
    v_debug_game_id UUID;
    v_ai_game_id UUID;
    
    v_quiz_id UUID;
    
    v_q1_id UUID;
    v_q2_id UUID;
    v_q3_id UUID;
    
    v_q1_opt_correct UUID;
    v_q2_opt_correct UUID;
    v_q3_opt_correct UUID;

BEGIN
    -- Get game IDs
    SELECT id INTO v_quiz_game_id FROM games WHERE slug = 'quiz' LIMIT 1;
    SELECT id INTO v_debug_game_id FROM games WHERE slug = 'debug' LIMIT 1;
    SELECT id INTO v_ai_game_id FROM games WHERE slug = 'ai' LIMIT 1;

    ---------------------------------------------------------
    -- 1. SEED QUIZ
    ---------------------------------------------------------
    IF v_quiz_game_id IS NOT NULL THEN
        -- Create a Quiz
        INSERT INTO quizzes (game_id, title, duration_minutes, total_marks, status)
        VALUES (v_quiz_game_id, 'Ultimate Tech Trivia', 10, 30, 'LIVE')
        RETURNING id INTO v_quiz_id;

        -- Question 1
        INSERT INTO quiz_questions (quiz_id, question_text, marks, explanation)
        VALUES (v_quiz_id, 'Which data structure operates strictly on the FIFO (First-In, First-Out) principle and is commonly utilized in Breadth-First Search (BFS) graph traversals?', 10, 'A Queue processes elements in the exact order they arrive.')
        RETURNING id INTO v_q1_id;

        INSERT INTO quiz_options (question_id, option_text) VALUES (v_q1_id, 'Stack');
        INSERT INTO quiz_options (question_id, option_text) VALUES (v_q1_id, 'Linked List');
        INSERT INTO quiz_options (question_id, option_text) VALUES (v_q1_id, 'Queue') RETURNING id INTO v_q1_opt_correct;
        INSERT INTO quiz_options (question_id, option_text) VALUES (v_q1_id, 'Binary Tree');
        
        UPDATE quiz_questions SET correct_option_id = v_q1_opt_correct WHERE id = v_q1_id;

        -- Question 2
        INSERT INTO quiz_questions (quiz_id, question_text, marks, explanation)
        VALUES (v_quiz_id, 'In React, what hook is used to perform side effects in functional components?', 10, 'useEffect is the hook designated for side effects like fetching data or DOM manipulation.')
        RETURNING id INTO v_q2_id;

        INSERT INTO quiz_options (question_id, option_text) VALUES (v_q2_id, 'useState');
        INSERT INTO quiz_options (question_id, option_text) VALUES (v_q2_id, 'useEffect') RETURNING id INTO v_q2_opt_correct;
        INSERT INTO quiz_options (question_id, option_text) VALUES (v_q2_id, 'useContext');
        INSERT INTO quiz_options (question_id, option_text) VALUES (v_q2_id, 'useReducer');

        UPDATE quiz_questions SET correct_option_id = v_q2_opt_correct WHERE id = v_q2_id;

        -- Question 3
        INSERT INTO quiz_questions (quiz_id, question_text, marks, explanation)
        VALUES (v_quiz_id, 'What is the time complexity of searching for an element in a balanced Binary Search Tree?', 10, 'In a balanced BST, each comparison eliminates half the remaining nodes, resulting in O(log n) time.')
        RETURNING id INTO v_q3_id;

        INSERT INTO quiz_options (question_id, option_text) VALUES (v_q3_id, 'O(1)');
        INSERT INTO quiz_options (question_id, option_text) VALUES (v_q3_id, 'O(n)');
        INSERT INTO quiz_options (question_id, option_text) VALUES (v_q3_id, 'O(n log n)');
        INSERT INTO quiz_options (question_id, option_text) VALUES (v_q3_id, 'O(log n)') RETURNING id INTO v_q3_opt_correct;

        UPDATE quiz_questions SET correct_option_id = v_q3_opt_correct WHERE id = v_q3_id;

    END IF;

    ---------------------------------------------------------
    -- 2. SEED DEBUG CHALLENGE
    ---------------------------------------------------------
    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, max_score, status)
        VALUES (
            v_debug_game_id, 
            'The Array Reverser', 
            'This function is supposed to reverse an array in-place, but it has a bug causing it to return the same array unmodified (or worse, corrupted). Find the bug and fix the logic so that the array is perfectly reversed in-place. You MUST return the modified array.', 
            'javascript', 
            'function reverseArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = temp;
  }
  return arr;
}', 
            '[{ "input": "[1, 2, 3, 4, 5]", "expected": "[5, 4, 3, 2, 1]" }]', 
            20, 
            100, 
            'LIVE'
        );
    END IF;

    ---------------------------------------------------------
    -- 3. SEED AI CHALLENGE
    ---------------------------------------------------------
    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status)
        VALUES (
            v_ai_game_id,
            'The JSON Enforcer',
            'Write a prompt that commands the AI to translate a given natural language date (e.g., "next Friday at noon") into a strict JSON object with keys "year", "month", "day", "hour", "minute". If the date is impossible, it must return a JSON object with a single key "error". The AI is notoriously bad at sticking to JSON formats and often includes conversational text. Write the most rigid prompt possible to enforce this JSON-only rule.',
            'LIVE'
        );
    END IF;

END $$;
