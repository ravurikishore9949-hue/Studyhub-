import { Subject, SubjectId } from '../types';

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'computer-science',
    name: 'Computer Science',
    slug: 'computer-science',
    description: 'Foundations of computation, algorithms, data structures, and computer architecture.',
    icon: 'Cpu',
    color: 'from-blue-500 to-indigo-600',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    topicsCount: 4,
  },
  {
    id: 'programming',
    name: 'Programming',
    slug: 'programming',
    description: 'Core concepts of software construction, control flow, functions, OOP, and debugging.',
    icon: 'Code2',
    color: 'from-emerald-500 to-teal-600',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    topicsCount: 4,
  },
  {
    id: 'python',
    name: 'Python',
    slug: 'python',
    description: 'Modern Python syntax, standard libraries, data manipulation, and idiomatic idioms.',
    icon: 'Terminal',
    color: 'from-amber-500 to-yellow-600',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    topicsCount: 4,
  },
  {
    id: 'java',
    name: 'Java',
    slug: 'java',
    description: 'Object-oriented programming, JVM architecture, collections, and concurrency.',
    icon: 'Coffee',
    color: 'from-orange-500 to-red-600',
    badgeColor: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
    topicsCount: 4,
  },
  {
    id: 'web-development',
    name: 'Web Development',
    slug: 'web-development',
    description: 'HTML5, modern CSS, JavaScript ES6+, DOM manipulation, APIs, and responsive design.',
    icon: 'Globe',
    color: 'from-cyan-500 to-blue-600',
    badgeColor: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300',
    topicsCount: 4,
  },
  {
    id: 'database-management',
    name: 'Database Management',
    slug: 'database-management',
    description: 'Relational database theory, SQL queries, normalization, ACID properties, and indexing.',
    icon: 'Database',
    color: 'from-indigo-500 to-purple-600',
    badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300',
    topicsCount: 4,
  },
  {
    id: 'operating-systems',
    name: 'Operating Systems',
    slug: 'operating-systems',
    description: 'Process scheduling, virtual memory, threads, deadlocks, and file system architecture.',
    icon: 'Layers',
    color: 'from-violet-500 to-purple-700',
    badgeColor: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300',
    topicsCount: 4,
  },
  {
    id: 'computer-networks',
    name: 'Computer Networks',
    slug: 'computer-networks',
    description: 'The OSI model, TCP/IP protocol suite, routing, DNS, HTTP/HTTPS, and sockets.',
    icon: 'Network',
    color: 'from-sky-500 to-indigo-600',
    badgeColor: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
    topicsCount: 4,
  },
  {
    id: 'cyber-security',
    name: 'Cyber Security',
    slug: 'cyber-security',
    description: 'Principles of confidentiality, integrity, availability, cryptography, and network defense.',
    icon: 'ShieldCheck',
    color: 'from-rose-500 to-pink-600',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
    topicsCount: 4,
  },
  {
    id: 'cloud-computing',
    name: 'Cloud Computing',
    slug: 'cloud-computing',
    description: 'IaaS, PaaS, SaaS, virtualization, containerization, serverless, and cloud architecture.',
    icon: 'Cloud',
    color: 'from-blue-600 to-teal-500',
    badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
    topicsCount: 4,
  },
  {
    id: 'artificial-intelligence',
    name: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    description: 'Machine learning fundamentals, neural networks, search algorithms, and data preprocessing.',
    icon: 'Sparkles',
    color: 'from-purple-500 to-pink-600',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
    topicsCount: 4,
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    slug: 'mathematics',
    description: 'Discrete mathematics, linear algebra, calculus foundations, combinatorics, and probability.',
    icon: 'Binary',
    color: 'from-amber-600 to-red-600',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    topicsCount: 4,
  },
];

/**
 * Extensibility helper: Allows registering new subjects cleanly at runtime or during curriculum updates.
 */
class SubjectRegistry {
  private subjects: Map<string, Subject> = new Map();

  constructor(initial: Subject[]) {
    initial.forEach(subj => this.subjects.set(subj.id, subj));
  }

  getAll(): Subject[] {
    return Array.from(this.subjects.values());
  }

  getById(id: string): Subject | undefined {
    return this.subjects.get(id);
  }

  register(newSubject: Subject): void {
    this.subjects.set(newSubject.id, newSubject);
  }
}

export const subjectRegistry = new SubjectRegistry(INITIAL_SUBJECTS);
