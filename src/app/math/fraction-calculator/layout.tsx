import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo';

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Fraction Calculator - Add, Subtract, Multiply & Divide Fractions',
  description: 'Free fraction calculator for all operations. Get simplified results as fractions, decimals, and mixed numbers. Easy to use for homework and everyday math.',
  path: '/math/fraction-calculator',
  keywords: ['fraction calculator', 'fraction solver', 'fraction math', 'add fractions', 'simplify fractions'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
