import React, { useState, useEffect } from 'react';
import { ActivePage, ToolId, SubjectId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { StudyNotesView } from './components/StudyNotesView';
import { QuizView } from './components/QuizView';
import { ToolsView } from './components/ToolsView';
import { LegalView } from './components/LegalView';
import { SearchBarModal } from './components/SearchBar';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('cs');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('cs-big-o');
  const [selectedToolId, setSelectedToolId] = useState<ToolId>('percentage');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
    setActivePage('notes');
  };

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setActivePage('notes');
  };

  const handleSelectTool = (toolId: ToolId) => {
    setSelectedToolId(toolId);
    setActivePage('tools');
  };

  const handleNavigateQuizForSubject = (subjectId: SubjectId) => {
    setSelectedSubjectId(subjectId);
    setActivePage('quizzes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        darkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomeView
            onNavigatePage={(page) => {
              setActivePage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
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
              setActivePage('notes');
              window.scrollTo({ top: 0, behavior: 'smooth' });
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
          activePage === 'disclaimer' ||
          activePage === 'copyright') && (
          <LegalView
            pageKey={activePage}
            onNavigatePage={(page) => {
              setActivePage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer with rich navigation, subject links, and legal disclosures */}
      <Footer
        setActivePage={setActivePage}
        onSelectSubject={handleSelectSubject}
        onSelectTool={handleSelectTool}
      />

      {/* Quick Site-Wide Search Modal */}
      <SearchBarModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTopic={handleSelectTopic}
        onSelectSubject={handleSelectSubject}
        onSelectTool={handleSelectTool}
        onNavigatePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
