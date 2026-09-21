import React, { useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  CheckSquare, 
  Wrench, 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  Compass, 
  Clock, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  Database, 
  Network, 
  Shield, 
  Cloud, 
  BrainCircuit, 
  Binary, 
  Layers,
  Trophy
} from 'lucide-react';
import { ActivePage, ToolId } from '../types';
import { INITIAL_SUBJECTS } from '../data/subjects';
import { STUDY_TOPICS } from '../data/studyNotes';
import { STUDENT_TOOLS } from '../data/toolsMeta';
import { AdPlaceholder } from './AdPlaceholder';
import { getOverallStats } from '../utils/quizScores';

interface HomeViewProps {
  onNavigatePage: (page: ActivePage) => void;
  onSelectSubject: (subjectId: string) => void;
  onSelectTopic: (topicId: string) => void;
  onSelectTool: (toolId: ToolId) => void;
  onOpenSearch: () => void;
}

// Icon helper
const SubjectIcon: React.FC<{ icon: string; className?: string }> = ({ icon, className = 'w-5 h-5' }) => {
  switch (icon) {
    case 'Cpu': return <Cpu className={className} />;
    case 'Code2': return <Code2 className={className} />;
    case 'Database': return <Database className={className} />;
    case 'Network': return <Network className={className} />;
    case 'Shield': return <Shield className={className} />;
    case 'Cloud': return <Cloud className={className} />;
    case 'BrainCircuit': return <BrainCircuit className={className} />;
    case 'Binary': return <Binary className={className} />;
    case 'Layers': return <Layers className={className} />;
    default: return <BookOpen className={className} />;
  }
};

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigatePage,
  onSelectSubject,
  onSelectTopic,
  onSelectTool,
  onOpenSearch
}) => {
  const latestTopics = STUDY_TOPICS.slice(0, 4);
  const popularTopics = STUDY_TOPICS.slice(2, 6);
  const quizStats = useMemo(() => getOverallStats(), []);

  return (
    <div className="space-y-16 py-6 sm:py-10">
      
      {/* 1. Website Introduction & Quick Search Trigger */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-900 bg-indigo-50/60 dark:bg-indigo-950/40 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Independent Educational Platform &bull; No Login Required</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
          Master Computer Science, Programming &amp; Academic Concepts
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Clear, structured study notes with visual diagrams, interactive practice quizzes with instant answer feedback, and practical academic calculators designed for students.
        </p>

        {/* Quick Search Bar (Clicks into site-wide search dialog) */}
        <div className="max-w-xl mx-auto pt-2">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 hover:border-indigo-500 hover:text-slate-600 dark:hover:text-slate-200 shadow-sm transition-all text-sm group"
          >
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
              <span>Search subjects, Big-O notes, quiz questions, GPA tools...</span>
            </div>
            <kbd className="hidden sm:inline-block px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-500">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Quick Navigation Action Chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold">
          <button
            onClick={() => onNavigatePage('notes')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-opacity"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse 12 Subjects</span>
          </button>
          <button
            onClick={() => onNavigatePage('quizzes')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <CheckSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Practice Quizzes</span>
          </button>
          <button
            onClick={() => onNavigatePage('tools')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Wrench className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>8 Student Calculators</span>
          </button>
        </div>
      </section>

      {/* Top compliant banner placeholder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slotType="banner" />
      </div>

      {/* 2. Subject / Category Cards (All 12 Subjects) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Curriculum Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Explore Study Subjects
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select any category to read structured notes, diagrams, code examples, and practice questions.
            </p>
          </div>
          <button
            onClick={() => onNavigatePage('notes')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View All Subjects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {INITIAL_SUBJECTS.map((sub) => (
            <div
              key={sub.id}
              onClick={() => {
                onSelectSubject(sub.id);
                onNavigatePage('notes');
              }}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-600/80 transition-all hover:shadow-md cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <SubjectIcon icon={sub.icon} />
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${sub.badgeColor}`}>
                    {sub.topicsCount} Topics
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {sub.name}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {sub.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <span>Read Notes</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Latest Study Resources & Popular Topics (Split Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Latest Resources */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Recently Updated
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  Latest Study Resources
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {latestTopics.map((topic) => {
                const parentSub = INITIAL_SUBJECTS.find((s) => s.id === topic.subjectId)?.name || 'Computer Science';
                return (
                  <div
                    key={topic.id}
                    onClick={() => {
                      onSelectSubject(topic.subjectId);
                      onSelectTopic(topic.id);
                      onNavigatePage('notes');
                    }}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-all flex items-start justify-between gap-3 group"
                  >
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                        {parentSub}
                      </span>
                      <h4 className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                        {topic.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {topic.summary}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0 mt-1" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Popular High-Yield Topics */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Core High-Yield Concepts
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                Popular Revision Topics
              </h3>
            </div>

            <div className="space-y-3">
              {popularTopics.map((topic) => {
                const parentSub = INITIAL_SUBJECTS.find((s) => s.id === topic.subjectId)?.name || 'Study Topic';
                return (
                  <div
                    key={topic.id}
                    onClick={() => {
                      onSelectSubject(topic.subjectId);
                      onSelectTopic(topic.id);
                      onNavigatePage('notes');
                    }}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-all flex items-start justify-between gap-3 group"
                  >
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                        {parentSub}
                      </span>
                      <h4 className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate">
                        {topic.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {topic.simpleExplanation}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 shrink-0 mt-1" />
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 4. Practice Quiz Section Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-indigo-100 dark:border-indigo-950 bg-gradient-to-r from-indigo-50/80 via-white to-indigo-50/60 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40 p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center lg:text-left">
              <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-start">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                  Active Recall Testing
                </span>
                {quizStats.totalAttempts > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200">
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    <span>Personal Best: {quizStats.highestScorePercentage}% ({quizStats.totalAttempts} taken)</span>
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Test Your Knowledge with Instant Feedback Quizzes
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Practice multiple-choice questions across all 12 subjects. Track your high scores and progress over multiple attempts stored safely in your browser.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => onNavigatePage('quizzes')}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-500/20 transition-all"
                >
                  Start Practice Quiz Now
                </button>
                <button
                  onClick={() => onNavigatePage('quizzes')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50/50 dark:hover:bg-amber-950/40 text-slate-700 dark:text-slate-200 text-sm font-bold transition-all"
                >
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>View High Scores</span>
                </button>
                <span className="text-xs text-slate-500">
                  Beginner, Intermediate &amp; Advanced tiers
                </span>
              </div>
            </div>

            <div className="w-full lg:w-80 p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-3 text-left">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Sample Question Preview</span>
                <span className="font-mono text-emerald-600 font-bold">100% Verified</span>
              </div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                "What is the average time complexity of searching a sorted array using Binary Search?"
              </p>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-semibold flex items-center justify-between">
                  <span>O(log n)</span>
                  <span className="text-[10px] text-emerald-600 uppercase font-bold">&check; Correct</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  O(n) - Linear scan
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Useful Student Tools Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Student Productivity Suite
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Academic Calculators &amp; Daily Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Free, verified tools that run directly in your browser without requiring account creation.
            </p>
          </div>
          <button
            onClick={() => onNavigatePage('tools')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Open Tools Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STUDENT_TOOLS.map((tool) => (
            <div
              key={tool.id}
              onClick={() => {
                onSelectTool(tool.id);
                onNavigatePage('tools');
              }}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-400 dark:hover:border-emerald-600/80 transition-all hover:shadow-md cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Wrench className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {tool.name}
                </h4>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {tool.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span>Launch Tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom sponsor slot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slotType="banner" />
      </div>

    </div>
  );
};
