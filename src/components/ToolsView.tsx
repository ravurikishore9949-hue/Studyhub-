import React, { useState, useEffect } from 'react';
import { 
  Percent, 
  GraduationCap, 
  UserCheck, 
  Clock, 
  Timer, 
  CalendarCheck, 
  ArrowRightLeft, 
  Calendar,
  Plus,
  Trash2,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Volume2
} from 'lucide-react';
import { STUDENT_TOOLS } from '../data/toolsMeta';
import { ToolId, StudyTask } from '../types';
import { AdPlaceholder } from './AdPlaceholder';

interface ToolsViewProps {
  selectedToolId: ToolId;
  onSelectTool: (id: ToolId) => void;
}

export const ToolsView: React.FC<ToolsViewProps> = ({
  selectedToolId,
  onSelectTool
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Student Academic &amp; Productivity Tools
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Eight verified, client-side academic calculators and productivity tools designed for daily student workflows. No login required.
        </p>
      </div>

      {/* Tool Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
        {STUDENT_TOOLS.map((t) => {
          const isActive = selectedToolId === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onSelectTool(t.id)}
              className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>{t.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tool Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        {selectedToolId === 'percentage' && <PercentageCalculator />}
        {selectedToolId === 'gpa' && <GpaCalculator />}
        {selectedToolId === 'attendance' && <AttendanceCalculator />}
        {selectedToolId === 'pomodoro' && <PomodoroTimer />}
        {selectedToolId === 'study-timer' && <StudyStopwatch />}
        {selectedToolId === 'study-planner' && <StudyPlanner />}
        {selectedToolId === 'unit-converter' && <UnitConverter />}
        {selectedToolId === 'age-calculator' && <AgeCalculator />}
      </div>

      {/* Non-intrusive sponsor ad placeholder */}
      <AdPlaceholder slotType="banner" className="mt-12" />
    </div>
  );
};

/* =========================================================================
   1. PERCENTAGE CALCULATOR
   ========================================================================= */
