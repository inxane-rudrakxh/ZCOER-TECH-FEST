export interface OopsQuestion {
  id: number;
  questionNumber: number;
  topic: 'Inheritance' | 'Polymorphism';
  conceptTag: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number; // 0: A, 1: B, 2: C, 3: D
  correctOptionLetter: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  marks: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const OOPS_QUESTIONS: OopsQuestion[] = [
  // ==========================================
  // TOPIC 1: INHERITANCE (Questions 1 - 10)
  // Source: OOPS_Inheritance_MCQ_Easy_Level_v2 (1).docx
  // ==========================================
  {
    id: 1,
    questionNumber: 1,
    topic: 'Inheritance',
    conceptTag: 'Base and Derived Class Definition',
    questionText: 'Which class is inherited by another class in C++?',
    options: [
      'Derived class',
      'Base class',
      'Sub class',
      'Child class'
    ],
    correctOptionIndex: 1,
    correctOptionLetter: 'B',
    explanation: 'The base class is the parent class from which properties and behaviors are inherited by a derived (child) class.',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 2,
    questionNumber: 2,
    topic: 'Inheritance',
    conceptTag: 'Protected Visibility Specifier',
    questionText: 'Which access specifier allows a member to be accessed in the base class and its derived classes, but NOT outside the class?',
    options: [
      'public',
      'private',
      'protected',
      'global'
    ],
    correctOptionIndex: 2,
    correctOptionLetter: 'C',
    explanation: 'Protected members are accessible inside the base class and its derived classes, but remain inaccessible (hidden) to outside code.',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 3,
    questionNumber: 3,
    topic: 'Inheritance',
    conceptTag: 'Constructor Execution Order',
    questionText: 'In single inheritance, which constructor is executed first when an object of a derived class is created?',
    options: [
      'Derived class constructor',
      'Base class constructor',
      'Destructor',
      'Both constructors simultaneously'
    ],
    correctOptionIndex: 1,
    correctOptionLetter: 'B',
    explanation: 'In C++, the base class constructor is always executed first to initialize inherited members before the derived class constructor runs.',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 4,
    questionNumber: 4,
    topic: 'Inheritance',
    conceptTag: 'Function Overriding Syntax',
    questionText: 'Which keyword is used in the base class function to allow it to be overridden in a derived class for runtime polymorphism?',
    options: [
      'static',
      'inline',
      'virtual',
      'friend'
    ],
    correctOptionIndex: 2,
    correctOptionLetter: 'C',
    explanation: 'The "virtual" keyword tells the C++ compiler to enable dynamic dispatch/late binding so that calling the function via a base pointer executes the derived override.',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 5,
    questionNumber: 5,
    topic: 'Inheritance',
    conceptTag: 'Types of Inheritance',
    questionText: 'When one derived class inherits from a single base class, what type of inheritance is it called?',
    options: [
      'Multiple inheritance',
      'Single inheritance',
      'Hierarchical inheritance',
      'Multilevel inheritance'
    ],
    correctOptionIndex: 1,
    correctOptionLetter: 'B',
    explanation: 'Single inheritance involves exactly one base class and one derived class (Base -> Derived).',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 6,
    questionNumber: 6,
    topic: 'Inheritance',
    conceptTag: 'Multiple Inheritance Syntax',
    questionText: 'What is it called when one derived class inherits directly from MORE THAN ONE base class?',
    options: [
      'Single inheritance',
      'Multiple inheritance',
      'Multilevel inheritance',
      'Hybrid inheritance'
    ],
    correctOptionIndex: 1,
    correctOptionLetter: 'B',
    explanation: 'Multiple inheritance occurs when a single derived class inherits directly from two or more base classes (e.g., class C : public A, public B).',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 7,
    questionNumber: 7,
    topic: 'Inheritance',
    conceptTag: 'Virtual Base Class Purpose',
    questionText: "Why is a 'virtual base class' used in C++?",
    options: [
      'To speed up program execution',
      'To avoid multiple copies of a base class in Diamond inheritance',
      'To make all member variables static',
      'To prevent inheritance completely'
    ],
    correctOptionIndex: 1,
    correctOptionLetter: 'B',
    explanation: 'Virtual base classes eliminate duplicate instances and compiler ambiguity in multipath/diamond inheritance hierarchies.',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 8,
    questionNumber: 8,
    topic: 'Inheritance',
    conceptTag: 'Abstract Class Concept',
    questionText: 'What makes a class an Abstract Class in C++?',
    options: [
      'It has no member variables',
      'It contains at least one pure virtual function (= 0)',
      'It has no main function',
      'It cannot have derived classes'
    ],
    correctOptionIndex: 1,
    correctOptionLetter: 'B',
    explanation: 'A class with at least one pure virtual function (declared with "= 0") becomes an abstract class and cannot be directly instantiated.',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 9,
    questionNumber: 9,
    topic: 'Inheritance',
    conceptTag: 'Friend Class Definition',
    questionText: 'A friend class can access which members of the class in which it is declared a friend?',
    options: [
      'Public members only',
      'Private and protected members as well as public members',
      'Protected members only',
      'Cannot access any private members'
    ],
    correctOptionIndex: 1,
    correctOptionLetter: 'B',
    explanation: 'A friend class is granted special access privileges to private, protected, and public members of the granting class.',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 10,
    questionNumber: 10,
    topic: 'Inheritance',
    conceptTag: 'Nested Class Basics',
    questionText: "What is a 'nested class' in C++?",
    options: [
      'A class defined inside another class',
      'A class inherited from two base classes',
      'A class with only static methods',
      'A class without constructors'
    ],
    correctOptionIndex: 0,
    correctOptionLetter: 'A',
    explanation: 'A nested class is a class declared completely inside the scope and body of another enclosing class.',
    marks: 1,
    difficulty: 'easy'
  },

  // ==========================================
  // TOPIC 2: POLYMORPHISM (Questions 11 - 20)
  // Source: OOPS_Polymorphism_MCQ_Easy_Level.docx
  // ==========================================
  {
    id: 11,
    questionNumber: 11,
    topic: 'Polymorphism',
    conceptTag: 'Concept of Polymorphism',
    questionText: "What does the term 'Polymorphism' literally mean in Object-Oriented Programming?",
    options: [
      'Single form',
      'Many forms',
      'No forms',
      'Hidden data'
    ],
    correctOptionIndex: 1,
    correctOptionLetter: 'B',
    explanation: 'Polymorphism is derived from Greek ("poly" = many, "morph" = forms), meaning the ability of a message or function to be processed in more than one form.',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 12,
    questionNumber: 12,
    topic: 'Polymorphism',
    conceptTag: 'Types of Polymorphism',
    questionText: 'Which of the following is an example of Compile-Time Polymorphism in C++?',
    options: [
      'Virtual functions',
      'Function Overloading',
      'Pointers to base class',
      'Abstract base classes'
    ],
    correctOptionIndex: 1,
    correctOptionLetter: 'B',
    explanation: 'Function overloading and operator overloading are resolved statically at compile time, representing compile-time (early binding) polymorphism.',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 13,
    questionNumber: 13,
    topic: 'Polymorphism',
    conceptTag: 'Operator Overloading Keyword',
    questionText: 'Which C++ keyword is used to overload an operator?',
    options: [
      'overload',
      'operator',
      'virtual',
      'friend'
    ],
    correctOptionIndex: 1,
    correctOptionLetter: 'B',
    explanation: 'The "operator" keyword followed by the symbol (e.g. operator+, operator++) defines an overloaded operator function in C++.',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 14,
    questionNumber: 14,
    topic: 'Polymorphism',
    conceptTag: 'Overloading Unary Operators',
    questionText: 'How many operands does a Unary Operator (e.g., ++, --) operate on?',
    options: [
      'One',
      'Two',
      'Three',
      'Zero'
    ],
    correctOptionIndex: 0,
    correctOptionLetter: 'A',
    explanation: 'Unary operators operate on exactly one operand (e.g., ++count, -x, !flag).',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 15,
    questionNumber: 15,
    topic: 'Polymorphism',
    conceptTag: 'Function Overloading',
    questionText: 'Function overloading allows multiple functions in the same scope to have the same name if they differ in what?',
    options: [
      'Return type only',
      'Function body only',
      'Number or types of parameters (signature)',
      'Class access specifier'
    ],
    correctOptionIndex: 2,
    correctOptionLetter: 'C',
    explanation: 'Function overloading in C++ requires distinct parameter lists (different number, types, or order of parameters). Changing only the return type is not sufficient.',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 16,
    questionNumber: 16,
    topic: 'Polymorphism',
    conceptTag: 'Virtual Functions',
    questionText: 'Which keyword is placed before a base class member function to achieve Run-Time Polymorphism?',
    options: [
      'static',
      'inline',
      'virtual',
      'override'
    ],
    correctOptionIndex: 2,
    correctOptionLetter: 'C',
    explanation: 'Prefixing a base class method with "virtual" instructs the compiler to use late binding via a virtual table (vtable), achieving run-time polymorphism.',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 17,
    questionNumber: 17,
    topic: 'Polymorphism',
    conceptTag: 'Pure Virtual Functions',
    questionText: 'How is a Pure Virtual Function declared in a C++ base class?',
    options: [
      'virtual void show() = 0;',
      'pure void show();',
      'virtual void show() = 1;',
      'void show() = NULL;'
    ],
    correctOptionIndex: 0,
    correctOptionLetter: 'A',
    explanation: 'A pure virtual function is declared by appending "= 0;" to its prototype: "virtual void show() = 0;".',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 18,
    questionNumber: 18,
    topic: 'Polymorphism',
    conceptTag: 'Virtual Table (vtable)',
    questionText: 'What is the primary role of the Virtual Table (vtable) maintained by the compiler?',
    options: [
      'To store object data members',
      'To resolve virtual function calls dynamically at run-time',
      'To overload binary operators',
      'To compile code faster'
    ],
    correctOptionIndex: 1,
    correctOptionLetter: 'B',
    explanation: 'The vtable holds function pointers to the most-derived implementations of virtual functions to enable dynamic resolution at runtime.',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 19,
    questionNumber: 19,
    topic: 'Polymorphism',
    conceptTag: 'Virtual Destructors',
    questionText: "Why should a base class destructor be declared as 'virtual' when dealing with derived objects through base pointers?",
    options: [
      'To prevent object creation',
      'To ensure proper destruction of derived class objects when deleted',
      'To speed up execution',
      'To make the base class abstract'
    ],
    correctOptionIndex: 1,
    correctOptionLetter: 'B',
    explanation: 'Declaring a virtual destructor ensures that when deleting a derived object via a base pointer, the derived destructor is invoked first before the base destructor, preventing memory leaks.',
    marks: 1,
    difficulty: 'easy'
  },
  {
    id: 20,
    questionNumber: 20,
    topic: 'Polymorphism',
    conceptTag: 'Abstract Base Class',
    questionText: 'What happens if you try to create a direct object of an Abstract Base Class in C++?',
    options: [
      'An object is created successfully',
      'A compile-time error occurs',
      'A runtime error occurs',
      'The program produces garbage output'
    ],
    correctOptionIndex: 1,
    correctOptionLetter: 'B',
    explanation: 'Attempting to instantiate an abstract base class directly triggers a compile-time error because it contains incomplete pure virtual function declarations.',
    marks: 1,
    difficulty: 'easy'
  }
];

