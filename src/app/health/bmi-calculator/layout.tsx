import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo';

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'BMI Calculator - Free Body Mass Index Calculator',
  description: 'Calculate your BMI instantly with our free Body Mass Index calculator. Supports both metric and imperial units. See your weight category and healthy range.',
  path: '/health/bmi-calculator',
  keywords: ['bmi calculator', 'body mass index calculator', 'bmi chart', 'bmi checker', 'weight calculator'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
