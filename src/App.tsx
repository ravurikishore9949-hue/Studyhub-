import React, { useState, useEffect, useCallback } from 'react';
import { ActivePage, ToolId, SubjectId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { StudyNotesView } from './components/StudyNotesView';
import { QuizView } from './components/QuizView';
import { ToolsView } from './components/ToolsView';
import { LegalView } from './components/LegalView';
import { SearchBarModal } from './components/SearchBar';
import { CookieBanner } from './components/CookieBanner';

export default function App() {
  // Helper to parse page from URL hash or path
  const getPageFromUrl = useCallback((): ActivePage => {
    try {
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
      const path = window.location.pathname.replace(/^\//, '').toLowerCase().trim();
      const target = hash || path;

      if (target === 'cookies' || target === 'cookie-policy' || target === 'cookie') return 'cookies';
      if (target === 'terms' || target === 'terms-of-use' || target === 'tos') return 'terms';
      if (target === 'privacy' || target === 'privacy-policy') return 'privacy';
      if (target === 'disclaimer' || target === 'disclaimers') return 'disclaimer';
      if (target === 'contact' || target === 'contact-us') return 'contact';
      if (target === 'about' || target === 'about-us') return 'about';
      if (target === 'copyright' || target === 'dmca') return 'copyright';
      if (target === 'notes' || target === 'study-notes') return 'notes';
      if (target === 'quizzes' || target === 'quiz') return 'quizzes';
      if (target === 'tools' || target === 'calculators') return 'tools';
    } catch {
      // ignore
    }
    return 'home';
  }, []);

  const [activePage, setActivePage] = useState<ActivePage>(() => getPageFromUrl());
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('cs');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('cs-big-o');
  const [selectedToolId, setSelectedToolId] = useState<ToolId>('percentage');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync state with URL hash
  const navigateToPage = useCallback((page: ActivePage) => {
    setActivePage(page);
    try {
      const newHash = page === 'home' ? '' : `#${page}`;
      if (window.location.hash !== newHash) {
        window.history.pushState(null, '', newHash || window.location.pathname);
      }
    } catch {
      // fallback
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen for browser forward/back or hash changes
  useEffect(() => {
    const handleUrlChange = () => {
      const page = getPageFromUrl();
      setActivePage(page);
    };

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, [getPageFromUrl]);

  // Update dynamic document title for SEO & compliance clarity
  useEffect(() => {
    const titleMap: Partial<Record<ActivePage, string>> = {
      home: 'Student Study Hub – Free Educational Notes, Quizzes & Tools',
      notes: 'Study Notes & Guides – Student Study Hub',
      quizzes: 'Practice Quizzes & Assessments – Student Study Hub',
      tools: 'Academic & GPA Calculators – Student Study Hub',
      about: 'About Us – Student Study Hub',
      contact: 'Contact Us – Student Study Hub',
      privacy: 'Privacy Policy – Student Study Hub',
      terms: 'Terms of Use – Student Study Hub',
      cookies: 'Cookie Policy – Student Study Hub',
      disclaimer: 'Educational Disclaimer – Student Study Hub',
      copyright: 'Copyright & Content Policy – Student Study Hub',
    };

    document.title = titleMap[activePage] || 'Student Study Hub';
  }, [activePage]);

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('study_hub_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('study_hub_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('study_hub_theme', 'light');
    }
  }, [isDarkMode]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectSubject = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    navigateToPage('notes');
  };

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    navigateToPage('notes');
  };

  const handleSelectTool = (toolId: ToolId) => {
    setSelectedToolId(toolId);
    navigateToPage('tools');
  };

  const handleNavigateQuizForSubject = (subjectId: SubjectId) => {
    setSelectedSubjectId(subjectId);
    navigateToPage('quizzes');
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={navigateToPage}
        darkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomeView
            onNavigatePage={navigateToPage}
            onSelectSubject={handleSelectSubject}
            onSelectTopic={handleSelectTopic}
            onSelectTool={handleSelectTool}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        )}

        {activePage === 'notes' && (
          <StudyNotesView
            selectedSubjectId={selectedSubjectId}
            selectedTopicId={selectedTopicId}
            onSelectSubject={setSelectedSubjectId}
            onSelectTopic={setSelectedTopicId}
            onNavigateQuizForSubject={handleNavigateQuizForSubject}
          />
        )}

        {activePage === 'quizzes' && (
          <QuizView
            initialSubjectId={selectedSubjectId}
            onNavigateToNotes={(subId) => {
              setSelectedSubjectId(subId);
              navigateToPage('notes');
            }}
          />
        )}

        {activePage === 'tools' && (
          <ToolsView
            selectedToolId={selectedToolId}
            onSelectTool={setSelectedToolId}
          />
        )}

        {(activePage === 'about' ||
          activePage === 'contact' ||
          activePage === 'privacy' ||
          activePage === 'terms' ||
          activePage === 'cookies' ||
          activePage === 'disclaimer' ||
          activePage === 'copyright') && (
          <LegalView
            pageKey={activePage}
            onNavigatePage={navigateToPage}
          />
        )}
      </main>

      {/* Footer with rich navigation, subject links, and legal disclosures */}
      <Footer
        setActivePage={navigateToPage}
        onSelectSubject={handleSelectSubject}
        onSelectTool={handleSelectTool}
      />

      {/* Non-intrusive Cookie Consent Banner */}
      <CookieBanner onNavigatePage={navigateToPage} />

      {/* Quick Site-Wide Search Modal */}
      <SearchBarModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTopic={handleSelectTopic}
        onSelectSubject={handleSelectSubject}
        onSelectTool={handleSelectTool}
        onNavigatePage={navigateToPage}
      />
    </div>
  );
}
