import Link from 'next/link';
import { categories, getCalculatorsByCategory } from '@/lib/calculators';

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {categories.map((category) => {
        const calcs = getCalculatorsByCategory(category.slug);
        return (
          <div
            key={category.slug}
            id={category.slug}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow scroll-mt-20"
          >
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-3">{category.icon}</span>
              <h2 className={`text-2xl font-bold ${category.color}`}>
                {category.name}
              </h2>
            </div>
            <p className="text-gray-600 mb-6">{category.description}</p>
            <ul className="space-y-3">
              {calcs.map((calc) => (
                <li key={calc.slug}>
                  <Link
                    href={`/${category.slug}/${calc.slug}`}
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors group"
                  >
                    <span className="text-xl mr-2">{calc.icon}</span>
                    <span className="font-medium group-hover:underline">{calc.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
