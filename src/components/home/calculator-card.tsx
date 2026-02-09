import Link from 'next/link';
import { Calculator } from '@/lib/calculators';

interface CalculatorCardProps {
  calculator: Calculator;
}

export function CalculatorCard({ calculator }: CalculatorCardProps) {
  return (
    <Link
      href={`/${calculator.categorySlug}/${calculator.slug}`}
      className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100 hover:border-blue-600"
    >
      <div className="flex items-start space-x-4">
        <span className="text-4xl">{calculator.icon}</span>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
            {calculator.name}
          </h3>
          <p className="text-gray-600 text-sm">{calculator.description}</p>
          <span className="inline-block mt-3 text-blue-600 text-sm font-medium">
            Calculate now →
          </span>
        </div>
      </div>
    </Link>
  );
}
