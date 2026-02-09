import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo';

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Average Calculator - Find Mean, Median, Mode & Range',
  description: 'Free average calculator that computes mean, median, mode, range, sum, count, min, and max from any list of numbers. Great for statistics and data analysis.',
  path: '/math/average-calculator',
  keywords: ['average calculator', 'mean calculator', 'median calculator', 'mode calculator', 'statistics calculator'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
