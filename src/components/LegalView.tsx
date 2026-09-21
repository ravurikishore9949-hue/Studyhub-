import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Mail, 
  FileText, 
  HelpCircle, 
  Scale, 
  Send, 
  CheckCircle2, 
  Info,
  Clock
} from 'lucide-react';
import { LEGAL_PAGES, TrustPageContent } from '../data/legalContent';
import { ActivePage } from '../types';

interface LegalViewProps {
  pageKey: 'about' | 'privacy' | 'terms' | 'disclaimer' | 'contact' | 'copyright';
  onNavigatePage: (page: ActivePage) => void;
}

export const LegalView: React.FC<LegalViewProps> = ({
  pageKey,
  onNavigatePage
}) => {
  const content: TrustPageContent = LEGAL_PAGES[pageKey] || LEGAL_PAGES['about'];

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  const navLinks: { key: ActivePage; label: string }[] = [
    { key: 'about', label: 'About Us' },
    { key: 'contact', label: 'Contact Us' },
    { key: 'privacy', label: 'Privacy Policy' },
    { key: 'terms', label: 'Terms of Use' },
    { key: 'disclaimer', label: 'Educational Disclaimer' },
    { key: 'copyright', label: 'Copyright & DMCA' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Subnav Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 no-scrollbar text-xs font-semibold">
        {navLinks.map((link) => (
          <button
            key={link.key}
            onClick={() => {
              onNavigatePage(link.key);
              setSubmitted(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-colors ${
              pageKey === link.key
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Main Content Article */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm space-y-8">
        
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Institutional &amp; Trust Information</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {content.title}
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {content.subtitle}
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Effective Date: {content.lastUpdated}</span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 divide-y divide-slate-100 dark:divide-slate-800/80">
          {content.sections.map((sec, idx) => (
            <div key={idx} className={idx > 0 ? 'pt-6 space-y-2.5' : 'space-y-2.5'}>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {sec.heading}
              </h2>
              {sec.body.map((p, pIdx) => (
                <p key={pIdx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {p}
                </p>
              ))}

              {sec.list && (
                <ul className="space-y-1.5 pt-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 pl-4 list-disc">
                  {sec.list.map((item, lIdx) => (
                    <li key={lIdx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Dedicated Interactive Contact Form on Contact Page */}
        {pageKey === 'contact' && (
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Send an Academic Inquiry or Correction
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Found a typo or error in an algorithm note? Have a suggestion for an additional computer science subject? Let us know.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                  Message Dispatched Successfully
                </h3>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 max-w-md mx-auto">
                  Thank you, <strong>{name}</strong>! Your academic inquiry regarding "{subject}" has been queued. An educator will review your note.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="mt-3 text-xs font-semibold text-emerald-700 dark:text-emerald-300 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alex@student.edu"
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Inquiry Category
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-medium"
                  >
                    <option value="General Feedback">General Educational Feedback</option>
                    <option value="Content Correction">Content / Code Correction Report</option>
                    <option value="Subject Suggestion">Suggest a New Subject / Topic</option>
                    <option value="Technical Issue">Website or Calculator Bug</option>
                    <option value="Copyright Inquiry">Copyright / Fair Use Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Your Message / Detail *
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide topic details, URL, or specific correction notes..."
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
