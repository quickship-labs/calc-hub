import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo';

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Tip Calculator - Calculate Tips & Split Bills Easily',
  description: 'Free tip calculator to quickly figure out tip amounts and split bills between friends. Supports custom percentages and multiple people.',
  path: '/finance/tip-calculator',
  keywords: ['tip calculator', 'bill split calculator', 'gratuity calculator', 'restaurant tip calculator'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
