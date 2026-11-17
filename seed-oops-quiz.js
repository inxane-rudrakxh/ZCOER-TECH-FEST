import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const env = fs.readFileSync('.env', 'utf8').split('\n').reduce((acc, line) => {
  const [key, val] = line.split('=');
  if (key) acc[key.trim()] = val.trim();
  return acc;
}, {});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

const questionsData = [
  // --- INHERITANCE (1-10) ---
  {
    topic: "Inheritance",
    question: "Which class is inherited by another class in C++? [Base and Derived Class Definition]",
    options: ["Derived class", "Base class", "Sub class", "Child class"],
    correctIndex: 1, // B
    explanation: "The base class is the parent class from which properties are inherited.",
    difficulty: "easy"
  },
  {
    topic: "Inheritance",
    question: "Which access specifier allows a member to be accessed in the base class and its derived classes, but NOT outside the class? [Protected Visibility Specifier]",
    options: ["public", "private", "protected", "global"],
    correctIndex: 2, // C
    explanation: "Protected members are accessible inside the base class and child classes, but blocked outside.",
    difficulty: "easy"
  },
  {
    topic: "Inheritance",
    question: "In single inheritance, which constructor is executed first when an object of a derived class is created? [Constructor Execution Order]",
    options: ["Derived class constructor", "Base class constructor", "Destructor", "Both constructors simultaneously"],
    correctIndex: 1, // B
    explanation: "The base class constructor always runs first before the derived class constructor.",
    difficulty: "easy"
  },
  {
    topic: "Inheritance",
    question: "Which keyword is used in the base class function to allow it to be overridden in a derived class for runtime polymorphism? [Function Overriding Syntax]",
    options: ["static", "inline", "virtual", "friend"],
    correctIndex: 2, // C
    explanation: "The 'virtual' keyword enables dynamic dispatch/overriding in C++.",
    difficulty: "easy"
  },
  {
    topic: "Inheritance",
    question: "When one derived class inherits from a single base class, what type of inheritance is it called? [Types of Inheritance]",
    options: ["Multiple inheritance", "Single inheritance", "Hierarchical inheritance", "Multilevel inheritance"],
    correctIndex: 1, // B
    explanation: "Single inheritance involves exactly one base class and one derived class.",
    difficulty: "easy"
  },
  {
    topic: "Inheritance",
    question: "What is it called when one derived class inherits directly from MORE THAN ONE base class? [Multiple Inheritance Syntax]",
    options: ["Single inheritance", "Multiple inheritance", "Multilevel inheritance", "Hybrid inheritance"],
    correctIndex: 1, // B
    explanation: "Multiple inheritance occurs when a derived class inherits from two or more base classes.",
    difficulty: "easy"
  },
  {
    topic: "Inheritance",
    question: "Why is a 'virtual base class' used in C++? [Virtual Base Class Purpose]",
    options: [
      "To speed up program execution",
      "To avoid multiple copies of a base class in Diamond inheritance",
      "To make all member variables static",
      "To prevent inheritance completely"
    ],
    correctIndex: 1, // B
    explanation: "Virtual base classes resolve duplicate member copies in diamond-shaped inheritance.",
    difficulty: "easy"
  },
  {
    topic: "Inheritance",
    question: "What makes a class an Abstract Class in C++? [Abstract Class Concept]",
    options: [
      "It has no member variables",
      "It contains at least one pure virtual function (= 0)",
      "It has no main function",
      "It cannot have derived classes"
    ],
    correctIndex: 1, // B
    explanation: "A pure virtual function (`= 0`) defines an abstract class, preventing direct instantiation.",
    difficulty: "easy"
  },
  {
    topic: "Inheritance",
    question: "A friend class can access which members of the class in which it is declared a friend? [Friend Class Definition]",
    options: [
      "Public members only",
      "Private and protected members as well as public members",
      "Protected members only",
      "Cannot access any private members"
    ],
    correctIndex: 1, // B
    explanation: "A friend class has full access privileges to private, protected, and public members.",
    difficulty: "easy"
  },
  {
    topic: "Inheritance",
    question: "What is a 'nested class' in C++? [Nested Class Basics]",
    options: [
      "A class defined inside another class",
      "A class inherited from two base classes",
      "A class with only static methods",
      "A class without constructors"
    ],
    correctIndex: 0, // A
    explanation: "A nested class is simply a class declared within the scope of an enclosing class.",
    difficulty: "easy"
  },

  // --- POLYMORPHISM (11-20) ---
  {
    topic: "Polymorphism",
    question: "What does the term 'Polymorphism' literally mean in Object-Oriented Programming? [Concept of Polymorphism]",
    options: ["Single form", "Many forms", "No forms", "Hidden data"],
    correctIndex: 1, // B
    explanation: "Polymorphism originates from Greek words meaning 'many forms'.",
    difficulty: "easy"
  },
  {
    topic: "Polymorphism",
    question: "Which of the following is an example of Compile-Time Polymorphism in C++? [Types of Polymorphism]",
    options: [
      "Virtual functions",
      "Function Overloading",
      "Pointers to base class",
      "Abstract base classes"
    ],
    correctIndex: 1, // B
    explanation: "Function overloading is resolved during compilation (compile-time polymorphism).",
    difficulty: "easy"
  },
  {
    topic: "Polymorphism",
    question: "Which C++ keyword is used to overload an operator? [Operator Overloading Keyword]",
    options: ["overload", "operator", "virtual", "friend"],
    correctIndex: 1, // B
    explanation: "The `operator` keyword followed by the symbol defines overloaded operator functions.",
    difficulty: "easy"
  },
  {
    topic: "Polymorphism",
    question: "How many operands does a Unary Operator (e.g., ++, --) operate on? [Overloading Unary Operators]",
    options: ["One", "Two", "Three", "Zero"],
    correctIndex: 0, // A
    explanation: "Unary operators work on a single operand (e.g., `++x` or `-y`).",
    difficulty: "easy"
  },
  {
    topic: "Polymorphism",
    question: "Function overloading allows multiple functions in the same scope to have the same name if they differ in what? [Function Overloading]",
    options: [
      "Return type only",
      "Function body only",
      "Number or types of parameters (signature)",
      "Class access specifier"
    ],
    correctIndex: 2, // C
    explanation: "Function overloading requires a distinct parameter list (number, sequence, or types of parameters).",
    difficulty: "easy"
  },
  {
    topic: "Polymorphism",
    question: "Which keyword is placed before a base class member function to achieve Run-Time Polymorphism? [Virtual Functions]",
    options: ["static", "inline", "virtual", "override"],
    correctIndex: 2, // C
    explanation: "The `virtual` keyword enables dynamic dispatch for run-time polymorphism.",
    difficulty: "easy"
  },
  {
    topic: "Polymorphism",
    question: "How is a Pure Virtual Function declared in a C++ base class? [Pure Virtual Functions]",
    options: [
      "virtual void show() = 0;",
      "pure void show();",
      "virtual void show() = 1;",
      "void show() = NULL;"
    ],
    correctIndex: 0, // A
    explanation: "A pure virtual function is assigned `= 0` in its declaration inside the base class.",
    difficulty: "easy"
  },
  {
    topic: "Polymorphism",
    question: "What is the primary role of the Virtual Table (vtable) maintained by the compiler? [Virtual Table (vtable)]",
    options: [
      "To store object data members",
      "To resolve virtual function calls dynamically at run-time",
      "To overload binary operators",
      "To compile code faster"
    ],
    correctIndex: 1, // B
    explanation: "The vtable stores function pointers to enable dynamic binding of virtual functions at runtime.",
    difficulty: "easy"
  },
  {
    topic: "Polymorphism",
    question: "Why should a base class destructor be declared as 'virtual' when dealing with derived objects through base pointers? [Virtual Destructors]",
    options: [
      "To prevent object creation",
      "To ensure proper destruction of derived class objects when deleted",
      "To speed up execution",
      "To make the base class abstract"
    ],
    correctIndex: 1, // B
    explanation: "A virtual destructor ensures that the derived class destructor is called properly when deleting via a base pointer.",
    difficulty: "easy"
  },
  {
    topic: "Polymorphism",
    question: "What happens if you try to create a direct object of an Abstract Base Class in C++? [Abstract Base Class]",
    options: [
      "An object is created successfully",
      "A compile-time error occurs",
      "A runtime error occurs",
      "The program produces garbage output"
    ],
    correctIndex: 1, // B
    explanation: "Abstract classes contain pure virtual functions and cannot be instantiated, raising a compile-time error.",
    difficulty: "easy"
  }
];

