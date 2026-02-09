import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo';

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Body Fat Calculator - Estimate Your Body Fat Percentage',
  description: 'Free body fat percentage calculator using the US Navy method. Get your body fat category, fat mass, and lean mass from simple body measurements.',
  path: '/health/body-fat-calculator',
  keywords: ['body fat calculator', 'body fat percentage calculator', 'body composition calculator', 'navy body fat calculator'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
