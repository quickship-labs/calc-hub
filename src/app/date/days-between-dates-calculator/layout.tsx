import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo';

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Days Until Calculator - Countdown to Any Date',
  description: 'Free countdown calculator to find how many days, weeks, and months until any future date or event. Great for countdowns to holidays, birthdays, and deadlines.',
  path: '/date/days-between-dates-calculator',
  keywords: ['days until calculator', 'countdown calculator', 'how many days until', 'date countdown'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
