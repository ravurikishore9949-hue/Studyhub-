import React, { useState, useMemo, useEffect } from 'react';
import { 
  CheckSquare, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  Trophy, 
  HelpCircle,
  Filter,
  ArrowRight,
  BookOpen,
  Award,
  BarChart2,
  Star,
  Clock,
  ChevronRight
} from 'lucide-react';
import { QuizQuestion, QuizDifficulty, SubjectId, QuizAttemptRecord, SubjectHighScore } from '../types';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import { INITIAL_SUBJECTS } from '../data/subjects';
import { AdPlaceholder } from './AdPlaceholder';
import { QuizHighScores } from './QuizHighScores';
import { 
  getQuizHistory, 
  saveQuizAttempt, 
  deleteQuizAttempt, 
  clearQuizHistory, 
  getSubjectHighScores 
} from '../utils/quizScores';

interface QuizViewProps {
  initialSubjectId?: string;
  initialTab?: 'quiz' | 'highscores';
  onNavigateToNotes?: (subjectId: string) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  initialSubjectId,
  initialTab = 'quiz',
  onNavigateToNotes
}) => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'highscores'>(initialTab);
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubjectId || 'all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuizDifficulty>('all');

  // Stored Local High Scores State
  const [history, setHistory] = useState<QuizAttemptRecord[]>(() => getQuizHistory());
  const [subjectHighScores, setSubjectHighScores] = useState<SubjectHighScore[]>(() => getSubjectHighScores());

  // Quiz Timing & High Score Announcement State
  const [quizStartTime, setQuizStartTime] = useState<number>(Date.now());
  const [completionMeta, setCompletionMeta] = useState<{
    isNewHighScore: boolean;
    isFirstAttempt: boolean;
    previousBestPercentage: number | null;
    timeSpentSeconds: number;
  } | null>(null);

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return QUIZ_QUESTIONS.filter((q) => {
      if (selectedSubject !== 'all' && q.subjectId !== selectedSubject) return false;
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [selectedSubject, selectedDifficulty]);

  // Quiz state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Synchronize initialSubjectId prop if changed externally
  useEffect(() => {
    if (initialSubjectId) {
      setSelectedSubject(initialSubjectId);
      handleRetry();
    }
  }, [initialSubjectId]);

  const currentQ = filteredQuestions[currentIndex];

  // Best score for the currently active subject
  const currentSubjectHighScore = useMemo(() => {
    return subjectHighScores.find((s) => s.subjectId === selectedSubject);
  }, [subjectHighScores, selectedSubject]);

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: idx }));
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      // Final question answered - calculate and record score
      const finalCorrect = Object.entries(userAnswers).filter(([qIdx, answerIdx]) => {
        const question = filteredQuestions[Number(qIdx)];
        return question && question.correctIndex === answerIdx;
      }).length;

      const finalPercent = filteredQuestions.length > 0 ? Math.round((finalCorrect / filteredQuestions.length) * 100) : 0;
      const elapsedSeconds = Math.max(1, Math.round((Date.now() - quizStartTime) / 1000));
      const subjectName = selectedSubject === 'all'
        ? 'All Subjects Combined'
        : (INITIAL_SUBJECTS.find((s) => s.id === selectedSubject)?.name || selectedSubject);

      const savedResult = saveQuizAttempt({
        subjectId: selectedSubject,
        subjectName,
        difficulty: selectedDifficulty,
        score: finalCorrect,
        totalQuestions: filteredQuestions.length,
        percentage: finalPercent,
        timeSpentSeconds: elapsedSeconds,
      });

      setCompletionMeta({
        isNewHighScore: savedResult.isNewHighScore,
        isFirstAttempt: savedResult.isFirstAttempt,
        previousBestPercentage: savedResult.previousBestPercentage,
        timeSpentSeconds: elapsedSeconds,
      });

      // Refresh stored state
      const updatedHistory = getQuizHistory();
      setHistory(updatedHistory);
      setSubjectHighScores(getSubjectHighScores(updatedHistory));
      setIsCompleted(true);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setUserAnswers({});
    setIsCompleted(false);
    setCompletionMeta(null);
    setQuizStartTime(Date.now());
  };

  const handleDeleteAttempt = (id: string) => {
    const updated = deleteQuizAttempt(id);
    setHistory(updated);
    setSubjectHighScores(getSubjectHighScores(updated));
  };

  const handleClearHistory = () => {
    clearQuizHistory();
    setHistory([]);
    setSubjectHighScores([]);
  };

  const handleLaunchSubjectQuiz = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setSelectedDifficulty('all');
    handleRetry();
    setActiveTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate current score
  const correctCount = Object.entries(userAnswers).filter(([qIdx, answerIdx]) => {
    const question = filteredQuestions[Number(qIdx)];
    return question && question.correctIndex === answerIdx;
  }).length;

  const totalAnswered = Object.keys(userAnswers).length;
  const scorePercent = filteredQuestions.length > 0 ? Math.round((correctCount / filteredQuestions.length) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Interactive Knowledge Testing
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
          Subject Practice Quizzes
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Reinforce conceptual understanding with real-time feedback, detailed explanations, and local high score progress tracking.
        </p>
      </div>

      {/* Main Mode Navigation Tabs (Take Quiz vs High Scores) */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-inner">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'quiz'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Practice Quiz</span>
          </button>

          <button
            onClick={() => setActiveTab('highscores')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'highscores'
                ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>High Scores &amp; Progress</span>
            {history.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                {history.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content depending on Active Tab */}
      {activeTab === 'highscores' ? (
        /* High Scores View */
        <QuizHighScores
          history={history}
          subjectHighScores={subjectHighScores}
          onDeleteAttempt={handleDeleteAttempt}
          onClearHistory={handleClearHistory}
          onSelectSubjectToQuiz={handleLaunchSubjectQuiz}
        />
      ) : (
        /* Quiz Practice View */
        <div className="space-y-6">
          {/* Filters (Subject & Difficulty) & High Score Banner */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Subject Filter */}
              <div className="w-full sm:w-1/2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                  Filter by Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => {
                    setSelectedSubject(e.target.value);
                    handleRetry();
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Subjects Combined ({QUIZ_QUESTIONS.length} Questions)</option>
                  {INITIAL_SUBJECTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div className="w-full sm:w-auto">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                  Difficulty Level
                </label>
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                  {(['all', 'beginner', 'intermediate', 'advanced'] as QuizDifficulty[]).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => {
                        setSelectedDifficulty(diff);
                        handleRetry();
                      }}
                      className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                        selectedDifficulty === diff
                          ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Subject High Score Status Pill */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between text-xs gap-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                {currentSubjectHighScore ? (
                  <span className="text-slate-700 dark:text-slate-300">
                    Your Personal Best:{' '}
                    <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                      {currentSubjectHighScore.bestPercentage}%
                    </strong>{' '}
                    ({currentSubjectHighScore.bestScore}/{currentSubjectHighScore.bestTotal} correct) across{' '}
                    <span className="font-semibold text-slate-500">
                      {currentSubjectHighScore.attemptsCount} {currentSubjectHighScore.attemptsCount === 1 ? 'attempt' : 'attempts'}
                    </span>
                  </span>
                ) : (
                  <span className="text-slate-500">
                    No recorded attempts for this subject yet. Complete this quiz to set your first high score!
                  </span>
                )}
              </div>

              <button
                onClick={() => setActiveTab('highscores')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 ml-auto"
              >
                <span>View Full Leaderboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {filteredQuestions.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                No questions match this filter combination.
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Try switching the difficulty to "All" or select a different subject.
              </p>
              <button
                onClick={() => {
                  setSelectedSubject('all');
                  setSelectedDifficulty('all');
                  handleRetry();
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : isCompleted ? (
            /* Quiz Finished Summary Card */
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-center space-y-6 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto">
                <Trophy className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Quiz Completed &amp; Saved to Local Storage
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Your Final Score: {scorePercent}%
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  You answered <strong className="text-emerald-600 dark:text-emerald-400">{correctCount}</strong> out of{' '}
                  <strong>{filteredQuestions.length}</strong> questions correctly in{' '}
                  <strong>{completionMeta?.timeSpentSeconds || 0}s</strong>.
                </p>
              </div>

              {/* High Score Celebration Banner */}
              {completionMeta?.isNewHighScore && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 dark:from-amber-950/40 dark:via-amber-900/30 dark:to-amber-950/40 border border-amber-300 dark:border-amber-700/80 text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-sm">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-300">
                          {completionMeta.isFirstAttempt ? 'First High Score Recorded!' : 'New Personal Best Score!'}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 text-[10px] font-bold">
                          High Score
                        </span>
                      </div>
                      <p className="text-xs text-amber-800/90 dark:text-amber-300/90 mt-0.5">
                        {completionMeta.previousBestPercentage !== null
                          ? `Awesome progress! You surpassed your previous high of ${completionMeta.previousBestPercentage}% by +${scorePercent - completionMeta.previousBestPercentage}%!`
                          : `Great job! Your inaugural score of ${scorePercent}% is now your personal record for this topic.`}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('highscores')}
                    className="shrink-0 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm transition-colors"
                  >
                    View All High Scores
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleRetry}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retry Quiz</span>
                </button>

                <button
                  onClick={() => setActiveTab('highscores')}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-amber-300 dark:border-amber-700/80 bg-amber-50/50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-amber-900 dark:text-amber-200 font-bold text-sm transition-colors"
                >
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>High Scores &amp; History</span>
                </button>

                {onNavigateToNotes && selectedSubject !== 'all' && (
                  <button
                    onClick={() => onNavigateToNotes(selectedSubject)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Review Study Notes</span>
                  </button>
                )}
              </div>

              {/* Detailed Question Review List */}
              <div className="pt-8 border-t border-slate-100 dark:border-slate-800 text-left space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Question Review &amp; Explanations
                </h3>

                {filteredQuestions.map((q, idx) => {
                  const userChoice = userAnswers[idx];
                  const isCorrect = userChoice === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border ${
                        isCorrect
                          ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                          : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {idx + 1}. {q.question}
                        </p>
                        {isCorrect ? (
                          <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 shrink-0">
                            <CheckCircle2 className="w-4 h-4" /> Correct
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-bold text-rose-600 shrink-0">
                            <XCircle className="w-4 h-4" /> Incorrect
                          </span>
                        )}
                      </div>

                      <div className="mt-2 text-xs space-y-1">
                        <div className="text-slate-600 dark:text-slate-300">
                          Your answer:{' '}
                          <strong className={isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}>
                            {userChoice !== undefined ? q.options[userChoice] : 'Skipped'}
                          </strong>
                        </div>
                        {!isCorrect && (
                          <div className="text-emerald-700 dark:text-emerald-400 font-semibold">
                            Correct answer: {q.options[q.correctIndex]}
                          </div>
                        )}
                        <p className="text-slate-500 dark:text-slate-400 italic pt-1">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Active Quiz Question Card */
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
              {/* Progress Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>
                    Question {currentIndex + 1} of {filteredQuestions.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="capitalize px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold">
                      {currentQ.difficulty}
                    </span>
                    <span>
                      Current Score: {correctCount} / {totalAnswered}
                    </span>
                  </div>
                </div>

                {/* Visual Progress Bar */}
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
                    style={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                  {currentQ.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;

                  let btnStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200';
                  
                  if (hasAnswered) {
                    if (isCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 font-bold';
                    } else {
                      btnStyle = 'border-slate-200 dark:border-slate-800 opacity-50 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={hasAnswered}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>

                      {hasAnswered && (
                        <div className="shrink-0">
                          {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
                          {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instant Feedback Drawer */}
              {hasAnswered && (
                <div className={`p-4 rounded-xl border animate-in fade-in duration-200 space-y-2 ${
                  selectedOption === currentQ.correctIndex
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                    : 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'
                }`}>
                  <div className="flex items-center gap-2">
                    {selectedOption === currentQ.correctIndex ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600" />
                    )}
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                      selectedOption === currentQ.correctIndex ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'
                    }`}>
                      {selectedOption === currentQ.correctIndex ? 'Correct Answer!' : 'Incorrect'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong>Explanation:</strong> {currentQ.explanation}
                  </p>
                </div>
              )}

              {/* Controls Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={handleRetry}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Quiz</span>
                </button>

                {hasAnswered && (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow transition-colors"
                  >
                    <span>{currentIndex < filteredQuestions.length - 1 ? 'Next Question' : 'View Results & Save Score'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Compliant Ad placeholder */}
      <AdPlaceholder slotType="banner" />
    </div>
  );
};
