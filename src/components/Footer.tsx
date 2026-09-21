import React from 'react';
import { GraduationCap, ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { ActivePage, ToolId } from '../types';
import { INITIAL_SUBJECTS } from '../data/subjects';
import { STUDENT_TOOLS } from '../data/toolsMeta';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
  onSelectSubject?: (subjectId: string) => void;
  onSelectTool?: (toolId: ToolId) => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActivePage,
  onSelectSubject,
  onSelectTool
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageClick = (page: ActivePage) => {
    setActivePage(page);
    scrollToTop();
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 text-slate-600 dark:text-slate-400 transition-colors mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                Student Study Hub
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-sm">
              An open, student-first educational portal providing verified study notes, interactive quizzes, and practical academic tools for Computer Science, Programming, and Mathematics.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Independent educational initiative &bull; No fake claims</span>
            </div>
          </div>

          {/* Subjects column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Study Subjects
            </h4>
            <ul className="space-y-2 text-sm">
              {INITIAL_SUBJECTS.slice(0, 6).map((sub) => (
                <li key={sub.id}>
                  <button
                    onClick={() => {
                      if (onSelectSubject) onSelectSubject(sub.id);
                      setActivePage('notes');
                      scrollToTop();
                    }}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                  >
                    {sub.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handlePageClick('notes')}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  View all 12 subjects &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Student Tools column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Student Tools
            </h4>
            <ul className="space-y-2 text-sm">
              {STUDENT_TOOLS.map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => {
                      if (onSelectTool) onSelectTool(t.id);
                      setActivePage('tools');
                      scrollToTop();
                    }}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                  >
                    {t.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Legal Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Trust &amp; Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handlePageClick('about')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('contact')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('privacy')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('terms')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Terms of Use
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('disclaimer')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Educational Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('copyright')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Copyright Policy
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Student Study Hub. Built for educational self-study. All calculation approximations are subject to institutional guidelines.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
