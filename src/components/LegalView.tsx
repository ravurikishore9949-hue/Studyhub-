import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Mail, 
  FileText, 
  Scale, 
  Send, 
  CheckCircle2, 
  Clock,
  Cookie,
  AlertCircle,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { LEGAL_PAGES, TrustPageContent } from '../data/legalContent';
import { ActivePage } from '../types';

interface LegalViewProps {
  pageKey: 'about' | 'privacy' | 'terms' | 'cookies' | 'disclaimer' | 'contact' | 'copyright';
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
  const [subject, setSubject] = useState('General Educational Feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  const navLinks: { key: ActivePage; label: string; icon: React.ReactNode }[] = [
    { key: 'about', label: 'About Us', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { key: 'contact', label: 'Contact Us', icon: <Mail className="w-3.5 h-3.5" /> },
    { key: 'privacy', label: 'Privacy Policy', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { key: 'terms', label: 'Terms of Use', icon: <Scale className="w-3.5 h-3.5" /> },
    { key: 'cookies', label: 'Cookie Policy', icon: <Cookie className="w-3.5 h-3.5" /> },
    { key: 'disclaimer', label: 'Disclaimer', icon: <AlertCircle className="w-3.5 h-3.5" /> },
    { key: 'copyright', label: 'Copyright', icon: <FileText className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Subnav Pills for Policy Hub */}
      <div 
        id="policy-navigation-bar"
        className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 no-scrollbar text-xs font-semibold"
      >
        {navLinks.map((link) => {
          const isActive = pageKey === link.key;
          return (
            <button
              key={link.key}
              id={`nav-policy-btn-${link.key}`}
              onClick={() => {
                onNavigatePage(link.key);
                setSubmitted(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Article Card */}
      <article 
        id={`policy-article-${pageKey}`}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm space-y-8"
      >
        {/* Header */}
        <header className="border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Institutional &amp; Website Compliance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {content.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {content.subtitle}
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Last Updated: {content.lastUpdated}</span>
          </div>
        </header>

        {/* Content Sections */}
        <div className="space-y-8 divide-y divide-slate-100 dark:divide-slate-800/80">
          {content.sections.map((sec, idx) => (
            <section key={idx} className={idx > 0 ? 'pt-7 space-y-3' : 'space-y-3'}>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{sec.heading}</span>
              </h2>
              {sec.body.map((paragraph, pIdx) => (
                <p key={pIdx} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {sec.list && (
                <ul className="space-y-2 pt-1 text-sm text-slate-700 dark:text-slate-300 pl-5 list-disc marker:text-indigo-500">
                  {sec.list.map((item, lIdx) => (
                    <li key={lIdx} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Dedicated Interactive Contact Form on Contact Page */}
        {pageKey === 'contact' && (
          <div id="contact-form-section" className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Direct Info Card */}
              <div className="bg-slate-50 dark:bg-slate-950/60 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Direct Communication</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  You can reach our educational editorial team directly at our support email address:
                </p>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold break-all">
                  [Your Email Address]
                </div>
                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                  <div><strong>Response Time:</strong> 24–48 hours</div>
                  <div><strong>Location:</strong> [Your City / Country - Optional]</div>
                  <div><strong>Usage:</strong> Educational inquiries only</div>
                </div>
              </div>

              {/* Form Column */}
              <div className="lg:col-span-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  Send a Student Inquiry or Content Correction
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
                  Have a suggestion for a study topic, or found a typo in our code examples? Fill out the form below.
                </p>

                {submitted ? (
                  <div 
                    id="contact-form-success"
                    className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2"
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                    <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                      Message Sent Successfully
                    </h3>
                    <p className="text-xs text-emerald-800 dark:text-emerald-300 max-w-md mx-auto">
                      Thank you, <strong>{name}</strong>! Your message regarding "{subject}" has been received. Our team will review your inquiry.
                    </p>
                    <button
                      id="contact-send-another-btn"
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setEmail('');
                        setMessage('');
                      }}
                      className="mt-3 text-xs font-semibold text-emerald-700 dark:text-emerald-300 underline hover:text-emerald-800"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                          Your Name *
                        </label>
                        <input
                          id="contact-name-input"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Alex Morgan"
                          required
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-email-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                          Your Email Address *
                        </label>
                        <input
                          id="contact-email-input"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. alex@student.edu"
                          required
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-subject-select" className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Inquiry Topic / Reason
                      </label>
                      <select
                        id="contact-subject-select"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="General Educational Feedback">General Educational Feedback</option>
                        <option value="Content Correction">Study Note / Code Correction Report</option>
                        <option value="Suggest New Subject">Suggest a New Subject or Quiz Topic</option>
                        <option value="Website Bug">Calculator or Website Technical Bug</option>
                        <option value="Privacy / Policy Question">Privacy or Cookie Policy Question</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-message-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Message Details *
                      </label>
                      <textarea
                        id="contact-message-input"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Please describe your question, topic suggestion, or the specific note URL where you noticed an issue..."
                        required
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Your email is used only to reply to your inquiry. No marketing spam.
                      </p>
                      <button
                        id="contact-submit-btn"
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </article>

      {/* Bottom Compliance Navigation Footer */}
      <nav 
        id="policy-footer-nav"
        aria-label="Legal and Compliance Links"
        className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
      >
        <span className="font-semibold text-slate-700 dark:text-slate-300">Quick Links:</span>
        {navLinks.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              onNavigatePage(item.key);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`hover:text-indigo-600 dark:hover:text-indigo-400 underline transition-colors ${
              pageKey === item.key ? 'font-bold text-indigo-600 dark:text-indigo-400' : ''
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};
