export type SubjectId =
  | 'computer-science'
  | 'programming'
  | 'python'
  | 'java'
  | 'web-development'
  | 'database-management'
  | 'operating-systems'
  | 'computer-networks'
  | 'cyber-security'
  | 'cloud-computing'
  | 'artificial-intelligence'
  | 'mathematics';

export interface Subject {
  id: SubjectId;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  badgeColor: string;
  topicsCount: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface PracticeQuestion {
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export interface DiagramConfig {
  type: 'architecture' | 'flowchart' | 'venn' | 'tree' | 'network' | 'model';
  title: string;
  caption: string;
  svgContent: string;
}

export interface StudyTopic {
  id: string;
  subjectId: SubjectId;
  title: string;
  slug: string;
  summary: string;
  simpleExplanation: string;
  detailedExplanation: string[];
  keyPoints: string[];
  examples: {
    title: string;
    language?: string;
    codeOrText: string;
    outputOrNote?: string;
  }[];
  diagram?: DiagramConfig;
  advantages?: string[];
  disadvantages?: string[];
  faqs: FAQ[];
  practiceQuestions: PracticeQuestion[];
  relatedTopicIds: string[];
}

export type QuizDifficulty = 'all' | 'beginner' | 'intermediate' | 'advanced';

export interface QuizQuestion {
  id: string;
  subjectId: SubjectId;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizAttemptRecord {
  id: string;
  timestamp: number;
  dateFormatted: string;
  subjectId: string;
  subjectName: string;
  difficulty: QuizDifficulty;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpentSeconds?: number;
}

export interface SubjectHighScore {
  subjectId: string;
  subjectName: string;
  bestScore: number;
  bestTotal: number;
  bestPercentage: number;
  attemptsCount: number;
  lastAttemptTimestamp: number;
}

export interface StudyTask {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  notes?: string;
}

export type ToolId =
  | 'percentage'
  | 'gpa'
  | 'unit-converter'
  | 'study-timer'
  | 'pomodoro'
  | 'study-planner'
  | 'age-calculator'
  | 'attendance';

export interface StudentToolMeta {
  id: ToolId;
  name: string;
  description: string;
  icon: string;
  category: 'academic' | 'productivity' | 'math';
}

export type ActivePage =
  | 'home'
  | 'notes'
  | 'quizzes'
  | 'tools'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'disclaimer'
  | 'copyright';
