import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/lib/seo';

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Unit Converter - Free Online Measurement Converter',
  description: 'Free unit converter for length, weight, temperature, volume, and speed. Convert between metric and imperial units instantly. Fast and easy to use.',
  path: '/everyday/unit-converter',
  keywords: ['unit converter', 'conversion calculator', 'metric converter', 'measurement converter', 'unit conversion'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
