import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const env = fs.readFileSync('.env', 'utf8').split('\n').reduce((acc, line) => {
  const [key, val] = line.split('=');
  if (key) acc[key.trim()] = val.trim();
  return acc;
}, {});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

// 1. Computer Graphics Questions (from quiz.txt)
const cgQuestions = [
  {
    question: "Which of the following is the smallest addressable element of a digital image?",
    options: ["Frame buffer", "Pixel", "Resolution", "Aspect ratio"],
    correctIndex: 1, // Pixel
    explanation: "A pixel (picture element) is the smallest controllable element of a picture represented on the screen."
  },
  {
    question: "Bresenham’s line drawing algorithm mainly uses:",
    options: ["Floating-point calculations", "Trigonometric calculations", "Integer calculations", "Logarithmic calculations"],
    correctIndex: 2, // Integer calculations
    explanation: "Bresenham's algorithm avoids floating point arithmetic and uses only fast integer additions, subtractions, and bit shifts."
  },
  {
    question: "Which device is mainly used to display computer graphics visually?",
    options: ["Scanner", "Keyboard", "Monitor", "Mouse"],
    correctIndex: 2, // Monitor
    explanation: "Monitors (CRT, LCD, LED, OLED) are the primary visual display units."
  },
  {
    question: "In the DDA line drawing algorithm, if dx = 8 and dy = 5, the number of steps is:",
    options: ["5", "8", "13", "3"],
    correctIndex: 1, // 8
    explanation: "In DDA, steps = max(|dx|, |dy|) = max(8, 5) = 8."
  },
  {
    question: "Which of the following is an application of computer graphics?",
    options: ["Computer-Aided Design (CAD)", "Animation", "Video games", "All of the above"],
    correctIndex: 3, // All of the above
    explanation: "Computer graphics is extensively used in CAD, Animation, Video Games, Medical Imaging, and UI design."
  },
  {
    question: "The ratio of the width of an image to its height is called:",
    options: ["Resolution", "Pixel", "Aspect ratio", "Frame buffer"],
    correctIndex: 2, // Aspect ratio
    explanation: "Aspect ratio represents the proportional relationship between an image's width and its height."
  },
  {
    question: "Which of the following is an input device used in computer graphics?",
    options: ["Plotter", "Monitor", "Mouse", "Projector"],
    correctIndex: 2, // Mouse
    explanation: "Mouse, tablet, and light pen are input devices; monitors, plotters, and projectors are output devices."
  },
  {
    question: "The process of converting graphical objects into pixels on the screen is known as:",
    options: ["Transformation", "Scan conversion", "Animation", "Scaling"],
    correctIndex: 1, // Scan conversion
    explanation: "Scan conversion (or rasterization) is the process of converting continuous geometric primitives into discrete pixels."
  },
  {
    question: "Which property of a circle is used by Bresenham’s circle drawing algorithm to reduce calculations?",
    options: ["2-way symmetry", "4-way symmetry", "8-way symmetry", "No symmetry"],
    correctIndex: 2, // 8-way symmetry
    explanation: "A circle centered at origin has 8-way symmetry, so calculating points for one octant (45 degrees) suffices."
  },
  {
    question: "A frame buffer is mainly used to:",
    options: ["Store pixel values of an image", "Enter text into a computer", "Draw only circles", "Control the keyboard"],
    correctIndex: 0, // Store pixel values of an image
    explanation: "A frame buffer is a dedicated memory buffer containing complete frame data of pixel colors and intensities."
  }
];

