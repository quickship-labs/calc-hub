import Link from 'next/link';
import { FAQSection } from './faq-section';
import { RelatedCalculators } from './related-calculators';
import { AdSlot } from '../layout/ad-slot';
import { Calculator } from '@/lib/calculators';
import { FAQItem } from '@/data/faq';

interface CalculatorLayoutProps {
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  children: React.ReactNode;
  faqItems: FAQItem[];
  relatedCalculators: Calculator[];
}

export function CalculatorLayout({
  title,
  description,
  category,
  categorySlug,
  children,
  faqItems,
  relatedCalculators,
}: CalculatorLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <Link href={`/#${categorySlug}`} className="hover:text-blue-600 transition-colors">
              {category}
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-900 font-medium">{title}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-lg text-gray-600">{description}</p>
      </div>

      {/* Calculator Component */}
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
        {children}
      </div>

      {/* Ad Slot */}
      <AdSlot />

      {/* FAQ Section */}
      {faqItems.length > 0 && (
        <div className="mb-8">
          <FAQSection items={faqItems} calculatorTitle={title} />
        </div>
      )}

      {/* Related Calculators */}
      {relatedCalculators.length > 0 && (
        <div className="mb-8">
          <RelatedCalculators calculators={relatedCalculators} />
        </div>
      )}

      {/* Bottom Ad Slot */}
      <AdSlot />
    </div>
  );
}
