import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo';

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Percentage Calculator - Calculate Percentages Instantly',
  description: 'Free percentage calculator with three modes: find a percentage of a number, what percent one number is of another, and percentage change between values.',
  path: '/math/percentage-calculator',
  keywords: ['percentage calculator', 'percent calculator', 'percentage change calculator', 'percent of number'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
