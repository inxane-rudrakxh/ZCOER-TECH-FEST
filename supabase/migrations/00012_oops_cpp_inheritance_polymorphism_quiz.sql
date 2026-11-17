-- Migration 00012: OOPS in C++ (Inheritance & Polymorphism) Assessment
-- Zeal College of Engineering & Research (ZCOER) - S.Y. B.Tech (AI & DS)

DO $$
DECLARE
    v_quiz_id UUID;
    v_game_id UUID;
    q_id UUID;
    o_id1 UUID; o_id2 UUID; o_id3 UUID; o_id4 UUID;
BEGIN
    SELECT id, game_id INTO v_quiz_id, v_game_id FROM quizzes LIMIT 1;

    -- Update quiz metadata
    UPDATE quizzes 
    SET title = 'S.Y. B.Tech (AI & DS) – OOPS in C++ Assessment (Inheritance & Polymorphism)',
        duration_minutes = 15,
        total_marks = 20,
        status = 'LIVE'
    WHERE id = v_quiz_id;

    UPDATE games
    SET name = 'OOPS IN C++ QUIZ',
        description = 'Inheritance & Polymorphism assessment with 20 questions, +1 mark each.',
        status = 'LIVE'
    WHERE id = v_game_id;

    -- Clear previous quiz questions
    DELETE FROM quiz_questions WHERE quiz_id = v_quiz_id;

    -- 1. Which class is inherited by another class in C++?
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty, explanation)
    VALUES (q_id, v_quiz_id, 'Q1. Which class is inherited by another class in C++? [Base and Derived Class Definition]', 1, 'easy', 'The base class is the parent class from which properties are inherited.');
    o_id1 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Derived class');
    o_id2 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Base class');
    o_id3 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Sub class');
    o_id4 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Child class');
    UPDATE quiz_questions SET correct_option_id = o_id2 WHERE id = q_id;

    -- 2. Protected Visibility Specifier
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty, explanation)
    VALUES (q_id, v_quiz_id, 'Q2. Which access specifier allows a member to be accessed in the base class and its derived classes, but NOT outside the class? [Protected Visibility Specifier]', 1, 'easy', 'Protected members are accessible inside the base class and child classes, but blocked outside.');
    o_id1 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'public');
    o_id2 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'private');
    o_id3 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'protected');
    o_id4 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'global');
    UPDATE quiz_questions SET correct_option_id = o_id3 WHERE id = q_id;

    -- 3. Constructor Execution Order
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty, explanation)
    VALUES (q_id, v_quiz_id, 'Q3. In single inheritance, which constructor is executed first when an object of a derived class is created? [Constructor Execution Order]', 1, 'easy', 'The base class constructor always runs first before the derived class constructor.');
    o_id1 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Derived class constructor');
    o_id2 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Base class constructor');
    o_id3 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Destructor');
    o_id4 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Both constructors simultaneously');
    UPDATE quiz_questions SET correct_option_id = o_id2 WHERE id = q_id;

    -- 4. Function Overriding Syntax
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty, explanation)
    VALUES (q_id, v_quiz_id, 'Q4. Which keyword is used in the base class function to allow it to be overridden in a derived class for runtime polymorphism? [Function Overriding Syntax]', 1, 'easy', 'The ''virtual'' keyword enables dynamic dispatch/overriding in C++.');
    o_id1 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'static');
    o_id2 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'inline');
    o_id3 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'virtual');
    o_id4 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'friend');
    UPDATE quiz_questions SET correct_option_id = o_id3 WHERE id = q_id;

    -- 5. Types of Inheritance
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty, explanation)
    VALUES (q_id, v_quiz_id, 'Q5. When one derived class inherits from a single base class, what type of inheritance is it called? [Types of Inheritance]', 1, 'easy', 'Single inheritance involves exactly one base class and one derived class.');
    o_id1 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Multiple inheritance');
    o_id2 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Single inheritance');
    o_id3 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Hierarchical inheritance');
    o_id4 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Multilevel inheritance');
    UPDATE quiz_questions SET correct_option_id = o_id2 WHERE id = q_id;

    -- 6. Multiple Inheritance Syntax
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty, explanation)
    VALUES (q_id, v_quiz_id, 'Q6. What is it called when one derived class inherits directly from MORE THAN ONE base class? [Multiple Inheritance Syntax]', 1, 'easy', 'Multiple inheritance occurs when a derived class inherits from two or more base classes.');
    o_id1 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Single inheritance');
    o_id2 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Multiple inheritance');
    o_id3 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Multilevel inheritance');
    o_id4 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Hybrid inheritance');
    UPDATE quiz_questions SET correct_option_id = o_id2 WHERE id = q_id;

    -- 7. Virtual Base Class Purpose
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty, explanation)
    VALUES (q_id, v_quiz_id, 'Q7. Why is a ''virtual base class'' used in C++? [Virtual Base Class Purpose]', 1, 'easy', 'Virtual base classes resolve duplicate member copies in diamond-shaped inheritance.');
    o_id1 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'To speed up program execution');
    o_id2 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'To avoid multiple copies of a base class in Diamond inheritance');
    o_id3 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'To make all member variables static');
    o_id4 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'To prevent inheritance completely');
    UPDATE quiz_questions SET correct_option_id = o_id2 WHERE id = q_id;

    -- 8. Abstract Class Concept
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty, explanation)
    VALUES (q_id, v_quiz_id, 'Q8. What makes a class an Abstract Class in C++? [Abstract Class Concept]', 1, 'easy', 'A pure virtual function (= 0) defines an abstract class, preventing direct instantiation.');
    o_id1 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'It has no member variables');
    o_id2 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'It contains at least one pure virtual function (= 0)');
    o_id3 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'It has no main function');
    o_id4 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'It cannot have derived classes');
    UPDATE quiz_questions SET correct_option_id = o_id2 WHERE id = q_id;

    -- 9. Friend Class Definition
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty, explanation)
    VALUES (q_id, v_quiz_id, 'Q9. A friend class can access which members of the class in which it is declared a friend? [Friend Class Definition]', 1, 'easy', 'A friend class has full access privileges to private, protected, and public members.');
    o_id1 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Public members only');
    o_id2 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Private and protected members as well as public members');
    o_id3 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Protected members only');
    o_id4 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Cannot access any private members');
    UPDATE quiz_questions SET correct_option_id = o_id2 WHERE id = q_id;

    -- 10. Nested Class Basics
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty, explanation)
    VALUES (q_id, v_quiz_id, 'Q10. What is a ''nested class'' in C++? [Nested Class Basics]', 1, 'easy', 'A nested class is simply a class declared within the scope of an enclosing class.');
    o_id1 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'A class defined inside another class');
    o_id2 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'A class inherited from two base classes');
    o_id3 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'A class with only static methods');
    o_id4 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'A class without constructors');
    UPDATE quiz_questions SET correct_option_id = o_id1 WHERE id = q_id;

    -- 11. Concept of Polymorphism
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty, explanation)
    VALUES (q_id, v_quiz_id, 'Q11. What does the term ''Polymorphism'' literally mean in Object-Oriented Programming? [Concept of Polymorphism]', 1, 'easy', 'Polymorphism originates from Greek words meaning ''many forms''.');
    o_id1 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Single form');
    o_id2 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Many forms');
    o_id3 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'No forms');
    o_id4 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Hidden data');
    UPDATE quiz_questions SET correct_option_id = o_id2 WHERE id = q_id;

    -- 12. Types of Polymorphism
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty, explanation)
    VALUES (q_id, v_quiz_id, 'Q12. Which of the following is an example of Compile-Time Polymorphism in C++? [Types of Polymorphism]', 1, 'easy', 'Function overloading is resolved during compilation (compile-time polymorphism).');
    o_id1 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Virtual functions');
    o_id2 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Function Overloading');
    o_id3 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Pointers to base class');
    o_id4 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Abstract base classes');
    UPDATE quiz_questions SET correct_option_id = o_id2 WHERE id = q_id;

    -- 13. Operator Overloading Keyword
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty, explanation)
    VALUES (q_id, v_quiz_id, 'Q13. Which C++ keyword is used to overload an operator? [Operator Overloading Keyword]', 1, 'easy', 'The operator keyword followed by the symbol defines overloaded operator functions.');
    o_id1 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'overload');
    o_id2 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'operator');
    o_id3 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'virtual');
    o_id4 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'friend');
    UPDATE quiz_questions SET correct_option_id = o_id2 WHERE id = q_id;

    -- 14. Overloading Unary Operators
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty, explanation)
    VALUES (q_id, v_quiz_id, 'Q14. How many operands does a Unary Operator (e.g., ++, --) operate on? [Overloading Unary Operators]', 1, 'easy', 'Unary operators work on a single operand (e.g., ++x or -y).');
    o_id1 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'One');
    o_id2 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Two');
    o_id3 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Three');
    o_id4 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Zero');
    UPDATE quiz_questions SET correct_option_id = o_id1 WHERE id = q_id;

    -- 15. Function Overloading
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty, explanation)
    VALUES (q_id, v_quiz_id, 'Q15. Function overloading allows multiple functions in the same scope to have the same name if they differ in what? [Function Overloading]', 1, 'easy', 'Function overloading requires a distinct parameter list (number, sequence, or types of parameters).');
    o_id1 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'Return type only');
    o_id2 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'Function body only');
    o_id3 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'Number or types of parameters (signature)');
    o_id4 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'Class access specifier');
    UPDATE quiz_questions SET correct_option_id = o_id3 WHERE id = q_id;

    -- 16. Virtual Functions
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty, explanation)
    VALUES (q_id, v_quiz_id, 'Q16. Which keyword is placed before a base class member function to achieve Run-Time Polymorphism? [Virtual Functions]', 1, 'easy', 'The virtual keyword enables dynamic dispatch for run-time polymorphism.');
    o_id1 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'static');
    o_id2 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'inline');
    o_id3 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'virtual');
    o_id4 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'override');
    UPDATE quiz_questions SET correct_option_id = o_id3 WHERE id = q_id;

    -- 17. Pure Virtual Functions
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty, explanation)
    VALUES (q_id, v_quiz_id, 'Q17. How is a Pure Virtual Function declared in a C++ base class? [Pure Virtual Functions]', 1, 'easy', 'A pure virtual function is assigned = 0 in its declaration inside the base class.');
    o_id1 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'virtual void show() = 0;');
    o_id2 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'pure void show();');
    o_id3 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'virtual void show() = 1;');
    o_id4 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'void show() = NULL;');
    UPDATE quiz_questions SET correct_option_id = o_id1 WHERE id = q_id;

    -- 18. Virtual Table (vtable)
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty, explanation)
    VALUES (q_id, v_quiz_id, 'Q18. What is the primary role of the Virtual Table (vtable) maintained by the compiler? [Virtual Table (vtable)]', 1, 'easy', 'The vtable stores function pointers to enable dynamic binding of virtual functions at runtime.');
    o_id1 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'To store object data members');
    o_id2 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'To resolve virtual function calls dynamically at run-time');
    o_id3 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'To overload binary operators');
    o_id4 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'To compile code faster');
    UPDATE quiz_questions SET correct_option_id = o_id2 WHERE id = q_id;

    -- 19. Virtual Destructors
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty, explanation)
    VALUES (q_id, v_quiz_id, 'Q19. Why should a base class destructor be declared as ''virtual'' when dealing with derived objects through base pointers? [Virtual Destructors]', 1, 'easy', 'A virtual destructor ensures that the derived class destructor is called properly when deleting via a base pointer.');
    o_id1 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'To prevent object creation');
    o_id2 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'To ensure proper destruction of derived class objects when deleted');
    o_id3 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'To speed up execution');
    o_id4 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'To make the base class abstract');
    UPDATE quiz_questions SET correct_option_id = o_id2 WHERE id = q_id;

    -- 20. Abstract Base Class
    q_id := gen_random_uuid();
    INSERT INTO quiz_questions (id, quiz_id, question_text, marks, difficulty, explanation)
    VALUES (q_id, v_quiz_id, 'Q20. What happens if you try to create a direct object of an Abstract Base Class in C++? [Abstract Base Class]', 1, 'easy', 'Abstract classes contain pure virtual functions and cannot be instantiated, raising a compile-time error.');
    o_id1 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id1, q_id, 'An object is created successfully');
    o_id2 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id2, q_id, 'A compile-time error occurs');
    o_id3 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id3, q_id, 'A runtime error occurs');
    o_id4 := gen_random_uuid(); INSERT INTO quiz_options (id, question_id, option_text) VALUES (o_id4, q_id, 'The program produces garbage output');
    UPDATE quiz_questions SET correct_option_id = o_id2 WHERE id = q_id;

END $$;

