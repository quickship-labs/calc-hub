import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo';

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Loan Calculator - Free Monthly Payment & Interest Calculator',
  description: 'Calculate monthly loan payments, total interest, and payoff schedule. Works for personal loans, auto loans, student loans, and more.',
  path: '/finance/loan-calculator',
  keywords: ['loan calculator', 'personal loan calculator', 'auto loan calculator', 'loan payment calculator'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
