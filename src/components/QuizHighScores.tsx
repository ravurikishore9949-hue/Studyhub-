import React, { useState } from 'react';
import {
  Trophy,
  Award,
  TrendingUp,
  Clock,
  Trash2,
  RotateCcw,
  CheckCircle2,
  BookOpen,
  Calendar,
  Filter,
  BarChart2,
  ChevronRight,
  Flame,
  Star
} from 'lucide-react';
import { QuizAttemptRecord, SubjectHighScore, QuizDifficulty } from '../types';
import { INITIAL_SUBJECTS } from '../data/subjects';

interface QuizHighScoresProps {
  history: QuizAttemptRecord[];
  subjectHighScores: SubjectHighScore[];
  onDeleteAttempt: (id: string) => void;
  onClearHistory: () => void;
  onSelectSubjectToQuiz: (subjectId: string) => void;
  onClose?: () => void;
}

export const QuizHighScores: React.FC<QuizHighScoresProps> = ({
  history,
  subjectHighScores,
  onDeleteAttempt,
  onClearHistory,
  onSelectSubjectToQuiz,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'history'>('leaderboard');
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [confirmClear, setConfirmClear] = useState(false);

  // Overall aggregate stats
  const totalAttempts = history.length;
  const highestPercentage = history.length > 0 ? Math.max(...history.map((h) => h.percentage)) : 0;
  const averagePercentage =
    history.length > 0 ? Math.round(history.reduce((sum, h) => sum + h.percentage, 0) / history.length) : 0;
  const passedCount = history.filter((h) => h.percentage >= 70).length;
  const passRate = totalAttempts > 0 ? Math.round((passedCount / totalAttempts) * 100) : 0;

  // Filtered history
  const filteredHistory = history.filter((item) => {
    if (filterSubject !== 'all' && item.subjectId !== filterSubject) return false;
    if (filterDifficulty !== 'all' && item.difficulty !== filterDifficulty) return false;
    return true;
  });

  const getScoreColor = (percent: number) => {
    if (percent >= 90) return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800';
    if (percent >= 70) return 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800';
    if (percent >= 50) return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800';
    return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800';
  };

  return (
    <div className="space-y-6">
      {/* Top Stat Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Quizzes */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Quizzes Taken
            </span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
              {totalAttempts}
            </span>
          </div>
        </div>

        {/* Highest Score */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Personal Best
            </span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
              {totalAttempts > 0 ? `${highestPercentage}%` : '—'}
            </span>
          </div>
        </div>

        {/* Average Score */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Average Score
            </span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
              {totalAttempts > 0 ? `${averagePercentage}%` : '—'}
            </span>
          </div>
        </div>

        {/* Pass Rate */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Pass Rate (≥70%)
            </span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
              {totalAttempts > 0 ? `${passRate}%` : '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
              activeTab === 'leaderboard'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Subject High Scores ({subjectHighScores.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
              activeTab === 'history'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Attempt History ({history.length})</span>
          </button>
        </div>

        {totalAttempts > 0 && (
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {confirmClear ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-rose-600 font-bold">Clear all history?</span>
                <button
                  onClick={() => {
                    onClearHistory();
                    setConfirmClear(false);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setConfirmClear(false)}
                  className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmClear(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-800 hover:text-rose-600 text-slate-500 text-xs font-semibold transition-colors"
                title="Clear all stored quiz history from local storage"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset History</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Tab 1: Subject High Scores Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-4">
          {subjectHighScores.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center mx-auto">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No Quiz Records Yet
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Take a practice quiz on any subject to record your first high score. Your results are automatically saved in local storage!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {subjectHighScores.map((shs, idx) => {
                const subMeta = INITIAL_SUBJECTS.find((s) => s.id === shs.subjectId);
                const isTopThree = idx < 3;
                const medalColors = [
                  'text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700',
                  'text-slate-400 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700',
                  'text-amber-700 bg-amber-100/60 dark:bg-amber-950/40 border-amber-400 dark:border-amber-800',
                ];

                return (
                  <div
                    key={shs.subjectId}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          {isTopThree ? (
                            <span
                              className={`w-6 h-6 rounded-full border text-xs font-extrabold flex items-center justify-center shrink-0 ${medalColors[idx]}`}
                            >
                              {idx + 1}
                            </span>
                          ) : (
                            <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-bold flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                          )}
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                            {shs.subjectName}
                          </h4>
                        </div>

                        <span
                          className={`px-2.5 py-1 rounded-xl text-xs font-extrabold border shrink-0 ${getScoreColor(
                            shs.bestPercentage
                          )}`}
                        >
                          {shs.bestPercentage}%
                        </span>
                      </div>

                      {/* Progress meter */}
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-3 mb-2">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            shs.bestPercentage >= 80
                              ? 'bg-emerald-500'
                              : shs.bestPercentage >= 60
                              ? 'bg-indigo-500'
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${shs.bestPercentage}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                        <span>
                          Best: {shs.bestScore} / {shs.bestTotal} correct
                        </span>
                        <span>{shs.attemptsCount} {shs.attemptsCount === 1 ? 'attempt' : 'attempts'}</span>
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">
                        Last tested {new Date(shs.lastAttemptTimestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                      <button
                        onClick={() => onSelectSubjectToQuiz(shs.subjectId)}
                        className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                      >
                        <span>Improve Score</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Full Attempt History List */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {/* History Filters */}
          <div className="flex flex-wrap items-center gap-3 p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 text-slate-500 font-bold">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </div>

            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">All Subjects</option>
              {INITIAL_SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500 capitalize"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <span className="ml-auto text-slate-400 font-medium">
              Showing {filteredHistory.length} of {history.length} attempts
            </span>
          </div>

          {filteredHistory.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <p className="text-xs font-semibold text-slate-500">
                No quiz attempts match the selected filter criteria.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              {filteredHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {item.subjectName}
                      </h4>
                      <span className="capitalize text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {item.difficulty}
                      </span>
                      {item.percentage === 100 && (
                        <span className="flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          Perfect Score!
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.dateFormatted}
                      </span>
                      {item.timeSpentSeconds && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {Math.round(item.timeSpentSeconds)}s
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto shrink-0">
                    <div className="text-right">
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold border ${getScoreColor(
                          item.percentage
                        )}`}
                      >
                        <span>{item.score} / {item.totalQuestions}</span>
                        <span>({item.percentage}%)</span>
                      </div>
                      <span className="block text-[10px] text-slate-400 mt-0.5">
                        {item.percentage >= 70 ? 'Passed' : 'Needs Practice'}
                      </span>
                    </div>

                    <button
                      onClick={() => onDeleteAttempt(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                      title="Delete attempt record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
