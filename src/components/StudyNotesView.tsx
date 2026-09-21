import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Copy, 
  Check, 
  Sparkles,
  ArrowRight,
  PlusCircle,
  FolderPlus,
  Layers,
  ChevronDown
} from 'lucide-react';
import { Subject, StudyTopic, SubjectId } from '../types';
import { INITIAL_SUBJECTS, subjectRegistry } from '../data/subjects';
import { STUDY_TOPICS } from '../data/studyNotes';
import { AdPlaceholder } from './AdPlaceholder';

interface StudyNotesViewProps {
  selectedSubjectId: string;
  selectedTopicId: string;
  onSelectSubject: (id: string) => void;
  onSelectTopic: (id: string) => void;
  onNavigateQuizForSubject?: (id: SubjectId) => void;
}

export const StudyNotesView: React.FC<StudyNotesViewProps> = ({
  selectedSubjectId,
  selectedTopicId,
  onSelectSubject,
  onSelectTopic,
  onNavigateQuizForSubject
}) => {
  const [subjectsList, setSubjectsList] = useState<Subject[]>(() => subjectRegistry.getAll());
  const [topicsList, setTopicsList] = useState<StudyTopic[]>(STUDY_TOPICS);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // New Subject / Topic Creator Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSubjName, setNewSubjName] = useState('');
  const [newSubjDesc, setNewSubjDesc] = useState('');
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicSummary, setNewTopicSummary] = useState('');

  // Active Subject & Topics
  const activeSubject = subjectsList.find((s) => s.id === selectedSubjectId) || subjectsList[0];
  const subjectTopics = topicsList.filter((t) => t.subjectId === activeSubject.id);

  // Active Topic
  const activeTopic =
    subjectTopics.find((t) => t.id === selectedTopicId) ||
    subjectTopics[0] ||
    topicsList[0];

  // Previous and Next topics
  const currentTopicIndex = subjectTopics.findIndex((t) => t.id === activeTopic.id);
  const prevTopic = currentTopicIndex > 0 ? subjectTopics[currentTopicIndex - 1] : null;
  const nextTopic = currentTopicIndex < subjectTopics.length - 1 ? subjectTopics[currentTopicIndex + 1] : null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjName.trim()) return;

    const newId = newSubjName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') as SubjectId;
    const newSubject: Subject = {
      id: newId,
      name: newSubjName.trim(),
      slug: newId,
      description: newSubjDesc.trim() || 'User contributed study subject.',
      icon: 'BookOpen',
      color: 'from-blue-600 to-indigo-600',
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
      topicsCount: 1,
    };

    subjectRegistry.register(newSubject);
    setSubjectsList(subjectRegistry.getAll());

    if (newTopicTitle.trim()) {
      const newTopic: StudyTopic = {
        id: `custom-${Date.now()}`,
        subjectId: newId,
        title: newTopicTitle.trim(),
        slug: newTopicTitle.toLowerCase().replace(/\s+/g, '-'),
        summary: newTopicSummary.trim() || 'Custom topic overview.',
        simpleExplanation: newTopicSummary.trim() || 'Custom concise explanation.',
        detailedExplanation: [
          'This topic was added through the dynamic subject extension system.',
          'You can add notes, code examples, and practice questions to expand your syllabus.'
        ],
        keyPoints: ['User-created subject topic', 'Fully extensible study architecture'],
        examples: [
          {
            title: 'Starter Example',
            language: 'text',
            codeOrText: `// Example for ${newTopicTitle}\nconsole.log("Welcome to ${newSubjName}!");`,
            outputOrNote: 'Output confirmed'
          }
        ],
        faqs: [
          {
            question: `How do I study ${newTopicTitle}?`,
            answer: 'Review the key points, run sample code, and solve active practice questions.'
          }
        ],
        practiceQuestions: [
          {
            question: `What is the core principle of ${newTopicTitle}?`,
            answer: 'Mastering fundamental concepts through active recall.',
            explanation: 'Continuous active practice strengthens retention.'
          }
        ],
        relatedTopicIds: ['cs-big-o']
      };
      setTopicsList([newTopic, ...topicsList]);
      onSelectTopic(newTopic.id);
    }

    onSelectSubject(newId);
    setShowAddModal(false);
    setNewSubjName('');
    setNewSubjDesc('');
    setNewTopicTitle('');
    setNewTopicSummary('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header & Extensibility Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Comprehensive Curriculum
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Study Notes &amp; Learning Guides
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Structured educational notes with visual diagrams, verified examples, and self-assessment questions.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors shrink-0 shadow-sm"
        >
          <FolderPlus className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Add Custom Subject</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar: Subjects & Topics Navigation */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Subject Dropdown / Selector */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Select Subject ({subjectsList.length})
            </label>
            <div className="relative">
              <select
                value={activeSubject.id}
                onChange={(e) => {
                  onSelectSubject(e.target.value);
                  const firstTopic = topicsList.find((t) => t.subjectId === e.target.value);
                  if (firstTopic) onSelectTopic(firstTopic.id);
                }}
                className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
              >
                {subjectsList.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
            </div>

            <p className="mt-3 text-xs text-slate-500 leading-relaxed">
              {activeSubject.description}
            </p>
          </div>

          {/* Topics in this Subject */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Topics in {activeSubject.name}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {subjectTopics.length}
              </span>
            </div>

            <div className="space-y-1">
              {subjectTopics.map((topic) => {
                const isSelected = topic.id === activeTopic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => {
                      onSelectTopic(topic.id);
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                    className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="truncate pr-2">{topic.title}</span>
                    <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>

            {onNavigateQuizForSubject && (
              <button
                onClick={() => onNavigateQuizForSubject(activeSubject.id)}
                className="w-full mt-4 flex items-center justify-center gap-2 p-2.5 rounded-xl border border-dashed border-indigo-300 dark:border-indigo-800 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Practice {activeSubject.name} Quiz &rarr;</span>
              </button>
            )}
          </div>

          {/* Quick Subject Grid */}
          <div className="hidden lg:block bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
              Explore All Subjects
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {subjectsList.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    onSelectSubject(s.id);
                    const firstTopic = topicsList.find((t) => t.subjectId === s.id);
                    if (firstTopic) onSelectTopic(firstTopic.id);
                  }}
                  className={`p-2 rounded-lg text-left truncate transition-colors ${
                    s.id === activeSubject.id
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Main Column: Study Topic Content */}
        <main className="lg:col-span-8 space-y-8">
          <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm space-y-8">
            
            {/* Topic Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                  {activeSubject.name}
                </span>
                <span className="text-xs text-slate-400">
                  &bull; 6 min read &bull; Verified Academic Syllabus
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {activeTopic.title}
              </h2>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeTopic.summary}
              </p>
            </div>

            {/* 1. Simple Explanation Callout */}
            <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm mb-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>In Simple Terms (Plain English)</span>
              </div>
              <p className="text-sm text-amber-900 dark:text-amber-200/90 leading-relaxed font-medium">
                {activeTopic.simpleExplanation}
              </p>
            </div>

            {/* 2. Detailed Explanation */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Detailed Explanation</span>
              </h3>
              <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeTopic.detailedExplanation.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* 3. Key Points */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                Key Concepts &amp; Takeaways
              </h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {activeTopic.keyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Illustrated Diagram (if present) */}
            {activeTopic.diagram && (
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/60 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Diagram: {activeTopic.diagram.title}
                  </h3>
                  <span className="text-[11px] text-slate-400">Architectural Visualizer</span>
                </div>
                
                <div 
                  className="py-4 px-2 flex justify-center overflow-x-auto"
                  dangerouslySetInnerHTML={{ __html: activeTopic.diagram.svgContent }}
                />
                
                <p className="text-xs text-center text-slate-500 italic">
                  {activeTopic.diagram.caption}
                </p>
              </div>
            )}

            {/* 5. Real Examples / Code Blocks */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Practical Examples &amp; Implementations
              </h3>
              {activeTopic.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 overflow-hidden shadow-sm"
                >
                  <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300">{ex.title}</span>
                    <div className="flex items-center gap-3">
                      {ex.language && (
                        <span className="font-mono text-[10px] uppercase text-slate-400">
                          {ex.language}
                        </span>
                      )}
                      <button
                        onClick={() => handleCopy(`ex-${idx}`, ex.codeOrText)}
                        className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
                        aria-label="Copy code snippet"
                      >
                        {copiedCodeId === `ex-${idx}` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed text-indigo-200">
                    <code>{ex.codeOrText}</code>
                  </pre>
                  {ex.outputOrNote && (
                    <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
                      Output / Insight: {ex.outputOrNote}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 6. Advantages & Disadvantages */}
            {(activeTopic.advantages || activeTopic.disadvantages) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeTopic.advantages && (
                  <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Key Advantages</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {activeTopic.advantages.map((adv, i) => (
                        <li key={i}>&bull; {adv}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTopic.disadvantages && (
                  <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 mb-2 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      <span>Limitations / Tradeoffs</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {activeTopic.disadvantages.map((dis, i) => (
                        <li key={i}>&bull; {dis}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* 7. Frequently Asked Questions */}
            {activeTopic.faqs.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span>Frequently Asked Questions</span>
                </h3>
                <div className="space-y-2">
                  {activeTopic.faqs.map((faq, i) => {
                    const isOpen = expandedFaqIndex === i;
                    return (
                      <div
                        key={i}
                        className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedFaqIndex(isOpen ? null : i)}
                          className="w-full text-left p-4 bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-800/50 font-semibold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center justify-between gap-3 transition-colors"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform ${
                              isOpen ? 'rotate-180 text-indigo-600' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="p-4 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 leading-relaxed">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 8. Practice Questions */}
            {activeTopic.practiceQuestions.length > 0 && (
              <div className="p-6 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/60 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span>Practice Exam Questions</span>
                  </h3>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                    Self Assessment
                  </span>
                </div>

                <div className="space-y-4">
                  {activeTopic.practiceQuestions.map((pq, idx) => {
                    const isRevealed = !!revealedSolutions[idx];
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
                      >
                        <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          Q{idx + 1}: {pq.question}
                        </p>

                        {pq.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {pq.options.map((opt, oIdx) => (
                              <div
                                key={oIdx}
                                className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                              >
                                {opt}
                              </div>
                            ))}
                          </div>
                        )}

                        <div>
                          <button
                            onClick={() =>
                              setRevealedSolutions((prev) => ({ ...prev, [idx]: !prev[idx] }))
                            }
                            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                          >
                            {isRevealed ? 'Hide Solution & Explanation' : 'Reveal Correct Answer & Explanation'}
                          </button>

                          {isRevealed && (
                            <div className="mt-2.5 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-slate-800 dark:text-slate-200 space-y-1">
                              <div>
                                Correct Answer: <strong className="text-emerald-700 dark:text-emerald-300">{pq.answer}</strong>
                              </div>
                              <p className="text-slate-600 dark:text-slate-400">{pq.explanation}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Non-intrusive in-article sponsor placeholder */}
            <AdPlaceholder slotType="banner" />

            {/* 9. Previous & Next Navigation */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              {prevTopic ? (
                <button
                  onClick={() => {
                    onSelectTopic(prevTopic.id);
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 block uppercase">Previous Topic</span>
                    <span className="truncate max-w-[160px] block">{prevTopic.title}</span>
                  </div>
                </button>
              ) : <div />}

              {nextTopic && (
                <button
                  onClick={() => {
                    onSelectTopic(nextTopic.id);
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-sm"
                >
                  <div className="text-right">
                    <span className="text-[10px] text-indigo-200 block uppercase">Next Topic</span>
                    <span className="truncate max-w-[160px] block">{nextTopic.title}</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </article>
        </main>
      </div>

      {/* Modal: Add Additional Subject or Topic (Extensible curriculum system) */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-indigo-600" />
                <span>Extend Curriculum: Add Subject</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateSubject} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Subject Name *
                </label>
                <input
                  type="text"
                  value={newSubjName}
                  onChange={(e) => setNewSubjName(e.target.value)}
                  placeholder="e.g. Distributed Systems, Quantum Computing..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Subject Description
                </label>
                <input
                  type="text"
                  value={newSubjDesc}
                  onChange={(e) => setNewSubjDesc(e.target.value)}
                  placeholder="Brief overview of what this subject covers..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                />
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Initial Topic Title (Optional)
                </label>
                <input
                  type="text"
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  placeholder="e.g. Byzantine Fault Tolerance..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Initial Topic Summary
                </label>
                <textarea
                  value={newTopicSummary}
                  onChange={(e) => setNewTopicSummary(e.target.value)}
                  rows={2}
                  placeholder="Core summary of this initial topic..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm"
                >
                  Register Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
