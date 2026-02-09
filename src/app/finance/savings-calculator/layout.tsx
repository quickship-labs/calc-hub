import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo';

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Savings Calculator - Project Your Savings Growth',
  description: 'Free savings calculator to estimate how your savings grow with monthly deposits and compound interest. Plan your savings goals.',
  path: '/finance/savings-calculator',
  keywords: ['savings calculator', 'savings goal calculator', 'savings growth calculator', 'retirement savings calculator'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
