'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountType, setDiscountType] = useState<'percent' | 'dollar'>('percent');
  const [discountValue, setDiscountValue] = useState('');
  const [chainDiscounts, setChainDiscounts] = useState(false);
  const [secondDiscount, setSecondDiscount] = useState('');

  const calculate = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountValue);

    if (isNaN(price) || isNaN(discount) || price < 0 || discount < 0) return null;

    let finalPrice: number;
    let amountSaved: number;

    if (discountType === 'percent') {
      if (discount > 100) return null;
      amountSaved = (price * discount) / 100;
      finalPrice = price - amountSaved;
    } else {
      amountSaved = discount;
      finalPrice = price - discount;
      if (finalPrice < 0) finalPrice = 0;
    }

    // Chain second discount if enabled
    let secondAmountSaved = 0;
    let priceAfterSecond = finalPrice;

    if (chainDiscounts && secondDiscount) {
      const secondDiscountNum = parseFloat(secondDiscount);
      if (!isNaN(secondDiscountNum) && secondDiscountNum > 0 && secondDiscountNum <= 100) {
        secondAmountSaved = (finalPrice * secondDiscountNum) / 100;
        priceAfterSecond = finalPrice - secondAmountSaved;
      }
    }

    const totalSaved = chainDiscounts ? amountSaved + secondAmountSaved : amountSaved;
    const finalFinalPrice = chainDiscounts ? priceAfterSecond : finalPrice;

    return {
      originalPrice: price,
      finalPrice: finalFinalPrice,
      amountSaved: totalSaved,
      discountPercent: discountType === 'percent' ? discount : (amountSaved / price) * 100,
      firstDiscount: amountSaved,
      secondDiscount: secondAmountSaved,
      priceAfterFirst: finalPrice,
    };
  };

  const result = calculate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href="/everyday" className="text-blue-600 hover:text-blue-800">Everyday</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-700">Discount Calculator</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Discount Calculator</h1>

        {/* Calculator Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price ($)
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter original price"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Discount Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDiscountType('percent')}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    discountType === 'percent'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Percentage (%)
                </button>
                <button
                  onClick={() => setDiscountType('dollar')}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    discountType === 'dollar'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Dollar Amount ($)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount {discountType === 'percent' ? '(%)' : '($)'}
              </label>
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={discountType === 'percent' ? 'Enter discount percentage' : 'Enter discount amount'}
                min="0"
                max={discountType === 'percent' ? '100' : undefined}
                step="0.01"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="chainDiscounts"
                checked={chainDiscounts}
                onChange={(e) => setChainDiscounts(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="chainDiscounts" className="ml-2 text-sm font-medium text-gray-700">
                Chain additional discount (e.g., "20% off then additional 10% off")
              </label>
            </div>

            {chainDiscounts && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Discount (%)
                </label>
                <input
                  type="number"
                  value={secondDiscount}
                  onChange={(e) => setSecondDiscount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter additional discount percentage"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
            )}

            {/* Results */}
            {result && (
              <div className="bg-blue-50 rounded-lg p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Original Price</div>
                    <div className="text-3xl font-bold text-gray-400 line-through">
                      ${result.originalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-500">
                    <div className="text-sm text-gray-600 mb-2">Final Price</div>
                    <div className="text-4xl font-bold text-green-600">
                      ${result.finalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">You Save</div>
                  <div className="text-3xl font-bold text-blue-600">
                    ${result.amountSaved.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    ({((result.amountSaved / result.originalPrice) * 100).toFixed(1)}% off)
                  </div>
                </div>

                {chainDiscounts && result.secondDiscount > 0 && (
                  <div className="text-sm text-gray-700 pt-4 border-t border-blue-200 space-y-1">
                    <p className="font-medium">Chain Discount Breakdown:</p>
                    <p>1. First discount: -${result.firstDiscount.toFixed(2)} → ${result.priceAfterFirst.toFixed(2)}</p>
                    <p>2. Second discount: -${result.secondDiscount.toFixed(2)} → ${result.finalPrice.toFixed(2)}</p>
                    <p className="font-medium mt-2">Total savings: ${result.amountSaved.toFixed(2)}</p>
                  </div>
                )}
              </div>
            )}

            {discountType === 'percent' && discountValue && parseFloat(discountValue) > 100 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                Discount percentage cannot exceed 100%
              </div>
            )}
          </div>
        </div>

        {/* Ad Placeholder */}
        <div className="bg-gray-100 rounded-lg p-8 mb-8 text-center text-gray-500">
          Advertisement Space
        </div>

        {/* About Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Discount Calculator</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              The Discount Calculator helps you quickly determine the final price and savings when purchasing items
              on sale. Whether you're shopping during Black Friday, comparing deals, or budgeting for purchases, this
              tool instantly calculates the discounted price based on either a percentage off or a fixed dollar amount
              discount. The clear visual display shows both the original price and the final price side-by-side for
              easy comparison.
            </p>
            <p>
              Understanding discount calculations is essential for smart shopping. A percentage discount applies the
              discount rate to the original price, while a dollar amount discount subtracts a fixed sum. This calculator
              supports both methods and can even handle chain discounts, which are common in retail where stores offer
              an initial discount followed by an additional percentage off. Note that chain discounts are different from
              simply adding percentages together—each successive discount applies to the already-reduced price.
            </p>
            <p>
              The calculator is perfect for comparing sales across different stores, planning purchases during sales
              events, or calculating total savings on shopping trips. The chain discount feature is particularly useful
              for understanding promotional offers like "20% off everything, plus an extra 10% off clearance items."
              By showing both the amount saved and the percentage discount, you can make informed decisions about
              whether a deal is truly worthwhile for your budget.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do I calculate a percentage discount?
              </h3>
              <p className="text-gray-700">
                To calculate a percentage discount, multiply the original price by the discount percentage and divide
                by 100, then subtract that amount from the original price. For example, 25% off $80 = $80 - ($80 × 0.25)
                = $80 - $20 = $60.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is a chain discount?
              </h3>
              <p className="text-gray-700">
                A chain discount (also called successive discount) applies multiple discounts in sequence. Each discount
                is applied to the price after the previous discount. For example, "20% off then 10% off" on $100 =
                $100 → $80 (after 20% off) → $72 (after 10% off of $80), not $70.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is 20% off then 10% off the same as 30% off?
              </h3>
              <p className="text-gray-700">
                No! Chain discounts are not additive. "20% off then 10% off" actually equals 28% off total, not 30%.
                This is because the second discount applies to the already-reduced price, not the original price.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I use this for sales tax calculations?
              </h3>
              <p className="text-gray-700">
                While this calculator is designed for discounts, you can use the dollar amount option for fixed-value
                calculations. However, for sales tax (which adds to the price), you would need a different approach
                or calculator.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What if my discount is greater than the price?
              </h3>
              <p className="text-gray-700">
                If you enter a dollar discount greater than the original price, the calculator will set the final
                price to $0. Percentage discounts are capped at 100%, which would also result in a final price of $0.
              </p>
            </div>
          </div>
        </section>

        {/* Related Calculators */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/math/percentage-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Percentage Calculator</h3>
              <p className="text-sm text-gray-600">Calculate percentages and percentage changes</p>
            </Link>
            <Link href="/everyday/fuel-cost-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Fuel Cost Calculator</h3>
              <p className="text-sm text-gray-600">Calculate trip fuel costs</p>
            </Link>
            <Link href="/everyday/unit-converter" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Unit Converter</h3>
              <p className="text-sm text-gray-600">Convert between different units</p>
            </Link>
            <Link href="/math/average-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Average Calculator</h3>
              <p className="text-sm text-gray-600">Calculate mean, median, and mode</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
