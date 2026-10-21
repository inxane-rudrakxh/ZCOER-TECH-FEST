-- Migration: Massive 100 Challenge Pool
DO $$
DECLARE
    v_ai_game_id UUID;
    v_debug_game_id UUID;
BEGIN

    -- Add AI columns if they don't exist
    BEGIN
        ALTER TABLE ai_challenges ADD COLUMN difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard'));
    EXCEPTION WHEN duplicate_column THEN NULL; END;

    BEGIN
        ALTER TABLE ai_challenges ADD COLUMN time_limit_minutes INTEGER DEFAULT 5;
    EXCEPTION WHEN duplicate_column THEN NULL; END;

    -- Add Debug columns if they don't exist
    BEGIN
        ALTER TABLE debug_challenges ADD COLUMN difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard'));
    EXCEPTION WHEN duplicate_column THEN NULL; END;

    SELECT id INTO v_ai_game_id FROM games WHERE slug = 'ai' LIMIT 1;
    SELECT id INTO v_debug_game_id FROM games WHERE slug = 'debug' LIMIT 1;

    -- Clear existing AI challenges
    IF v_ai_game_id IS NOT NULL THEN
        DELETE FROM ai_challenges WHERE game_id = v_ai_game_id;
    END IF;

    -- Clear existing Debug challenges
    IF v_debug_game_id IS NOT NULL THEN
        DELETE FROM debug_challenges WHERE game_id = v_debug_game_id;
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Translate to JSON', 'Convert the given text input into a valid JSON object format, ensuring proper key-value pairing and syntax.', 'LIVE', 'easy', 3);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Summarize in Three Words', 'Summarize any provided paragraph or article into exactly three descriptive words capturing the essence.', 'LIVE', 'easy', 3);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'List Items Alphabetically', 'Take a set of items or words and list them strictly in alphabetical order, ignoring case sensitivity.', 'LIVE', 'easy', 3);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Convert to Bulleted List', 'Format the given information into a bulleted list using standard list markers (e.g., dashes or asterisks).', 'LIVE', 'easy', 3);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Extract Keywords', 'Identify and return the top five keywords from the provided text, separated by commas.', 'LIVE', 'easy', 3);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Translate to Pig Latin', 'Translate each word in the input sentence to Pig Latin following the simple rules for word transformation.', 'LIVE', 'easy', 3);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Capitalize Each Word', 'Convert the input sentence so that every word''s first letter is capitalized and the rest are lowercase.', 'LIVE', 'easy', 3);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Provide Synonyms List', 'Given a single word, return a list of at least five common synonyms separated by commas.', 'LIVE', 'easy', 3);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Reverse Word Order', 'Rewrite the input sentence with the order of words reversed but keep the words themselves intact.', 'LIVE', 'easy', 3);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Convert Currency Format', 'Change a numeric amount into a standard currency format (e.g., 1234 to $1,234.00) assuming USD.', 'LIVE', 'easy', 3);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Generate Hashtags', 'From the given phrase or sentence generate three relevant hashtags prefixed by # without spaces.', 'LIVE', 'easy', 3);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Remove Vowels', 'Return the text with all vowels (a, e, i, o, u) removed from the input string.', 'LIVE', 'easy', 3);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Count Words', 'Return the total number of words in the input text as a single integer.', 'LIVE', 'easy', 3);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Create Acronym', 'Generate an acronym from the given phrase by taking the first letter of each word in uppercase.', 'LIVE', 'easy', 3);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Format Date to YYYY-MM-DD', 'Convert any given date input into the ISO standard date format YYYY-MM-DD.', 'LIVE', 'easy', 3);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Replace Spaces with Underscores', 'Replace all spaces in the input string with underscores (_) and return the modified string.', 'LIVE', 'easy', 3);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'List Unique Words', 'Extract and list all unique words from the input in lowercase, separated by commas.', 'LIVE', 'easy', 3);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Fact Checker Bot', 'Create a prompt that instructs the AI to answer only with verified facts from reliable sources. The AI must refuse to answer or explicitly state when information cannot be verified or when it would be hallucinating.', 'LIVE', 'medium', 5);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Persona Switcheroo', 'Design a prompt where the AI adopts the persona of a 19th-century scientist, answering questions with period-appropriate language and knowledge, without revealing modern concepts or breaking character.', 'LIVE', 'medium', 5);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Logical Story Builder', 'Generate a prompt to make the AI produce a short story where every event follows a strict logical sequence. The story must include at least three plot twists that are logically consistent and prevent any contradictions.', 'LIVE', 'medium', 5);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Multi-Step Reasoning Assistant', 'Craft a prompt that requires the AI to explicitly show step-by-step reasoning in solving a problem, such as a riddle or math puzzle, ensuring no skipping of intermediate steps and avoiding assumptions not supported by the input.', 'LIVE', 'medium', 5);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'No Hallucination Recipe', 'Create a recipe prompt where the AI only suggests ingredients that actually exist and are commonly used in cooking, refusing to invent fictional items or methods, and explicitly stating when unsure.', 'LIVE', 'medium', 5);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Strict Format Responder', 'Design a prompt that requires the AI to answer strictly in CSV format with no extra commentary, headers, or markdown, even when the user asks follow-up clarifications.', 'LIVE', 'medium', 5);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Contradiction Detector', 'Make a prompt that instructs the AI to analyze two given statements and determine if they contradict each other, providing clear reasoning and a final verdict of ''Contradictory'' or ''Consistent''.', 'LIVE', 'medium', 5);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Historical Interviewer', 'Devise a prompt that makes the AI conduct an interview with a famous historical figure using only information available prior to 1950, refusing to mention future events, inventions, or knowledge.', 'LIVE', 'medium', 5);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Ambiguity Ambassador', 'Create a prompt where the AI detects ambiguous terms in a user''s input and asks clarifying questions before providing an answer, enforcing strict adherence to clarity before continuing.', 'LIVE', 'medium', 5);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Code Explanation Strictness', 'Generate a prompt requiring the AI to explain given code snippets line-by-line without skipping any lines or combining explanations, using only beginner-friendly language and avoiding jargon.', 'LIVE', 'medium', 5);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'No External Knowledge', 'Design a prompt that instructs the AI to answer questions strictly based on the information provided in the prompt or previous user input, refusing to include any knowledge from its training data or other sources.', 'LIVE', 'medium', 5);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Consistent Terminology Enforcer', 'Build a prompt that requires the AI to maintain consistent terminology throughout a long explanation, explicitly avoiding synonyms or phrase variation that could confuse the user.', 'LIVE', 'medium', 5);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Step-Limited Narrator', 'Create a prompt that limits the AI to narrate a story or explanation in exactly five steps or paragraphs, requiring concise yet complete coverage within that strict boundary.', 'LIVE', 'medium', 5);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Error-Detecting Debugger', 'Formulate a prompt that asks the AI to identify logical or syntactical errors in a user-provided piece of text, code, or reasoning, explaining why each is an error, without correcting or rewriting.', 'LIVE', 'medium', 5);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Persona Memory Lock', 'Develop a prompt asking the AI to maintain the same persona (e.g., a pirate, a lawyer, a chef) consistently over multiple interactions within the same session, avoiding any slip into neutral or other personas.', 'LIVE', 'medium', 5);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Avoiding Circular Reasoning', 'Design a prompt that instructs the AI to answer complex questions while explicitly avoiding circular arguments or reasoning loops, providing transparent logic and alternative perspectives when necessary.', 'LIVE', 'medium', 5);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Strict Output Length', 'Create a prompt requiring the AI to respond in no more than 100 words, summarizing complex content precisely without losing core information or introducing ambiguity.', 'LIVE', 'medium', 5);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Code-only Robot', 'Generate a complete, working Python script that solves a given problem without any comments, explanations, or markdown formatting. The output must be pure code, no extra text or formatting characters allowed.', 'LIVE', 'hard', 7);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Strict JSON Validator', 'Create a prompt that outputs a deeply nested JSON object representing a fictional world, with at least 5 levels of nesting and no trailing commas. The AI must ensure absolute JSON validity and no escape characters inside string values.', 'LIVE', 'hard', 7);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Ultra-Concise Explanation', 'Write a prompt that instructs the AI to explain a complex concept in exactly 50 words, no more, no less, with zero spelling or grammar errors, and without using any bullet points or lists.', 'LIVE', 'hard', 7);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Jailbreak-proof Recipe', 'Design a prompt that generates a recipe for a common dish but strictly forbids the AI from providing any content that includes potential harmful modifications or dangerous substitutions, with explicitly no mention or implication of unsafe actions.', 'LIVE', 'hard', 7);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'No-Markdown Data Table', 'Produce a data table summarizing a dataset without using any markdown syntax, ASCII art, or code blocks. The data must be clearly aligned with spaces only and must be easily parsable.', 'LIVE', 'hard', 7);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Language Agnostic Algorithm', 'Generate pseudocode for a sorting algorithm that uses specific variable names and excludes any language-specific syntax or keywords. The pseudocode must be completely free from any programming language conventions.', 'LIVE', 'hard', 7);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Palindrome Text Generator', 'Construct a prompt that produces a palindrome paragraph of at least 200 characters, preserving natural spacing and capitalization, and without any forced or artificial wording.', 'LIVE', 'hard', 7);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Strict Non-Disclosure', 'Create a prompt instructing the AI to respond to certain sensitive questions with a polite refusal, strictly without revealing any internal system or user information under any circumstance.', 'LIVE', 'hard', 7);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'No-hallucination Historical Account', 'Formulate a prompt that requests a detailed historical summary with precise dates and names, demanding that the AI cross-verify and refuse if uncertain, preventing any hallucinated data.', 'LIVE', 'hard', 7);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Minimalist Poem, No Rhymes', 'Generate a prompt that compels the AI to write a poem of exactly 6 lines with strict avoidance of rhyme schemes, using no adjectives and only lowercase letters.', 'LIVE', 'hard', 7);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Emoji-only Story', 'Write a prompt that produces a coherent short story of at least 10 sentences using only emojis and no text, maintaining a clear narrative structure and emotional progression.', 'LIVE', 'hard', 7);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Encrypted Message Formatter', 'Create a prompt that outputs an encrypted message using a specified cipher (e.g. Caesar shift of 7), with no plaintext anywhere and without revealing the encryption method explicitly.', 'LIVE', 'hard', 7);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'No-copy-Paste Code Output', 'Design a prompt so that the AI produces code that cannot be directly copy-pasted into an interpreter without modification, by including subtle hidden Unicode characters or zero-width spaces, yet remains syntactically correct.', 'LIVE', 'hard', 7);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Strict Token Limit Compliance', 'Formulate a prompt that instructs the AI to answer a complex question but limits the response strictly to 100 tokens maximum, cutting off any overruns and without partial sentences at the end.', 'LIVE', 'hard', 7);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Multi-lingual Constraint', 'Write a prompt that generates a sentence in 8 different languages in a single response, each separated by a specific delimiter, with perfect grammar and no mixing of language scripts in a single phrase.', 'LIVE', 'hard', 7);
    END IF;

    IF v_ai_game_id IS NOT NULL THEN
        INSERT INTO ai_challenges (game_id, title, scenario_description, status, difficulty, time_limit_minutes)
        VALUES (v_ai_game_id, 'Invisible ASCII Art', 'Create a prompt that instructs the AI to output an ASCII art picture using only whitespace characters (spaces, tabs) that become visible when viewed in a specific editor with whitespace rendering enabled, without any visible characters.', 'LIVE', 'hard', 7);
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Loop Off-by-One Sum', 'The function should sum numbers from 1 to n inclusive, but it misses the last number.', 'javascript', 'function sumToN(n) { let sum = 0; for(let i = 1; i < n; i++) { sum += i; } return sum; }', '[{"input":"5", "expected":"15"}, {"input":"1", "expected":"1"}]', 3, 'LIVE', 'easy');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Variable Scope Leakage', 'This function should increment a counter inside a loop and return its value. However, the counter is not properly scoped causing wrong results.', 'javascript', 'function countUpTo(n) { for(var i = 0; i < n; i++) {} return i; }', '[{"input":"3", "expected":"3"}, {"input":"0", "expected":"0"}]', 3, 'LIVE', 'easy');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Missing Plus in String Concatenation', 'The function intends to concatenate first and last name with a space, but it returns incorrect results due to missing operator.', 'javascript', 'function fullName(first, last) { return first '' '' last; }', '[{"input":"[\"John\", \"Doe\"]", "expected":"John Doe"}]', 3, 'LIVE', 'easy');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Wrong Equality Operator', 'Function should check if a number is equal to 5, but it uses assignment instead of comparison, causing unexpected assignments.', 'javascript', 'function isFive(num) { if(num = 5) { return true; } else { return false; } }', '[{"input":"5", "expected":"true"}, {"input":"3", "expected":"false"}]', 3, 'LIVE', 'easy');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Incorrect Array Index', 'The function should return the last element of the array but returns undefined due to incorrect index.', 'javascript', 'function getLastElement(arr) { return arr[arr.length]; }', '[{"input":"[1,2,3]", "expected":"3"}, {"input":"["a"]", "expected":"a"}]', 3, 'LIVE', 'easy');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Infinite Loop Mishap', 'The function aims to decrement n to 0, but the loop never terminates due to wrong iteration condition.', 'javascript', 'function countdown(n) { while(n > 0) { console.log(n); } return ''done''; }', '[{"input":"3", "expected":"done"}]', 3, 'LIVE', 'easy');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Incorrect Return Due To Missing Braces', 'The function should check if number is even, returning true or false accordingly, but missing braces cause unintended return behavior.', 'javascript', 'function isEven(num) { if(num % 2 === 0) return true; else return false; }', '[{"input":"2", "expected":"true"}, {"input":"3", "expected":"false"}]', 3, 'LIVE', 'easy');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Wrong Variable Mutation', 'This function tries to double the value of n but mistakenly reassigns a constant variable causing a runtime error.', 'javascript', 'function doubleValue(n) { const num = n; num = num * 2; return num; }', '[{"input":"5", "expected":"10"}]', 3, 'LIVE', 'easy');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Missing Return Statement', 'Function intends to return true if input is uppercase, but no return statement causes undefined output.', 'javascript', 'function isUpperCase(char) { char === char.toUpperCase(); }', '[{"input":""A"", "expected":"true"}, {"input":""a"", "expected":"false"}]', 3, 'LIVE', 'easy');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Incorrect String Length Check', 'Function should return true if string length equals 3, but incorrect operator causes wrong output.', 'javascript', 'function isLengthThree(str) { return str.length = 3; }', '[{"input":""cat"", "expected":"true"}, {"input":""doge"", "expected":"false"}]', 3, 'LIVE', 'easy');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Off-by-One in For Loop Array Copy', 'Copies elements from one array to another but misses copying the last element because loop is off by one.', 'javascript', 'function copyArray(arr) { let copy = []; for(let i=0; i<arr.length-1; i++) { copy.push(arr[i]); } return copy; }', '[{"input":"[1,2,3,4]", "expected":"[1,2,3,4]"}]', 3, 'LIVE', 'easy');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Using Assignment Instead of Comparison in If', 'Checks if input is zero but uses assignment operator causing always true result.', 'javascript', 'function isZero(num) { if(num = 0) { return true; } else { return false; } }', '[{"input":"0", "expected":"true"}, {"input":"1", "expected":"false"}]', 3, 'LIVE', 'easy');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Incorrect Function Parameter Usage', 'Function should return the square of a number but tries to access undefined variable causing error.', 'javascript', 'function square() { return num * num; }', '[{"input":"4", "expected":"16"}]', 3, 'LIVE', 'easy');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Misplaced Semicolon in If Statement', 'The function is supposed to return ''Yes'' if input is true but misplaced semicolon causes it to always return undefined.', 'javascript', 'function checkTrue(val) { if(val); { return ''Yes''; } }', '[{"input":"true", "expected":"Yes"}, {"input":"false", "expected":"undefined"}]', 3, 'LIVE', 'easy');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Variable Shadowing Issue', 'Function defines a variable inside block which shadows outer variable leading to unexpected returned value.', 'javascript', 'function getValue() { let x = 5; if(true) { let x = 10; } return x; }', '[{"input":"", "expected":"5"}]', 3, 'LIVE', 'easy');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Failed Array Push Due to Wrong Brackets', 'Function should add element to array but uses parentheses instead of brackets, causing runtime error.', 'javascript', 'function addToArray(arr, el) { arr.push(el); return arr; }', '[{"input":"[[1,2],3]", "expected":"[1,2,3]"}]', 3, 'LIVE', 'easy');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Falsy Check Fails for Zero', 'This function returns ''No'' for falsy values but incorrectly returns ''No'' even for zero input which should be valid.', 'javascript', 'function checkValue(val) { if(!val) { return ''No''; } else { return ''Yes''; } }', '[{"input":"0", "expected":"Yes"}, {"input":"null", "expected":"No"}]', 3, 'LIVE', 'easy');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Sum Array Elements Bug', 'The function should return the sum of all numbers in the array, but it returns an incorrect total.', 'javascript', 'function sumArray(arr) { let total = 0; for(let i = 0; i <= arr.length; i++) { total += arr[i]; } return total; }', '[{"input":"[1,2,3,4]", "expected":"10"}, {"input":"[10,20,30]", "expected":"60"}]', 5, 'LIVE', 'medium');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Palindrome Check Fails', 'Should check if a string is a palindrome ignoring case and spaces, but returns false even for palindromes.', 'javascript', 'function isPalindrome(str) { const normalized = str.toLowerCase(); return normalized === normalized.split('''').reverse().join('' ''); }', '[{"input":"''Racecar''", "expected":"true"}, {"input":"''Hello''", "expected":"false"}]', 5, 'LIVE', 'medium');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Wrong Regex Match', 'Function should check if a string contains only digits but it incorrectly validates strings with letters.', 'javascript', 'function isNumeric(str) { return /^\d+/$/.test(str); }', '[{"input":"''12345''", "expected":"true"}, {"input":"''12a45''", "expected":"false"}]', 5, 'LIVE', 'medium');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Incorrect Filter Result', 'Function should filter out odd numbers from an array but it returns the original array unchanged.', 'javascript', 'function filterEven(arr) { return arr.filter(num => num % 2 = 0); }', '[{"input":"[1,2,3,4,5]", "expected":"[2,4]"}]', 5, 'LIVE', 'medium');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'String Replace Misses All', 'Replace all commas in a string with semicolons, but function replaces only the first comma.', 'javascript', 'function replaceCommas(str) { return str.replace('','', '';''); }', '[{"input":"''a,b,c,d''", "expected":"''a;b;c;d''"}]', 5, 'LIVE', 'medium');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Incorrect Max Number', 'Finds max number in array but returns wrong value when negative numbers are present.', 'javascript', 'function maxNumber(arr) { return arr.reduce((max, curr) => curr > max ? curr : max, 0); }', '[{"input":"[-10, -5, -1]", "expected":"-1"}, {"input":"[5, 10, 3]", "expected":"10"}]', 5, 'LIVE', 'medium');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Off-by-One String Slice', 'Function slices a string to extract the middle three characters but returns wrong substring.', 'javascript', 'function getMiddleThree(str) { const mid = Math.floor(str.length / 2); return str.slice(mid - 1, mid + 1); }', '[{"input":"''abcdefg''", "expected":"''cde''"}, {"input":"''hello''", "expected":"''ell''"}]', 5, 'LIVE', 'medium');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Sorting Numbers as Strings', 'Sort an array of numbers in ascending order but returns incorrect order treating numbers as strings.', 'javascript', 'function sortNumbers(arr) { return arr.sort(); }', '[{"input":"[10,2,1,20]", "expected":"[1,2,10,20]"}]', 5, 'LIVE', 'medium');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Logical AND instead of OR', 'Function should return true if either input is true but incorrectly uses logical AND causing wrong results.', 'javascript', 'function eitherTrue(a, b) { return a && b; }', '[{"input":"true,false", "expected":"true"}, {"input":"false,false", "expected":"false"}]', 5, 'LIVE', 'medium');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Find Index Returns -1 Always', 'Should return index of first occurrence of target in array but always returns -1 even when present.', 'javascript', 'function findIndex(arr, target) { for(let i=0; i < arr.length; i++) { if(arr[i] = target) { return i; } } return -1; }', '[{"input":"[[1,2,3,4],3]", "expected":"2"}, {"input":"[[5,6,7],4]", "expected":"-1"}]', 5, 'LIVE', 'medium');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Count Vowels Incorrectly', 'Counts number of vowels in a string but misses uppercase vowels.', 'javascript', 'function countVowels(str) { const vowels = [''a'', ''e'', ''i'', ''o'', ''u'']; return str.split('''').filter(ch => vowels.includes(ch)).length; }', '[{"input":"''Apple''", "expected":"2"}, {"input":"''Sky''", "expected":"0"}]', 5, 'LIVE', 'medium');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Array Flatten Bug', 'Flatten nested arrays by one level but function returns nested arrays unchanged.', 'javascript', 'function flatten(arr) { return arr.map(x => x); }', '[{"input":"[[1,2],[3,4],5]", "expected":"[1,2,3,4,5]"}]', 5, 'LIVE', 'medium');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Object Property Update Fails', 'Function should update the age property of a person object but property remains unchanged.', 'javascript', 'function updateAge(person, newAge) { person = {...person, age: newAge}; return person; }', '[{"input":"[{\"name\":\"Alice\", \"age\":25}, 30]", "expected":"{\"name\":\"Alice\", \"age\":30}"}]', 5, 'LIVE', 'medium');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Array Includes Bug', 'Check if array includes a given element but function fails due to incorrect method usage.', 'javascript', 'function includesElement(arr, el) { return arr.include(el); }', '[{"input":"[[1,2,3], 2]", "expected":"true"}, {"input":"[[1,2,3], 4]", "expected":"false"}]', 5, 'LIVE', 'medium');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Incorrect Factorial Calculation', 'Calculates factorial of a number but returns wrong result due to loop error.', 'javascript', 'function factorial(n) { let result = 1; for(let i = 1; i < n; i++) { result *= i; } return result; }', '[{"input":"5", "expected":"120"}, {"input":"3", "expected":"6"}]', 5, 'LIVE', 'medium');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Map Keys to Uppercase Bug', 'Convert all keys in object to uppercase but original keys are unchanged.', 'javascript', 'function keysToUpper(obj) { let newObj = {}; Object.keys(obj).forEach(key => { newObj.key.toUpperCase() = obj[key]; }); return newObj; }', '[{"input":"{a:1, b:2}", "expected":"{A:1, B:2}"}]', 5, 'LIVE', 'medium');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Date Parsing Bug', 'Parses date from string ''YYYY-MM-DD'' but sometimes returns invalid date object.', 'javascript', 'function parseDate(str) { const parts = str.split(''-''); return new Date(parts[2], parts[1], parts[0]); }', '[{"input":"''2023-06-15''", "expected":"''2023-06-15T00:00:00.000Z''"}]', 5, 'LIVE', 'medium');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Boolean Conversion Bug', 'Converts value to boolean but always returns true regardless of input.', 'javascript', 'function toBoolean(val) { if(val) { return true; } else { return true; } }', '[{"input":"0", "expected":"false"}, {"input":"null", "expected":"false"}, {"input":"''hello''", "expected":"true"}]', 5, 'LIVE', 'medium');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Deep Clone Fail', 'A function meant to deeply clone an object returns a shallow copy instead, causing mutations to the clone to affect the original object.', 'javascript', 'function deepClone(obj) { return Object.assign({}, obj); }', '[{"input":"{\"a\":1, \"b\": {\"c\": 2}}", "expected":"{\"a\":1, \"b\": {\"c\": 2}}"}]', 7, 'LIVE', 'hard');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Custom Sort Chaos', 'Sort an array of objects by ''priority'' and then ''timestamp''. The function sorts incorrectly, mixing up the order due to improper comparator logic.', 'javascript', 'function sortTasks(tasks) { return tasks.sort((a, b) => a.priority - b.priority > 0 ? 1 : -1 || a.timestamp - b.timestamp); }', '[{"input":"[{\"priority\": 2, \"timestamp\": 3}, {\"priority\": 1, \"timestamp\": 5}, {\"priority\": 1, \"timestamp\": 2}]", "expected":"[{\"priority\":1, \"timestamp\":2}, {\"priority\":1, \"timestamp\":5}, {\"priority\":2, \"timestamp\":3}]"}]', 7, 'LIVE', 'hard');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Array Filter Mess', 'A function meant to filter out all even numbers incorrectly filters odd numbers instead due to incorrect modulo condition.', 'javascript', 'function filterEvens(arr) { return arr.filter(num => num % 2 = 0); }', '[{"input":"[1,2,3,4,5,6]", "expected":"[2,4,6]"}]', 7, 'LIVE', 'hard');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Falsy Value Traps', 'Function checks for presence of a property but incorrectly treats valid falsy values (0, '''', false) as absence, leading to wrong logic.', 'javascript', 'function checkProp(obj, prop) { if (!obj[prop]) { return ''Missing''; } else { return ''Present''; } }', '[{"input":"[{\"a\":0}, \"a\"]", "expected":"Present"}]', 7, 'LIVE', 'hard');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Promise Chain Break', 'A promise chain meant to process a series of async operations fails because of missing return statement inside then(), causing undefined results.', 'javascript', 'function processData(promise) { return promise.then(data => { data.value *= 2; }); }', '[{"input":"{\"value\":10}", "expected":"{\"value\":20}"}]', 7, 'LIVE', 'hard');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Regex Global Fail', 'A function uses regex to find all digits in a string but incorrectly omits the global flag causing only the first digit to be matched.', 'javascript', 'function getDigits(str) { return str.match(/\d/); }', '[{"input":"''a1b2c3''", "expected":"[''1'',''2'',''3'']"}]', 7, 'LIVE', 'hard');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Nested Property Setter', 'Function supposed to update a nested property in a deep object mistakenly mutates the wrong reference causing unexpected side effects.', 'javascript', 'function setNested(obj, key, val) { let nested = obj[key]; nested.value = val; }', '[{"input":"{\"key\": {\"value\": 1}}, \"key\", 5", "expected":"{\"key\": {\"value\": 5}}"}]', 7, 'LIVE', 'hard');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Circular Reference JSON', 'A function attempts to stringify an object with potential circular references but causes a crash or infinite recursion as it does not handle cycles.', 'javascript', 'function safeStringify(obj) { return JSON.stringify(obj); }', '[{"input":"{\"a\":1, \"b\": {}}", "expected":"''{\"a\":1,\"b\":{}}''"}]', 7, 'LIVE', 'hard');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Incorrect Memoization Key', 'A memoized function uses an object as cache key directly, causing cache misses due to different object references.', 'javascript', 'function memoizedAdd(obj) { memoizedAdd.cache = memoizedAdd.cache || {}; if (memoizedAdd.cache[obj]) return memoizedAdd.cache[obj]; let result = obj.a + obj.b; memoizedAdd.cache[obj] = result; return result; }', '[{"input":"{\"a\":2, \"b\":3}", "expected":"5"}]', 7, 'LIVE', 'hard');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Event Listener Memory Leak', 'A function attaches event listeners in a loop but the listeners reference a loop variable incorrectly causing handlers to behave unexpectedly.', 'javascript', 'function attachHandlers(buttons) { for (var i=0; i<buttons.length; i++) { buttons[i].addEventListener(''click'', function() { console.log(''Button '' + i + '' clicked''); }); } }', '[{"input":"[{},{},{}]", "expected":"Button 0 clicked\nButton 1 clicked\nButton 2 clicked"}]', 7, 'LIVE', 'hard');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Incorrect Callback Binding', 'A class method passed as a callback loses its this context, causing runtime errors when accessing instance properties.', 'javascript', 'class Counter { constructor() { this.count = 0; } increment() { this.count++; } } function runIncrement(cb) { cb(); }', '[{"input":"{}", "expected":"1"}]', 7, 'LIVE', 'hard');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Promise Race Deadlock', 'A function using Promise.race does not properly handle rejections and leaves promises unresolved causing potential deadlocks.', 'javascript', 'function fastest(promises) { return Promise.race(promises).then(res => res).catch(err => {}); }', '[{"input":"[Promise.resolve(1), Promise.reject(''fail'')]", "expected":"1"}]', 7, 'LIVE', 'hard');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Infinite Recursion Masked', 'A recursive function tries to compute a factorial but base case condition is wrong, causing infinite recursion until stack overflow.', 'javascript', 'function factorial(n) { if (n === 1) return 1; return n * factorial(n-2); }', '[{"input":"5", "expected":"120"}]', 7, 'LIVE', 'hard');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Wrong Map Key Mutation', 'Updating keys in a Map during iteration causes unexpected key mismatch because keys are mutated externally.', 'javascript', 'function updateMapKeys(map) { for (let key of map.keys()) { key.id += 1; map.set(key, map.get(key)); } return map; }', '[{"input":"new Map([[{\"id\":1}, \"val1\"], [{\"id\":2}, \"val2\"]])", "expected":"Map with keys having ids 2 and 3"}]', 7, 'LIVE', 'hard');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Class Static This Trap', 'A static method accesses this.property expecting an instance property but ends up undefined due to static context.', 'javascript', 'class Example { constructor() { this.count = 10; } static getCount() { return this.count; } }', '[{"input":"{}", "expected":"10"}]', 7, 'LIVE', 'hard');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Incorrect Async Loop', 'An async function inside a for loop incorrectly uses var making each async callback reference the last loop value.', 'javascript', 'async function process(items) { for (var i=0; i<items.length; i++) { await asyncProcess(items[i]); console.log(''Processed '' + i); } }', '[{"input":"[10,20,30]", "expected":"Processed 0\nProcessed 1\nProcessed 2"}]', 7, 'LIVE', 'hard');
    END IF;

    IF v_debug_game_id IS NOT NULL THEN
        INSERT INTO debug_challenges (game_id, title, description, language, initial_code, test_cases, time_limit_minutes, status, difficulty)
        VALUES (v_debug_game_id, 'Falsy Comparison Confusion', 'Function intended to check if a number is zero uses loose equality causing unexpected behavior when input is ''0'', false, null, or empty string.', 'javascript', 'function isZero(val) { return val == 0; }', '[{"input":"0", "expected":"true"}, {"input":"''0''", "expected":"false"}]', 7, 'LIVE', 'hard');
    END IF;

END $$;