async function seed() {
  console.log('--- SEEDING OOPS IN C++ QUIZ ---');

  // 1. Get or update the active quiz
  const { data: quizzes, error: qErr } = await supabase.from('quizzes').select('*').limit(1);
  if (qErr || !quizzes || quizzes.length === 0) {
    throw new Error('No quiz found in quizzes table: ' + JSON.stringify(qErr));
  }

  const quiz = quizzes[0];
  console.log('Target Quiz ID:', quiz.id);

  // Update quiz metadata
  const { error: updateQuizErr } = await supabase.from('quizzes').update({
    title: 'S.Y. B.Tech (AI & DS) – OOPS in C++ Assessment (Inheritance & Polymorphism)',
    duration_minutes: 15,
    total_marks: 20,
    status: 'LIVE'
  }).eq('id', quiz.id);

  if (updateQuizErr) console.error('Error updating quiz title:', updateQuizErr);
  else console.log('Quiz title & settings updated successfully.');

  // Update game details as well
  await supabase.from('games').update({
    name: 'OOPS IN C++ QUIZ',
    description: 'Inheritance & Polymorphism assessment with 20 questions, +1 mark each.',
    status: 'LIVE'
  }).eq('id', quiz.game_id);

  // 2. Clear old questions for this quiz
  console.log('Deleting existing questions for quiz...');
  const { data: oldQs } = await supabase.from('quiz_questions').select('id').eq('quiz_id', quiz.id);
  if (oldQs && oldQs.length > 0) {
    const oldIds = oldQs.map(q => q.id);
    await supabase.from('quiz_options').delete().in('question_id', oldIds);
    await supabase.from('quiz_questions').delete().eq('quiz_id', quiz.id);
    console.log(`Deleted ${oldQs.length} old questions.`);
  }

  // 3. Insert each new question with options
  for (let i = 0; i < questionsData.length; i++) {
    const item = questionsData[i];
    
    // Insert question
    const { data: newQ, error: insQErr } = await supabase.from('quiz_questions').insert([{
      quiz_id: quiz.id,
      question_text: `Q${i + 1}. ${item.question}`,
      marks: 1,
      difficulty: item.difficulty,
      explanation: item.explanation
    }]).select().single();

    if (insQErr || !newQ) {
      console.error(`Failed to insert question ${i + 1}:`, insQErr);
      continue;
    }

    // Insert options
    const optionRows = item.options.map(opt => ({
      question_id: newQ.id,
      option_text: opt
    }));

    const { data: insOpts, error: insOptErr } = await supabase.from('quiz_options').insert(optionRows).select();
    if (insOptErr || !insOpts || insOpts.length === 0) {
      console.error(`Failed to insert options for Q${i + 1}:`, insOptErr);
      continue;
    }

    // Identify correct option ID
    const correctOption = insOpts[item.correctIndex];
    if (correctOption) {
      await supabase.from('quiz_questions').update({
        correct_option_id: correctOption.id
      }).eq('id', newQ.id);
    }

    console.log(`Inserted Q${i + 1} (${item.topic}): ${newQ.id}`);
  }

  console.log('=== SEEDING COMPLETED SUCCESSFULLY ===');
}

seed().catch(err => {
  console.error('Fatal error seeding:', err);
  process.exit(1);
});

