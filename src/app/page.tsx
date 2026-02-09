import { CategoryGrid } from '@/components/home/category-grid';
import { siteConfig } from '@/lib/config';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Free Online Calculators
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Fast, accurate, and easy-to-use calculators for finance, health, math, dates, and everyday life.
          All calculators are 100% free with instant results.
        </p>
      </div>

      {/* Category Grid with All Calculators */}
      <CategoryGrid />

      {/* SEO Content */}
      <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Why Use {siteConfig.name}?
        </h2>
        <div className="prose prose-lg max-w-none text-gray-600">
          <p className="mb-4">
            {siteConfig.name} provides a comprehensive collection of free online calculators designed to help you
            make quick, accurate calculations for everyday life. Whether you need to calculate your mortgage payment,
            BMI, GPA, or simply split a restaurant bill, we have the tools you need.
          </p>
          <p className="mb-4">
            Our calculators are built with accuracy and ease of use in mind. No registration required, no ads blocking
            your view, and instant results. All calculators work on desktop, tablet, and mobile devices.
          </p>
          <p>
            Browse our categories above to find the perfect calculator for your needs. From financial planning tools
            to health metrics, mathematical helpers to date calculators, we cover all the essential calculations
            you might need in your daily life.
          </p>
        </div>
      </div>
    </div>
  );
}
