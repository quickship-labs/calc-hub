import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo';

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Compound Interest Calculator - See How Your Money Grows',
  description: 'Free compound interest calculator showing how investments grow over time with regular contributions. Compare daily, monthly, and yearly compounding.',
  path: '/finance/compound-interest-calculator',
  keywords: ['compound interest calculator', 'investment calculator', 'interest calculator', 'savings growth calculator'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