// 2. C++ Inheritance Questions (from OOPS_Inheritance_MCQ_Easy_Level_v2 (1).docx)
const inheritanceQuestions = [
  {
    question: "Which class is inherited by another class in C++? [Base and Derived Class Definition]",
    options: ["Derived class", "Base class", "Sub class", "Child class"],
    correctIndex: 1,
    explanation: "The base class is the parent class from which properties are inherited."
  },
  {
    question: "Which access specifier allows a member to be accessed in the base class and its derived classes, but NOT outside the class? [Protected Visibility Specifier]",
    options: ["public", "private", "protected", "global"],
    correctIndex: 2,
    explanation: "Protected members are accessible inside the base class and child classes, but blocked outside."
  },
  {
    question: "In single inheritance, which constructor is executed first when an object of a derived class is created? [Constructor Execution Order]",
    options: ["Derived class constructor", "Base class constructor", "Destructor", "Both constructors simultaneously"],
    correctIndex: 1,
    explanation: "The base class constructor always runs first before the derived class constructor."
  },
  {
    question: "Which keyword is used in the base class function to allow it to be overridden in a derived class for runtime polymorphism? [Function Overriding Syntax]",
    options: ["static", "inline", "virtual", "friend"],
    correctIndex: 2,
    explanation: "The 'virtual' keyword enables dynamic dispatch/overriding in C++."
  },
  {
    question: "When one derived class inherits from a single base class, what type of inheritance is it called? [Types of Inheritance]",
    options: ["Multiple inheritance", "Single inheritance", "Hierarchical inheritance", "Multilevel inheritance"],
    correctIndex: 1,
    explanation: "Single inheritance involves exactly one base class and one derived class."
  },
  {
    question: "What is it called when one derived class inherits directly from MORE THAN ONE base class? [Multiple Inheritance Syntax]",
    options: ["Single inheritance", "Multiple inheritance", "Multilevel inheritance", "Hybrid inheritance"],
    correctIndex: 1,
    explanation: "Multiple inheritance occurs when a derived class inherits from two or more base classes."
  },
  {
    question: "Why is a 'virtual base class' used in C++? [Virtual Base Class Purpose]",
    options: [
      "To speed up program execution",
      "To avoid multiple copies of a base class in Diamond inheritance",
      "To make all member variables static",
      "To prevent inheritance completely"
    ],
    correctIndex: 1,
    explanation: "Virtual base classes resolve duplicate member copies in diamond-shaped inheritance."
  },
  {
    question: "What makes a class an Abstract Class in C++? [Abstract Class Concept]",
    options: [
      "It has no member variables",
      "It contains at least one pure virtual function (= 0)",
      "It has no main function",
      "It cannot have derived classes"
    ],
    correctIndex: 1,
    explanation: "A pure virtual function (= 0) defines an abstract class, preventing direct instantiation."
  },
  {
    question: "A friend class can access which members of the class in which it is declared a friend? [Friend Class Definition]",
    options: [
      "Public members only",
      "Private and protected members as well as public members",
      "Protected members only",
      "Cannot access any private members"
    ],
    correctIndex: 1,
    explanation: "A friend class has full access privileges to private, protected, and public members."
  },
  {
    question: "What is a 'nested class' in C++? [Nested Class Basics]",
    options: [
      "A class defined inside another class",
      "A class inherited from two base classes",
      "A class with only static methods",
      "A class without constructors"
    ],
    correctIndex: 0,
    explanation: "A nested class is simply a class declared within the scope of an enclosing class."
  }
];

