'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FractionCalculator() {
  const [num1, setNum1] = useState('');
  const [den1, setDen1] = useState('');
  const [operation, setOperation] = useState<'+' | '-' | '×' | '÷'>('+');
  const [num2, setNum2] = useState('');
  const [den2, setDen2] = useState('');

  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const simplifyFraction = (numerator: number, denominator: number) => {
    if (denominator === 0) return null;

    const divisor = gcd(numerator, denominator);
    let simplifiedNum = numerator / divisor;
    let simplifiedDen = denominator / divisor;

    // Handle negative denominators
    if (simplifiedDen < 0) {
      simplifiedNum = -simplifiedNum;
      simplifiedDen = -simplifiedDen;
    }

    return { numerator: simplifiedNum, denominator: simplifiedDen };
  };

  const toMixedNumber = (numerator: number, denominator: number) => {
    if (denominator === 0) return null;

    const whole = Math.floor(Math.abs(numerator) / denominator);
    const remainder = Math.abs(numerator) % denominator;
    const sign = numerator < 0 ? -1 : 1;

    if (whole === 0) return null;

    return { whole: sign * whole, numerator: remainder, denominator };
  };

  const calculate = () => {
    const n1 = parseFloat(num1);
    const d1 = parseFloat(den1);
    const n2 = parseFloat(num2);
    const d2 = parseFloat(den2);

    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2)) return null;
    if (d1 === 0 || d2 === 0) return null;

    let resultNum: number;
    let resultDen: number;

    switch (operation) {
      case '+':
        resultNum = n1 * d2 + n2 * d1;
        resultDen = d1 * d2;
        break;
      case '-':
        resultNum = n1 * d2 - n2 * d1;
        resultDen = d1 * d2;
        break;
      case '×':
        resultNum = n1 * n2;
        resultDen = d1 * d2;
        break;
      case '÷':
        if (n2 === 0) return null;
        resultNum = n1 * d2;
        resultDen = d1 * n2;
        break;
      default:
        return null;
    }

    const simplified = simplifyFraction(resultNum, resultDen);
    if (!simplified) return null;

    const decimal = simplified.numerator / simplified.denominator;
    const mixed = toMixedNumber(simplified.numerator, simplified.denominator);

    return {
      original: { numerator: resultNum, denominator: resultDen },
      simplified,
      decimal,
      mixed,
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
          <Link href="/math" className="text-blue-600 hover:text-blue-800">Math</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-700">Fraction Calculator</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Fraction Calculator</h1>

        {/* Calculator Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="space-y-6">
            {/* First Fraction */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Fraction
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={num1}
                  onChange={(e) => setNum1(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Numerator"
                />
                <span className="text-2xl text-gray-400 font-light">/</span>
                <input
                  type="number"
                  value={den1}
                  onChange={(e) => setDen1(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Denominator"
                />
              </div>
            </div>

            {/* Operation Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Operation
              </label>
              <div className="grid grid-cols-4 gap-3">
                {(['+', '-', '×', '÷'] as const).map((op) => (
                  <button
                    key={op}
                    onClick={() => setOperation(op)}
                    className={`py-3 px-4 rounded-lg font-semibold text-xl transition-all ${
                      operation === op
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {op}
                  </button>
                ))}
              </div>
            </div>

            {/* Second Fraction */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Second Fraction
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={num2}
                  onChange={(e) => setNum2(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Numerator"
                />
                <span className="text-2xl text-gray-400 font-light">/</span>
                <input
                  type="number"
                  value={den2}
                  onChange={(e) => setDen2(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Denominator"
                />
              </div>
            </div>

            {/* Results */}
            {result && (
              <div className="bg-blue-50 rounded-lg p-6 space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Simplified Result</div>
                  <div className="text-4xl font-bold text-blue-600 text-center">
                    {result.simplified.numerator}/{result.simplified.denominator}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-blue-200">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Decimal Equivalent</div>
                    <div className="text-2xl font-semibold text-gray-800">
                      {result.decimal.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                    </div>
                  </div>
                  {result.mixed && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Mixed Number</div>
                      <div className="text-2xl font-semibold text-gray-800">
                        {result.mixed.whole} {result.mixed.numerator}/{result.mixed.denominator}
                      </div>
                    </div>
                  )}
                </div>

                {result.original.numerator !== result.simplified.numerator && (
                  <div className="text-sm text-gray-700 pt-4 border-t border-blue-200">
                    <p className="font-medium mb-2">Simplification:</p>
                    <p>
                      Original: {result.original.numerator}/{result.original.denominator}
                    </p>
                    <p>
                      GCD: {gcd(result.original.numerator, result.original.denominator)}
                    </p>
                    <p>
                      Simplified: {result.simplified.numerator}/{result.simplified.denominator}
                    </p>
                  </div>
                )}
              </div>
            )}

            {den1 && parseFloat(den1) === 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                First denominator cannot be zero
              </div>
            )}
            {den2 && parseFloat(den2) === 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                Second denominator cannot be zero
              </div>
            )}
            {operation === '÷' && num2 && parseFloat(num2) === 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                Cannot divide by a fraction with numerator of zero
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Fraction Calculator</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              The fraction calculator makes working with fractions simple and intuitive. Whether you need to add,
              subtract, multiply, or divide fractions, this tool provides instant results in multiple formats including
              simplified fractions, decimal equivalents, and mixed numbers where applicable.
            </p>
            <p>
              Fractions are essential in mathematics, cooking, construction, and many other fields. This calculator
              automatically simplifies results using the greatest common divisor (GCD) algorithm, ensuring answers are
              always presented in their lowest terms. The tool handles both proper and improper fractions, automatically
              converting improper fractions to mixed numbers when appropriate for easier interpretation.
            </p>
            <p>
              Understanding fraction operations is crucial for students and professionals alike. Addition and subtraction
              require finding a common denominator, while multiplication and division follow simpler rules. The calculator
              shows the simplification process, helping users understand how the GCD is used to reduce fractions to their
              simplest form, making it both a practical tool and an educational resource.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do you add or subtract fractions?
              </h3>
              <p className="text-gray-700">
                To add or subtract fractions, you need a common denominator. Multiply each fraction by the other's
                denominator, then add or subtract the numerators. For example: 1/4 + 1/3 = (1×3)/(4×3) + (1×4)/(3×4)
                = 3/12 + 4/12 = 7/12.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do you multiply fractions?
              </h3>
              <p className="text-gray-700">
                Multiply the numerators together and the denominators together. For example: 2/3 × 3/4 = (2×3)/(3×4)
                = 6/12 = 1/2 (simplified).
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do you divide fractions?
              </h3>
              <p className="text-gray-700">
                To divide by a fraction, multiply by its reciprocal. Flip the second fraction and multiply.
                For example: 2/3 ÷ 3/4 = 2/3 × 4/3 = 8/9.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is a simplified fraction?
              </h3>
              <p className="text-gray-700">
                A simplified (or reduced) fraction has no common factors between the numerator and denominator except 1.
                For example, 6/8 simplifies to 3/4 by dividing both by their GCD of 2.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is the difference between proper and improper fractions?
              </h3>
              <p className="text-gray-700">
                A proper fraction has a numerator smaller than its denominator (like 3/4). An improper fraction has
                a numerator greater than or equal to its denominator (like 7/4), which can be converted to a mixed
                number (1 3/4).
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
            <Link href="/math/average-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Average Calculator</h3>
              <p className="text-sm text-gray-600">Calculate mean, median, mode, and range</p>
            </Link>
            <Link href="/math/gpa-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">GPA Calculator</h3>
              <p className="text-sm text-gray-600">Calculate your grade point average</p>
            </Link>
            <Link href="/everyday/unit-converter" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Unit Converter</h3>
              <p className="text-sm text-gray-600">Convert between different units of measurement</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
