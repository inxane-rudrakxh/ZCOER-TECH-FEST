-- Migration: Add quiz difficulties and a massive question bank
ALTER TABLE quiz_questions ADD COLUMN IF NOT EXISTS difficulty TEXT DEFAULT 'medium';

-- Insert 60 new questions for Tech Quiz (ID: 8ca699d1-3fb3-469b-8e12-cb40d58f335b)
DO $$
DECLARE
    v_quiz_id UUID;
    q_id UUID;
    o_id1 UUID; o_id2 UUID; o_id3 UUID; o_id4 UUID;
BEGIN
    SELECT id INTO v_quiz_id FROM quizzes LIMIT 1;
    DELETE FROM quiz_questions WHERE quiz_id = v_quiz_id;
    -- Question: What does HTML stand for?...
    q_id := 'a8aac2e8-93e2-4454-ae5b-877ce0dc2e5a';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What does HTML stand for?', 1, 'easy');
    o_id1 := '57efabc4-a7c1-4ec5-88ce-a15529d3b5a0';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Hyper Text Markup Language');
    o_id2 := '8b7bf59d-0287-4945-93b3-f64376d7a30f';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Hyperlinks and Text Markup Language');
    o_id3 := '737de408-bdb1-4697-8661-7b348def041b';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Home Tool Markup Language');
    o_id4 := 'beb1f36e-f04e-4f9f-b73f-4010acbcd835';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Hyper Text Multi Language');
    UPDATE quiz_questions SET correct_option_id = '57efabc4-a7c1-4ec5-88ce-a15529d3b5a0' WHERE id = q_id;

    -- Question: Which of the following is NOT ...
    q_id := '87eb159e-60fa-4084-9d42-8b503ef31531';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'Which of the following is NOT a programming language?', 1, 'easy');
    o_id1 := '97411967-bc26-4082-ac6c-66104f1d7b19';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Python');
    o_id2 := 'ad042011-dbdc-4a90-be66-9b86ac7c3a03';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Java');
    o_id3 := '0560d30c-99bf-46ff-bb4d-cc5d28bff26c';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'HTML');
    o_id4 := 'b61bea86-3f4a-4256-b311-2bcf9dfb842c';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'C++');
    UPDATE quiz_questions SET correct_option_id = '0560d30c-99bf-46ff-bb4d-cc5d28bff26c' WHERE id = q_id;

    -- Question: What is the primary function o...
    q_id := '14b9c104-be6a-4cc3-996f-6b0edcb60bb1';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is the primary function of a CPU?', 1, 'easy');
    o_id1 := '52606d6f-d855-4374-90f9-d8e849b6143a';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Store data permanently');
    o_id2 := 'bd2a4c6d-3ccb-469a-940d-a4fe4e04bd74';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Process instructions');
    o_id3 := '095db1db-09f4-4d1b-8df3-230b683b83c3';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Render graphics');
    o_id4 := '6dd89669-1ae6-407f-b12a-db660d305b34';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Connect to the internet');
    UPDATE quiz_questions SET correct_option_id = 'bd2a4c6d-3ccb-469a-940d-a4fe4e04bd74' WHERE id = q_id;

    -- Question: In Python, how do you define a...
    q_id := 'c5e0ac27-e1fd-4e81-9cf4-ffcf99d555ea';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'In Python, how do you define a function?', 1, 'easy');
    o_id1 := 'd8402671-e3f4-4178-8f82-5b11a0e5b101';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'function myFunc()');
    o_id2 := '89f15a7a-b613-4f14-ab26-f48430f6f9d7';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'def myFunc():');
    o_id3 := 'ce572f35-badd-4502-8b7e-fc931cdf5b36';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'create myFunc()');
    o_id4 := '8729899b-7dcf-4bb8-80c1-5c2c428a26bd';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'fun myFunc:');
    UPDATE quiz_questions SET correct_option_id = '89f15a7a-b613-4f14-ab26-f48430f6f9d7' WHERE id = q_id;

    -- Question: What does CSS stand for?...
    q_id := '2a60d5f3-1695-40a4-ad5a-6c1ee861d7b6';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What does CSS stand for?', 1, 'easy');
    o_id1 := '3c4dd795-39ca-40da-8b6a-0ae2b5b0817a';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Computer Style Sheets');
    o_id2 := '99182d28-bdf4-4a92-a6a0-2c5e23021b7a';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Creative Style Sheets');
    o_id3 := 'a522624b-ebd5-43d3-b61c-e6d50d84db88';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Cascading Style Sheets');
    o_id4 := 'a14e3649-9032-4e42-aac1-9474fadeb168';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Colorful Style Sheets');
    UPDATE quiz_questions SET correct_option_id = 'a522624b-ebd5-43d3-b61c-e6d50d84db88' WHERE id = q_id;

    -- Question: Which symbol is used for comme...
    q_id := '5ff8e00a-d017-4da5-a7f7-e029a90ed72e';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'Which symbol is used for comments in Python?', 1, 'easy');
    o_id1 := 'f847030c-c760-4902-9b19-069d0ff49655';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, '//');
    o_id2 := 'c387ae66-e3e9-4159-bb03-eb60ad41c131';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, '/*');
    o_id3 := '685e6389-3991-40a1-803b-3ce5e884bda0';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, '#');
    o_id4 := 'babf5fe1-806f-48aa-8109-5d6f3dced6c5';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, '<!--');
    UPDATE quiz_questions SET correct_option_id = '685e6389-3991-40a1-803b-3ce5e884bda0' WHERE id = q_id;

    -- Question: What is the correct way to out...
    q_id := 'ec9754bd-935f-4f46-bd37-c2d699447dc9';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is the correct way to output ''Hello World'' in Java?', 1, 'easy');
    o_id1 := '79613dd9-bda2-41cb-bbc5-e4f96a5484c0';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'System.out.println(''Hello World'');');
    o_id2 := 'd9af98ff-ace9-46f1-97df-6742951d1547';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'echo ''Hello World'';');
    o_id3 := '5de55a5d-83f3-41c7-9bf7-a716049f9e8f';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'print(''Hello World'');');
    o_id4 := 'e78d326c-2a08-4c8d-8e75-323b0ab3778f';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Console.WriteLine(''Hello World'');');
    UPDATE quiz_questions SET correct_option_id = '79613dd9-bda2-41cb-bbc5-e4f96a5484c0' WHERE id = q_id;

    -- Question: Which data type is used to sto...
    q_id := 'd6b370aa-f0b2-4614-8507-dbdf8c6c11db';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'Which data type is used to store text in most languages?', 1, 'easy');
    o_id1 := '25a33cb8-8ba0-459c-af13-6863400bc5d4';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'String');
    o_id2 := '835697f7-4d7b-49d9-8b04-0cf19cbe6da7';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Integer');
    o_id3 := '3f8c6471-dfa9-4e91-ae65-a0f3b4c0359b';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Boolean');
    o_id4 := '7fdbe1f9-491d-40fd-b404-e1680fb8d602';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Float');
    UPDATE quiz_questions SET correct_option_id = '25a33cb8-8ba0-459c-af13-6863400bc5d4' WHERE id = q_id;

    -- Question: What is the time complexity of...
    q_id := 'd3b1869c-3e90-4590-96bc-05d7783dba99';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is the time complexity of accessing an element in an array by index?', 1, 'easy');
    o_id1 := '3739894d-e0e6-4f38-8ded-d0c0c7309c8f';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'O(1)');
    o_id2 := 'b9c0431e-d16a-405c-8b4b-47ec2238fb99';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'O(n)');
    o_id3 := '1d685366-f60a-4541-ac57-3b1f4461af0a';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'O(log n)');
    o_id4 := 'b39aeabe-517c-4f58-a1e6-c99caf72b6f0';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'O(n^2)');
    UPDATE quiz_questions SET correct_option_id = '3739894d-e0e6-4f38-8ded-d0c0c7309c8f' WHERE id = q_id;

    -- Question: What does SQL stand for?...
    q_id := '72578ab3-e512-453b-81da-4e6445b17e94';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What does SQL stand for?', 1, 'easy');
    o_id1 := '03ef1f9d-37c8-4f6e-9afe-c8d1269539c7';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Structured Question Language');
    o_id2 := '24753d90-04fc-4920-a05b-910461d3d7bf';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Strong Question Language');
    o_id3 := '52d44eec-00ef-4655-87b3-cab62ff5dd4f';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Structured Query Language');
    o_id4 := 'd4f672a3-9ed5-4ce9-8d10-f239063ccc3a';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Standard Query Language');
    UPDATE quiz_questions SET correct_option_id = '52d44eec-00ef-4655-87b3-cab62ff5dd4f' WHERE id = q_id;

    -- Question: Which of the following is an e...
    q_id := 'e42ea64e-12fd-40ef-9877-af152bd9bece';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'Which of the following is an example of an operating system?', 1, 'easy');
    o_id1 := 'bb4ee5aa-0feb-4834-a0bf-3cc4cf29293b';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Google Chrome');
    o_id2 := '6ddace49-9c23-4243-9dca-60763ae46bd0';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Microsoft Office');
    o_id3 := '47d90f20-a0be-4169-8fed-a54d6f818516';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Linux');
    o_id4 := 'cb0f2ace-0252-4215-9b4f-aec0bddef421';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Intel');
    UPDATE quiz_questions SET correct_option_id = '47d90f20-a0be-4169-8fed-a54d6f818516' WHERE id = q_id;

    -- Question: What does ''HTTP'' stand for?...
    q_id := 'e100b304-5102-4ea3-8a00-865946d47029';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What does ''HTTP'' stand for?', 1, 'easy');
    o_id1 := '0a9a0622-921d-4a93-aa92-b206d59e1570';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'HyperText Transfer Protocol');
    o_id2 := '1db97cea-d369-4642-ac67-61d4320f9b83';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'HyperText Transmission Protocol');
    o_id3 := 'a84b9344-dd66-4adf-9773-d2cfc056fa20';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Hyper Transfer Text Protocol');
    o_id4 := '677bc03b-5d75-4278-8f01-b68ce855334f';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Hyperlink Transfer Protocol');
    UPDATE quiz_questions SET correct_option_id = '0a9a0622-921d-4a93-aa92-b206d59e1570' WHERE id = q_id;

    -- Question: In JavaScript, which keyword i...
    q_id := '8301944f-76e6-4894-9742-f3d90d169ac0';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'In JavaScript, which keyword is used to declare a variable that cannot be reassigned?', 1, 'easy');
    o_id1 := '9aee3ae1-c6f1-47ea-bd45-61cdc7a6b89d';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'var');
    o_id2 := '988e53d8-c6da-4fa5-956e-8c7696214405';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'let');
    o_id3 := '905e76a6-35b4-49c1-b105-66ec004ec3d0';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'const');
    o_id4 := '8f4e4f0f-b832-41dc-b1c6-fe34153a53e1';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'static');
    UPDATE quiz_questions SET correct_option_id = '905e76a6-35b4-49c1-b105-66ec004ec3d0' WHERE id = q_id;

    -- Question: What is a ''boolean''?...
    q_id := '19a7da8b-5fc0-4136-9281-1052e2a5abdc';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is a ''boolean''?', 1, 'easy');
    o_id1 := '00222400-26ea-40c8-9930-10bf564ff841';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'A data type that can only be true or false');
    o_id2 := 'd17a0148-7849-4f83-82d6-588377db9d00';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'A mathematical formula');
    o_id3 := 'b924eca6-0734-4160-9473-3c29679d9e69';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'A type of loop');
    o_id4 := '9bf49474-7439-4297-ba44-3090daec3193';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'A string formatting method');
    UPDATE quiz_questions SET correct_option_id = '00222400-26ea-40c8-9930-10bf564ff841' WHERE id = q_id;

    -- Question: Which tag is used to create a ...
    q_id := '4953fd24-59d1-437a-b53b-6193008cc8c6';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'Which tag is used to create a hyperlink in HTML?', 1, 'easy');
    o_id1 := '3b130dc0-f809-4b21-9d51-4d98cb5749e1';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, '<link>');
    o_id2 := 'f6f8aae1-4936-4ad2-9257-5bb4eb5e78ee';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, '<a>');
    o_id3 := '4d26762d-f24d-4291-9ffe-56ed64592a6b';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, '<href>');
    o_id4 := '86655336-bd0e-4f8d-b665-439508b07854';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, '<hyperlink>');
    UPDATE quiz_questions SET correct_option_id = 'f6f8aae1-4936-4ad2-9257-5bb4eb5e78ee' WHERE id = q_id;

    -- Question: What is the result of 3 + ''3'...
    q_id := '1de3af8b-c093-48c2-8151-e909202052bc';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is the result of 3 + ''3'' in JavaScript?', 1, 'easy');
    o_id1 := '77c019ab-bd6b-4942-9a76-7c60b345a60b';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, '6');
    o_id2 := 'e3327eda-3326-47c0-a259-67d65217481a';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, '''33''');
    o_id3 := '8dac3402-a37e-46d2-96f6-475cc17f806a';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'NaN');
    o_id4 := '1f912b39-a03d-4fb5-96c8-4c2b756ce5f0';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Error');
    UPDATE quiz_questions SET correct_option_id = 'e3327eda-3326-47c0-a259-67d65217481a' WHERE id = q_id;

    -- Question: Which extension is commonly us...
    q_id := '64ad5608-494f-4313-87e8-8a9b254d6331';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'Which extension is commonly used for a JavaScript file?', 1, 'easy');
    o_id1 := 'ab9c70b9-2079-4b64-b36f-98e1d25dcbea';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, '.java');
    o_id2 := '910951c6-b5a7-4e14-92e3-27ce930f4340';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, '.js');
    o_id3 := 'b07fda05-6302-4717-8a15-1a25a0699305';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, '.jsx');
    o_id4 := '6532effc-fa93-4f51-941d-d7c1f8961960';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, '.script');
    UPDATE quiz_questions SET correct_option_id = '910951c6-b5a7-4e14-92e3-27ce930f4340' WHERE id = q_id;

    -- Question: What is Git?...
    q_id := '62fb7779-cdb8-4a8c-9f44-a6ae9084ec66';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is Git?', 1, 'easy');
    o_id1 := '45e29c50-0041-4dcd-9491-2d2640fab1a6';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'A programming language');
    o_id2 := '24abfa12-0087-4960-a284-fb097f2c12e1';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'A text editor');
    o_id3 := '9a857937-98c8-417c-b394-3769aa7d367d';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'A version control system');
    o_id4 := '6162e45d-19f9-4eea-82cc-df4ca2abe5fb';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'A web framework');
    UPDATE quiz_questions SET correct_option_id = '9a857937-98c8-417c-b394-3769aa7d367d' WHERE id = q_id;

    -- Question: What does API stand for?...
    q_id := 'e8172730-ad60-4f7f-b404-e16b211fe751';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What does API stand for?', 1, 'easy');
    o_id1 := '550604be-4ede-431d-ad27-44ee40e007d6';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Application Programming Interface');
    o_id2 := 'ebd9d4ae-149e-40c6-84c2-4affb0fcbe7b';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Advanced Programming Integration');
    o_id3 := '90798583-8895-43a7-8af0-8fbbf89e04be';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Automated Program Interaction');
    o_id4 := '4a3a51bc-e394-46f2-bfb2-b48b3992565f';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Application Process Interface');
    UPDATE quiz_questions SET correct_option_id = '550604be-4ede-431d-ad27-44ee40e007d6' WHERE id = q_id;

    -- Question: Which language is primarily us...
    q_id := '7087db78-b7ed-483e-9760-3872ee41fd37';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'Which language is primarily used for Android app development natively?', 1, 'easy');
    o_id1 := '629aedf6-4534-47da-8097-dcc9686db0f6';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Swift');
    o_id2 := '231e0169-2e20-4169-8870-321108e99512';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Kotlin');
    o_id3 := 'f46fe6b6-bdba-4fac-ace2-ce8385399344';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Ruby');
    o_id4 := '640ce289-d191-4c6b-a0e0-9357a76a486c';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'PHP');
    UPDATE quiz_questions SET correct_option_id = '231e0169-2e20-4169-8870-321108e99512' WHERE id = q_id;

    -- Question: What is a closure in JavaScrip...
    q_id := '6201e7d7-bc71-4d31-ad77-618dd63b415c';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is a closure in JavaScript?', 1, 'medium');
    o_id1 := 'ab88d46a-e8f7-4fc9-bbfe-4c61794e88df';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'A loop that never ends');
    o_id2 := '47eab9b4-4b24-4d51-8193-804041ca5646';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'A function bundled together with references to its lexical environment');
    o_id3 := '5c5ae5ee-011d-4e88-a350-564d21d124e4';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'A method to securely encrypt data');
    o_id4 := '3d924fce-608d-4326-97fc-2ef59b22bd1e';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'A way to stop event bubbling');
    UPDATE quiz_questions SET correct_option_id = '47eab9b4-4b24-4d51-8193-804041ca5646' WHERE id = q_id;

    -- Question: Which of these is a NoSQL data...
    q_id := '98c8b0fc-e27e-47d3-85d6-6a0701ebaef8';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'Which of these is a NoSQL database?', 1, 'medium');
    o_id1 := 'b7ad7d84-c9af-4f94-885c-4d859e40bd26';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'PostgreSQL');
    o_id2 := 'a34ea8a6-1cdd-412b-9775-d21c809f4fc1';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'MySQL');
    o_id3 := 'daf39bb5-62c1-4a61-be3a-de31a695c352';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'MongoDB');
    o_id4 := '75c657a3-757f-4a34-b6d2-218658fb3e94';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Oracle');
    UPDATE quiz_questions SET correct_option_id = 'daf39bb5-62c1-4a61-be3a-de31a695c352' WHERE id = q_id;

    -- Question: In Git, what is the command to...
    q_id := '8e0f5b3b-1fc0-4920-8b69-3b9eae7ca3ef';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'In Git, what is the command to create a new branch and switch to it?', 1, 'medium');
    o_id1 := '1a204752-056f-4645-934a-8b3ef1c9a102';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'git branch -m');
    o_id2 := 'cf6d049b-bcce-456f-a2e1-e6e9c551bec9';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'git checkout -b');
    o_id3 := '614eff9f-4842-4473-8082-43d420aae08f';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'git new branch');
    o_id4 := '2154bf9d-bbf5-4d8e-8e42-daadbb5d7451';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'git switch -c');
    UPDATE quiz_questions SET correct_option_id = 'cf6d049b-bcce-456f-a2e1-e6e9c551bec9' WHERE id = q_id;

    -- Question: What is the primary difference...
    q_id := '6fd49f37-1f3e-48fc-8f67-509ab2b8cc28';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is the primary difference between a process and a thread?', 1, 'medium');
    o_id1 := '1b139f33-e601-4f81-b667-a1c09d13fe3c';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Threads share memory, processes do not');
    o_id2 := '5492c20c-d314-4332-9e35-9717fd644eee';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Processes share memory, threads do not');
    o_id3 := '1c25ad0c-799b-4a66-9e68-86df337c2b08';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Threads are hardware based, processes are software');
    o_id4 := '33e3c010-55e1-4d18-8a6d-0f81a1b1db9c';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'They are exactly the same thing');
    UPDATE quiz_questions SET correct_option_id = '1b139f33-e601-4f81-b667-a1c09d13fe3c' WHERE id = q_id;

    -- Question: What does the ''static'' keywo...
    q_id := '2c22d56e-0df8-49a1-a21e-6075462515d6';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What does the ''static'' keyword mean in Java?', 1, 'medium');
    o_id1 := '71df47a8-b594-4a74-9048-83b5a869c59a';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'The variable cannot be changed');
    o_id2 := 'f62d0a48-c3d9-4a80-bb75-53f82165208b';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'The method belongs to the class, not an instance');
    o_id3 := 'eda7a62d-023d-4bfd-80f8-49d1d71f7706';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'The class cannot be inherited');
    o_id4 := 'f738cecf-61ad-4c91-bbfb-5c49b3982a9e';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'The object is immutable');
    UPDATE quiz_questions SET correct_option_id = 'f62d0a48-c3d9-4a80-bb75-53f82165208b' WHERE id = q_id;

    -- Question: Which HTTP method is typically...
    q_id := 'f739a9e8-941b-4f22-bf10-a1e6dc5c0cbf';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'Which HTTP method is typically used to update an existing resource completely?', 1, 'medium');
    o_id1 := '2323ff9d-7d98-4930-83b6-f0392127e55e';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'POST');
    o_id2 := 'db9d4a4d-331e-4eae-8002-4e4a89dd44d3';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'PATCH');
    o_id3 := 'bdb6ba61-3c6f-48b4-a526-6dd7c2225422';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'PUT');
    o_id4 := '5459a42c-97d5-4b38-ba50-d4455739b5e6';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'UPDATE');
    UPDATE quiz_questions SET correct_option_id = 'bdb6ba61-3c6f-48b4-a526-6dd7c2225422' WHERE id = q_id;

    -- Question: What is the time complexity of...
    q_id := '4a775ea9-38d9-4b46-ab97-758cfaa2575d';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is the time complexity of searching in a balanced Binary Search Tree?', 1, 'medium');
    o_id1 := 'a93d9a46-cca7-4075-a930-3be1f54d442b';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'O(1)');
    o_id2 := '323406cc-f722-43f7-9094-027ba65e78c5';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'O(n)');
    o_id3 := '9273346e-1192-49af-810b-33cc894ecbc5';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'O(n log n)');
    o_id4 := '2452b825-71b3-4211-b968-97bb91128ae2';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'O(log n)');
    UPDATE quiz_questions SET correct_option_id = '2452b825-71b3-4211-b968-97bb91128ae2' WHERE id = q_id;

    -- Question: What is ''polymorphism'' in OO...
    q_id := 'de550ee0-df05-4078-8d12-5a4bc4855b91';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is ''polymorphism'' in OOP?', 1, 'medium');
    o_id1 := 'f5b7f68c-b72b-4c77-8e9e-ec31215dc3bc';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Hiding internal state of an object');
    o_id2 := 'f3b9f2f9-d11a-4031-b6b7-2523615c9edd';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'The ability of different objects to respond to the same method call in their own way');
    o_id3 := '5f45a771-6e51-48d1-868f-f6468f46478b';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Creating a new class from an existing class');
    o_id4 := '6a4a516f-62c6-4169-b418-4ea7b6fc9352';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Binding data and methods together');
    UPDATE quiz_questions SET correct_option_id = 'f3b9f2f9-d11a-4031-b6b7-2523615c9edd' WHERE id = q_id;

    -- Question: In React, what hook is used to...
    q_id := '1550332b-2292-443d-82ac-f0648c42f338';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'In React, what hook is used to handle side effects?', 1, 'medium');
    o_id1 := 'c6f20d81-4d08-4c18-9ad8-39d6dd2665bc';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'useState');
    o_id2 := '44c12d68-dac4-4ec9-ba25-c19ac4728647';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'useContext');
    o_id3 := '163b6110-f857-4a85-a35e-e25919f2915e';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'useEffect');
    o_id4 := 'b5952300-9bbb-4fac-9b86-25ce5d42198b';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'useReducer');
    UPDATE quiz_questions SET correct_option_id = '163b6110-f857-4a85-a35e-e25919f2915e' WHERE id = q_id;

    -- Question: What is a REST API?...
    q_id := 'cf326969-d507-4cd3-97ca-c28aaf04a0fa';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is a REST API?', 1, 'medium');
    o_id1 := '2557f857-710d-449a-aef2-dfa31fc11d31';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'An API that requires the server to sleep between requests');
    o_id2 := '0b04ba37-4964-4ee8-9c3f-83b7723b3cfb';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'An architectural style that uses standard HTTP methods');
    o_id3 := '0aa148f8-5da2-462a-8006-ca5e822f9684';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'A protocol for sending emails');
    o_id4 := 'a3b006ec-1e51-4a0d-9657-04fe0c40d08c';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'A JavaScript library for state management');
    UPDATE quiz_questions SET correct_option_id = '0b04ba37-4964-4ee8-9c3f-83b7723b3cfb' WHERE id = q_id;

    -- Question: What is ''Docker'' primarily u...
    q_id := 'bfc01d8c-90a7-4caa-94af-7201f810cf22';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is ''Docker'' primarily used for?', 1, 'medium');
    o_id1 := 'b1555f12-8e50-451f-8fe1-d7f04e9a8342';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Writing code');
    o_id2 := '53c16d59-d95d-4bd2-9188-725d32cfa597';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Containerization of applications');
    o_id3 := '3f25db59-1454-4efd-a8ba-712fc6521f12';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Database management');
    o_id4 := '564cd645-e60b-4dce-836e-396df2d94a33';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Version control');
    UPDATE quiz_questions SET correct_option_id = '53c16d59-d95d-4bd2-9188-725d32cfa597' WHERE id = q_id;

    -- Question: What does ACID stand for in th...
    q_id := '23d98aae-c345-480a-91e0-8efdb92f4a2f';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What does ACID stand for in the context of databases?', 1, 'medium');
    o_id1 := '9cc0fff5-45f6-480b-b9fa-ac92540cc6ee';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Atomicity, Consistency, Isolation, Durability');
    o_id2 := 'd6492cbf-763f-4793-b56e-4371ee224fb2';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Accuracy, Completeness, Integrity, Dependability');
    o_id3 := '2eeb0e91-c982-477a-a976-98cf13262bc2';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Asynchronous, Concurrent, Isolated, Distributed');
    o_id4 := 'b89baea3-0b41-4335-aef7-fd95e1f39a90';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Automated, Consistent, Indexed, Dynamic');
    UPDATE quiz_questions SET correct_option_id = '9cc0fff5-45f6-480b-b9fa-ac92540cc6ee' WHERE id = q_id;

    -- Question: Which sorting algorithm has th...
    q_id := 'a75d2049-fd03-4562-9b5b-9a15d05329a6';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'Which sorting algorithm has the best average-case time complexity?', 1, 'medium');
    o_id1 := '6d9fe85e-3a8c-4114-b3a2-5b087169c73d';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Bubble Sort');
    o_id2 := '143be28c-d940-4fc0-b15e-cf7a2ee1b075';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Insertion Sort');
    o_id3 := '1a9626bb-8777-4559-a4c6-5201a55807e4';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Merge Sort');
    o_id4 := '34cfd9cc-5c9b-4650-ad94-c3db2d1d98ae';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Selection Sort');
    UPDATE quiz_questions SET correct_option_id = '1a9626bb-8777-4559-a4c6-5201a55807e4' WHERE id = q_id;

    -- Question: What is ''middleware'' in a we...
    q_id := '269b0109-ddfa-435f-b966-5c57dbf0031f';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is ''middleware'' in a web framework like Express?', 1, 'medium');
    o_id1 := '6d963095-8dc5-40a8-a2d1-10b4ba1d5fce';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'The physical server hardware');
    o_id2 := '417a200f-f472-4c34-aced-cc29afa590e7';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Functions that have access to the request and response objects in the application''s request-response cycle');
    o_id3 := 'e34d27f3-9b61-4047-bbe8-790c75b4f99d';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'The database layer');
    o_id4 := 'a5148862-d0dd-4280-85c6-68d5c201ba3b';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'The frontend UI components');
    UPDATE quiz_questions SET correct_option_id = '417a200f-f472-4c34-aced-cc29afa590e7' WHERE id = q_id;

    -- Question: What is the purpose of ''JWT''...
    q_id := '19bbcd52-fc4e-4f4d-95a1-8eb79dfd6037';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is the purpose of ''JWT''?', 1, 'medium');
    o_id1 := 'b0f1e074-d709-4132-acda-d9ef9395efd0';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Styling web pages');
    o_id2 := 'd24a14e7-32d5-4028-8862-6b891e16f73a';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Securely transmitting information between parties as a JSON object');
    o_id3 := '5a7f611f-bb2a-414f-8971-ff7576e510b0';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Writing unit tests');
    o_id4 := 'b790df0d-83b3-40e5-ad21-aa0d39b8acf1';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Querying a database');
    UPDATE quiz_questions SET correct_option_id = 'd24a14e7-32d5-4028-8862-6b891e16f73a' WHERE id = q_id;

    -- Question: Which data structure operates ...
    q_id := 'd0ff2ed9-088c-40ea-be64-d1bbc9cb19b3';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'Which data structure operates on a Last In, First Out (LIFO) principle?', 1, 'medium');
    o_id1 := '9d25ca86-07e7-4a23-8cc6-3272b82f32b1';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Queue');
    o_id2 := '11da819a-8f14-416a-ba20-31472b3de940';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Tree');
    o_id3 := 'e590fd22-a4e4-4ad2-a03f-0184cccd6243';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Graph');
    o_id4 := 'df98f727-4d04-45a3-a747-b8fd43fd22a7';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Stack');
    UPDATE quiz_questions SET correct_option_id = 'df98f727-4d04-45a3-a747-b8fd43fd22a7' WHERE id = q_id;

    -- Question: In SQL, what is the difference...
    q_id := 'a30e55f0-e213-4328-ba47-1624800aac7d';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'In SQL, what is the difference between INNER JOIN and LEFT JOIN?', 1, 'medium');
    o_id1 := 'b2cb851e-c40d-4b69-9da4-2ab8c583da65';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'INNER JOIN returns all rows, LEFT JOIN returns matched rows');
    o_id2 := '0191ee32-9cc7-43bc-a1c2-d4052ac1510b';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'INNER JOIN returns only matching rows, LEFT JOIN returns all rows from the left table and matched rows from the right');
    o_id3 := '27a7a63a-11f6-400f-b05a-7dee6e1d1812';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'They are exactly the same');
    o_id4 := '34167bce-2afd-492c-a808-8b6bc2e465c2';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'LEFT JOIN is faster');
    UPDATE quiz_questions SET correct_option_id = '0191ee32-9cc7-43bc-a1c2-d4052ac1510b' WHERE id = q_id;

    -- Question: What does MVC stand for?...
    q_id := 'f839d657-0a52-409c-802a-a7b75ea2f7b7';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What does MVC stand for?', 1, 'medium');
    o_id1 := 'dc89541d-3759-4816-bc8e-08b6437bfd0c';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Model View Controller');
    o_id2 := 'fdc605d1-164d-4b86-94fd-432fc4efeab4';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Multiple View Configuration');
    o_id3 := '079feb15-4e4d-4b31-9f8d-c1ae7fb048a4';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Main Virtual Computer');
    o_id4 := '01d877b7-3533-4268-ae5b-9cb3782c66d4';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Microservice Visual Component');
    UPDATE quiz_questions SET correct_option_id = 'dc89541d-3759-4816-bc8e-08b6437bfd0c' WHERE id = q_id;

    -- Question: What is ''Debouncing'' in Java...
    q_id := '6f365974-2f4b-4eca-9fa0-ff22e9567494';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is ''Debouncing'' in JavaScript?', 1, 'medium');
    o_id1 := 'ea56199e-faa8-4d45-a494-647d03f7d011';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Bouncing elements in CSS');
    o_id2 := 'd85e1219-a1fb-496b-9295-7e4a77f6f975';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Ensuring a function is only executed after a certain amount of time has passed since it was last called');
    o_id3 := '964eea81-5e77-4543-a945-b0ee5df94c05';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'A method for checking variable types');
    o_id4 := '264a2d3e-4e66-4f2a-86e5-c8feae728be4';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Removing duplicate elements from an array');
    UPDATE quiz_questions SET correct_option_id = 'd85e1219-a1fb-496b-9295-7e4a77f6f975' WHERE id = q_id;

    -- Question: What is the primary use of a '...
    q_id := '94fda67e-68f5-4b12-87c1-93a119d6070e';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is the primary use of a ''foreign key'' in a relational database?', 1, 'medium');
    o_id1 := 'e9d97913-eb0b-40c6-b1a4-84284589c3bd';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'To encrypt data');
    o_id2 := '9f1a5897-2be9-461c-b67b-f2daa3d580fb';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'To uniquely identify a record in its own table');
    o_id3 := '126d073b-640a-4f64-8488-11a555ad3da2';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'To establish a link between the data in two tables');
    o_id4 := '7578a905-e9ed-458f-b9af-bd0e2810e8ea';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'To sort the table automatically');
    UPDATE quiz_questions SET correct_option_id = '126d073b-640a-4f64-8488-11a555ad3da2' WHERE id = q_id;

    -- Question: What is the time complexity of...
    q_id := '8cd326de-ef9f-48f7-b955-45288b383180';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is the time complexity of the quicksort algorithm in the worst-case scenario?', 1, 'hard');
    o_id1 := 'b49e6ba1-cd1f-4385-b99a-30b0d0f68892';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'O(n log n)');
    o_id2 := 'da4655c2-5259-4663-923b-79fcdbdc10f2';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'O(n)');
    o_id3 := 'f6a24789-18a8-4735-b856-e83e6cc767a9';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'O(n^2)');
    o_id4 := 'cd4ad80d-a7cb-478f-ae48-8a7ceb7d921b';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'O(1)');
    UPDATE quiz_questions SET correct_option_id = 'f6a24789-18a8-4735-b856-e83e6cc767a9' WHERE id = q_id;

    -- Question: In the CAP theorem, what does ...
    q_id := '986709e8-15be-40f2-a98e-11d0dfba031c';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'In the CAP theorem, what does the ''P'' stand for?', 1, 'hard');
    o_id1 := '5fd67a31-1607-41f6-98e9-f30f5f903759';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Performance');
    o_id2 := 'f8aff474-b28a-4504-9acd-e437ff1103b8';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Partition Tolerance');
    o_id3 := '41d6f387-7076-4f21-ba63-2fa0c76b487e';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Persistence');
    o_id4 := 'ec9b529f-e0de-4a3d-99b6-74057435659e';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Parallelism');
    UPDATE quiz_questions SET correct_option_id = 'f8aff474-b28a-4504-9acd-e437ff1103b8' WHERE id = q_id;

    -- Question: What is ''Eventual Consistency...
    q_id := '17dae5b9-4c09-4e59-af9c-cc295fae74b9';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is ''Eventual Consistency''?', 1, 'hard');
    o_id1 := '2d5af608-bd2a-4579-b481-ef9714db5934';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Data will be consistent immediately after a write');
    o_id2 := 'efef0863-1a65-423c-89ef-2a95e6025acf';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Given enough time without new updates, all reads will return the most recent write');
    o_id3 := 'ae56c0ac-5fb5-4035-936d-f9002fea3a13';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'The database will eventually crash');
    o_id4 := 'abac5a04-eed4-4b45-8604-78259f79ac1f';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Data consistency is never guaranteed');
    UPDATE quiz_questions SET correct_option_id = 'efef0863-1a65-423c-89ef-2a95e6025acf' WHERE id = q_id;

    -- Question: What is a ''Race Condition''?...
    q_id := 'd046541d-5b3f-4f59-ad43-9542a796bbf7';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is a ''Race Condition''?', 1, 'hard');
    o_id1 := '4c5ea7a0-4d52-4fc5-85d9-e3906da993ab';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'A competition between two servers');
    o_id2 := '9a1b560c-776b-4225-8749-429f2170dc90';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'A bug occurring when the sequence or timing of threads affects the output');
    o_id3 := '0cacf94b-7f95-46e0-9e38-54e84b789148';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'A type of sorting algorithm');
    o_id4 := '85e3f7f0-ad12-487a-a7e3-9c515b131022';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'When a database read is faster than a write');
    UPDATE quiz_questions SET correct_option_id = '9a1b560c-776b-4225-8749-429f2170dc90' WHERE id = q_id;

    -- Question: In operating systems, what is ...
    q_id := '7fb5eb7f-5fa7-4197-afd0-f99594d6046f';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'In operating systems, what is ''Deadlock''?', 1, 'hard');
    o_id1 := '213b7ed8-6134-44f2-b9b1-a4a7f1e2adc7';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'When the OS shuts down');
    o_id2 := '292436c6-d334-4593-94c4-f6e886281e6d';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'A situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process');
    o_id3 := 'fbd0a035-03c9-4a7d-b65c-907f1478d397';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'When a process consumes 100% CPU');
    o_id4 := 'be9303d2-ce10-4cc4-ba12-fa2c60efb472';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'A memory leak');
    UPDATE quiz_questions SET correct_option_id = '292436c6-d334-4593-94c4-f6e886281e6d' WHERE id = q_id;

    -- Question: What is the primary advantage ...
    q_id := '53e0504e-d67b-4c80-a8f6-a3d911ad6f4c';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is the primary advantage of a Bloom Filter?', 1, 'hard');
    o_id1 := 'c21577db-621c-45db-b1b4-d84dbd48827d';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'It perfectly sorts data in O(1) time');
    o_id2 := '5d95b281-6548-4140-abe4-ec32a131828f';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'It is a highly space-efficient probabilistic data structure used to test whether an element is a member of a set');
    o_id3 := '049fa8bb-a3db-488a-a0b8-6d8207585f1a';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'It prevents SQL injection');
    o_id4 := '658063a4-2b7c-42bb-b0e1-4cb7f6e0f0a1';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'It creates perfect hashes without collisions');
    UPDATE quiz_questions SET correct_option_id = '5d95b281-6548-4140-abe4-ec32a131828f' WHERE id = q_id;

    -- Question: What does ''Idempotence'' mean...
    q_id := '0190f84a-4542-41d5-8dcb-2f7e64d911e2';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What does ''Idempotence'' mean in the context of an API?', 1, 'hard');
    o_id1 := '3f3b86e5-2d39-4f48-a4df-898ae3fda7b3';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'The API is completely secure');
    o_id2 := 'e4a0c9ab-14a2-44c1-bdda-e6aad92ae52f';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Making multiple identical requests has the same effect as making a single request');
    o_id3 := 'c1031834-1345-44c8-b460-7f659a51b33d';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'The API can handle a million requests per second');
    o_id4 := 'fb0dc9ca-48b5-4203-acdc-6617594f3080';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'The API returns XML');
    UPDATE quiz_questions SET correct_option_id = 'e4a0c9ab-14a2-44c1-bdda-e6aad92ae52f' WHERE id = q_id;

    -- Question: Which algorithmic paradigm doe...
    q_id := 'a79ad301-d908-420e-98a8-871613f7317b';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'Which algorithmic paradigm does Dijkstra''s algorithm for finding the shortest path use?', 1, 'hard');
    o_id1 := '994b4dc5-1d5b-4762-ac35-258b61f74896';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Divide and Conquer');
    o_id2 := '41e1ca96-63ef-475f-9898-4508cc8e844d';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Dynamic Programming');
    o_id3 := '080b2e45-32a3-476f-97ea-0725b7c4333e';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Greedy Algorithm');
    o_id4 := '82ac4ab8-4940-4b88-a2f0-faaac87bde7b';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Backtracking');
    UPDATE quiz_questions SET correct_option_id = '080b2e45-32a3-476f-97ea-0725b7c4333e' WHERE id = q_id;

    -- Question: What is the difference between...
    q_id := 'f11d3069-eca1-42a8-9937-a81e8c9f7e8c';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is the difference between a Mutex and a Semaphore?', 1, 'hard');
    o_id1 := 'e21d5e9e-bce9-4b66-8936-94a86f261122';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'There is no difference');
    o_id2 := '661e268d-a6ec-4607-9a3f-626fda856942';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Mutex is for Linux, Semaphore is for Windows');
    o_id3 := 'c3131f85-e341-4b3e-adde-ffe64e3a3ea9';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'A mutex provides mutual exclusion (only one thread at a time), while a semaphore acts as a signaling mechanism allowing a specific number of threads');
    o_id4 := 'c8523496-7969-4c3d-8943-5120b5ac5537';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Semaphore is faster than a Mutex');
    UPDATE quiz_questions SET correct_option_id = 'c3131f85-e341-4b3e-adde-ffe64e3a3ea9' WHERE id = q_id;

    -- Question: In cryptography, what is an ''...
    q_id := '16735076-0ea4-4175-909a-8b90a4d1d8cf';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'In cryptography, what is an ''Avalanche Effect''?', 1, 'hard');
    o_id1 := 'ead2dd6f-d59f-4d27-8429-7764e8c67c38';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'When encryption keys are stolen in bulk');
    o_id2 := 'f5023c6f-cb06-41eb-b970-ec018710df25';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'A desirable property where a small change in the input results in a significantly different output');
    o_id3 := '94faf2fc-7a4e-4f59-b9bb-8e9825b38d45';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'When a hashing algorithm slows down exponentially');
    o_id4 := '5e67f781-4e72-43b6-8a31-8eb773792583';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'A type of brute force attack');
    UPDATE quiz_questions SET correct_option_id = 'f5023c6f-cb06-41eb-b970-ec018710df25' WHERE id = q_id;

    -- Question: What is a ''Trie'' data struct...
    q_id := 'bb4cd0ba-8595-46c3-81d2-1433373c8cad';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is a ''Trie'' data structure primarily used for?', 1, 'hard');
    o_id1 := 'fe62fd71-9e28-40b2-bde6-b5607107d47f';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Sorting numbers');
    o_id2 := '2cc91f20-0571-4f3b-92b8-b806c099c9b0';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Balancing trees');
    o_id3 := '27a85679-9e1a-4a51-90c1-1497870f9a41';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Efficient retrieval of a key in a large dataset of strings, like autocomplete');
    o_id4 := '4814b3b6-1be0-45a3-9cf9-d5962f3a530e';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Creating a graph');
    UPDATE quiz_questions SET correct_option_id = '27a85679-9e1a-4a51-90c1-1497870f9a41' WHERE id = q_id;

    -- Question: In functional programming, wha...
    q_id := '6c23f252-6719-412c-88cf-9864b268770d';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'In functional programming, what characterizes a ''pure function''?', 1, 'hard');
    o_id1 := '6f9be67f-c9b2-4c95-a97e-e5e9a4c86e3d';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'It has no side effects and returns the same output for the same input');
    o_id2 := '6b62f491-81a8-47b8-a0c5-76c306bb4bed';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'It only accepts purely numeric arguments');
    o_id3 := '784fa82b-90e4-4574-b0e7-9cd094da82a6';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'It cannot be called by other functions');
    o_id4 := 'd51d01c4-f286-471e-84ec-ff3522f2d331';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'It must be written in one line of code');
    UPDATE quiz_questions SET correct_option_id = '6f9be67f-c9b2-4c95-a97e-e5e9a4c86e3d' WHERE id = q_id;

    -- Question: What is ''B-Tree'' primarily o...
    q_id := '15391003-1918-4122-921b-534e5c05abfd';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is ''B-Tree'' primarily optimized for?', 1, 'hard');
    o_id1 := '5b8c8fa8-5142-4a9a-99b7-640ad8b22437';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'In-memory searching');
    o_id2 := '09780443-9f94-4e86-8d54-574d4ac8a89b';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Systems that read and write large blocks of data, like databases and file systems');
    o_id3 := 'a849ecfd-750d-4634-bfde-1fc10d80c447';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Cryptographic hashing');
    o_id4 := 'f00daa2c-71ad-42c0-9cc0-4129f0578cce';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, '3D graphics rendering');
    UPDATE quiz_questions SET correct_option_id = '09780443-9f94-4e86-8d54-574d4ac8a89b' WHERE id = q_id;

    -- Question: What is the purpose of ''Rever...
    q_id := '574cb747-b5cc-4591-944b-eb8cbd153bfb';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is the purpose of ''Reverse Proxy''?', 1, 'hard');
    o_id1 := '372020aa-0a82-4d19-9995-9d7e182abdf2';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'To hide the client''s IP from the internet');
    o_id2 := '120b9d42-ffd6-46da-acc6-3c0e0617056a';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'To intercept requests directed to backend servers and distribute them, providing load balancing and security');
    o_id3 := '85bb57ff-83f2-4513-b446-ebbe4788f34a';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'To reverse the bytes of a payload');
    o_id4 := 'd7080cb2-ec6f-4ebe-80fa-ca1992d68b6c';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'To proxy DNS requests');
    UPDATE quiz_questions SET correct_option_id = '120b9d42-ffd6-46da-acc6-3c0e0617056a' WHERE id = q_id;

    -- Question: In React, what does ''Hydratio...
    q_id := 'e2d1811e-0c59-4624-81c5-7c8a77855d33';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'In React, what does ''Hydration'' refer to?', 1, 'hard');
    o_id1 := '1ea493f5-ad28-4517-9e2a-dcd875cf3f33';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Installing NPM packages');
    o_id2 := 'b83519e7-1d55-4765-95a3-2af383757016';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'The process of attaching React event listeners to the static HTML generated by server-side rendering');
    o_id3 := '80b5d98b-78cb-4346-9c88-4353ffa7b3f8';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Refreshing the page state');
    o_id4 := '28989d9c-122f-47f6-ad0b-6f9cb43421a5';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Optimizing image loading');
    UPDATE quiz_questions SET correct_option_id = 'b83519e7-1d55-4765-95a3-2af383757016' WHERE id = q_id;

    -- Question: What is a ''Memory Leak'' in a...
    q_id := 'a6e50cab-d903-451c-a9f2-381c58442f85';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is a ''Memory Leak'' in a garbage-collected language like JavaScript?', 1, 'hard');
    o_id1 := '09d854d3-5db8-4ba4-8dbc-a22303f7f038';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'When RAM physically breaks');
    o_id2 := 'b1198519-1dbb-47d7-ae92-1805167434dc';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'When variables that are no longer needed are still referenced and thus not garbage collected, leading to high memory usage');
    o_id3 := '31c39df9-df78-4cd6-997c-f538102dcf88';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'When a variable is declared but not initialized');
    o_id4 := 'ab3070fe-495d-4f40-8029-f73c5feb15a5';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'When the OS limits node.js memory');
    UPDATE quiz_questions SET correct_option_id = 'b1198519-1dbb-47d7-ae92-1805167434dc' WHERE id = q_id;

    -- Question: What does the ''Two-Phase Comm...
    q_id := '192319f2-55b1-4333-a079-b946726a10dc';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What does the ''Two-Phase Commit'' protocol ensure?', 1, 'hard');
    o_id1 := 'f01cae74-5e53-4bd0-98b1-343f521ade14';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Faster database reads');
    o_id2 := '3aab0669-8978-4d52-a8d7-96088e9edbea';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Atomic transaction commitment across distributed databases');
    o_id3 := 'ba7b867f-7c88-4633-8db6-2cc9e52de1a2';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Code is reviewed by two people');
    o_id4 := '66d193af-6be3-4551-9fcf-2530d72a06fe';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Two servers always agree on the time');
    UPDATE quiz_questions SET correct_option_id = '3aab0669-8978-4d52-a8d7-96088e9edbea' WHERE id = q_id;

    -- Question: What is a ''Dangling Pointer''...
    q_id := '012f120f-91f3-432a-b2bc-ea33dea48369';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is a ''Dangling Pointer'' in C/C++?', 1, 'hard');
    o_id1 := 'b6165f43-2a8f-4e67-8e7f-514cb3ae35cc';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'A pointer that points to a memory location that has been freed or deleted');
    o_id2 := 'd9590761-32f3-4def-ad47-ea0e7702608f';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'A pointer that points to NULL');
    o_id3 := '3eafb2a6-f5cb-445a-8626-ca3c2f754c4a';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'A pointer that references a function');
    o_id4 := '3f4afa75-2fc9-4e91-a063-cfd322e78199';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'A pointer that is declared but not initialized');
    UPDATE quiz_questions SET correct_option_id = 'b6165f43-2a8f-4e67-8e7f-514cb3ae35cc' WHERE id = q_id;

    -- Question: What is the primary difference...
    q_id := '5ecae069-6d02-44a3-bd75-fc4e2e1fd670';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is the primary difference between TCP and UDP?', 1, 'hard');
    o_id1 := '280f8dfa-0ea3-4609-9541-d3ecbede0c66';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'UDP is connection-oriented, TCP is connectionless');
    o_id2 := '71696dae-18d2-4b95-89e4-733c0006aac0';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'TCP is connection-oriented and reliable, UDP is connectionless and does not guarantee delivery');
    o_id3 := 'f09e57e7-258d-4938-8a7c-0903acdf7cea';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'TCP is faster than UDP');
    o_id4 := '60a8f6ca-f35c-4c73-a0d7-99c4737b19d1';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'UDP is used for emails, TCP for video streaming');
    UPDATE quiz_questions SET correct_option_id = '71696dae-18d2-4b95-89e4-733c0006aac0' WHERE id = q_id;

    -- Question: What is ''Tail Call Optimizati...
    q_id := '0b40d7fb-9b2b-4297-bdda-c1b6bdb9ff8e';
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty) VALUES (q_id, v_quiz_id, 'What is ''Tail Call Optimization''?', 1, 'hard');
    o_id1 := 'c7c27f3f-7dc3-4abb-9619-dbd19d09f770';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Removing the last element of an array efficiently');
    o_id2 := '6dfe0740-7e39-44c5-b853-a404e3a45984';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'A compiler optimization that avoids adding a new stack frame for a function call if it is the last action in the function');
    o_id3 := '3861cee3-3fac-4bb3-84c9-2d6860a5d3dc';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Optimizing the tail end of a linked list');
    o_id4 := '5769a2df-4b6e-42ac-ba53-e4d58664af50';
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Caching the results of a function');
    UPDATE quiz_questions SET correct_option_id = '6dfe0740-7e39-44c5-b853-a404e3a45984' WHERE id = q_id;

END $$;