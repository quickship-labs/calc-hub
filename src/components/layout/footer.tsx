import Link from 'next/link';
import { categories, getCalculatorsByCategory } from '@/lib/calculators';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {categories.map((category) => {
            const calcs = getCalculatorsByCategory(category.slug);
            return (
              <div key={category.slug}>
                <h3 className={`font-semibold text-lg mb-4 ${category.color}`}>
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </h3>
                <ul className="space-y-2">
                  {calcs.map((calc) => (
                    <li key={calc.slug}>
                      <Link
                        href={`/${category.slug}/${calc.slug}`}
                        className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                      >
                        {calc.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} CalcHub. All rights reserved.</p>
          <p className="mt-2">Free online calculators for finance, health, math, dates, and everyday life.</p>
        </div>
      </div>
    </footer>
  );
}
