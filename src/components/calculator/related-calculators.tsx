import Link from 'next/link';
import { Calculator } from '@/lib/calculators';

interface RelatedCalculatorsProps {
  calculators: Calculator[];
}

export function RelatedCalculators({ calculators }: RelatedCalculatorsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {calculators.map((calc) => (
          <Link
            key={calc.slug}
            href={`/${calc.categorySlug}/${calc.slug}`}
            className="block p-4 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all group"
          >
            <div className="flex items-start space-x-3">
              <span className="text-3xl">{calc.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {calc.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{calc.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
