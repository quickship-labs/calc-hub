import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo';

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Age Calculator - How Old Am I? Exact Age in Years, Months, Days',
  description: 'Free age calculator to find your exact age in years, months, and days. Also shows your next birthday countdown, day of the week you were born, and zodiac sign.',
  path: '/date/age-calculator',
  keywords: ['age calculator', 'how old am i', 'birthday calculator', 'age in days', 'exact age calculator'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
