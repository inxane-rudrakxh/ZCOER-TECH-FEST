-- Migration for Progressive Debug Challenges

DO $$
DECLARE
    v_debug_game_id UUID;
BEGIN
    SELECT id INTO v_debug_game_id FROM games WHERE slug = 'debug' LIMIT 1;

    IF v_debug_game_id IS NOT NULL THEN
        -- Add new difficulty column
        BEGIN
            ALTER TABLE debug_challenges ADD COLUMN difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard'));
        EXCEPTION
            WHEN duplicate_column THEN
                NULL;
        END;

        -- Clear existing Debug challenges
        DELETE FROM debug_challenges WHERE game_id = v_debug_game_id;

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
END $$;
