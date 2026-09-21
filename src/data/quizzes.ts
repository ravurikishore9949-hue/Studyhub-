import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Computer Science
  {
    id: 'q-cs-1',
    subjectId: 'computer-science',
    difficulty: 'beginner',
    question: 'What is the time complexity of looking up an item by index in an array?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctIndex: 0,
    explanation: 'Arrays store contiguous memory cells, allowing direct computation of the memory offset in constant O(1) time.'
  },
  {
    id: 'q-cs-2',
    subjectId: 'computer-science',
    difficulty: 'intermediate',
    question: 'Which sorting algorithm has a worst-case time complexity of O(n log n) and is stable?',
    options: ['Quick Sort', 'Merge Sort', 'Heap Sort', 'Selection Sort'],
    correctIndex: 1,
    explanation: 'Merge Sort consistently achieves O(n log n) across best, average, and worst cases, and preserves the relative order of equal keys (stable).'
  },
  {
    id: 'q-cs-3',
    subjectId: 'computer-science',
    difficulty: 'advanced',
    question: 'In graph theory, which algorithm is used to find the shortest path from a single source to all other vertices with non-negative edge weights?',
    options: ['Prim Algorithm', 'Kruskal Algorithm', 'Dijkstra Algorithm', 'Floyd-Warshall Algorithm'],
    correctIndex: 2,
    explanation: 'Dijkstra algorithm uses a priority queue to iteratively compute shortest paths in O((V + E) log V) with non-negative weights.'
  },

  // Programming
  {
    id: 'q-prog-1',
    subjectId: 'programming',
    difficulty: 'beginner',
    question: 'Which OOP principle is implemented when private variables are accessed via getters and setters?',
    options: ['Inheritance', 'Encapsulation', 'Polymorphism', 'Overloading'],
    correctIndex: 1,
    explanation: 'Encapsulation hides internal state and enforces controlled access through designated public interfaces.'
  },
  {
    id: 'q-prog-2',
    subjectId: 'programming',
    difficulty: 'intermediate',
    question: 'What happens when a recursive function never reaches its base case?',
    options: ['Memory Leak in Heap', 'Stack Overflow Error', 'Deadlock', 'Garbage Collection Error'],
    correctIndex: 1,
    explanation: 'Infinite recursive calls continuously push new frames onto the system call stack until stack space is exhausted.'
  },
  {
    id: 'q-prog-3',
    subjectId: 'programming',
    difficulty: 'advanced',
    question: 'Which SOLID principle asserts that high-level modules should not depend on low-level modules, but both should depend on abstractions?',
    options: ['Single Responsibility Principle', 'Open-Closed Principle', 'Liskov Substitution Principle', 'Dependency Inversion Principle'],
    correctIndex: 3,
    explanation: 'The "D" in SOLID stands for Dependency Inversion, which decouples modules through abstract interfaces.'
  },

  // Python
  {
    id: 'q-py-1',
    subjectId: 'python',
    difficulty: 'beginner',
    question: 'Which built-in Python data structure is mutable and ordered?',
    options: ['Tuple', 'Set', 'List', 'FrozenSet'],
    correctIndex: 2,
    explanation: 'Lists in Python are ordered sequences that can be mutated (elements added, removed, or changed) in place.'
  },
  {
    id: 'q-py-2',
    subjectId: 'python',
    difficulty: 'intermediate',
    question: 'What does the "yield" keyword in Python do when used inside a function?',
    options: ['Terminates the program', 'Returns a generator object yielding values lazily', 'Imports an external module', 'Forces garbage collection'],
    correctIndex: 1,
    explanation: 'Yield pauses function execution and emits a value to the caller, turning the function into a memory-efficient generator.'
  },
  {
    id: 'q-py-3',
    subjectId: 'python',
    difficulty: 'advanced',
    question: 'What does the Global Interpreter Lock (GIL) in CPython prevent?',
    options: ['Multiple threads from executing Python bytecodes concurrently on multiple CPU cores', 'Recursive function calls', 'Memory allocation on the heap', 'Socket connections'],
    correctIndex: 0,
    explanation: 'CPython GIL ensures thread-safety in memory management by allowing only one native OS thread to hold Python bytecode execution at a time.'
  },

  // Java
  {
    id: 'q-java-1',
    subjectId: 'java',
    difficulty: 'beginner',
    question: 'What is the root superclass of all classes in Java?',
    options: ['java.lang.System', 'java.lang.Object', 'java.lang.Class', 'java.lang.Main'],
    correctIndex: 1,
    explanation: 'In Java, java.lang.Object is the top-level parent class of every non-primitive type in the class hierarchy.'
  },
  {
    id: 'q-java-2',
    subjectId: 'java',
    difficulty: 'intermediate',
    question: 'Where are objects allocated during runtime in the Java Virtual Machine (JVM)?',
    options: ['Thread Stack', 'Method Area', 'Heap Memory', 'Program Counter Register'],
    correctIndex: 2,
    explanation: 'All class instances and arrays created with "new" reside in JVM Heap memory, managed by the Garbage Collector.'
  },

  // Web Development
  {
    id: 'q-web-1',
    subjectId: 'web-development',
    difficulty: 'beginner',
    question: 'What does CSS stand for?',
    options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Styling Syntax', 'Client Screen Styling'],
    correctIndex: 1,
    explanation: 'CSS stands for Cascading Style Sheets, defining how HTML elements are styled and presented across devices.'
  },
  {
    id: 'q-web-2',
    subjectId: 'web-development',
    difficulty: 'intermediate',
    question: 'In the JavaScript Event Loop, which queue is checked and drained before processing macrotasks like setTimeout?',
    options: ['Render Queue', 'Microtask Queue', 'Network I/O Queue', 'Worker Thread Queue'],
    correctIndex: 1,
    explanation: 'Microtasks (Promises, MutationObserver, queueMicrotask) have higher priority and drain completely before the next macrotask runs.'
  },

  // Database Management
  {
    id: 'q-db-1',
    subjectId: 'database-management',
    difficulty: 'beginner',
    question: 'What does SQL stand for?',
    options: ['Structured Query Language', 'Simple Question Language', 'Standard Quality Logic', 'Server Queue Language'],
    correctIndex: 0,
    explanation: 'SQL stands for Structured Query Language, the standardized language used to manage relational databases.'
  },
  {
    id: 'q-db-2',
    subjectId: 'database-management',
    difficulty: 'intermediate',
    question: 'Which normal form eliminates transitive dependencies where a non-key column depends on another non-key column?',
    options: ['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'Fifth Normal Form (5NF)'],
    correctIndex: 2,
    explanation: '3NF requires that a table is in 2NF and contains no transitive dependencies (every non-key attribute must depend directly on the primary key).'
  },
  {
    id: 'q-db-3',
    subjectId: 'database-management',
    difficulty: 'advanced',
    question: 'What does the "I" stand for in database ACID properties?',
    options: ['Indexing', 'Isolation', 'Integrity', 'Immutability'],
    correctIndex: 1,
    explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability. Isolation ensures concurrent transactions execute independently without interference.'
  },

  // Operating Systems
  {
    id: 'q-os-1',
    subjectId: 'operating-systems',
    difficulty: 'beginner',
    question: 'What is a process in operating system terminology?',
    options: ['A CPU register', 'A program in execution with allocated memory', 'A thread inside a function', 'A compiler pass'],
    correctIndex: 1,
    explanation: 'A process is an active instance of a computer program loaded in memory with its own address space.'
  },
  {
    id: 'q-os-2',
    subjectId: 'operating-systems',
    difficulty: 'intermediate',
    question: 'Which of the following is NOT one of Coffman four conditions required for a deadlock?',
    options: ['Mutual Exclusion', 'Hold and Wait', 'Arbitrary Preemption', 'Circular Wait'],
    correctIndex: 2,
    explanation: 'The condition is NO Preemption. If resources can be preempted (taken away forcibly), deadlocks cannot form.'
  },

  // Computer Networks
  {
    id: 'q-net-1',
    subjectId: 'computer-networks',
    difficulty: 'beginner',
    question: 'At which layer of the OSI model does the HTTP protocol operate?',
    options: ['Transport (Layer 4)', 'Network (Layer 3)', 'Session (Layer 5)', 'Application (Layer 7)'],
    correctIndex: 3,
    explanation: 'HTTP is an Application Layer (Layer 7) protocol used for distributing hypermedia and web documents.'
  },
  {
    id: 'q-net-2',
    subjectId: 'computer-networks',
    difficulty: 'intermediate',
    question: 'What is the correct 3-step packet sequence of the TCP handshake?',
    options: ['ACK &rarr; SYN &rarr; ACK', 'SYN &rarr; SYN-ACK &rarr; ACK', 'SYN &rarr; ACK &rarr; DATA', 'FIN &rarr; ACK &rarr; SYN'],
    correctIndex: 1,
    explanation: 'Client sends SYN, Server responds with SYN-ACK, and Client completes with ACK.'
  },

  // Cyber Security
  {
    id: 'q-sec-1',
    subjectId: 'cyber-security',
    difficulty: 'beginner',
    question: 'What does the CIA triad stand for in information security?',
    options: ['Control, Inspection, Authorization', 'Confidentiality, Integrity, Availability', 'Cryptography, Identity, Authentication', 'Centralized Intelligence Architecture'],
    correctIndex: 1,
    explanation: 'The CIA triad is the core cybersecurity framework: Confidentiality, Integrity, and Availability.'
  },
  {
    id: 'q-sec-2',
    subjectId: 'cyber-security',
    difficulty: 'intermediate',
    question: 'What is the most effective defense against SQL Injection (SQLi) vulnerabilities in web applications?',
    options: ['Client-side regex checking', 'Parameterized queries (Prepared Statements)', 'Turning off database error logs', 'Using HTTP instead of HTTPS'],
    correctIndex: 1,
    explanation: 'Parameterized queries treat user input strictly as data values, preventing user input from altering SQL syntax tree execution.'
  },

  // Cloud Computing
  {
    id: 'q-cloud-1',
    subjectId: 'cloud-computing',
    difficulty: 'beginner',
    question: 'Which cloud service model provides virtual servers, storage, and networking where the customer manages the OS and runtime?',
    options: ['SaaS', 'PaaS', 'IaaS', 'BaaS'],
    correctIndex: 2,
    explanation: 'IaaS (Infrastructure as a Service), such as AWS EC2 or GCP Compute Engine, provides raw virtualized hardware infrastructure.'
  },

  // Artificial Intelligence
  {
    id: 'q-ai-1',
    subjectId: 'artificial-intelligence',
    difficulty: 'beginner',
    question: 'Which type of machine learning uses labeled training datasets containing ground-truth answers?',
    options: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Self-Organizing Maps'],
    correctIndex: 0,
    explanation: 'Supervised Learning uses pairs of inputs and corresponding target labels to train prediction models.'
  },
  {
    id: 'q-ai-2',
    subjectId: 'artificial-intelligence',
    difficulty: 'intermediate',
    question: 'What occurs when a machine learning model learns training noise so thoroughly that it performs poorly on new test data?',
    options: ['Underfitting', 'Overfitting', 'Quantization', 'Convergence'],
    correctIndex: 1,
    explanation: 'Overfitting occurs when a high-variance model memorizes training idiosyncrasies and fails to generalize.'
  },

  // Mathematics
  {
    id: 'q-math-1',
    subjectId: 'mathematics',
    difficulty: 'beginner',
    question: 'In propositional logic, when is the conditional statement "P &rarr; Q" False?',
    options: ['When P is False and Q is True', 'When P is True and Q is False', 'When both P and Q are False', 'When both P and Q are True'],
    correctIndex: 1,
    explanation: 'A conditional implication is false only when a true premise leads to a false conclusion (True &rarr; False).'
  },
  {
    id: 'q-math-2',
    subjectId: 'mathematics',
    difficulty: 'intermediate',
    question: 'What does De Morgan’s Law state regarding the negation of a conjunction ¬(A ∧ B)?',
    options: ['¬A ∧ ¬B', '¬A ∨ ¬B', 'A ∨ B', '¬A ↔ ¬B'],
    correctIndex: 1,
    explanation: '¬(A ∧ B) is logically equivalent to ¬A ∨ ¬B (the negation of an AND is the OR of the negations).'
  }
];
