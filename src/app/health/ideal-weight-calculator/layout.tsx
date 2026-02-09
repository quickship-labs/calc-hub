import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo';

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Ideal Weight Calculator - Find Your Healthy Weight Range',
  description: 'Calculate your ideal weight using four scientific formulas: Devine, Robinson, Miller, and Hamwi. Find the healthy weight range for your height and gender.',
  path: '/health/ideal-weight-calculator',
  keywords: ['ideal weight calculator', 'healthy weight calculator', 'ideal body weight', 'weight for height'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
