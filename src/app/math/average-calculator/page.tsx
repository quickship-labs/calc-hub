'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AverageCalculator() {
  const [numbers, setNumbers] = useState<string[]>(['', '', '', '']);

  const addNumber = () => {
    setNumbers([...numbers, '']);
  };

  const removeNumber = (index: number) => {
    if (numbers.length > 1) {
      setNumbers(numbers.filter((_, i) => i !== index));
    }
  };

  const updateNumber = (index: number, value: string) => {
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
  };

  const calculate = () => {
    const validNumbers = numbers
      .filter((n) => n.trim() !== '' && !isNaN(parseFloat(n)))
      .map((n) => parseFloat(n));

    if (validNumbers.length === 0) return null;

    const sorted = [...validNumbers].sort((a, b) => a - b);
    const sum = validNumbers.reduce((acc, val) => acc + val, 0);
    const mean = sum / validNumbers.length;

    // Median
    let median: number;
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
      median = (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      median = sorted[mid];
    }

    // Mode
    const frequency: { [key: number]: number } = {};
    validNumbers.forEach((num) => {
      frequency[num] = (frequency[num] || 0) + 1;
    });

    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency)
      .filter((key) => frequency[parseFloat(key)] === maxFreq)
      .map((key) => parseFloat(key));

    const mode = maxFreq > 1 ? modes : null;

    const min = Math.min(...validNumbers);
    const max = Math.max(...validNumbers);
    const range = max - min;

    return {
      mean,
      median,
      mode,
      range,
      sum,
      count: validNumbers.length,
      min,
      max,
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
          <span className="text-gray-700">Average Calculator</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Average Calculator</h1>

        {/* Calculator Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Enter Numbers
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {numbers.map((num, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="number"
                    value={num}
                    onChange={(e) => updateNumber(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`#${index + 1}`}
                  />
                  {numbers.length > 1 && (
                    <button
                      onClick={() => removeNumber(index)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      title="Remove"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addNumber}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              + Add Number
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Mean (Average)</div>
                  <div className="text-3xl font-bold text-blue-600">
                    {result.mean.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Median</div>
                  <div className="text-3xl font-bold text-blue-600">
                    {result.median.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">Mode</div>
                  <div className="text-xl font-semibold text-gray-800">
                    {result.mode
                      ? result.mode.map((m) => m.toLocaleString()).join(', ')
                      : 'None'}
                  </div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">Range</div>
                  <div className="text-xl font-semibold text-gray-800">
                    {result.range.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">Count</div>
                  <div className="text-xl font-semibold text-gray-800">
                    {result.count}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-blue-200">
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">Sum</div>
                  <div className="text-lg font-semibold text-gray-800">
                    {result.sum.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">Minimum</div>
                  <div className="text-lg font-semibold text-gray-800">
                    {result.min.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">Maximum</div>
                  <div className="text-lg font-semibold text-gray-800">
                    {result.max.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-blue-200 text-sm text-gray-700">
                <p className="font-medium mb-2">Calculations:</p>
                <p>Mean = Sum ÷ Count = {result.sum.toFixed(2)} ÷ {result.count} = {result.mean.toFixed(4)}</p>
                <p>Median = Middle value when sorted</p>
                {result.mode && <p>Mode = Most frequent value(s)</p>}
                <p>Range = Max - Min = {result.max.toFixed(2)} - {result.min.toFixed(2)} = {result.range.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>

        {/* Ad Placeholder */}
        <div className="bg-gray-100 rounded-lg p-8 mb-8 text-center text-gray-500">
          Advertisement Space
        </div>

        {/* About Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Average Calculator</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              The Average Calculator is a comprehensive statistical tool that calculates multiple measures of central
              tendency and spread for any set of numbers. Beyond just the mean (average), this calculator provides
              the median, mode, range, and other key statistics that give you a complete understanding of your data
              set. Simply enter your numbers and get instant results with detailed explanations.
            </p>
            <p>
              Understanding different types of averages is essential for analyzing data accurately. The mean is the
              sum of all values divided by the count, the median is the middle value when numbers are sorted, and the
              mode is the most frequently occurring value. Each measure tells a different story about your data. For
              instance, median is often more representative than mean when dealing with outliers or skewed data, while
              mode is useful for identifying the most common value in a dataset.
            </p>
            <p>
              This calculator is perfect for students working on math homework, teachers preparing lesson materials,
              researchers analyzing data sets, or anyone who needs to understand the statistical properties of a
              group of numbers. The tool also calculates the range (difference between highest and lowest values),
              which indicates data spread, along with sum, count, minimum, and maximum values for a complete statistical
              overview.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is the difference between mean, median, and mode?
              </h3>
              <p className="text-gray-700">
                Mean is the sum of all values divided by count. Median is the middle value when sorted. Mode is the
                most frequent value. Each provides different insights: mean can be affected by outliers, median is
                resistant to outliers, and mode shows the most common value.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                When should I use median instead of mean?
              </h3>
              <p className="text-gray-700">
                Use median when your data has outliers or is skewed. For example, median income is more representative
                than mean income because extremely high incomes can skew the mean upward. Median gives you the true
                middle value.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What does it mean when there is no mode?
              </h3>
              <p className="text-gray-700">
                When all numbers appear with the same frequency (typically once each), there is no mode. This indicates
                that no particular value is more common than others in your dataset.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can there be more than one mode?
              </h3>
              <p className="text-gray-700">
                Yes! A dataset can be bimodal (two modes) or multimodal (multiple modes) when several values appear
                with the same highest frequency. This calculator displays all modes when multiple values are equally
                common.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is the range and why is it useful?
              </h3>
              <p className="text-gray-700">
                Range is the difference between the maximum and minimum values. It gives a quick measure of how spread
                out your data is. A large range indicates high variability, while a small range suggests values are
                clustered closely together.
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
            <Link href="/math/gpa-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">GPA Calculator</h3>
              <p className="text-sm text-gray-600">Calculate your grade point average</p>
            </Link>
            <Link href="/math/fraction-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Fraction Calculator</h3>
              <p className="text-sm text-gray-600">Add, subtract, multiply, and divide fractions</p>
            </Link>
            <Link href="/everyday/discount-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Discount Calculator</h3>
              <p className="text-sm text-gray-600">Calculate discounts and final prices</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
