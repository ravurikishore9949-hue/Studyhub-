import { StudentToolMeta } from '../types';

export const STUDENT_TOOLS: StudentToolMeta[] = [
  {
    id: 'percentage',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, percentage increase/decrease, and relative ratio percentages instantly.',
    icon: 'Percent',
    category: 'math',
  },
  {
    id: 'gpa',
    name: 'CGPA & GPA Calculator',
    description: 'Calculate semester GPA and cumulative CGPA across courses with custom credit weights and grading scales.',
    icon: 'GraduationCap',
    category: 'academic',
  },
  {
    id: 'attendance',
    name: 'Attendance Calculator',
    description: 'Track class attendance percentage and calculate how many classes you must attend to meet required thresholds.',
    icon: 'UserCheck',
    category: 'academic',
  },
  {
    id: 'pomodoro',
    name: 'Pomodoro Timer',
    description: 'Boost focus with customizable work/break intervals, session cycle counters, and audio completion signals.',
    icon: 'Clock',
    category: 'productivity',
  },
  {
    id: 'study-timer',
    name: 'Study Stopwatch & Logger',
    description: 'Track focused study sessions, record split laps, and monitor daily accumulated study duration.',
    icon: 'Timer',
    category: 'productivity',
  },
  {
    id: 'study-planner',
    name: 'Study Task Planner',
    description: 'Organize study tasks by subject, priority, and deadlines with persistent local browser storage.',
    icon: 'CalendarCheck',
    category: 'productivity',
  },
  {
    id: 'unit-converter',
    name: 'Academic Unit Converter',
    description: 'Convert digital storage (Bytes, KB, MB, GB, TB), length, weight, speed, and temperatures with high precision.',
    icon: 'ArrowRightLeft',
    category: 'math',
  },
  {
    id: 'age-calculator',
    name: 'Age & Milestone Calculator',
    description: 'Calculate your exact age down to days, day of birth, total days lived, and countdown to your next birthday.',
    icon: 'Calendar',
    category: 'math',
  }
];