const PercentageCalculator: React.FC = () => {
  // Mode 1: What is P% of X?
  const [p1, setP1] = useState<number | ''>(15);
  const [x1, setX1] = useState<number | ''>(240);

  // Mode 2: X is what % of Y?
  const [x2, setX2] = useState<number | ''>(45);
  const [y2, setY2] = useState<number | ''>(180);

  // Mode 3: Percentage change from A to B
  const [vOld, setVOld] = useState<number | ''>(80);
  const [vNew, setVNew] = useState<number | ''>(100);

  const res1 = p1 !== '' && x1 !== '' ? (Number(p1) / 100) * Number(x1) : null;
  const res2 = x2 !== '' && y2 !== '' && Number(y2) !== 0 ? (Number(x2) / Number(y2)) * 100 : null;
  const res3 =
    vOld !== '' && vNew !== '' && Number(vOld) !== 0
      ? ((Number(vNew) - Number(vOld)) / Math.abs(Number(vOld))) * 100
      : null;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Percentage Calculator</h2>
        <p className="text-xs text-slate-500 mt-1">
          Perform standard percentage calculations, proportional ratios, and percentage increases/decreases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
              1. Percentage of a Number
            </h3>
            <label className="text-xs text-slate-500 block mb-1">What is (%)</label>
            <input
              type="number"
              value={p1}
              onChange={(e) => setP1(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g. 15"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm mb-3"
            />
            <label className="text-xs text-slate-500 block mb-1">Of number</label>
            <input
              type="number"
              value={x1}
              onChange={(e) => setX1(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g. 240"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
            />
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-500">Result:</span>
            <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
              {res1 !== null ? res1.toLocaleString(undefined, { maximumFractionDigits: 3 }) : '—'}
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
              2. What % is X of Y?
            </h3>
            <label className="text-xs text-slate-500 block mb-1">Value (X)</label>
            <input
              type="number"
              value={x2}
              onChange={(e) => setX2(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g. 45"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm mb-3"
            />
            <label className="text-xs text-slate-500 block mb-1">Is what % of total (Y)</label>
            <input
              type="number"
              value={y2}
              onChange={(e) => setY2(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g. 180"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
            />
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-500">Result:</span>
            <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
              {res2 !== null ? `${res2.toFixed(2)}%` : '—'}
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
              3. Percentage Change
            </h3>
            <label className="text-xs text-slate-500 block mb-1">Initial Value</label>
            <input
              type="number"
              value={vOld}
              onChange={(e) => setVOld(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g. 80"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm mb-3"
            />
            <label className="text-xs text-slate-500 block mb-1">Final Value</label>
            <input
              type="number"
              value={vNew}
              onChange={(e) => setVNew(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g. 100"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
            />
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-500">Change:</span>
            <div className={`text-2xl font-black ${res3 && res3 >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {res3 !== null ? `${res3 > 0 ? '+' : ''}${res3.toFixed(2)}%` : '—'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   2. CGPA & GPA CALCULATOR
   ========================================================================= */
interface CourseItem {
  id: string;
  name: string;
  gradePoint: number;
  credits: number;
}

const GpaCalculator: React.FC = () => {
  const [scale, setScale] = useState<'4.0' | '10.0'>('4.0');
  const [courses, setCourses] = useState<CourseItem[]>([
    { id: '1', name: 'Data Structures & Algorithms', gradePoint: 4.0, credits: 4 },
    { id: '2', name: 'Computer Architecture', gradePoint: 3.7, credits: 3 },
    { id: '3', name: 'Discrete Mathematics', gradePoint: 3.3, credits: 3 },
    { id: '4', name: 'Web Development Lab', gradePoint: 4.0, credits: 2 },
  ]);

  const [priorCgpa, setPriorCgpa] = useState<number | ''>('');
  const [priorCredits, setPriorCredits] = useState<number | ''>('');

  const addCourse = () => {
    setCourses([
      ...courses,
      {
        id: Date.now().toString(),
        name: `Course ${courses.length + 1}`,
        gradePoint: scale === '4.0' ? 3.0 : 8.0,
        credits: 3
      }
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length <= 1) return;
    setCourses(courses.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof CourseItem, val: any) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, [field]: val } : c)));
  };

  // Calculations
  const totalSemesterCredits = courses.reduce((acc, c) => acc + (Number(c.credits) || 0), 0);
  const totalSemesterPoints = courses.reduce(
    (acc, c) => acc + (Number(c.gradePoint) || 0) * (Number(c.credits) || 0),
    0
  );
  const semesterGpa = totalSemesterCredits > 0 ? totalSemesterPoints / totalSemesterCredits : 0;

  // Cumulative CGPA
  let cumulativeCgpa = semesterGpa;
  let cumulativeCredits = totalSemesterCredits;
  if (priorCgpa !== '' && priorCredits !== '' && Number(priorCredits) > 0) {
    const prevPoints = Number(priorCgpa) * Number(priorCredits);
    cumulativeCredits = totalSemesterCredits + Number(priorCredits);
    cumulativeCgpa = (totalSemesterPoints + prevPoints) / cumulativeCredits;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">CGPA &amp; GPA Calculator</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Add your subjects, credit weightages, and grades to calculate semester GPA and cumulative CGPA.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-semibold">
          <span className="text-slate-500 px-2">Scale:</span>
          <button
            onClick={() => setScale('4.0')}
            className={`px-3 py-1 rounded-md transition-colors ${
              scale === '4.0' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-white' : 'text-slate-600'
            }`}
          >
            4.0 Scale
          </button>
          <button
            onClick={() => setScale('10.0')}
            className={`px-3 py-1 rounded-md transition-colors ${
              scale === '10.0' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-white' : 'text-slate-600'
            }`}
          >
            10.0 Scale
          </button>
        </div>
      </div>

      {/* Courses Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 uppercase">
              <th className="py-2.5 px-3">Subject / Course Name</th>
              <th className="py-2.5 px-3 w-32">Grade Points</th>
              <th className="py-2.5 px-3 w-28">Credit Hours</th>
              <th className="py-2.5 px-3 w-16 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="py-2 px-3">
                  <input
                    type="text"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
                  />
                </td>
                <td className="py-2 px-3">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max={scale === '4.0' ? '4.0' : '10.0'}
                    value={course.gradePoint}
                    onChange={(e) => updateCourse(course.id, 'gradePoint', Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
                  />
                </td>
                <td className="py-2 px-3">
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, 'credits', Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
                  />
                </td>
                <td className="py-2 px-3 text-center">
                  <button
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length <= 1}
                    className="p-1.5 rounded-md text-slate-400 hover:text-rose-500 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                    aria-label="Remove Course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={addCourse}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span>Add Subject Row</span>
      </button>

      {/* Prior Cumulative Optional Fields */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
            Prior Cumulative CGPA (Optional)
          </label>
          <input
            type="number"
            step="0.01"
            value={priorCgpa}
            onChange={(e) => setPriorCgpa(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder={`e.g. ${scale === '4.0' ? '3.50' : '8.50'}`}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
            Prior Total Credit Hours (Optional)
          </label>
          <input
            type="number"
            value={priorCredits}
            onChange={(e) => setPriorCredits(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="e.g. 45"
            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
          />
        </div>
      </div>

      {/* Score Summary Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50">
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">
            Semester GPA
          </span>
          <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
            {semesterGpa.toFixed(2)}
          </div>
          <span className="text-[11px] text-slate-500">{totalSemesterCredits} Semester Credits</span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50">
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">
            Cumulative CGPA
          </span>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {cumulativeCgpa.toFixed(2)}
          </div>
          <span className="text-[11px] text-slate-500">{cumulativeCredits} Total Credits</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
            Quality Points
          </span>
          <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
            {totalSemesterPoints.toFixed(1)}
          </div>
          <span className="text-[11px] text-slate-500">Scale: {scale} Max</span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   3. ATTENDANCE PERCENTAGE CALCULATOR
   ========================================================================= */
const AttendanceCalculator: React.FC = () => {
  const [attended, setAttended] = useState<number>(38);
  const [total, setTotal] = useState<number>(48);
  const [target, setTarget] = useState<number>(75);

  const currentPercent = total > 0 ? (attended / total) * 100 : 0;
  const isSatisfied = currentPercent >= target;

  // Needed classes calculation:
  // (attended + x) / (total + x) >= target / 100
  // 100*(attended + x) >= target*(total + x)
  // x*(100 - target) >= target*total - 100*attended
  let neededClasses = 0;
  if (!isSatisfied && target < 100) {
    neededClasses = Math.ceil((target * total - 100 * attended) / (100 - target));
    if (neededClasses < 0) neededClasses = 0;
  }

  // Safe to miss calculation:
  // attended / (total + y) >= target / 100
  // 100*attended >= target*(total + y)
  // target*y <= 100*attended - target*total
  let safeToMiss = 0;
  if (isSatisfied && target > 0) {
    safeToMiss = Math.floor((100 * attended - target * total) / target);
    if (safeToMiss < 0) safeToMiss = 0;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Attendance Percentage Calculator</h2>
        <p className="text-xs text-slate-500 mt-1">
          Calculate your exact current attendance percentage and see how many upcoming classes you must attend or can safely miss.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
            Classes Attended
          </label>
          <input
            type="number"
            min="0"
            value={attended}
            onChange={(e) => setAttended(Math.max(0, Number(e.target.value)))}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
            Total Classes Conducted
          </label>
          <input
            type="number"
            min="1"
            value={total}
            onChange={(e) => setTotal(Math.max(1, Number(e.target.value)))}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
            Target Percentage (%)
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={target}
            onChange={(e) => setTarget(Math.min(100, Math.max(1, Number(e.target.value))))}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
          />
        </div>
      </div>

      {/* Results banner */}
      <div className={`p-6 rounded-2xl border ${
        isSatisfied 
          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
          : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              {isSatisfied ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              )}
              <span className={`text-sm font-bold uppercase tracking-wider ${
                isSatisfied ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'
              }`}>
                {isSatisfied ? 'Attendance Target Met' : 'Short of Target Attendance'}
              </span>
            </div>
            
            <div className="mt-2 text-4xl font-black text-slate-900 dark:text-white">
              {currentPercent.toFixed(1)}%
              <span className="text-sm font-normal text-slate-500 ml-2">
                ({attended} of {total} classes)
              </span>
            </div>
          </div>

          <div className="sm:text-right bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            {isSatisfied ? (
              <div>
                <span className="text-xs text-slate-500 block">Classes you can safely miss:</span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  {safeToMiss} classes
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  while maintaining at least {target}%
                </span>
              </div>
            ) : (
              <div>
                <span className="text-xs text-slate-500 block">Consecutive classes to attend:</span>
                <span className="text-2xl font-black text-rose-600 dark:text-rose-400">
                  {neededClasses} classes
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  without missing to reach {target}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   4. POMODORO TIMER
   ========================================================================= */
const PomodoroTimer: React.FC = () => {
  const [mode, setMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);

  // Web Audio Synth chime
  const playChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch {
      // AudioContext unavailable or blocked by autoplay
    }
  };

  useEffect(() => {
    let interval: any = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      playChime();
      if (mode === 'work') {
        const nextCycle = completedCycles + 1;
        setCompletedCycles(nextCycle);
        if (nextCycle % 4 === 0) {
          setMode('longBreak');
          setTimeLeft(15 * 60);
        } else {
          setMode('shortBreak');
          setTimeLeft(5 * 60);
        }
      } else {
        setMode('work');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, completedCycles]);

  const switchMode = (newMode: 'work' | 'shortBreak' | 'longBreak') => {
    setIsRunning(false);
    setMode(newMode);
    if (newMode === 'work') setTimeLeft(25 * 60);
    if (newMode === 'shortBreak') setTimeLeft(5 * 60);
    if (newMode === 'longBreak') setTimeLeft(15 * 60);
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (mode === 'work') setTimeLeft(25 * 60);
    if (mode === 'shortBreak') setTimeLeft(5 * 60);
    if (mode === 'longBreak') setTimeLeft(15 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Pomodoro Study Timer</h2>
        <p className="text-xs text-slate-500 mt-1">
          25-minute focused study sessions separated by 5-minute restorative breaks.
        </p>
      </div>

      {/* Mode selectors */}
      <div className="flex justify-center gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
        <button
          onClick={() => switchMode('work')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            mode === 'work' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Study (25m)
        </button>
        <button
          onClick={() => switchMode('shortBreak')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            mode === 'shortBreak' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Short Break (5m)
        </button>
        <button
          onClick={() => switchMode('longBreak')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            mode === 'longBreak' ? 'bg-teal-600 text-white shadow' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Long Break (15m)
        </button>
      </div>

      {/* Big Display Clock */}
      <div className="py-8">
        <div className="text-7xl sm:text-8xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div className="mt-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">
          {mode === 'work' ? '🎯 Focus Session' : '☕ Relax & Recharge'}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-transform active:scale-95 ${
            isRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
          <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
        </button>

        <button
          onClick={resetTimer}
          className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Reset Timer"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={playChime}
          className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Test completion chime"
          aria-label="Test completion chime sound"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
        Completed Focus Cycles Today: <span className="font-bold text-indigo-600 dark:text-indigo-400">{completedCycles}</span>
      </div>
    </div>
  );
};

/* =========================================================================
   5. STUDY STOPWATCH & LOGGER
   ========================================================================= */
const StudyStopwatch: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState<{ id: number; time: string; note: string }[]>([]);
  const [currentNote, setCurrentNote] = useState('');

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const recordLap = () => {
    if (seconds === 0) return;
    setLaps([
      { id: Date.now(), time: formatTime(seconds), note: currentNote || 'Study milestone' },
      ...laps
    ]);
    setCurrentNote('');
  };

  const resetAll = () => {
    setIsActive(false);
    setSeconds(0);
    setLaps([]);
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Study Stopwatch &amp; Session Logger</h2>
        <p className="text-xs text-slate-500 mt-1">
          Measure continuous focus time, log milestones, and record time spent per topic.
        </p>
      </div>

      {/* Clock */}
      <div className="text-center py-6">
        <div className="text-6xl sm:text-7xl font-mono font-black text-slate-900 dark:text-white">
          {formatTime(seconds)}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white shadow transition-all ${
            isActive ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'
          }`}
        >
          {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          <span>{isActive ? 'Pause' : 'Start Timer'}</span>
        </button>

        <button
          onClick={recordLap}
          disabled={seconds === 0}
          className="px-4 py-2.5 rounded-xl font-semibold text-xs border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
        >
          Record Lap / Note
        </button>

        <button
          onClick={resetAll}
          className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-500 hover:text-rose-500 transition-colors"
          title="Reset Stopwatch"
          aria-label="Reset Stopwatch"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Note input for next lap */}
      <div className="flex gap-2">
        <input
          type="text"
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          placeholder="Topic or milestone note (e.g. Solved 5 LeetCode problems)..."
          className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
        />
      </div>

      {/* Laps List */}
      {laps.length > 0 && (
        <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 text-xs font-bold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 flex justify-between">
            <span>Recorded Lap</span>
            <span>Elapsed Duration</span>
          </div>
          <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 p-2">
            {laps.map((lap, idx) => (
              <div key={lap.id} className="py-1.5 px-2 flex justify-between items-center text-xs">
                <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[240px]">
                  #{laps.length - idx}: {lap.note}
                </span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {lap.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   6. STUDY PLANNER (Persistent LocalStorage)
   ========================================================================= */
const StudyPlanner: React.FC = () => {
  const [tasks, setTasks] = useState<StudyTask[]>(() => {
    try {
      const saved = localStorage.getItem('study_hub_tasks');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { id: '1', title: 'Review Big-O Complexity and Binary Search', subject: 'Computer Science', dueDate: 'Tomorrow', priority: 'high', completed: true },
      { id: '2', title: 'Complete Database Normalization 3NF Practice', subject: 'Database Management', dueDate: 'Friday', priority: 'medium', completed: false },
      { id: '3', title: 'Solve 10 TCP Handshake practice questions', subject: 'Computer Networks', dueDate: 'Sunday', priority: 'low', completed: false },
    ];
  });

  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Computer Science');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newDate, setNewDate] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    try {
      localStorage.setItem('study_hub_tasks', JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: StudyTask = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      subject: newSubject,
      priority: newPriority,
      dueDate: newDate || 'This Week',
      completed: false
    };

    setTasks([newTask, ...tasks]);
    setNewTitle('');
    setNewDate('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Study Task Planner</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Organize assignments, syllabus readings, and revision deadlines. Saved locally on your device.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-semibold">
          {(['all', 'pending', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-md capitalize transition-colors ${
                filter === tab ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-white' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Add Task Form */}
      <form onSubmit={addTask} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="sm:col-span-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Add a new study task (e.g., Read OS Virtual Memory notes)..."
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
            required
          />
        </div>

        <div>
          <select
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
          >
            <option value="Computer Science">Computer Science</option>
            <option value="Programming">Programming</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="Web Development">Web Development</option>
            <option value="Database Management">Database Management</option>
            <option value="Operating Systems">Operating Systems</option>
            <option value="Computer Networks">Computer Networks</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Mathematics">Mathematics</option>
          </select>
        </div>

        <div className="flex gap-2">
          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value as any)}
            className="px-2 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </form>

      {/* Task List */}
      <div className="space-y-2">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((t) => (
            <div
              key={t.id}
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                t.completed
                  ? 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 opacity-70'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleTask(t.id)}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                />
                <div className="min-w-0">
                  <span className={`text-sm font-semibold block truncate ${
                    t.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'
                  }`}>
                    {t.title}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                    <span>{t.subject}</span>
                    <span>&bull;</span>
                    <span className={`capitalize font-bold ${
                      t.priority === 'high' ? 'text-rose-500' : t.priority === 'medium' ? 'text-amber-500' : 'text-slate-400'
                    }`}>
                      {t.priority}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => deleteTask(t.id)}
                className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors shrink-0"
                aria-label="Delete Task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-xs text-slate-400">
            No study tasks in this view. Add one above to get organized!
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   7. ACADEMIC UNIT CONVERTER
   ========================================================================= */
const UnitConverter: React.FC = () => {
  type Category = 'storage' | 'length' | 'weight' | 'temperature' | 'speed';
  const [category, setCategory] = useState<Category>('storage');
  const [value, setValue] = useState<number>(1024);
  const [fromUnit, setFromUnit] = useState<string>('MB');
  const [toUnit, setToUnit] = useState<string>('GB');

  // Units definitions
  const categoriesConfig: Record<Category, { units: string[]; convert: (val: number, from: string, to: string) => number }> = {
    storage: {
      units: ['Bytes (B)', 'Kilobytes (KB)', 'Megabytes (MB)', 'Gigabytes (GB)', 'Terabytes (TB)'],
      convert: (val, from, to) => {
        const factor: Record<string, number> = {
          'Bytes (B)': 1,
          'Kilobytes (KB)': 1024,
          'Megabytes (MB)': 1024 ** 2,
          'Gigabytes (GB)': 1024 ** 3,
          'Terabytes (TB)': 1024 ** 4,
        };
        const bytes = val * (factor[from] || 1);
        return bytes / (factor[to] || 1);
      }
    },
    length: {
      units: ['Meters (m)', 'Kilometers (km)', 'Miles (mi)', 'Feet (ft)', 'Inches (in)', 'Centimeters (cm)'],
      convert: (val, from, to) => {
        const toMeters: Record<string, number> = {
          'Meters (m)': 1,
          'Kilometers (km)': 1000,
          'Miles (mi)': 1609.344,
          'Feet (ft)': 0.3048,
          'Inches (in)': 0.0254,
          'Centimeters (cm)': 0.01,
        };
        const meters = val * (toMeters[from] || 1);
        return meters / (toMeters[to] || 1);
      }
    },
    weight: {
      units: ['Kilograms (kg)', 'Grams (g)', 'Pounds (lb)', 'Ounces (oz)'],
      convert: (val, from, to) => {
        const toKg: Record<string, number> = {
          'Kilograms (kg)': 1,
          'Grams (g)': 0.001,
          'Pounds (lb)': 0.453592,
          'Ounces (oz)': 0.0283495,
        };
        const kg = val * (toKg[from] || 1);
        return kg / (toKg[to] || 1);
      }
    },
    temperature: {
      units: ['Celsius (°C)', 'Fahrenheit (°F)', 'Kelvin (K)'],
      convert: (val, from, to) => {
        let celsius = val;
        if (from === 'Fahrenheit (°F)') celsius = ((val - 32) * 5) / 9;
        if (from === 'Kelvin (K)') celsius = val - 273.15;

        if (to === 'Celsius (°C)') return celsius;
        if (to === 'Fahrenheit (°F)') return (celsius * 9) / 5 + 32;
        if (to === 'Kelvin (K)') return celsius + 273.15;
        return celsius;
      }
    },
    speed: {
      units: ['Meters per sec (m/s)', 'Kilometers per hour (km/h)', 'Miles per hour (mph)'],
      convert: (val, from, to) => {
        const toMps: Record<string, number> = {
          'Meters per sec (m/s)': 1,
          'Kilometers per hour (km/h)': 1 / 3.6,
          'Miles per hour (mph)': 0.44704,
        };
        const mps = val * (toMps[from] || 1);
        return mps / (toMps[to] || 1);
      }
    }
  };

  // Sync units when category switches
  useEffect(() => {
    const list = categoriesConfig[category].units;
    setFromUnit(list[0]);
    setToUnit(list[1] || list[0]);
  }, [category]);

  const convertedValue = categoriesConfig[category].convert(value, fromUnit, toUnit);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Academic Unit Converter</h2>
        <p className="text-xs text-slate-500 mt-1">
          High-precision conversion for Computer Science data storage, physics lengths, weights, and temperatures.
        </p>
      </div>

      {/* Category selector */}
      <div className="flex flex-wrap justify-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
        {(['storage', 'length', 'weight', 'temperature', 'speed'] as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
              category === cat ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Input / Output Card */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
              From Value
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full mt-2 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
            >
              {categoriesConfig[category].units.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
              To Converted Unit
            </label>
            <div className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-black text-indigo-600 dark:text-indigo-400 truncate">
              {Number.isFinite(convertedValue) ? convertedValue.toLocaleString(undefined, { maximumFractionDigits: 6 }) : '—'}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full mt-2 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
            >
              {categoriesConfig[category].units.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 font-mono">
          {value} {fromUnit} = <span className="font-bold text-slate-900 dark:text-white">{convertedValue.toLocaleString(undefined, { maximumFractionDigits: 6 })} {toUnit}</span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   8. AGE & MILESTONE CALCULATOR
   ========================================================================= */
const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('2004-05-15');
  const [targetDate, setTargetDate] = useState(() => new Date().toISOString().split('T')[0]);

  const computeAge = () => {
    if (!birthDate) return null;
    const b = new Date(birthDate);
    const t = new Date(targetDate || new Date());
    if (isNaN(b.getTime()) || isNaN(t.getTime()) || t < b) return null;

    let years = t.getFullYear() - b.getFullYear();
    let months = t.getMonth() - b.getMonth();
    let days = t.getDate() - b.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(t.getFullYear(), t.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffMs = t.getTime() - b.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));

    // Next birthday calculation
    const nextBday = new Date(t.getFullYear(), b.getMonth(), b.getDate());
    if (nextBday < t) {
      nextBday.setFullYear(t.getFullYear() + 1);
    }
    const daysToNext = Math.ceil((nextBday.getTime() - t.getTime()) / (1000 * 60 * 60 * 24));

    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][b.getDay()];

    return { years, months, days, totalDays, totalHours, daysToNext, dayOfWeek };
  };

  const results = computeAge();

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Age &amp; Milestone Calculator</h2>
        <p className="text-xs text-slate-500 mt-1">
          Compute precise age breakdown, total elapsed days, birth weekday, and next birthday countdown.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
            Target / Current Date
          </label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold"
          />
        </div>
      </div>

      {results ? (
        <div className="p-6 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-4">
          <div className="text-center">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
              Exact Age
            </span>
            <div className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
              {results.years} Years, {results.months} Months, {results.days} Days
            </div>
            <span className="text-xs text-slate-500 mt-1 block">
              Born on a <strong className="text-slate-700 dark:text-slate-300">{results.dayOfWeek}</strong>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-indigo-100 dark:border-indigo-900/60 text-center">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl">
              <span className="text-[11px] text-slate-500 block">Total Days Lived</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {results.totalDays.toLocaleString()}
              </span>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl">
              <span className="text-[11px] text-slate-500 block">Total Hours</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {results.totalHours.toLocaleString()}
              </span>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl">
              <span className="text-[11px] text-slate-500 block">Next Birthday</span>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                {results.daysToNext} days
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center text-xs text-rose-500 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900">
          Target date must be equal to or after the birth date.
        </div>
      )}
    </div>
  );
};
