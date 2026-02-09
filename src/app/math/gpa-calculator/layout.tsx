import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo';

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'GPA Calculator - Calculate Your Grade Point Average',
  description: 'Free GPA calculator for college and high school. Add your courses, grades, and credit hours to instantly compute your cumulative grade point average.',
  path: '/math/gpa-calculator',
  keywords: ['gpa calculator', 'grade calculator', 'college gpa calculator', 'cumulative gpa', 'grade point average calculator'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
