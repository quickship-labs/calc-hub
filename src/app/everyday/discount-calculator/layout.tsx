import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo';

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Discount Calculator - Calculate Sale Prices & Savings',
  description: 'Free discount calculator to instantly see the final price after a percentage or dollar discount. Find out how much you save on any purchase.',
  path: '/everyday/discount-calculator',
  keywords: ['discount calculator', 'sale price calculator', 'percent off calculator', 'savings calculator'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