// 3. C++ Polymorphism Questions (from OOPS_Polymorphism_MCQ_Easy_Level.docx)
const polymorphismQuestions = [
  {
    question: "What does the term 'Polymorphism' literally mean in Object-Oriented Programming? [Concept of Polymorphism]",
    options: ["Single form", "Many forms", "No forms", "Hidden data"],
    correctIndex: 1,
    explanation: "Polymorphism originates from Greek words meaning 'many forms'."
  },
  {
    question: "Which of the following is an example of Compile-Time Polymorphism in C++? [Types of Polymorphism]",
    options: ["Virtual functions", "Function Overloading", "Pointers to base class", "Abstract base classes"],
    correctIndex: 1,
    explanation: "Function overloading is resolved during compilation (compile-time polymorphism)."
  },
  {
    question: "Which C++ keyword is used to overload an operator? [Operator Overloading Keyword]",
    options: ["overload", "operator", "virtual", "friend"],
    correctIndex: 1,
    explanation: "The `operator` keyword followed by the symbol defines overloaded operator functions."
  },
  {
    question: "How many operands does a Unary Operator (e.g., ++, --) operate on? [Overloading Unary Operators]",
    options: ["One", "Two", "Three", "Zero"],
    correctIndex: 0,
    explanation: "Unary operators work on a single operand (e.g., ++x or -y)."
  },
  {
    question: "Function overloading allows multiple functions in the same scope to have the same name if they differ in what? [Function Overloading]",
    options: [
      "Return type only",
      "Function body only",
      "Number or types of parameters (signature)",
      "Class access specifier"
    ],
    correctIndex: 2,
    explanation: "Function overloading requires a distinct parameter list (number, sequence, or types of parameters)."
  },
  {
    question: "Which keyword is placed before a base class member function to achieve Run-Time Polymorphism? [Virtual Functions]",
    options: ["static", "inline", "virtual", "override"],
    correctIndex: 2,
    explanation: "The `virtual` keyword enables dynamic dispatch for run-time polymorphism."
  },
  {
    question: "How is a Pure Virtual Function declared in a C++ base class? [Pure Virtual Functions]",
    options: [
      "virtual void show() = 0;",
      "pure void show();",
      "virtual void show() = 1;",
      "void show() = NULL;"
    ],
    correctIndex: 0,
    explanation: "A pure virtual function is assigned `= 0` in its declaration inside the base class."
  },
  {
    question: "What is the primary role of the Virtual Table (vtable) maintained by the compiler? [Virtual Table (vtable)]",
    options: [
      "To store object data members",
      "To resolve virtual function calls dynamically at run-time",
      "To overload binary operators",
      "To compile code faster"
    ],
    correctIndex: 1,
    explanation: "The vtable stores function pointers to enable dynamic binding of virtual functions at runtime."
  },
  {
    question: "Why should a base class destructor be declared as 'virtual' when dealing with derived objects through base pointers? [Virtual Destructors]",
    options: [
      "To prevent object creation",
      "To ensure proper destruction of derived class objects when deleted",
      "To speed up execution",
      "To make the base class abstract"
    ],
    correctIndex: 1,
    explanation: "A virtual destructor ensures that the derived class destructor is called properly when deleting via a base pointer."
  },
  {
    question: "What happens if you try to create a direct object of an Abstract Base Class in C++? [Abstract Base Class]",
    options: [
      "An object is created successfully",
      "A compile-time error occurs",
      "A runtime error occurs",
      "The program produces garbage output"
    ],
    correctIndex: 1,
    explanation: "Abstract classes contain pure virtual functions and cannot be instantiated, raising a compile-time error."
  }
];

async function seedQuestionsForQuiz(quizId, questionsList) {
  // Clear old questions
  const { data: oldQs } = await supabase.from('quiz_questions').select('id').eq('quiz_id', quizId);
  if (oldQs && oldQs.length > 0) {
    const oldIds = oldQs.map(q => q.id);
    await supabase.from('quiz_options').delete().in('question_id', oldIds);
    await supabase.from('quiz_questions').delete().eq('quiz_id', quizId);
  }

  for (let i = 0; i < questionsList.length; i++) {
    const item = questionsList[i];
    const { data: newQ, error: qErr } = await supabase.from('quiz_questions').insert([{
      quiz_id: quizId,
      question_text: `Q${i + 1}. ${item.question}`,
      marks: 1,
      difficulty: 'easy',
      explanation: item.explanation
    }]).select().single();

    if (qErr || !newQ) {
      console.error('Error inserting question:', qErr);
      continue;
    }

    const optRows = item.options.map(opt => ({
      question_id: newQ.id,
      option_text: opt
    }));

    const { data: insOpts, error: optErr } = await supabase.from('quiz_options').insert(optRows).select();
    if (optErr || !insOpts) {
      console.error('Error inserting options:', optErr);
      continue;
    }

    const correctOpt = insOpts[item.correctIndex];
    if (correctOpt) {
      await supabase.from('quiz_questions').update({
        correct_option_id: correctOpt.id
      }).eq('id', newQ.id);
    }
  }
  console.log(`Seeded ${questionsList.length} questions for Quiz ${quizId}`);
}

