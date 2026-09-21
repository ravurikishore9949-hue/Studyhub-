import { StudyTopic } from '../types';

export const STUDY_TOPICS: StudyTopic[] = [
  // 1. COMPUTER SCIENCE: Big-O Notation
  {
    id: 'cs-big-o',
    subjectId: 'computer-science',
    title: 'Time & Space Complexity (Big-O Notation)',
    slug: 'time-space-complexity-big-o',
    summary: 'Mathematical notation used to describe the limiting behavior of an algorithm as the input size grows.',
    simpleExplanation: 'Big-O notation tells you how much slower an algorithm gets or how much more memory it needs when you feed it a larger amount of data.',
    detailedExplanation: [
      'In theoretical computer science, algorithmic analysis evaluates the efficiency of an algorithm independently of specific hardware, programming language, or compiler optimizations.',
      'Big-O notation specifically describes the worst-case asymptotic upper bound of a function. For example, if an algorithm processes an array of size n in 3n² + 5n + 12 steps, in asymptotic analysis the lower-order terms and constant coefficients are dropped, resulting in O(n²).',
      'Common complexity classes from fastest to slowest include: O(1) Constant Time, O(log n) Logarithmic Time, O(n) Linear Time, O(n log n) Linearithmic Time, O(n²) Quadratic Time, and O(2ⁿ) Exponential Time.'
    ],
    keyPoints: [
      'Big-O describes the asymptotic upper bound (worst-case execution scenario).',
      'Constants (like 2n) and non-dominant terms (like n in n² + n) are omitted.',
      'Time complexity measures execution steps; Space complexity measures auxiliary memory used.',
      'O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!).'
    ],
    examples: [
      {
        title: 'O(1) Constant Time vs O(n) Linear Time',
        language: 'python',
        codeOrText: `# O(1) Constant Time: Direct indexing into an array
def get_first_element(items):
    return items[0] if items else None

# O(n) Linear Time: Single iteration through all n items
def calculate_sum(items):
    total = 0
    for value in items:
        total += value
    return total`,
        outputOrNote: 'Array indexing takes constant time regardless of whether the array has 10 items or 10,000,000 items.'
      },
      {
        title: 'O(n²) Quadratic Time: Nested Loops',
        language: 'python',
        codeOrText: `def print_all_pairs(items):
    n = len(items)
    for i in range(n):
        for j in range(n):
            print(f"({items[i]}, {items[j]})")`,
        outputOrNote: 'For an input of size n, the inner loop executes n * n = n² times.'
      }
    ],
    diagram: {
      type: 'flowchart',
      title: 'Common Time Complexities Hierarchy',
      caption: 'Growth rate of execution operations relative to input size (n)',
      svgContent: `<svg viewBox="0 0 500 200" class="w-full h-auto text-slate-800 dark:text-slate-200">
        <rect x="20" y="20" width="80" height="40" rx="6" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="2"/>
        <text x="60" y="45" font-size="13" font-weight="bold" text-anchor="middle" fill="currentColor">O(1)</text>
        <path d="M100 40 L130 40" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)"/>
        
        <rect x="130" y="20" width="80" height="40" rx="6" fill="#06b6d4" fill-opacity="0.2" stroke="#06b6d4" stroke-width="2"/>
        <text x="170" y="45" font-size="13" font-weight="bold" text-anchor="middle" fill="currentColor">O(log n)</text>
        <path d="M210 40 L240 40" stroke="#94a3b8" stroke-width="2"/>
        
        <rect x="240" y="20" width="80" height="40" rx="6" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="2"/>
        <text x="280" y="45" font-size="13" font-weight="bold" text-anchor="middle" fill="currentColor">O(n)</text>
        <path d="M320 40 L350 40" stroke="#94a3b8" stroke-width="2"/>

        <rect x="350" y="20" width="90" height="40" rx="6" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-width="2"/>
        <text x="395" y="45" font-size="13" font-weight="bold" text-anchor="middle" fill="currentColor">O(n log n)</text>

        <!-- Second row -->
        <rect x="180" y="100" width="80" height="40" rx="6" fill="#f97316" fill-opacity="0.2" stroke="#f97316" stroke-width="2"/>
        <text x="220" y="125" font-size="13" font-weight="bold" text-anchor="middle" fill="currentColor">O(n²)</text>
        <path d="M260 120 L300 120" stroke="#94a3b8" stroke-width="2"/>

        <rect x="300" y="100" width="80" height="40" rx="6" fill="#ef4444" fill-opacity="0.2" stroke="#ef4444" stroke-width="2"/>
        <text x="340" y="125" font-size="13" font-weight="bold" text-anchor="middle" fill="currentColor">O(2ⁿ)</text>
      </svg>`
    },
    advantages: [
      'Allows objective comparison of algorithms regardless of machine clock speed or memory size.',
      'Helps engineers forecast whether code will scale safely to millions of users.'
    ],
    disadvantages: [
      'Hides constant factors: An O(n) algorithm with large constants can run slower in practice than an O(n²) algorithm for small datasets.',
      'Only models asymptotic behavior (as n approaches infinity).'
    ],
    faqs: [
      {
        question: 'What is the difference between Big-O, Big-Omega, and Big-Theta?',
        answer: 'Big-O represents the upper bound (worst-case), Big-Omega (Ω) represents the lower bound (best-case), and Big-Theta (Θ) represents a tight bound where upper and lower bounds match.'
      },
      {
        question: 'Does space complexity include input size?',
        answer: 'Auxiliary space refers purely to extra space allocated by the algorithm outside the original input. Total space complexity includes both the input and auxiliary memory.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What is the time complexity of searching an element in an unsorted array of size n?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        answer: 'O(n)',
        explanation: 'In the worst case, the target element may be at the very end of the array or not present at all, requiring checking all n elements.'
      },
      {
        question: 'Binary search operating on a sorted array of 1,024 elements requires at most how many comparisons?',
        options: ['10 comparisons', '512 comparisons', '1024 comparisons', '32 comparisons'],
        answer: '10 comparisons',
        explanation: 'log₂(1024) = 10, because binary search cuts the search space in half at each iteration.'
      }
    ],
    relatedTopicIds: ['cs-binary-search', 'prog-oop-pillars']
  },

  // 1. COMPUTER SCIENCE: Binary Search
  {
    id: 'cs-binary-search',
    subjectId: 'computer-science',
    title: 'Binary Search Algorithm',
    slug: 'binary-search-algorithm',
    summary: 'An efficient divide-and-conquer search algorithm for sorted collections with logarithmic time complexity.',
    simpleExplanation: 'Imagine looking up a word in a paper dictionary: you open the middle, see if your word is earlier or later, and throw away half the dictionary each time until found.',
    detailedExplanation: [
      'Binary search finds the position of a target value within a sorted array. It compares the target value to the middle element of the array.',
      'If they are not equal, the half in which the target cannot lie is eliminated, and the search continues on the remaining half, until the target is found or the subarray becomes empty.',
      'The array MUST be sorted beforehand. Its time complexity is O(log n), making it vastly superior to linear search O(n) for large datasets.'
    ],
    keyPoints: [
      'Precondition: The collection must already be sorted in monotonic order.',
      'Time Complexity: Worst & Average Case is O(log n); Best Case is O(1).',
      'Space Complexity: O(1) iterative, O(log n) recursive due to call stack.',
      'Prevents integer overflow by computing mid as low + (high - low) // 2.'
    ],
    examples: [
      {
        title: 'Iterative Binary Search Implementation',
        language: 'python',
        codeOrText: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        # Avoid potential integer overflow in languages with fixed integer limits
        mid = low + (high - low) // 2
        
        if arr[mid] == target:
            return mid  # Target found at index mid
        elif arr[mid] < target:
            low = mid + 1  # Discard left half
        else:
            high = mid - 1 # Discard right half
            
    return -1  # Target not in array`,
        outputOrNote: 'Returns the 0-indexed position or -1 if the target is absent.'
      }
    ],
    diagram: {
      type: 'flowchart',
      title: 'Binary Search Halving Process',
      caption: 'Each step cuts the remaining search space by 50%',
      svgContent: `<svg viewBox="0 0 500 160" class="w-full h-auto text-slate-800 dark:text-slate-200">
        <rect x="30" y="20" width="440" height="35" rx="6" fill="#e2e8f0" dark:fill="#334155" stroke="#94a3b8"/>
        <text x="250" y="42" font-size="12" text-anchor="middle" fill="currentColor">Original Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91] (Target = 23)</text>
        
        <path d="M250 60 L250 85" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow)"/>
        <text x="250" y="75" font-size="11" text-anchor="end" fill="#6366f1">Mid is 16 (23 > 16) &rarr; Keep Right</text>
        
        <rect x="255" y="95" width="215" height="35" rx="6" fill="#c7d2fe" stroke="#6366f1" stroke-width="2"/>
        <text x="362" y="117" font-size="12" font-weight="bold" text-anchor="middle" fill="#1e1b4b">Subarray: [23, 38, 56, 72, 91]</text>
      </svg>`
    },
    advantages: [
      'Incredibly fast: 1 million items takes at most 20 comparisons.',
      'Optimal for search operations in static or rarely updated sorted databases.'
    ],
    disadvantages: [
      'Requires array to be completely sorted beforehand (sorting takes O(n log n)).',
      'Requires random access (O(1) indexing), making it inefficient for linked lists.'
    ],
    faqs: [
      {
        question: 'Why not use binary search on a linked list?',
        answer: 'Linked lists do not support O(1) random access by index; traversing to the middle node takes O(n) time, defeating the logarithmic advantage.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What is the maximum number of steps needed to find an item in a sorted array of 64 elements using binary search?',
        options: ['6', '7', '64', '32'],
        answer: '6',
        explanation: 'log₂(64) = 6. In at most 6 comparisons, the search terminates.'
      }
    ],
    relatedTopicIds: ['cs-big-o', 'prog-recursion']
  },

  // 2. PROGRAMMING: OOP Pillars
  {
    id: 'prog-oop-pillars',
    subjectId: 'programming',
    title: 'The Four Pillars of Object-Oriented Programming (OOP)',
    slug: 'four-pillars-of-oop',
    summary: 'Encapsulation, Abstraction, Inheritance, and Polymorphism: the four fundamental concepts that structure modular software.',
    simpleExplanation: 'OOP models real-world software around objects that bundle state (data) and behavior (methods) together, creating organized, reusable code.',
    detailedExplanation: [
      'Object-Oriented Programming is a programming paradigm based on the concept of "objects", which contain data in the form of fields (attributes) and code in the form of procedures (methods).',
      'Encapsulation bundles data with the methods that operate on that data and restricts direct access to inner component details.',
      'Abstraction hides complex implementation details and exposes only high-level essential interfaces to the caller.',
      'Inheritance allows a child class to inherit attributes and methods from a parent class, fostering code reusability.',
      'Polymorphism enables entities to take on multiple forms—most commonly through method overriding (runtime) and method overloading (compile-time).'
    ],
    keyPoints: [
      'Encapsulation protects object integrity by preventing unauthorized direct modification of state.',
      'Abstraction reduces cognitive load by showing only the "what" rather than the "how".',
      'Inheritance models an "is-a" relationship between parent (super) and child (sub) classes.',
      'Polymorphism enables a single interface to control different underlying implementations.'
    ],
    examples: [
      {
        title: 'Encapsulation & Inheritance in Python',
        language: 'python',
        codeOrText: `class BankAccount:
    def __init__(self, owner: str, balance: float):
        self.owner = owner
        self.__balance = balance  # Private attribute (Encapsulation)

    def deposit(self, amount: float):
        if amount > 0:
            self.__balance += amount

    def get_balance(self) -> float:
        return self.__balance

# Inheritance
class SavingsAccount(BankAccount):
    def apply_interest(self, rate: float):
        interest = self.get_balance() * rate
        self.deposit(interest)`,
        outputOrNote: 'Direct access to account.__balance is prevented from outside the class.'
      }
    ],
    diagram: {
      type: 'architecture',
      title: 'The 4 Pillars of OOP',
      caption: 'Foundational principles of object-oriented architecture',
      svgContent: `<svg viewBox="0 0 500 130" class="w-full h-auto text-slate-800 dark:text-slate-200">
        <g transform="translate(10, 20)">
          <rect width="110" height="90" rx="8" fill="#3b82f6" fill-opacity="0.15" stroke="#3b82f6" stroke-width="2"/>
          <text x="55" y="40" font-size="12" font-weight="bold" text-anchor="middle" fill="currentColor">Encapsulation</text>
          <text x="55" y="65" font-size="10" text-anchor="middle" fill="#64748b">Data Hiding &amp; Bundling</text>
        </g>
        <g transform="translate(130, 20)">
          <rect width="110" height="90" rx="8" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="2"/>
          <text x="55" y="40" font-size="12" font-weight="bold" text-anchor="middle" fill="currentColor">Abstraction</text>
          <text x="55" y="65" font-size="10" text-anchor="middle" fill="#64748b">Hide Complexity</text>
        </g>
        <g transform="translate(250, 20)">
          <rect width="110" height="90" rx="8" fill="#f59e0b" fill-opacity="0.15" stroke="#f59e0b" stroke-width="2"/>
          <text x="55" y="40" font-size="12" font-weight="bold" text-anchor="middle" fill="currentColor">Inheritance</text>
          <text x="55" y="65" font-size="10" text-anchor="middle" fill="#64748b">Code Reusability</text>
        </g>
        <g transform="translate(370, 20)">
          <rect width="110" height="90" rx="8" fill="#8b5cf6" fill-opacity="0.15" stroke="#8b5cf6" stroke-width="2"/>
          <text x="55" y="40" font-size="12" font-weight="bold" text-anchor="middle" fill="currentColor">Polymorphism</text>
          <text x="55" y="65" font-size="10" text-anchor="middle" fill="#64748b">Many Forms</text>
        </g>
      </svg>`
    },
    advantages: [
      'High modularity: individual classes can be tested and debugged independently.',
      'Code reusability minimizes redundant development across large codebases.'
    ],
    disadvantages: [
      'Overuse of deep inheritance hierarchies can cause the "fragile base class" problem.',
      'Slightly higher memory overhead compared to procedural/data-oriented paradigms.'
    ],
    faqs: [
      {
        question: 'Why prefer Composition over Inheritance?',
        answer: 'Composition ("has-a") offers greater flexibility at runtime and reduces tight coupling compared to deep class inheritance hierarchies ("is-a").'
      }
    ],
    practiceQuestions: [
      {
        question: 'Which OOP pillar is demonstrated when a subclass provides its own specific implementation of a method defined in its superclass?',
        options: ['Polymorphism', 'Encapsulation', 'Abstraction', 'Compilation'],
        answer: 'Polymorphism',
        explanation: 'Method overriding is a classic form of dynamic (runtime) polymorphism.'
      }
    ],
    relatedTopicIds: ['java-memory', 'py-generators']
  },

  // 2. PROGRAMMING: Recursion
  {
    id: 'prog-recursion',
    subjectId: 'programming',
    title: 'Recursion vs Iteration',
    slug: 'recursion-vs-iteration',
    summary: 'Understanding base cases, recursive call stacks, and when to choose recursion over iterative loops.',
    simpleExplanation: 'Recursion is a programming technique where a function solves a problem by calling a smaller copy of itself until it reaches a simple stopping condition called the base case.',
    detailedExplanation: [
      'A recursive function must have at least one base case that terminates the recursion without making further recursive calls; otherwise, an infinite recursion occurs, exhausting stack memory (stack overflow).',
      'Every recursive call pushes a new stack frame onto the system call stack, which stores local variables, parameter values, and return addresses.',
      'Iteration uses loop constructs (for, while) with a single stack frame and state variable updates.',
      'Tail call optimization (TCO) allows some compilers to optimize tail-recursive functions into iterative bytecode without stack growth.'
    ],
    keyPoints: [
      'Base Case: The condition under which the function returns without calling itself.',
      'Recursive Step: Moving progressively closer to the base case.',
      'Stack Overflow: Occurs when the recursion depth exceeds maximum allowed call stack capacity.',
      'Natural fit for recursive data structures like Trees, Graphs, and Divide-and-Conquer algorithms.'
    ],
    examples: [
      {
        title: 'Factorial Calculation: Recursive vs Iterative',
        language: 'python',
        codeOrText: `# Recursive implementation
def factorial_recursive(n: int) -> int:
    if n <= 1:
        return 1  # Base Case
    return n * factorial_recursive(n - 1)  # Recursive Step

# Iterative implementation
def factorial_iterative(n: int) -> int:
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result`,
        outputOrNote: 'factorial_recursive(5) calls 5 * 4 * 3 * 2 * 1 = 120'
      }
    ],
    advantages: [
      'Significantly cleaner and more concise code when navigating tree structures or combinatorial problems.',
      'Expresses mathematical definitions (like Fibonacci or tree traversals) directly.'
    ],
    disadvantages: [
      'Higher memory consumption due to allocation of stack frames for each call.',
      'Function call overhead can make naive recursion slower than simple loops without memoization.'
    ],
    faqs: [
      {
        question: 'What is memoization in recursive algorithms?',
        answer: 'Memoization is an optimization technique where the results of expensive function calls are cached so that repeated subproblems with identical inputs return immediately in O(1).'
      }
    ],
    practiceQuestions: [
      {
        question: 'What fatal error occurs if a recursive function lacks a base case?',
        options: ['Syntax Error', 'Stack Overflow Error', 'Compilation Warning', 'Null Pointer Exception'],
        answer: 'Stack Overflow Error',
        explanation: 'Without a base case, calls are pushed infinitely onto the call stack until memory limit is exceeded.'
      }
    ],
    relatedTopicIds: ['cs-binary-search', 'cs-big-o']
  },

  // 3. PYTHON: List Comprehensions & Generators
  {
    id: 'py-generators',
    subjectId: 'python',
    title: 'List Comprehensions & Generators in Python',
    slug: 'python-list-comprehensions-generators',
    summary: 'Concise syntax for transforming collections and memory-efficient lazy evaluation with the yield keyword.',
    simpleExplanation: 'A list comprehension builds an entire list in memory immediately, while a generator produces items one at a time on-demand, saving vast amounts of memory for large datasets.',
    detailedExplanation: [
      'List comprehensions offer a succinct syntax to create a new list from an existing iterable, replacing boilerplate for-loops and append statements.',
      'Generator functions use the "yield" statement instead of "return". When called, they return a generator object without executing the entire function body at once.',
      'Generators follow lazy evaluation: computation happens only when next() is called or during iteration, which drastically decreases memory consumption when streaming gigabytes of data.'
    ],
    keyPoints: [
      'List Comprehension syntax: [expression for item in iterable if condition].',
      'Generator Expression syntax: (expression for item in iterable if condition).',
      'Generators maintain state between yield points.',
      'Use generators when working with large data files, streaming APIs, or infinite sequences.'
    ],
    examples: [
      {
        title: 'Comparing List Comprehension and Generator Memory',
        language: 'python',
        codeOrText: `import sys

# List comprehension: All 1,000,000 numbers created in memory
numbers_list = [x ** 2 for x in range(1_000_000)]
print(f"List size: {sys.getsizeof(numbers_list)} bytes")  # ~8.4 MB

# Generator expression: Only generates next number when needed
numbers_gen = (x ** 2 for x in range(1_000_000))
print(f"Generator size: {sys.getsizeof(numbers_gen)} bytes")  # ~200 bytes!`,
        outputOrNote: 'The generator uses ~200 bytes regardless of whether it represents 10 or 10 billion numbers.'
      }
    ],
    advantages: [
      'Generators enable memory footprint reduction from gigabytes down to mere bytes.',
      'List comprehensions are idiomatic, readable, and often faster than manual append loops.'
    ],
    disadvantages: [
      'Generators can only be iterated over once; once exhausted, they cannot be rewound or sliced by index.',
      'Overly complex nested comprehensions decrease code readability.'
    ],
    faqs: [
      {
        question: 'Can you index into a Python generator like gen[0]?',
        answer: 'No. Generators do not support direct indexing. To access items, you must use next(gen) or iterate using a loop.'
      }
    ],
    practiceQuestions: [
      {
        question: 'Which keyword turns a regular Python function into a generator?',
        options: ['produce', 'generate', 'yield', 'lazy'],
        answer: 'yield',
        explanation: 'The yield statement pauses the function and returns a value to the caller, saving the state for resumption.'
      }
    ],
    relatedTopicIds: ['prog-oop-pillars', 'web-js-async']
  },

  // 4. JAVA: Memory Architecture (Heap vs Stack)
  {
    id: 'java-memory',
    subjectId: 'java',
    title: 'JVM Memory Management: Heap vs Stack',
    slug: 'jvm-memory-management-heap-vs-stack',
    summary: 'How the Java Virtual Machine partitions memory between method execution stack frames and dynamically allocated heap objects.',
    simpleExplanation: 'The Stack is fast, short-term memory that holds function calls and local variables; the Heap is large, shared memory where all Java objects reside until Garbage Collection cleans them up.',
    detailedExplanation: [
      'The Java Virtual Machine (JVM) divides runtime data areas into distinct memory regions: PC Register, JVM Stacks, Heap, Method Area, and Native Method Stacks.',
      'Stack Memory is thread-private. Whenever a thread calls a method, a stack frame is pushed. It stores primitive local variables and references to objects.',
      'Heap Memory is shared among all threads. All class instances and arrays are allocated here via the "new" keyword.',
      'Garbage Collection (GC) periodically scans heap memory to identify and reclaim unreachable objects using algorithms like G1GC or ZGC.'
    ],
    keyPoints: [
      'Stack stores: Local primitive variables and references (pointers) to heap objects.',
      'Heap stores: The actual object instances and array contents.',
      'Stack lifecycle: Allocated on method invocation, deallocated immediately upon method return.',
      'Heap lifecycle: Managed automatically by JVM Garbage Collectors.'
    ],
    examples: [
      {
        title: 'Stack and Heap Allocation in Java',
        language: 'java',
        codeOrText: `public class MemoryDemo {
    public static void main(String[] args) {
        int x = 42; // Primitive stored directly in current Stack frame
        
        // 'user' reference pointer lives on the Stack
        // The Student object itself is allocated in the Heap
        Student user = new Student("Alex", 101);
    }
}

class Student {
    String name; // Reference in Heap
    int id;      // Primitive field inside Heap object
    public Student(String name, int id) {
        this.name = name;
        this.id = id;
    }
}`,
        outputOrNote: 'When main() returns, its stack frame vanishes, making the Student instance eligible for Garbage Collection.'
      }
    ],
    diagram: {
      type: 'architecture',
      title: 'JVM Memory Architecture',
      caption: 'Separation of Thread Stacks and Shared Garbage-Collected Heap',
      svgContent: `<svg viewBox="0 0 500 160" class="w-full h-auto text-slate-800 dark:text-slate-200">
        <rect x="20" y="20" width="180" height="120" rx="8" fill="#3b82f6" fill-opacity="0.1" stroke="#3b82f6" stroke-width="2"/>
        <text x="110" y="45" font-size="12" font-weight="bold" text-anchor="middle" fill="#2563eb">Thread Stack</text>
        <rect x="35" y="60" width="150" height="25" rx="4" fill="#dbeafe" dark:fill="#1e3a8a" stroke="#93c5fd"/>
        <text x="110" y="77" font-size="10" text-anchor="middle" fill="#1e40af">int x = 42</text>
        <rect x="35" y="95" width="150" height="25" rx="4" fill="#dbeafe" stroke="#93c5fd"/>
        <text x="110" y="112" font-size="10" text-anchor="middle" fill="#1e40af">user ref &rarr; [0x7FF4]</text>

        <path d="M190 110 L280 80" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4" marker-end="url(#arrow)"/>

        <rect x="280" y="20" width="200" height="120" rx="8" fill="#10b981" fill-opacity="0.1" stroke="#10b981" stroke-width="2"/>
        <text x="380" y="45" font-size="12" font-weight="bold" text-anchor="middle" fill="#059669">JVM Heap (Shared)</text>
        <rect x="300" y="60" width="160" height="60" rx="6" fill="#d1fae5" stroke="#6ee7b7"/>
        <text x="380" y="85" font-size="11" font-weight="bold" text-anchor="middle" fill="#065f46">Student Instance</text>
        <text x="380" y="105" font-size="10" text-anchor="middle" fill="#047857">name="Alex", id=101</text>
      </svg>`
    },
    advantages: [
      'Automatic garbage collection eliminates manual free() memory leak bugs common in C/C++.',
      'Stack execution is exceptionally fast due to hardware pointer incrementation/decrementation.'
    ],
    disadvantages: [
      'Garbage collector pauses ("Stop-The-World") can introduce slight latency spikes.',
      'Heap allocations consume slightly more overhead per object for metadata and alignment.'
    ],
    faqs: [
      {
        question: 'What causes java.lang.OutOfMemoryError vs StackOverflowError?',
        answer: 'OutOfMemoryError occurs when the JVM Heap cannot allocate more memory for objects. StackOverflowError occurs when the thread call stack exceeds its limit, usually via unbounded recursion.'
      }
    ],
    practiceQuestions: [
      {
        question: 'Where do local primitive variables defined inside a method reside in Java?',
        options: ['Heap', 'Stack', 'Method Area', 'Permanent Generation'],
        answer: 'Stack',
        explanation: 'Local primitive variables are stored directly in the current executing thread stack frame.'
      }
    ],
    relatedTopicIds: ['prog-oop-pillars', 'os-virtual-memory']
  },

  // 5. WEB DEVELOPMENT: CSS Flexbox vs Grid
  {
    id: 'web-layout',
    subjectId: 'web-development',
    title: 'CSS Layouts: Modern Flexbox vs CSS Grid',
    slug: 'css-flexbox-vs-grid',
    summary: 'Comparing one-dimensional flexible box alignment with two-dimensional grid coordinate systems.',
    simpleExplanation: 'Use Flexbox when you want to arrange items in a single row or single column; use CSS Grid when you want to layout items in rows AND columns simultaneously.',
    detailedExplanation: [
      'Modern web layouts rely on CSS Flexbox (1D) and CSS Grid (2D) rather than outdated float hacks or table structures.',
      'Flexbox operates along two axes: the Main Axis (determined by flex-direction) and the Cross Axis. It distributes remaining space and aligns items cleanly regardless of their dimensions.',
      'CSS Grid creates a coordinate system defined by explicit grid-template-columns and grid-template-rows, ideal for page-level structural layouts and bento grids.',
      'Combining both—Grid for high-level page framing and Flexbox for component-level internals—is the current web design standard.'
    ],
    keyPoints: [
      'Flexbox = 1-Dimensional (row OR column alignment).',
      'Grid = 2-Dimensional (rows AND columns together).',
      'Key Flexbox properties: justify-content (main axis), align-items (cross axis), gap.',
      'Key Grid properties: grid-template-columns, grid-template-rows, auto-fit/minmax().'
    ],
    examples: [
      {
        title: 'Responsive Grid with auto-fit and minmax()',
        language: 'css',
        codeOrText: `/* Responsive card grid without requiring any media queries! */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Centered Flexbox banner */
.hero-banner {
  display: flex;
  justify-content: center; /* Horizontally center */
  align-items: center;     /* Vertically center */
  flex-direction: column;
  gap: 1rem;
}`,
        outputOrNote: 'auto-fit dynamically adjusts cards across screen widths from phone to desktop.'
      }
    ],
    advantages: [
      'Eliminates layout distortion across devices from 320px mobile screens to 4K displays.',
      'Built-in gap properties replace margin hacks.'
    ],
    disadvantages: [
      'Misunderstanding flex-shrink can cause unexpected container overflow without min-width: 0.'
    ],
    faqs: [
      {
        question: 'When should I choose Grid over Flexbox?',
        answer: 'Choose Grid when elements need to align strictly along both horizontal and vertical axes (e.g., photo galleries, dashboards). Choose Flexbox for navigation bars, button groups, and linear content flows.'
      }
    ],
    practiceQuestions: [
      {
        question: 'Which CSS property in Flexbox aligns items along the cross axis?',
        options: ['justify-content', 'align-items', 'flex-direction', 'grid-area'],
        answer: 'align-items',
        explanation: 'justify-content controls the main axis, while align-items aligns items along the perpendicular cross axis.'
      }
    ],
    relatedTopicIds: ['web-js-async', 'cs-big-o']
  },

  // 5. WEB DEVELOPMENT: JavaScript Event Loop
  {
    id: 'web-js-async',
    subjectId: 'web-development',
    title: 'The JavaScript Event Loop & Asynchronous Execution',
    slug: 'javascript-event-loop-async',
    summary: 'How single-threaded JavaScript executes non-blocking I/O using the Call Stack, Web APIs, Microtask, and Macrotask queues.',
    simpleExplanation: 'JavaScript does only one thing at a time, but it offloads long tasks (like network fetches or timers) to the browser background and picks up their callbacks when the main stack is empty.',
    detailedExplanation: [
      'JavaScript is a single-threaded runtime with a single Call Stack. Long-running operations like database calls or HTTP requests could freeze the UI if handled synchronously.',
      'The browser environment provides Web APIs (fetch, setTimeout, DOM events). When asynchronous operations complete, their callbacks are placed in queues.',
      'Microtask Queue (Promises, queueMicrotask) has higher priority and drains completely before the next Macrotask (setTimeout, setInterval, I/O) is processed.',
      'The Event Loop continuously checks if the Call Stack is empty; once clear, it pushes queued callbacks onto the stack.'
    ],
    keyPoints: [
      'Single-threaded means one call stack executing one piece of code at any instant.',
      'Microtasks (Promises) run before Macrotasks (setTimeout).',
      'async/await is syntactic sugar over Promises that makes asynchronous code look synchronous.'
    ],
    examples: [
      {
        title: 'Microtask vs Macrotask Execution Order',
        language: 'javascript',
        codeOrText: `console.log("1: Synchronous");

setTimeout(() => {
    console.log("2: Macrotask (Timer)");
}, 0);

Promise.resolve().then(() => {
    console.log("3: Microtask (Promise)");
});

console.log("4: Synchronous");

// Output Order:
// 1: Synchronous
// 4: Synchronous
// 3: Microtask (Promise)
// 2: Macrotask (Timer)`,
        outputOrNote: 'Even with 0ms delay, setTimeout waits for all synchronous code and microtasks to finish.'
      }
    ],
    diagram: {
      type: 'flowchart',
      title: 'JavaScript Event Loop Architecture',
      caption: 'Continuous loop coordinating Call Stack, Microtasks, and Macrotasks',
      svgContent: `<svg viewBox="0 0 500 150" class="w-full h-auto text-slate-800 dark:text-slate-200">
        <rect x="20" y="25" width="110" height="90" rx="8" fill="#3b82f6" fill-opacity="0.15" stroke="#3b82f6" stroke-width="2"/>
        <text x="75" y="55" font-size="12" font-weight="bold" text-anchor="middle" fill="#2563eb">Call Stack</text>
        <text x="75" y="80" font-size="10" text-anchor="middle" fill="#64748b">(Executes Code)</text>

        <path d="M140 70 L200 70" stroke="#94a3b8" stroke-width="2"/>

        <circle cx="235" cy="70" r="32" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-width="2"/>
        <text x="235" y="73" font-size="11" font-weight="bold" text-anchor="middle" fill="#d97706">Event Loop</text>

        <path d="M270 50 L330 35" stroke="#10b981" stroke-width="2" marker-end="url(#arrow)"/>
        <path d="M270 90 L330 105" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow)"/>

        <rect x="330" y="15" width="150" height="40" rx="6" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="2"/>
        <text x="405" y="38" font-size="11" font-weight="bold" text-anchor="middle" fill="#059669">Microtasks (Promise)</text>

        <rect x="330" y="85" width="150" height="40" rx="6" fill="#ef4444" fill-opacity="0.15" stroke="#ef4444" stroke-width="2"/>
        <text x="405" y="108" font-size="11" font-weight="bold" text-anchor="middle" fill="#dc2626">Macrotasks (Timer)</text>
      </svg>`
    },
    advantages: [
      'Allows handling thousands of concurrent network connections without multi-threaded lock contention overhead.'
    ],
    disadvantages: [
      'Intensive CPU-bound calculations (e.g. heavy image processing) in the main thread will freeze the browser UI.'
    ],
    faqs: [
      {
        question: 'How do you run heavy calculations in JS without blocking the UI?',
        answer: 'Use Web Workers, which run JavaScript scripts on background threads completely detached from the main execution thread.'
      }
    ],
    practiceQuestions: [
      {
        question: 'Which has higher execution priority when the call stack clears: Promise callbacks or setTimeout callbacks?',
        options: ['setTimeout callbacks', 'Promise callbacks', 'Both have equal priority', 'DOM event handlers'],
        answer: 'Promise callbacks',
        explanation: 'Promises enter the Microtask queue, which is drained prior to pulling the next task from the Macrotask queue.'
      }
    ],
    relatedTopicIds: ['web-layout', 'py-generators']
  },

  // 6. DATABASE MANAGEMENT: SQL Normalization
  {
    id: 'db-normalization',
    subjectId: 'database-management',
    title: 'Database Normalization: 1NF, 2NF, 3NF & BCNF',
    slug: 'database-normalization-1nf-2nf-3nf',
    summary: 'The step-by-step process of structuring relational tables to eliminate data redundancy and prevent update anomalies.',
    simpleExplanation: 'Normalization is organizing a database so each piece of information is stored in exactly one place, preventing mistakes when editing records.',
    detailedExplanation: [
      'Database normalization systematically decomposes tables to eliminate data redundancy and insertion, update, and deletion anomalies.',
      'First Normal Form (1NF): Requires that table cells contain atomic (indivisible) values, and each record is unique.',
      'Second Normal Form (2NF): Meets 1NF and removes partial dependencies (non-key attributes must depend on the whole composite primary key).',
      'Third Normal Form (3NF): Meets 2NF and removes transitive dependencies (non-key attributes must not depend on other non-key attributes).',
      'Boyce-Codd Normal Form (BCNF): A stricter version of 3NF where for every functional dependency X -> Y, X must be a super key.'
    ],
    keyPoints: [
      '1NF: Atomic columns, unique rows, no repeating groups.',
      '2NF: 1NF + No partial dependencies on composite keys.',
      '3NF: 2NF + No transitive dependencies (A -> B and B -> C).',
      'Denormalization is intentionally done in data warehouses to speed up read queries.'
    ],
    examples: [
      {
        title: 'Eliminating Transitive Dependency (Moving to 3NF)',
        language: 'sql',
        codeOrText: `-- BEFORE 3NF: Student table has transitive dependency (zip_code -> city)
-- Student(student_id, name, zip_code, city)

-- AFTER 3NF: Split into two normalized tables
CREATE TABLE postal_directory (
    zip_code VARCHAR(10) PRIMARY KEY,
    city VARCHAR(100) NOT NULL
);

CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    zip_code VARCHAR(10) REFERENCES postal_directory(zip_code)
);`,
        outputOrNote: 'Now, updating the city name for a zip code requires changing only a single row in postal_directory.'
      }
    ],
    advantages: [
      'Prevents inconsistent updates (e.g. changing address in one place but forgetting another).',
      'Reduces disk storage by eliminating duplicated text strings across millions of rows.'
    ],
    disadvantages: [
      'Requires SQL JOIN operations across multiple tables, which can slow down high-volume read analytics.'
    ],
    faqs: [
      {
        question: 'When is denormalization acceptable?',
        answer: 'Denormalization is common in OLAP (Online Analytical Processing) systems and reporting warehouses where fast read queries are prioritized over transaction write overhead.'
      }
    ],
    practiceQuestions: [
      {
        question: 'A table where a non-key attribute depends on another non-key attribute violates which normal form?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        answer: '3NF',
        explanation: 'Transitive dependency (non-key depending on non-key) is prohibited by Third Normal Form.'
      }
    ],
    relatedTopicIds: ['db-joins', 'cs-big-o']
  },

  // 6. DATABASE MANAGEMENT: SQL JOINs
  {
    id: 'db-joins',
    subjectId: 'database-management',
    title: 'SQL JOINs: INNER, LEFT, RIGHT & FULL OUTER',
    slug: 'sql-joins-inner-left-right-full',
    summary: 'Techniques for combining rows from two or more tables based on a related column between them.',
    simpleExplanation: 'JOINs combine data from different spreadsheet-like tables using a common ID key, showing combined relationships.',
    detailedExplanation: [
      'Relational databases store normalized data across separate tables. SQL JOIN statements query and reconstruct unified records across foreign keys.',
      'INNER JOIN returns only rows where there is a match in both left and right tables.',
      'LEFT (OUTER) JOIN returns all rows from the left table, along with matching rows from the right table (NULL if no match).',
      'RIGHT (OUTER) JOIN returns all rows from the right table, and matching rows from the left table.',
      'FULL (OUTER) JOIN returns all rows when there is a match in either table, filling missing matches with NULLs.'
    ],
    keyPoints: [
      'INNER JOIN: Strict intersection (both tables must match).',
      'LEFT JOIN: Preserves all records from the primary left table.',
      'CROSS JOIN: Cartesian product of all rows (m * n combinations).',
      'Indexes on foreign key columns accelerate join execution via Hash Join or Merge Join algorithms.'
    ],
    examples: [
      {
        title: 'INNER vs LEFT JOIN Example',
        language: 'sql',
        codeOrText: `-- Returns only students who have submitted at least one assignment
SELECT s.name, a.title, a.score
FROM students s
INNER JOIN submissions a ON s.student_id = a.student_id;

-- Returns ALL students, even those who haven't submitted anything yet (score will be NULL)
SELECT s.name, a.title, a.score
FROM students s
LEFT JOIN submissions a ON s.student_id = a.student_id;`,
        outputOrNote: 'LEFT JOIN ensures no student is accidentally dropped from the report.'
      }
    ],
    diagram: {
      type: 'venn',
      title: 'SQL Joins Illustrated',
      caption: 'Venn representation of INNER vs LEFT JOIN matching sets',
      svgContent: `<svg viewBox="0 0 500 130" class="w-full h-auto text-slate-800 dark:text-slate-200">
        <!-- Inner Join -->
        <g transform="translate(40, 15)">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#64748b" stroke-width="2"/>
          <circle cx="90" cy="50" r="40" fill="none" stroke="#64748b" stroke-width="2"/>
          <path d="M 67 20 A 40 40 0 0 1 67 80 A 40 40 0 0 1 67 20" fill="#3b82f6" fill-opacity="0.6"/>
          <text x="70" y="110" font-size="11" font-weight="bold" text-anchor="middle" fill="currentColor">INNER JOIN</text>
        </g>

        <!-- Left Join -->
        <g transform="translate(260, 15)">
          <circle cx="50" cy="50" r="40" fill="#10b981" fill-opacity="0.6" stroke="#10b981" stroke-width="2"/>
          <circle cx="90" cy="50" r="40" fill="none" stroke="#64748b" stroke-width="2"/>
          <text x="70" y="110" font-size="11" font-weight="bold" text-anchor="middle" fill="currentColor">LEFT JOIN</text>
        </g>
      </svg>`
    },
    advantages: [
      'Enables powerful relational queries without data duplication.',
      'Declarative syntax: the database query optimizer selects the most efficient execution plan.'
    ],
    disadvantages: [
      'Joining unindexed or massive tables can consume substantial memory and cause slow queries.'
    ],
    faqs: [
      {
        question: 'What is the performance difference between INNER JOIN and LEFT JOIN?',
        answer: 'INNER JOIN allows the database optimizer more freedom to reorder tables, often performing faster than LEFT JOIN which must retain all left rows.'
      }
    ],
    practiceQuestions: [
      {
        question: 'Which JOIN returns all records from the left table and matched records from the right table, with NULLs for unmatched right records?',
        options: ['INNER JOIN', 'LEFT JOIN', 'FULL JOIN', 'CROSS JOIN'],
        answer: 'LEFT JOIN',
        explanation: 'LEFT JOIN preserves every row from the left table regardless of whether a matching record exists in the right table.'
      }
    ],
    relatedTopicIds: ['db-normalization', 'cs-big-o']
  },

  // 7. OPERATING SYSTEMS: Process vs Thread
  {
    id: 'os-process-thread',
    subjectId: 'operating-systems',
    title: 'Process vs Thread & CPU Scheduling',
    slug: 'process-vs-thread-cpu-scheduling',
    summary: 'Distinguishing heavyweight processes with isolated memory from lightweight threads sharing an address space.',
    simpleExplanation: 'A process is an entire running program with its own private memory; threads are multiple workers inside that same program sharing the same memory.',
    detailedExplanation: [
      'A Process is an executing instance of a computer program that has its own isolated address space, file handles, security descriptors, and environment variables.',
      'A Thread is the smallest unit of CPU execution within a process. Multiple threads within the same process share code, data, and OS resources, but each thread possesses its own program counter and stack.',
      'Context switching between processes is costly because the OS must flush CPU caches and swap memory page tables; thread context switching is significantly lighter.',
      'Common CPU scheduling algorithms include First-Come First-Served (FCFS), Shortest Job First (SJF), Round Robin (RR), and Multi-Level Feedback Queues.'
    ],
    keyPoints: [
      'Process: Isolated memory space. Crash in one process rarely damages another.',
      'Thread: Shared memory space. Lightweight, but an unhandled crash can terminate the whole process.',
      'Process creation uses fork() / exec(); thread creation uses pthread_create().',
      'Concurrency issues: Race conditions, deadlocks, and starvation require mutexes/semaphores.'
    ],
    examples: [
      {
        title: 'Thread Race Condition and Synchronization',
        language: 'python',
        codeOrText: `import threading

counter = 0
lock = threading.Lock()

def safe_increment():
    global counter
    for _ in range(100000):
        # Mutual exclusion lock ensures thread safety
        with lock:
            counter += 1

threads = [threading.Thread(target=safe_increment) for _ in range(2)]
for t in threads: t.start()
for t in threads: t.join()
print(f"Final safe counter: {counter}")  # Guaranteed 200,000`,
        outputOrNote: 'Without the lock, multiple threads read and overwrite stale values simultaneously.'
      }
    ],
    advantages: [
      'Threads enable responsive UIs (performing file downloads in background while UI stays smooth).',
      'Multi-processing maximizes multi-core CPU utilization for computational tasks.'
    ],
    disadvantages: [
      'Multithreaded code is prone to hard-to-reproduce race conditions and deadlocks.'
    ],
    faqs: [
      {
        question: 'What are the four necessary conditions for a deadlock?',
        answer: 'The four Coffman conditions: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What resource is NOT shared between threads of the same process?',
        options: ['Heap memory', 'Global variables', 'Stack memory', 'Open file descriptors'],
        answer: 'Stack memory',
        explanation: 'Each thread has its own dedicated call stack to track local variables and active function execution.'
      }
    ],
    relatedTopicIds: ['os-virtual-memory', 'java-memory']
  },

  // 7. OPERATING SYSTEMS: Virtual Memory
  {
    id: 'os-virtual-memory',
    subjectId: 'operating-systems',
    title: 'Virtual Memory & Paging Architecture',
    slug: 'virtual-memory-and-paging',
    summary: 'How operating systems abstract physical RAM using page tables, TLBs, and swap space on disk.',
    simpleExplanation: 'Virtual memory gives every program the illusion that it has a huge, private block of RAM, while the OS actually maps pieces of it to physical RAM or disk storage as needed.',
    detailedExplanation: [
      'Virtual memory abstracts physical RAM by providing each process with a contiguous virtual address space.',
      'Memory is divided into fixed-size blocks called Pages (typically 4 KB). Physical memory is divided into corresponding Page Frames.',
      'The Memory Management Unit (MMU) hardware uses Page Tables to translate virtual addresses into physical addresses.',
      'When a process requests an address not currently in RAM, the hardware triggers a Page Fault interrupt, prompting the OS to retrieve the page from disk swap space.',
      'Translation Lookaside Buffers (TLBs) act as ultra-fast hardware caches for recent page translations.'
    ],
    keyPoints: [
      'Virtual addresses allow programs to exceed the physical size of RAM.',
      'Prevents malicious or errant programs from reading another process’s memory.',
      'Page Fault: Interrupt raised when accessing a page mapped to swap instead of RAM.',
      'Thrashing occurs when the OS spends more time swapping pages than executing useful work.'
    ],
    examples: [
      {
        title: 'Virtual to Physical Address Translation Concept',
        language: 'text',
        codeOrText: `Virtual Address: [ Page Number (VPN) | Offset ]
                            │
                            ▼ (Looked up in MMU / TLB / Page Table)
Physical Address: [ Frame Number (PFN) | Offset ]

Offset remains identical; only the block container identifier is translated.`,
        outputOrNote: 'If the Valid/Invalid bit in page table entry is 0, a page fault occurs.'
      }
    ],
    advantages: [
      'Provides robust memory isolation and protection between processes.',
      'Enables running programs that require more memory than physical RAM installed.'
    ],
    disadvantages: [
      'Page table lookups introduce slight overhead, mitigated by hardware TLB caches.'
    ],
    faqs: [
      {
        question: 'What is thrashing in operating systems?',
        answer: 'Thrashing is a state where the system is so overcommitted that processes continuously generate page faults, spending virtually all CPU cycles on disk I/O.'
      }
    ],
    practiceQuestions: [
      {
        question: 'Which hardware component translates virtual addresses into physical addresses?',
        options: ['ALU', 'MMU', 'GPU', 'DMA Controller'],
        answer: 'MMU',
        explanation: 'The Memory Management Unit (MMU) is the CPU hardware component handling virtual-to-physical address translation.'
      }
    ],
    relatedTopicIds: ['os-process-thread', 'java-memory']
  },

  // 8. COMPUTER NETWORKS: OSI Model vs TCP/IP
  {
    id: 'net-osi-model',
    subjectId: 'computer-networks',
    title: 'The OSI 7-Layer Model vs TCP/IP Suite',
    slug: 'osi-7-layer-model-vs-tcp-ip',
    summary: 'The theoretical reference architecture and practical protocol stack powering the modern global Internet.',
    simpleExplanation: 'Computer networks send data by wrapping your message in layers of envelopes: application data gets wrapped in transport info, then IP addresses, and finally electrical/radio pulses.',
    detailedExplanation: [
      'The Open Systems Interconnection (OSI) model is a conceptual 7-layer framework defined by ISO to standardize telecommunications.',
      'The 7 layers are: 7-Application, 6-Presentation, 5-Session, 4-Transport, 3-Network, 2-Data Link, and 1-Physical (Mnemonic: Please Do Not Throw Sausage Pizza Away).',
      'The TCP/IP model is the practical 4-layer architecture implemented on the internet: Application, Transport, Internet, and Network Access.',
      'Data encapsulation occurs on sender side: Data &rarr; Segment &rarr; Packet &rarr; Frame &rarr; Bits. Decapsulation occurs in reverse on the receiver side.'
    ],
    keyPoints: [
      'Layer 7 (Application): HTTP, DNS, SMTP, SSH.',
      'Layer 4 (Transport): TCP (reliable, connection-oriented) and UDP (fast, connectionless).',
      'Layer 3 (Network): IP addressing, routing protocols (BGP, OSPF).',
      'Layer 2 (Data Link): MAC addresses, Ethernet, switches.',
      'Layer 1 (Physical): Cables, fiber optics, radio signals.'
    ],
    examples: [
      {
        title: 'Encapsulation Process Through Network Layers',
        language: 'text',
        codeOrText: `User Request: "GET /index.html" (Application Layer: HTTP)
      ↓ + TCP Header (Source & Dest Ports)  → Segment
      ↓ + IP Header (Source & Dest IP)     → Packet
      ↓ + MAC Header & CRC Checksum        → Frame
      ↓ Converted to signals on wire       → Physical Bits (010101...)`,
        outputOrNote: 'Each layer prepends its own header containing metadata required for routing and delivery.'
      }
    ],
    diagram: {
      type: 'architecture',
      title: 'OSI 7 Layers vs TCP/IP 4 Layers',
      caption: 'Direct mapping between theoretical OSI layers and practical TCP/IP suite',
      svgContent: `<svg viewBox="0 0 500 170" class="w-full h-auto text-slate-800 dark:text-slate-200">
        <g transform="translate(30, 10)">
          <rect x="0" y="0" width="180" height="20" rx="3" fill="#818cf8"/>
          <text x="90" y="14" font-size="10" font-weight="bold" text-anchor="middle" fill="#1e1b4b">7. Application</text>
          <rect x="0" y="22" width="180" height="20" rx="3" fill="#a5b4fc"/>
          <text x="90" y="36" font-size="10" font-weight="bold" text-anchor="middle" fill="#1e1b4b">6. Presentation</text>
          <rect x="0" y="44" width="180" height="20" rx="3" fill="#c7d2fe"/>
          <text x="90" y="58" font-size="10" font-weight="bold" text-anchor="middle" fill="#1e1b4b">5. Session</text>
          <rect x="0" y="66" width="180" height="20" rx="3" fill="#60a5fa"/>
          <text x="90" y="80" font-size="10" font-weight="bold" text-anchor="middle" fill="#1e1b4b">4. Transport</text>
          <rect x="0" y="88" width="180" height="20" rx="3" fill="#34d399"/>
          <text x="90" y="102" font-size="10" font-weight="bold" text-anchor="middle" fill="#064e3b">3. Network</text>
          <rect x="0" y="110" width="180" height="20" rx="3" fill="#fbbf24"/>
          <text x="90" y="124" font-size="10" font-weight="bold" text-anchor="middle" fill="#78350f">2. Data Link</text>
          <rect x="0" y="132" width="180" height="20" rx="3" fill="#f87171"/>
          <text x="90" y="146" font-size="10" font-weight="bold" text-anchor="middle" fill="#7f1d1d">1. Physical</text>
        </g>

        <path d="M225 35 L285 35" stroke="#94a3b8" stroke-width="2"/>
        <path d="M225 76 L285 76" stroke="#94a3b8" stroke-width="2"/>
        <path d="M225 98 L285 98" stroke="#94a3b8" stroke-width="2"/>
        <path d="M225 130 L285 130" stroke="#94a3b8" stroke-width="2"/>

        <g transform="translate(290, 10)">
          <rect x="0" y="0" width="180" height="64" rx="4" fill="#818cf8" fill-opacity="0.3" stroke="#818cf8" stroke-width="2"/>
          <text x="90" y="37" font-size="11" font-weight="bold" text-anchor="middle" fill="currentColor">Application (HTTP, DNS)</text>

          <rect x="0" y="66" width="180" height="20" rx="4" fill="#60a5fa" fill-opacity="0.3" stroke="#60a5fa" stroke-width="2"/>
          <text x="90" y="80" font-size="11" font-weight="bold" text-anchor="middle" fill="currentColor">Transport (TCP, UDP)</text>

          <rect x="0" y="88" width="180" height="20" rx="4" fill="#34d399" fill-opacity="0.3" stroke="#34d399" stroke-width="2"/>
          <text x="90" y="102" font-size="11" font-weight="bold" text-anchor="middle" fill="currentColor">Internet (IP, ICMP)</text>

          <rect x="0" y="110" width="180" height="42" rx="4" fill="#fbbf24" fill-opacity="0.3" stroke="#fbbf24" stroke-width="2"/>
          <text x="90" y="135" font-size="11" font-weight="bold" text-anchor="middle" fill="currentColor">Network Access</text>
        </g>
      </svg>`
    },
    advantages: [
      'Layered modularity enables upgrading protocols (e.g. IPv4 to IPv6) without rewriting application software.',
      'Simplifies troubleshooting by narrowing issues down to a specific layer.'
    ],
    disadvantages: [
      'Layered headers incur protocol transmission overhead.'
    ],
    faqs: [
      {
        question: 'What is the fundamental difference between TCP and UDP?',
        answer: 'TCP is connection-oriented, reliable (guarantees packet ordering and retransmission), and uses flow/congestion control. UDP is connectionless and unverified, making it faster for live video streaming and gaming.'
      }
    ],
    practiceQuestions: [
      {
        question: 'At which OSI layer do IP routers operate?',
        options: ['Physical (Layer 1)', 'Data Link (Layer 2)', 'Network (Layer 3)', 'Transport (Layer 4)'],
        answer: 'Network (Layer 3)',
        explanation: 'Network Layer 3 handles IP packet addressing, routing decisions, and forwarding across networks.'
      }
    ],
    relatedTopicIds: ['net-tcp-handshake', 'sec-cia-triad']
  },

  // 8. COMPUTER NETWORKS: TCP 3-Way Handshake
  {
    id: 'net-tcp-handshake',
    subjectId: 'computer-networks',
    title: 'The TCP Three-Way Handshake',
    slug: 'tcp-three-way-handshake',
    summary: 'The sequence of SYN, SYN-ACK, and ACK packets used to establish a reliable connection before data exchange.',
    simpleExplanation: 'Before two computers talk over TCP, they synchronize: Client says "Can you hear me? (SYN)", Server replies "Yes I hear you, can you hear me? (SYN-ACK)", and Client confirms "Yes! (ACK)".',
    detailedExplanation: [
      'Transmission Control Protocol (TCP) ensures reliable, in-order delivery of bytes between networked hosts.',
      'Before any application data can travel, a connection is established using a 3-way handshake:',
      'Step 1 (SYN): The client sends a packet with the SYN (Synchronize) control flag set and an initial sequence number (ISN).',
      'Step 2 (SYN-ACK): The server receives SYN and responds with both SYN and ACK flags set, acknowledging client ISN (ISN + 1) and providing its own ISN.',
      'Step 3 (ACK): The client sends an ACK packet acknowledging the server ISN. The connection is now ESTABLISHED.'
    ],
    keyPoints: [
      'SYN &rarr; SYN-ACK &rarr; ACK.',
      'Exchanges Initial Sequence Numbers (ISNs) to guarantee correct packet reassembly.',
      'Negotiates Maximum Segment Size (MSS) and window scaling parameters.',
      'Connection termination uses a 4-way handshake (FIN &rarr; ACK, FIN &rarr; ACK).'
    ],
    examples: [
      {
        title: 'TCP Handshake Sequence',
        language: 'text',
        codeOrText: `Client                                 Server
  │                                      │
  │─── SYN (Seq = X) ───────────────────>│ (Server enters SYN_RCVD)
  │                                      │
  │<── SYN-ACK (Seq = Y, Ack = X + 1) ───│ (Client enters ESTABLISHED)
  │                                      │
  │─── ACK (Seq = X + 1, Ack = Y + 1) ──>│ (Server enters ESTABLISHED)
  │                                      │
  ==== Full Duplex Data Channel Active ====`,
        outputOrNote: 'Data transfer begins immediately after or alongside the final ACK packet.'
      }
    ],
    advantages: [
      'Guarantees that both sender and receiver are reachable and ready before sending payload data.'
    ],
    disadvantages: [
      'Introduces 1 Round Trip Time (RTT) latency penalty before data transmission begins (further compounded by TLS handshakes).'
    ],
    faqs: [
      {
        question: 'What is a SYN flood attack?',
        answer: 'A Denial-of-Service attack where an attacker sends thousands of SYN packets with spoofed IPs, filling the server connection backlog queue without ever sending the completing ACK.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What are the three flags exchanged during TCP connection initialization in order?',
        options: ['SYN, ACK, FIN', 'SYN, SYN-ACK, ACK', 'ACK, SYN, ACK', 'HELLO, READY, GO'],
        answer: 'SYN, SYN-ACK, ACK',
        explanation: 'Client sends SYN, Server replies with SYN-ACK, and Client completes with ACK.'
      }
    ],
    relatedTopicIds: ['net-osi-model', 'sec-cia-triad']
  },

  // 9. CYBER SECURITY: CIA Triad & Cryptography
  {
    id: 'sec-cia-triad',
    subjectId: 'cyber-security',
    title: 'The CIA Triad & Fundamentals of Cryptography',
    slug: 'cia-triad-and-cryptography',
    summary: 'The cornerstone information security model and symmetric vs asymmetric encryption mechanics.',
    simpleExplanation: 'Security relies on three pillars: Confidentiality (only authorized eyes see it), Integrity (data is not tampered with), and Availability (systems stay online when needed).',
    detailedExplanation: [
      'The CIA Triad is the foundational model guiding information security policies in organizations worldwide.',
      'Confidentiality: Protecting sensitive data from unauthorized disclosure through access control and encryption.',
      'Integrity: Ensuring data remains authentic, accurate, and protected from unauthorized modification or corruption (verified via cryptographic hashes like SHA-256).',
      'Availability: Guaranteeing authorized users have reliable, timely access to services through redundancy, backups, and DDoS mitigation.',
      'Symmetric Encryption (e.g., AES-256) uses one shared secret key for encryption and decryption; Asymmetric Encryption (e.g., RSA, ECC) uses a mathematically linked public-private key pair.'
    ],
    keyPoints: [
      'Confidentiality: Solved by encryption (AES, RSA) and strict permissions.',
      'Integrity: Solved by hashing (SHA-256) and digital signatures.',
      'Availability: Solved by load balancing, backups, and geo-redundant servers.',
      'Hybrid Cryptography: Modern HTTPS uses asymmetric RSA/ECC to exchange a temporary symmetric AES session key.'
    ],
    examples: [
      {
        title: 'Verifying Data Integrity with SHA-256 Hash',
        language: 'python',
        codeOrText: `import hashlib

def calculate_checksum(data: str) -> str:
    return hashlib.sha256(data.encode()).hexdigest()

original_text = "Transfer $100 to student account"
tampered_text = "Transfer $900 to student account"

print("Original Hash:", calculate_checksum(original_text))
# Changing even 1 character completely scrambles the hash (Avalanche Effect)
print("Tampered Hash:", calculate_checksum(tampered_text))`,
        outputOrNote: 'The recipient compares received hash against signed checksum to detect tampering instantly.'
      }
    ],
    advantages: [
      'Symmetric encryption is computationally fast and ideal for encrypting gigabytes of files.',
      'Asymmetric encryption eliminates the dangerous requirement of having to share a secret key beforehand.'
    ],
    disadvantages: [
      'Asymmetric encryption is computationally expensive for large payloads, which is why hybrid encryption is used.'
    ],
    faqs: [
      {
        question: 'Can you reverse a SHA-256 cryptographic hash back to original text?',
        answer: 'No. Cryptographic hashes are strictly one-way mathematical functions. You cannot reverse them without brute-force guessing.'
      }
    ],
    practiceQuestions: [
      {
        question: 'Which pillar of the CIA Triad is violated if an attacker modifies grades directly inside a university database?',
        options: ['Confidentiality', 'Integrity', 'Availability', 'Non-repudiation'],
        answer: 'Integrity',
        explanation: 'Unauthorized alteration or tampering of legitimate data directly violates the Integrity principle.'
      }
    ],
    relatedTopicIds: ['net-osi-model', 'cloud-models']
  },

  // 10. CLOUD COMPUTING: Cloud Service Models
  {
    id: 'cloud-models',
    subjectId: 'cloud-computing',
    title: 'Cloud Service Models: IaaS, PaaS, and SaaS',
    slug: 'cloud-service-models-iaas-paas-saas',
    summary: 'The shared responsibility model categorizing Infrastructure, Platform, and Software as a Service.',
    simpleExplanation: 'Think of pizza: IaaS is buying raw dough and cheese to bake at home; PaaS is ordering custom pizza delivered hot; SaaS is dining at an all-inclusive restaurant.',
    detailedExplanation: [
      'Cloud computing delivers on-demand computing services over the internet on a pay-as-you-go pricing basis.',
      'Infrastructure as a Service (IaaS): Provides fundamental computing resources (virtual servers, storage, networking). Users manage the OS, runtime, and applications. (e.g. AWS EC2, Google Compute Engine).',
      'Platform as a Service (PaaS): Provides a managed platform for developing, running, and managing applications without the complexity of building infrastructure. (e.g. AWS Elastic Beanstalk, Google App Engine, Heroku).',
      'Software as a Service (SaaS): Delivers fully functioning end-user software applications over a web browser, with the cloud vendor managing everything. (e.g. Google Workspace, Microsoft 365).'
    ],
    keyPoints: [
      'IaaS: Maximum control, maximum configuration responsibility.',
      'PaaS: Focus on application code; OS and runtime managed by provider.',
      'SaaS: Complete software ready for end-user consumption.',
      'Shared Responsibility Model dictates who secures which layer of the stack.'
    ],
    examples: [
      {
        title: 'Comparing Management Responsibilities',
        language: 'text',
        codeOrText: `Layer                  On-Premise    IaaS      PaaS      SaaS
─────────────────────────────────────────────────────────────
Application            You           You       You       Vendor
Runtime & OS           You           You       Vendor    Vendor
Virtualization         You           Vendor    Vendor    Vendor
Hardware & Network     You           Vendor    Vendor    Vendor`,
        outputOrNote: 'As you move from IaaS to SaaS, you trade custom infrastructure control for operational velocity.'
      }
    ],
    advantages: [
      'Eliminates large upfront capital expenses (CapEx) for physical server racks.',
      'Provides instant global horizontal elasticity to scale with student user traffic spikes.'
    ],
    disadvantages: [
      'Potential vendor lock-in when relying on proprietary cloud APIs.'
    ],
    faqs: [
      {
        question: 'What is serverless computing?',
        answer: 'Serverless (FaaS) is an evolution of PaaS where developers write pure functions (e.g. AWS Lambda) and the cloud vendor provisions servers on demand, charging only for milliseconds executed.'
      }
    ],
    practiceQuestions: [
      {
        question: 'Under which cloud service model does the customer remain responsible for configuring the operating system security patches?',
        options: ['SaaS', 'PaaS', 'IaaS', 'FaaS'],
        answer: 'IaaS',
        explanation: 'In IaaS (like AWS EC2), the user selects and manages the OS, including patches and software runtimes.'
      }
    ],
    relatedTopicIds: ['sec-cia-triad', 'os-virtual-memory']
  },

  // 11. ARTIFICIAL INTELLIGENCE: Machine Learning Fundamentals
  {
    id: 'ai-ml-fundamentals',
    subjectId: 'artificial-intelligence',
    title: 'Supervised vs Unsupervised Machine Learning',
    slug: 'supervised-vs-unsupervised-learning',
    summary: 'The core machine learning paradigms: learning from labeled training data vs finding latent patterns in unlabeled data.',
    simpleExplanation: 'Supervised learning is like studying with flashcards that have answers on the back; unsupervised learning is like sorting a pile of unlabeled coins into groups by size and weight.',
    detailedExplanation: [
      'Machine Learning focuses on algorithms that learn statistical patterns from data to make predictions or decisions without being explicitly programmed.',
      'Supervised Learning: The algorithm is trained on labeled input-output pairs (X &rarr; Y). Common tasks include Regression (predicting continuous numerical values like house prices) and Classification (predicting discrete categories like spam vs not spam).',
      'Unsupervised Learning: The algorithm receives unlabeled data and identifies hidden structures, clusters, or representations (e.g. K-Means clustering, Principal Component Analysis).',
      'Reinforcement Learning: An agent learns optimal actions via trial-and-error by maximizing cumulative rewards in an interactive environment.'
    ],
    keyPoints: [
      'Supervised: Labeled datasets (Regression, Classification).',
      'Unsupervised: Unlabeled datasets (Clustering, Dimensionality Reduction).',
      'Loss Function: Quantifies the discrepancy between model prediction and true ground truth.',
      'Overfitting: Model memorizes training noise and fails to generalize to unseen test data.'
    ],
    examples: [
      {
        title: 'Simple Linear Regression Gradient Descent Concept',
        language: 'python',
        codeOrText: `# Hypothesis: y = w * x + b
def predict(x, weight, bias):
    return weight * x + bias

# Mean Squared Error (Loss function)
def compute_loss(predictions, targets):
    n = len(targets)
    return sum((p - y) ** 2 for p, y in zip(predictions, targets)) / n

# Gradient descent updates weight and bias to minimize loss`,
        outputOrNote: 'Supervised learning iteratively adjusts parameters to minimize prediction loss.'
      }
    ],
    diagram: {
      type: 'flowchart',
      title: 'Machine Learning Taxonomy',
      caption: 'Categorization of Machine Learning branches and their core algorithms',
      svgContent: `<svg viewBox="0 0 500 150" class="w-full h-auto text-slate-800 dark:text-slate-200">
        <rect x="180" y="10" width="140" height="35" rx="6" fill="#8b5cf6" fill-opacity="0.2" stroke="#8b5cf6" stroke-width="2"/>
        <text x="250" y="32" font-size="11" font-weight="bold" text-anchor="middle" fill="currentColor">Machine Learning</text>

        <path d="M250 45 L100 80" stroke="#94a3b8" stroke-width="2"/>
        <path d="M250 45 L400 80" stroke="#94a3b8" stroke-width="2"/>

        <rect x="20" y="80" width="160" height="55" rx="6" fill="#3b82f6" fill-opacity="0.15" stroke="#3b82f6" stroke-width="2"/>
        <text x="100" y="102" font-size="11" font-weight="bold" text-anchor="middle" fill="#2563eb">Supervised Learning</text>
        <text x="100" y="122" font-size="9" text-anchor="middle" fill="#64748b">Regression &amp; Classification</text>

        <rect x="320" y="80" width="160" height="55" rx="6" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="2"/>
        <text x="400" y="102" font-size="11" font-weight="bold" text-anchor="middle" fill="#059669">Unsupervised Learning</text>
        <text x="400" y="122" font-size="9" text-anchor="middle" fill="#64748b">Clustering &amp; PCA</text>
      </svg>`
    },
    advantages: [
      'Extracts predictive value from vast datasets impossible for humans to analyze manually.',
      'Supervised classifiers achieve high accuracy with high quality labeled training sets.'
    ],
    disadvantages: [
      'Requires substantial volumes of clean, balanced, labeled data.',
      'Deep models can behave like "black boxes", making interpretability difficult.'
    ],
    faqs: [
      {
        question: 'What is the Bias-Variance tradeoff in Machine Learning?',
        answer: 'High bias results in underfitting (model is too simplistic to capture underlying trends); high variance results in overfitting (model captures noise and fails to generalize to new inputs).'
      }
    ],
    practiceQuestions: [
      {
        question: 'Predicting whether an incoming email is "Spam" or "Not Spam" is an example of what type of task?',
        options: ['Clustering', 'Classification', 'Regression', 'Dimensionality Reduction'],
        answer: 'Classification',
        explanation: 'Assigning inputs into discrete predefined categories is a supervised classification problem.'
      }
    ],
    relatedTopicIds: ['math-logic', 'cs-big-o']
  },

  // 12. MATHEMATICS: Discrete Mathematics & Propositional Logic
  {
    id: 'math-logic',
    subjectId: 'mathematics',
    title: 'Propositional Logic, Truth Tables & Set Theory',
    slug: 'propositional-logic-and-truth-tables',
    summary: 'The mathematical bedrock of digital computer circuits, conditional statements, and boolean algebra.',
    simpleExplanation: 'Propositional logic uses True and False statements with AND, OR, and NOT operations to prove arguments and design reliable computer circuits.',
    detailedExplanation: [
      'Discrete mathematics provides the mathematical language of computer science and digital logic design.',
      'A proposition is a declarative statement that is either True (T) or False (F), but not both.',
      'Fundamental logical operators: Conjunction (AND, ∧), Disjunction (OR, ∨), Negation (NOT, ¬), Conditional (Implication, →), and Biconditional (↔).',
      'De Morgan’s Laws state that ¬(P ∧ Q) ≡ ¬P ∨ ¬Q and ¬(P ∨ Q) ≡ ¬P ∧ ¬Q. This is critical for simplifying nested boolean code conditions in software engineering.',
      'Set operations (Union ∪, Intersection ∩, Complement, Cartesian product) map directly to database queries and relational algebra.'
    ],
    keyPoints: [
      'AND (∧): True only when BOTH operands are True.',
      'OR (∨): False only when BOTH operands are False.',
      'De Morgan’s Laws: Negating an AND flips it to an OR of negated parts.',
      'Forms the foundation of boolean algebra and hardware logic gates (NAND, NOR).'
    ],
    examples: [
      {
        title: 'Truth Table for Logical Implication (P → Q)',
        language: 'text',
        codeOrText: ` P │ Q │ P ∧ Q │ P ∨ Q │ P → Q (If P then Q)
───┼───┼───────┼───────┼────────────────────────
 T │ T │   T   │   T   │   T
 T │ F │   F   │   T   │   F   <-- Only false case!
 F │ T │   F   │   T   │   T
 F │ F │   F   │   F   │   T`,
        outputOrNote: 'A conditional statement (P → Q) is only false when a True premise leads to a False conclusion.'
      }
    ],
    advantages: [
      'Allows mathematically verifying that software business logic and cryptographic proofs contain no logical contradictions.',
      'Simplifies complex boolean conditionals in programming, reducing bugs.'
    ],
    disadvantages: [
      'Propositional logic does not support quantifiers (like "for all" or "there exists"), requiring first-order predicate logic for richer mathematical claims.'
    ],
    faqs: [
      {
        question: 'What is a Tautology in discrete mathematics?',
        answer: 'A tautology is a compound proposition that evaluates to True for every possible truth assignment of its component variables (e.g. P ∨ ¬P).'
      }
    ],
    practiceQuestions: [
      {
        question: 'According to De Morgan’s Laws, what is equivalent to ¬(A ∧ B)?',
        options: ['¬A ∧ ¬B', '¬A ∨ ¬B', 'A ∨ B', '¬A → B'],
        answer: '¬A ∨ ¬B',
        explanation: 'De Morgan’s law states the negation of a conjunction is the disjunction of the negations: ¬(A ∧ B) ≡ ¬A ∨ ¬B.'
      }
    ],
    relatedTopicIds: ['cs-big-o', 'ai-ml-fundamentals']
  }
];
