import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { ActivePage } from '../types';

interface CookieBannerProps {
  onNavigatePage: (page: ActivePage) => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onNavigatePage }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('study_hub_cookie_consent');
      if (!consent) {
        // Show after a brief delay for smooth appearance
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('study_hub_cookie_consent', 'accepted_all');
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem('study_hub_cookie_consent', 'essential_only');
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      id="cookie-consent-banner"
      role="region"
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-3 left-3 right-3 sm:left-6 sm:right-auto sm:max-w-md z-50 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-slate-800 dark:text-slate-100 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Cookie &amp; Privacy Choices
            </h3>
            <button
              id="cookie-banner-close-btn"
              onClick={handleEssentialOnly}
              aria-label="Close cookie consent notice"
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            We use essential local storage to remember your study preferences (such as Dark Mode and quiz progress). Third-party advertising partners like Google AdSense may also set cookies to deliver and measure advertisements.
          </p>
          <div className="flex items-center gap-1.5 pt-1">
            <button
              id="cookie-banner-learn-more"
              onClick={() => {
                onNavigatePage('cookies');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              Read Cookie Policy
            </button>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <button
              id="cookie-banner-accept-btn"
              onClick={handleAcceptAll}
              className="flex-1 py-1.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors text-center shadow-sm"
            >
              Accept All
            </button>
            <button
              id="cookie-banner-essential-btn"
              onClick={handleEssentialOnly}
              className="py-1.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