async function run() {
  console.log("=== CONFIGURING GAMES & QUIZZES ===");

  // 1. Restore CG Quiz game
  const cgGameId = 'da9f1c14-bd99-42b7-9fda-a0a96a3ab4e2';
  await supabase.from('games').update({
    name: 'CG QUIZ',
    slug: 'quiz',
    description: 'CIE - II Computer Graphics Assessment (10 Questions)',
    status: 'LIVE'
  }).eq('id', cgGameId);

  const cgQuizId = 'e620f2dc-d237-41a7-9d05-58577b3fc2d5';
  await supabase.from('quizzes').update({
    title: 'CIE - II CG Quiz Test',
    duration_minutes: 10,
    total_marks: 10,
    status: 'LIVE'
  }).eq('id', cgQuizId);

  console.log("Seeding CG Quiz questions...");
  await seedQuestionsForQuiz(cgQuizId, cgQuestions);

  // 2. Ensure C++ Inheritance Game & Quiz
  let { data: inhGame } = await supabase.from('games').select('*').eq('slug', 'cpp-inheritance').maybeSingle();
  if (!inhGame) {
    const { data: newGame, error } = await supabase.from('games').insert([{
      name: 'CPP INHERITANCE QUIZ',
      slug: 'cpp-inheritance',
      description: 'C++ Object Oriented Programming: Inheritance Assessment (10 Questions)',
      status: 'LIVE'
    }]).select().single();
    if (error) console.error("Error creating inheritance game:", error);
    inhGame = newGame;
  } else {
    await supabase.from('games').update({
      name: 'CPP INHERITANCE QUIZ',
      description: 'C++ Object Oriented Programming: Inheritance Assessment (10 Questions)',
      status: 'LIVE'
    }).eq('id', inhGame.id);
  }
  console.log("Inheritance Game ID:", inhGame.id);

  let { data: inhQuiz } = await supabase.from('quizzes').select('*').eq('game_id', inhGame.id).maybeSingle();
  if (!inhQuiz) {
    const { data: newQz, error } = await supabase.from('quizzes').insert([{
      game_id: inhGame.id,
      title: 'S.Y. B.Tech (AI & DS) – C++ Inheritance Quiz',
      duration_minutes: 15,
      total_marks: 10,
      status: 'LIVE'
    }]).select().single();
    if (error) console.error("Error creating inheritance quiz:", error);
    inhQuiz = newQz;
  } else {
    await supabase.from('quizzes').update({
      title: 'S.Y. B.Tech (AI & DS) – C++ Inheritance Quiz',
      duration_minutes: 15,
      total_marks: 10,
      status: 'LIVE'
    }).eq('id', inhQuiz.id);
  }

  console.log("Seeding Inheritance Quiz questions...");
  await seedQuestionsForQuiz(inhQuiz.id, inheritanceQuestions);

  // 3. Ensure C++ Polymorphism Game & Quiz
  let { data: polyGame } = await supabase.from('games').select('*').eq('slug', 'cpp-polymorphism').maybeSingle();
  if (!polyGame) {
    const { data: newGame, error } = await supabase.from('games').insert([{
      name: 'CPP POLYMORPHISM QUIZ',
      slug: 'cpp-polymorphism',
      description: 'C++ Object Oriented Programming: Polymorphism Assessment (10 Questions)',
      status: 'LIVE'
    }]).select().single();
    if (error) console.error("Error creating polymorphism game:", error);
    polyGame = newGame;
  } else {
    await supabase.from('games').update({
      name: 'CPP POLYMORPHISM QUIZ',
      description: 'C++ Object Oriented Programming: Polymorphism Assessment (10 Questions)',
      status: 'LIVE'
    }).eq('id', polyGame.id);
  }
  console.log("Polymorphism Game ID:", polyGame.id);

  let { data: polyQuiz } = await supabase.from('quizzes').select('*').eq('game_id', polyGame.id).maybeSingle();
  if (!polyQuiz) {
    const { data: newQz, error } = await supabase.from('quizzes').insert([{
      game_id: polyGame.id,
      title: 'S.Y. B.Tech (AI & DS) – C++ Polymorphism Quiz',
      duration_minutes: 15,
      total_marks: 10,
      status: 'LIVE'
    }]).select().single();
    if (error) console.error("Error creating polymorphism quiz:", error);
    polyQuiz = newQz;
  } else {
    await supabase.from('quizzes').update({
      title: 'S.Y. B.Tech (AI & DS) – C++ Polymorphism Quiz',
      duration_minutes: 15,
      total_marks: 10,
      status: 'LIVE'
    }).eq('id', polyQuiz.id);
  }

  console.log("Seeding Polymorphism Quiz questions...");
  await seedQuestionsForQuiz(polyQuiz.id, polymorphismQuestions);

  console.log("=== DONE SUCCESSFULLY ===");
}

run().catch(err => {
  console.error("Execution error:", err);
  process.exit(1);
});

