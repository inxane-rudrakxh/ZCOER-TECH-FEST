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
        -- Insert Low Difficulty (3 mins)
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (
            v_debug_game_id,
            'The Rogue Array (Easy)',
            'The function `sumArray` is supposed to return the sum of all numbers in the array. However, it currently returns the wrong result. Fix the bug.',
            'javascript',
            'function sumArray(arr) {
  let sum = 0;
  for (let i = 1; i <= arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}',
            '[
  {"input": "[1, 2, 3, 4]", "expected": "10"},
  {"input": "[10, -5, 5]", "expected": "10"},
  {"input": "[]", "expected": "0"}
]',
            3,
            'LIVE',
            'easy'
        );

        -- Insert Medium Difficulty (5 mins)
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (
            v_debug_game_id,
            'The Broken Palindrome (Medium)',
            'The function `isPalindrome` should return true if the string is a palindrome (reads the same backwards), ignoring non-alphanumeric characters and case. Fix the bug.',
            'javascript',
            'function isPalindrome(str) {
  const cleanStr = str.replace(/[^a-zA-Z0-9]/g, "");
  const reversed = cleanStr.split("").reverse().join("");
  return cleanStr === reversed;
}',
            '[
  {"input": "\"A man, a plan, a canal: Panama\"", "expected": "true"},
  {"input": "\"race a car\"", "expected": "false"},
  {"input": "\" \"", "expected": "true"}
]',
            5,
            'LIVE',
            'medium'
        );

        -- Insert High Difficulty (7 mins)
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (
            v_debug_game_id,
            'The Object Filter (Hard)',
            'The function `filterUsers` should take an array of user objects and a minimum age, and return an array of JUST the names of the users who are AT LEAST that age, sorted alphabetically. Fix the bugs.',
            'javascript',
            'function filterUsers(usersAndAge) {
  const users = usersAndAge.users;
  const minAge = usersAndAge.minAge;
  
  return users
    .filter(u => u.age > minAge)
    .map(u => u.Name)
    .sort((a, b) => a < b ? 1 : -1);
}',
            '[
  {"input": "{\"users\":[{\"name\":\"Alice\",\"age\":30},{\"name\":\"Bob\",\"age\":20},{\"name\":\"Charlie\",\"age\":25}], \"minAge\":25}", "expected": "[\"Alice\", \"Charlie\"]"},
  {"input": "{\"users\":[{\"name\":\"Zack\",\"age\":40},{\"name\":\"Adam\",\"age\":40}], \"minAge\":30}", "expected": "[\"Adam\", \"Zack\"]"}
]',
            7,
            'LIVE',
            'hard'
        );
    END IF;

    ---------------------------------------------------------
    -- 3. SEED AI CHALLENGE
    ---------------------------------------------------------
    IF v_ai_game_id IS NOT NULL THEN
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
