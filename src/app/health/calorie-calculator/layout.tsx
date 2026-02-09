import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo';

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Calorie Calculator - Daily Calorie Needs & TDEE Calculator',
  description: 'Free calorie calculator using the Mifflin-St Jeor equation. Find your BMR, TDEE, and daily calorie targets for weight loss, maintenance, or muscle gain.',
  path: '/health/calorie-calculator',
  keywords: ['calorie calculator', 'tdee calculator', 'bmr calculator', 'daily calorie needs', 'calorie counter'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
