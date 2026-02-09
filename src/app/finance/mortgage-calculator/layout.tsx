import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo';

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Mortgage Calculator - Free Monthly Payment Calculator',
  description: 'Calculate your monthly mortgage payment, total interest, and loan cost. Free mortgage calculator with support for different terms, down payments, and interest rates.',
  path: '/finance/mortgage-calculator',
  keywords: ['mortgage calculator', 'home loan calculator', 'mortgage payment calculator', 'house payment calculator'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
