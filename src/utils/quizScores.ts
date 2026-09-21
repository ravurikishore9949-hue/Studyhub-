import { QuizAttemptRecord, SubjectHighScore, QuizDifficulty } from '../types';

const STORAGE_KEY = 'study_hub_quiz_scores_history';

/**
 * Load all recorded quiz attempts from localStorage
 */
export function getQuizHistory(): QuizAttemptRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (error) {
    console.error('Failed to load quiz scores from localStorage:', error);
    return [];
  }
}

/**
 * Save a new quiz attempt and determine whether it achieved a new high score
 */
export function saveQuizAttempt(data: {
  subjectId: string;
  subjectName: string;
  difficulty: QuizDifficulty;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpentSeconds?: number;
}): {
  record: QuizAttemptRecord;
  isNewHighScore: boolean;
  isFirstAttempt: boolean;
  previousBestPercentage: number | null;
} {
  const existingHistory = getQuizHistory();

  // Find previous attempts for this same subject and difficulty (or same subject)
  const matchingAttempts = existingHistory.filter(
    (h) => h.subjectId === data.subjectId && (h.difficulty === data.difficulty || data.difficulty === 'all')
  );

  let isFirstAttempt = matchingAttempts.length === 0;
  let previousBestPercentage: number | null = null;
  let isNewHighScore = false;

  if (matchingAttempts.length > 0) {
    previousBestPercentage = Math.max(...matchingAttempts.map((a) => a.percentage));
    isNewHighScore = data.percentage > previousBestPercentage;
  } else {
    // If it's the first attempt and scored at least 50%, count it as an initial high score
    isNewHighScore = data.percentage >= 50;
  }

  const now = new Date();
  const dateFormatted = now.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const record: QuizAttemptRecord = {
    id: `quiz_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
    dateFormatted,
    subjectId: data.subjectId,
    subjectName: data.subjectName,
    difficulty: data.difficulty,
    score: data.score,
    totalQuestions: data.totalQuestions,
    percentage: data.percentage,
    timeSpentSeconds: data.timeSpentSeconds,
  };

  const updatedHistory = [record, ...existingHistory];

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Failed to save quiz attempt to localStorage:', error);
  }

  return {
    record,
    isNewHighScore,
    isFirstAttempt,
    previousBestPercentage,
  };
}

/**
 * Delete a specific attempt from localStorage
 */
export function deleteQuizAttempt(id: string): QuizAttemptRecord[] {
  const existing = getQuizHistory();
  const updated = existing.filter((item) => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to delete quiz attempt:', error);
  }
  return updated;
}

/**
 * Clear all quiz history from localStorage
 */
export function clearQuizHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear quiz history:', error);
  }
}

/**
 * Compute the high score for each distinct subject
 */
export function getSubjectHighScores(history?: QuizAttemptRecord[]): SubjectHighScore[] {
  const records = history ?? getQuizHistory();
  const subjectMap = new Map<string, SubjectHighScore>();

  for (const record of records) {
    const existing = subjectMap.get(record.subjectId);
    if (!existing) {
      subjectMap.set(record.subjectId, {
        subjectId: record.subjectId,
        subjectName: record.subjectName,
        bestScore: record.score,
        bestTotal: record.totalQuestions,
        bestPercentage: record.percentage,
        attemptsCount: 1,
        lastAttemptTimestamp: record.timestamp,
      });
    } else {
      existing.attemptsCount += 1;
      if (record.timestamp > existing.lastAttemptTimestamp) {
        existing.lastAttemptTimestamp = record.timestamp;
      }
      if (
        record.percentage > existing.bestPercentage ||
        (record.percentage === existing.bestPercentage && record.score > existing.bestScore)
      ) {
        existing.bestScore = record.score;
        existing.bestTotal = record.totalQuestions;
        existing.bestPercentage = record.percentage;
      }
    }
  }

  return Array.from(subjectMap.values()).sort((a, b) => b.bestPercentage - a.bestPercentage);
}

/**
 * Compute aggregate statistics across all quiz attempts
 */
export function getOverallStats(history?: QuizAttemptRecord[]) {
  const records = history ?? getQuizHistory();
  if (records.length === 0) {
    return {
      totalAttempts: 0,
      averagePercentage: 0,
      highestScorePercentage: 0,
      totalPassed: 0,
      passRate: 0,
      favoriteSubject: 'None yet',
    };
  }

  const totalAttempts = records.length;
  const sumPercentage = records.reduce((acc, r) => acc + r.percentage, 0);
  const averagePercentage = Math.round(sumPercentage / totalAttempts);
  const highestScorePercentage = Math.max(...records.map((r) => r.percentage));
  const totalPassed = records.filter((r) => r.percentage >= 70).length;
  const passRate = Math.round((totalPassed / totalAttempts) * 100);

  // Determine most practiced subject
  const counts: Record<string, { name: string; count: number }> = {};
  for (const r of records) {
    if (!counts[r.subjectId]) {
      counts[r.subjectId] = { name: r.subjectName, count: 0 };
    }
    counts[r.subjectId].count += 1;
  }

  const topSubject = Object.values(counts).sort((a, b) => b.count - a.count)[0]?.name || 'Computer Science';

  return {
    totalAttempts,
    averagePercentage,
    highestScorePercentage,
    totalPassed,
    passRate,
    favoriteSubject: topSubject,
  };
}
