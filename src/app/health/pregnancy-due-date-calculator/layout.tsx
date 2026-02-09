import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo';

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Pregnancy Due Date Calculator - When Is My Baby Due?',
  description: 'Free pregnancy due date calculator based on your last period or conception date. See your estimated due date, current week, trimester, and key milestone dates.',
  path: '/health/pregnancy-due-date-calculator',
  keywords: ['due date calculator', 'pregnancy calculator', 'pregnancy due date', 'when is my baby due', 'conception calculator'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
