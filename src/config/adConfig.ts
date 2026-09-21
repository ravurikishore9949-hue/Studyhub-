// Ad configuration for Student Study Hub
// Replace with your real IDs from Google AdMob (admob.google.com) or Google AdSense (adsense.google.com)

export const AD_CONFIG = {
  // Mode: Set to true during development to avoid policy violations, false for live ads
  isTestMode: true,

  // Google AdMob Unit IDs (for Android / iOS / Unity apps)
  admob: {
    appId: 'ca-app-pub-4726017860569601~4881935748', // Your verified Google AdMob App ID
    publisherId: 'ca-app-pub-4726017860569601',
    bannerUnitId: 'ca-app-pub-4726017860569601/4881935748', // Primary unit format
    interstitialUnitId: 'ca-app-pub-4726017860569601/1033173712',
    rewardedUnitId: 'ca-app-pub-4726017860569601/5224354917',
  },

  // Google AdSense (for Websites & Web Applications)
  adsense: {
    publisherId: 'ca-pub-4726017860569601', // Your Google Publisher ID
    bannerSlotId: '4881935748',
    rectangleSlotId: '4881935748',
    sidebarSlotId: '4881935748',
  },
};
