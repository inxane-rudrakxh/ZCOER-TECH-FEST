-- Migration: Replace all MCQ questions with Computer Graphics questions
DO $$
DECLARE
    v_quiz_id UUID;
    q_id UUID;
    o_id1 UUID; o_id2 UUID; o_id3 UUID; o_id4 UUID;
BEGIN
    SELECT id INTO v_quiz_id FROM quizzes LIMIT 1;

    -- Delete all existing questions (cascades to options via FK)
    DELETE FROM quiz_questions WHERE quiz_id = v_quiz_id;

    -- Q1: Smallest addressable element of a digital image
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty)
    VALUES (q_id, v_quiz_id, 'Which of the following is the smallest addressable element of a digital image?', 1, 'easy');
    o_id1 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Frame buffer');
    o_id2 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Pixel');
    o_id3 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Resolution');
    o_id4 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Aspect ratio');
    UPDATE quiz_questions SET correct_option_id = o_id2 WHERE id = q_id;

    -- Q2: Bresenham's line drawing algorithm
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty)
    VALUES (q_id, v_quiz_id, 'Bresenham''s line drawing algorithm mainly uses:', 1, 'easy');
    o_id1 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Floating-point calculations');
    o_id2 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Trigonometric calculations');
    o_id3 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Integer calculations');
    o_id4 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Logarithmic calculations');
    UPDATE quiz_questions SET correct_option_id = o_id3 WHERE id = q_id;

    -- Q3: Device used to display computer graphics
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty)
    VALUES (q_id, v_quiz_id, 'Which device is mainly used to display computer graphics visually?', 1, 'easy');
    o_id1 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Scanner');
    o_id2 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Keyboard');
    o_id3 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Monitor');
    o_id4 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Mouse');
    UPDATE quiz_questions SET correct_option_id = o_id3 WHERE id = q_id;

    -- Q4: DDA line drawing algorithm steps
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty)
    VALUES (q_id, v_quiz_id, 'In the DDA line drawing algorithm, if dx = 8 and dy = 5, the number of steps is:', 1, 'medium');
    o_id1 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, '5');
    o_id2 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, '8');
    o_id3 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, '13');
    o_id4 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, '3');
    UPDATE quiz_questions SET correct_option_id = o_id2 WHERE id = q_id;

    -- Q5: Applications of computer graphics
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty)
    VALUES (q_id, v_quiz_id, 'Which of the following is an application of computer graphics?', 1, 'easy');
    o_id1 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Computer-Aided Design (CAD)');
    o_id2 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Animation');
    o_id3 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Video games');
    o_id4 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'All of the above');
    UPDATE quiz_questions SET correct_option_id = o_id4 WHERE id = q_id;

    -- Q6: Aspect ratio
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty)
    VALUES (q_id, v_quiz_id, 'The ratio of the width of an image to its height is called:', 1, 'easy');
    o_id1 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Resolution');
    o_id2 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Pixel');
    o_id3 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Aspect ratio');
    o_id4 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Frame buffer');
    UPDATE quiz_questions SET correct_option_id = o_id3 WHERE id = q_id;

    -- Q7: Input device in computer graphics
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty)
    VALUES (q_id, v_quiz_id, 'Which of the following is an input device used in computer graphics?', 1, 'easy');
    o_id1 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Plotter');
    o_id2 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Monitor');
    o_id3 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Mouse');
    o_id4 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Projector');
    UPDATE quiz_questions SET correct_option_id = o_id3 WHERE id = q_id;

    -- Q8: Scan conversion
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty)
    VALUES (q_id, v_quiz_id, 'The process of converting graphical objects into pixels on the screen is known as:', 1, 'medium');
    o_id1 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Transformation');
    o_id2 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Scan conversion');
    o_id3 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Animation');
    o_id4 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Scaling');
    UPDATE quiz_questions SET correct_option_id = o_id2 WHERE id = q_id;

    -- Q9: Bresenham's circle symmetry
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty)
    VALUES (q_id, v_quiz_id, 'Which property of a circle is used by Bresenham''s circle drawing algorithm to reduce calculations?', 1, 'medium');
    o_id1 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, '2-way symmetry');
    o_id2 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, '4-way symmetry');
    o_id3 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, '8-way symmetry');
    o_id4 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'No symmetry');
    UPDATE quiz_questions SET correct_option_id = o_id3 WHERE id = q_id;

    -- Q10: Frame buffer purpose
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty)
    VALUES (q_id, v_quiz_id, 'A frame buffer is mainly used to:', 1, 'easy');
    o_id1 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Store pixel values of an image');
    o_id2 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Enter text into a computer');
    o_id3 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Draw only circles');
    o_id4 := gen_random_uuid();
    INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Control the keyboard');
    UPDATE quiz_questions SET correct_option_id = o_id1 WHERE id = q_id;

END $$;
