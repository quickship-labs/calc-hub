import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo';

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Fuel Cost Calculator - Estimate Gas Cost for Any Trip',
  description: 'Free fuel cost calculator to estimate total gas cost for any trip. Enter distance, fuel efficiency, and gas price. Supports miles, kilometers, MPG, and L/100km.',
  path: '/everyday/fuel-cost-calculator',
  keywords: ['fuel cost calculator', 'gas cost calculator', 'trip fuel calculator', 'gas mileage calculator'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
