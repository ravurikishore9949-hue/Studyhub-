import React, { useState } from 'react';
import { AD_CONFIG } from '../config/adConfig';
import { Info, Copy, Check, ExternalLink } from 'lucide-react';

interface AdPlaceholderProps {
  slotType?: 'banner' | 'rectangle' | 'sidebar';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  slotType = 'banner',
  className = ''
}) => {
  const [copied, setCopied] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  const currentUnitId = slotType === 'banner' 
    ? AD_CONFIG.admob.bannerUnitId 
    : AD_CONFIG.admob.interstitialUnitId;

  const currentSlotId = slotType === 'banner'
    ? AD_CONFIG.adsense.bannerSlotId
    : slotType === 'rectangle'
    ? AD_CONFIG.adsense.rectangleSlotId
    : AD_CONFIG.adsense.sidebarSlotId;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`my-6 overflow-hidden rounded-xl border border-dashed border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-indigo-950/20 p-4 transition-colors ${className}`}
      role="complementary"
      aria-label="Advertisement area"
    >
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
            Ad Unit Slot ({slotType})
          </span>
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="text-[11px] text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
            title="View Ad Unit ID details"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Ad ID Setup</span>
          </button>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md">
          {slotType === 'banner' && 'Standard Responsive Banner (728×90 / 320×50). Safe, educational ads.'}
          {slotType === 'rectangle' && 'Medium Rectangle (300×250). Dedicated slot for textbooks & study tools.'}
          {slotType === 'sidebar' && 'Sidebar Unit (160×600 / 300×600). Clean reading margin.'}
        </p>

        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px] bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-800">
            Unit ID: <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{currentUnitId}</span>
          </span>
          <button
            onClick={() => handleCopy(currentUnitId)}
            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 text-[11px] font-medium transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied' : 'Copy ID'}
          </button>
        </div>

        {showConfig && (
          <div className="mt-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-left text-xs max-w-lg w-full shadow-sm">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1.5 flex items-center justify-between">
              <span>Configured Ad Identifiers</span>
              <a
                href="https://admob.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 dark:text-indigo-400 text-[11px] hover:underline inline-flex items-center gap-0.5"
              >
                AdMob Console <ExternalLink className="w-3 h-3" />
              </a>
            </h4>
            <div className="space-y-1 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
              <div><strong>AdMob App ID:</strong> {AD_CONFIG.admob.appId}</div>
              <div><strong>AdMob Banner ID:</strong> {AD_CONFIG.admob.bannerUnitId}</div>
              <div><strong>AdSense Slot ID:</strong> {currentSlotId}</div>
            </div>
            <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
              To replace with your real live ad revenue ID, open <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-indigo-600 dark:text-indigo-400">src/config/adConfig.ts</code>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
