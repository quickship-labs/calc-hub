import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo';

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Date Difference Calculator - Days Between Two Dates',
  description: 'Free date difference calculator showing time between any two dates in years, months, weeks, days, hours, and business days. Fast and accurate.',
  path: '/date/date-difference-calculator',
  keywords: ['date difference calculator', 'days between dates', 'date calculator', 'time between dates'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
