export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'CalcHub',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://calc-hub-sigma.vercel.app',
  description: 'Free online calculators for finance, health, math, dates, and everyday life. Fast, accurate, and easy to use.',
  adsensePublisherId: process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || '',
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
};
