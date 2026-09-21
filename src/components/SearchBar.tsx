import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  BookOpen, 
  CheckSquare, 
  Wrench, 
  Folder, 
  HelpCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { INITIAL_SUBJECTS } from '../data/subjects';
import { STUDY_TOPICS } from '../data/studyNotes';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import { STUDENT_TOOLS } from '../data/toolsMeta';
import { ActivePage, ToolId } from '../types';

interface SearchBarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopic: (topicId: string) => void;
  onSelectSubject: (subjectId: string) => void;
  onSelectTool: (toolId: ToolId) => void;
  onNavigatePage: (page: ActivePage) => void;
}

export interface SearchItem {
  id: string;
  type: 'subject' | 'note' | 'question' | 'tool';
  title: string;
  subtitle: string;
  snippet?: string;
  badge: string;
  action: () => void;
}

export const SearchBarModal: React.FC<SearchBarModalProps> = ({
  isOpen,
  onClose,
  onSelectTopic,
  onSelectSubject,
  onSelectTool,
  onNavigatePage
}) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'note' | 'subject' | 'tool' | 'question'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open if bound globally
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Build searchable index
  const normalizedQuery = query.trim().toLowerCase();

  const allItems: SearchItem[] = [];

  // 1. Subjects
  INITIAL_SUBJECTS.forEach((sub) => {
    allItems.push({
      id: `subj-${sub.id}`,
      type: 'subject',
      title: sub.name,
      subtitle: 'Subject Category',
      snippet: sub.description,
      badge: 'Subject',
      action: () => {
        onSelectSubject(sub.id);
        onNavigatePage('notes');
        onClose();
      }
    });
  });

  // 2. Study Notes / Topics
  STUDY_TOPICS.forEach((topic) => {
    const parentSubj = INITIAL_SUBJECTS.find((s) => s.id === topic.subjectId)?.name || 'Study Notes';
    allItems.push({
      id: `topic-${topic.id}`,
      type: 'note',
      title: topic.title,
      subtitle: `${parentSubj} &bull; Study Note`,
      snippet: topic.summary,
      badge: 'Study Note',
      action: () => {
        onSelectTopic(topic.id);
        onNavigatePage('notes');
        onClose();
      }
    });
  });

  // 3. Tools
  STUDENT_TOOLS.forEach((tool) => {
    allItems.push({
      id: `tool-${tool.id}`,
      type: 'tool',
      title: tool.name,
      subtitle: `${tool.category.toUpperCase()} &bull; Academic Tool`,
      snippet: tool.description,
      badge: 'Tool',
      action: () => {
        onSelectTool(tool.id);
        onNavigatePage('tools');
        onClose();
      }
    });
  });

  // 4. Questions
  QUIZ_QUESTIONS.forEach((q) => {
    const parentSubj = INITIAL_SUBJECTS.find((s) => s.id === q.subjectId)?.name || 'General';
    allItems.push({
      id: `q-${q.id}`,
      type: 'question',
      title: q.question,
      subtitle: `${parentSubj} &bull; ${q.difficulty.toUpperCase()} Quiz Question`,
      snippet: `Explanation: ${q.explanation}`,
      badge: 'Practice Quiz',
      action: () => {
        onSelectSubject(q.subjectId);
        onNavigatePage('quizzes');
        onClose();
      }
    });
  });

  // 5. Compliance & Trust Pages
  const compliancePages: { id: ActivePage; title: string; subtitle: string; snippet: string }[] = [
    { id: 'privacy', title: 'Privacy Policy', subtitle: 'Compliance & Data Protection', snippet: 'Information we collect, cookies, Google AdSense, and student privacy protection.' },
    { id: 'terms', title: 'Terms of Use', subtitle: 'Institutional Guidelines', snippet: 'Acceptable use, educational content limitations, intellectual property, and liability.' },
    { id: 'cookies', title: 'Cookie Policy', subtitle: 'Privacy Choices & Controls', snippet: 'How local storage, advertising cookies, and analytics are used, and how to manage them in your browser.' },
    { id: 'disclaimer', title: 'Educational Disclaimer', subtitle: 'Academic Disclosures', snippet: 'Important disclosures on calculator estimations, syllabus variations, and informal learning.' },
    { id: 'contact', title: 'Contact Us', subtitle: 'Student Support & Feedback', snippet: 'Send an inquiry, content correction, or subject suggestion to our educational team.' },
    { id: 'about', title: 'About Us', subtitle: 'Mission & Transparency', snippet: 'Purpose, open-access principles, and independent educational commitment of Student Study Hub.' },
  ];

  compliancePages.forEach((cp) => {
    allItems.push({
      id: `policy-${cp.id}`,
      type: 'note',
      title: cp.title,
      subtitle: cp.subtitle,
      snippet: cp.snippet,
      badge: 'Policy',
      action: () => {
        onNavigatePage(cp.id);
        onClose();
      }
    });
  });

  // Filter items
  const filtered = allItems.filter((item) => {
    if (activeFilter !== 'all' && item.type !== activeFilter) return false;
    if (!normalizedQuery) return true;
    return (
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.subtitle.toLowerCase().includes(normalizedQuery) ||
      (item.snippet && item.snippet.toLowerCase().includes(normalizedQuery))
    );
  });

  const popularSuggestions = [
    { title: 'Time & Space Complexity (Big-O)', action: () => { onSelectTopic('cs-big-o'); onNavigatePage('notes'); onClose(); } },
    { title: 'The TCP Three-Way Handshake', action: () => { onSelectTopic('net-tcp-handshake'); onNavigatePage('notes'); onClose(); } },
    { title: 'CGPA & GPA Calculator', action: () => { onSelectTool('gpa'); onNavigatePage('tools'); onClose(); } },
    { title: 'Pomodoro Focus Timer', action: () => { onSelectTool('pomodoro'); onNavigatePage('tools'); onClose(); } },
    { title: 'Database Normalization (1NF, 2NF, 3NF)', action: () => { onSelectTopic('db-normalization'); onNavigatePage('notes'); onClose(); } },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Site Search Dialog"
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subjects, notes, algorithms, quiz questions, tools..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none text-base"
            aria-label="Site Search Input"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear Search Input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-semibold rounded bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800/80 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'All Results' },
            { id: 'note', label: 'Study Notes' },
            { id: 'subject', label: 'Subjects' },
            { id: 'tool', label: 'Tools' },
            { id: 'question', label: 'Quiz Questions' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-2.5 py-1 rounded-full font-medium transition-colors shrink-0 ${
                activeFilter === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-1.5 divide-y divide-slate-100 dark:divide-slate-800/60">
          {filtered.length > 0 ? (
            filtered.slice(0, 25).map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full text-left p-3 rounded-xl hover:bg-indigo-50/70 dark:hover:bg-indigo-950/40 transition-colors flex items-start gap-3 group"
              >
                <div className="mt-0.5 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                  {item.type === 'note' && <BookOpen className="w-4 h-4" />}
                  {item.type === 'subject' && <Folder className="w-4 h-4" />}
                  {item.type === 'tool' && <Wrench className="w-4 h-4" />}
                  {item.type === 'question' && <HelpCircle className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                      {item.title}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {item.snippet || item.subtitle}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
              </button>
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400 mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                No matching results found for "{query}"
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                Try searching by subject name (e.g. Python, Operating Systems), algorithm (Binary Search), or a tool (GPA, Timer).
              </p>

              {/* Recommended Topics */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Popular Educational Topics</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSuggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={s.action}
                      className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>{filtered.length} resources available</span>
          <span>Press Enter or click to navigate</span>
        </div>
      </div>
    </div>
  );
};
