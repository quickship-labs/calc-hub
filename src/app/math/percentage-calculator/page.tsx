'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PercentageCalculator() {
  const [mode, setMode] = useState<'what-is' | 'is-what' | 'change'>('what-is');

  // Mode 1: What is X% of Y?
  const [percentOf, setPercentOf] = useState('');
  const [numberOf, setNumberOf] = useState('');

  // Mode 2: X is what percent of Y?
  const [partIs, setPartIs] = useState('');
  const [wholeIs, setWholeIs] = useState('');

  // Mode 3: Percentage change
  const [originalValue, setOriginalValue] = useState('');
  const [newValue, setNewValue] = useState('');

  const calculateMode1 = () => {
    const percent = parseFloat(percentOf);
    const number = parseFloat(numberOf);
    if (isNaN(percent) || isNaN(number)) return null;
    return (percent / 100) * number;
  };

  const calculateMode2 = () => {
    const part = parseFloat(partIs);
    const whole = parseFloat(wholeIs);
    if (isNaN(part) || isNaN(whole) || whole === 0) return null;
    return (part / whole) * 100;
  };

  const calculateMode3 = () => {
    const original = parseFloat(originalValue);
    const newVal = parseFloat(newValue);
    if (isNaN(original) || isNaN(newVal) || original === 0) return null;
    return ((newVal - original) / original) * 100;
  };

  const result1 = calculateMode1();
  const result2 = calculateMode2();
  const result3 = calculateMode3();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href="/math" className="text-blue-600 hover:text-blue-800">Math</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-700">Percentage Calculator</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Percentage Calculator</h1>

        {/* Calculator Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Mode Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
            <button
              onClick={() => setMode('what-is')}
              className={`px-4 py-2 font-medium transition-colors ${
                mode === 'what-is'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              What is X% of Y?
            </button>
            <button
              onClick={() => setMode('is-what')}
              className={`px-4 py-2 font-medium transition-colors ${
                mode === 'is-what'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              X is what % of Y?
            </button>
            <button
              onClick={() => setMode('change')}
              className={`px-4 py-2 font-medium transition-colors ${
                mode === 'change'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Percentage Change
            </button>
          </div>

          {/* Mode 1: What is X% of Y? */}
          {mode === 'what-is' && (
            <div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Percentage (%)
                  </label>
                  <input
                    type="number"
                    value={percentOf}
                    onChange={(e) => setPercentOf(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter percentage"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Of Number
                  </label>
                  <input
                    type="number"
                    value={numberOf}
                    onChange={(e) => setNumberOf(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter number"
                  />
                </div>
              </div>

              {result1 !== null && (
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <div className="text-sm text-gray-600 mb-2">Result</div>
                    <div className="text-4xl font-bold text-blue-600">
                      {result1.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p className="font-medium">Step-by-step:</p>
                    <p>1. Convert percentage to decimal: {percentOf}% = {percentOf}/100 = {parseFloat(percentOf) / 100}</p>
                    <p>2. Multiply by the number: {parseFloat(percentOf) / 100} × {numberOf} = {result1.toFixed(2)}</p>
                    <p className="font-medium mt-2">{percentOf}% of {numberOf} is {result1.toFixed(2)}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mode 2: X is what % of Y? */}
          {mode === 'is-what' && (
            <div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Part (X)
                  </label>
                  <input
                    type="number"
                    value={partIs}
                    onChange={(e) => setPartIs(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter part"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Whole (Y)
                  </label>
                  <input
                    type="number"
                    value={wholeIs}
                    onChange={(e) => setWholeIs(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter whole"
                  />
                </div>
              </div>

              {result2 !== null && (
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <div className="text-sm text-gray-600 mb-2">Result</div>
                    <div className="text-4xl font-bold text-blue-600">
                      {result2.toLocaleString(undefined, { maximumFractionDigits: 2 })}%
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p className="font-medium">Step-by-step:</p>
                    <p>1. Divide the part by the whole: {partIs} ÷ {wholeIs} = {(parseFloat(partIs) / parseFloat(wholeIs)).toFixed(4)}</p>
                    <p>2. Multiply by 100 to get percentage: {(parseFloat(partIs) / parseFloat(wholeIs)).toFixed(4)} × 100 = {result2.toFixed(2)}%</p>
                    <p className="font-medium mt-2">{partIs} is {result2.toFixed(2)}% of {wholeIs}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mode 3: Percentage Change */}
          {mode === 'change' && (
            <div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Value
                  </label>
                  <input
                    type="number"
                    value={originalValue}
                    onChange={(e) => setOriginalValue(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter original value"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Value
                  </label>
                  <input
                    type="number"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter new value"
                  />
                </div>
              </div>

              {result3 !== null && (
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <div className="text-sm text-gray-600 mb-2">
                      Percentage {result3 >= 0 ? 'Increase' : 'Decrease'}
                    </div>
                    <div className={`text-4xl font-bold ${result3 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result3 >= 0 ? '+' : ''}{result3.toLocaleString(undefined, { maximumFractionDigits: 2 })}%
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p className="font-medium">Step-by-step:</p>
                    <p>1. Calculate the difference: {newValue} - {originalValue} = {parseFloat(newValue) - parseFloat(originalValue)}</p>
                    <p>2. Divide by original value: {parseFloat(newValue) - parseFloat(originalValue)} ÷ {originalValue} = {((parseFloat(newValue) - parseFloat(originalValue)) / parseFloat(originalValue)).toFixed(4)}</p>
                    <p>3. Multiply by 100: {((parseFloat(newValue) - parseFloat(originalValue)) / parseFloat(originalValue)).toFixed(4)} × 100 = {result3.toFixed(2)}%</p>
                    <p className="font-medium mt-2">
                      {result3 >= 0 ? 'Increase' : 'Decrease'} of {Math.abs(result3).toFixed(2)}%
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Ad Placeholder */}
        <div className="bg-gray-100 rounded-lg p-8 mb-8 text-center text-gray-500">
          Advertisement Space
        </div>

        {/* About Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Percentage Calculator</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              Our percentage calculator is a versatile tool that handles all common percentage calculations with ease.
              Whether you need to find what percentage one number is of another, calculate a percentage of a value,
              or determine percentage change, this calculator provides instant results with detailed step-by-step explanations.
            </p>
            <p>
              Percentages are fundamental in everyday life, from calculating discounts and sales tax to understanding
              statistics and financial data. The percentage calculator supports three essential calculation modes:
              finding a percentage of a number (useful for tips and discounts), determining what percentage one number
              represents of another (great for test scores and ratios), and calculating percentage change (perfect for
              tracking growth or decline in investments, sales, or any metric over time).
            </p>
            <p>
              Each calculation includes a clear breakdown of the mathematical process, helping you understand not just
              the answer but how it was derived. This makes the calculator an excellent learning tool for students while
              remaining practical for professionals who need quick, accurate percentage calculations in their daily work.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do you calculate a percentage of a number?
              </h3>
              <p className="text-gray-700">
                To find a percentage of a number, divide the percentage by 100 to convert it to a decimal,
                then multiply by the number. For example, 25% of 80 = (25 ÷ 100) × 80 = 0.25 × 80 = 20.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is the formula for percentage change?
              </h3>
              <p className="text-gray-700">
                Percentage change = ((New Value - Original Value) ÷ Original Value) × 100. A positive result
                indicates an increase, while a negative result shows a decrease.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do I find what percent one number is of another?
              </h3>
              <p className="text-gray-700">
                Divide the first number by the second number, then multiply by 100. For example, to find what
                percent 15 is of 60: (15 ÷ 60) × 100 = 0.25 × 100 = 25%.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can percentages exceed 100%?
              </h3>
              <p className="text-gray-700">
                Yes, percentages can exceed 100%. This commonly occurs in percentage change calculations when
                something more than doubles in value, or when comparing a larger number to a smaller one.
              </p>
            </div>
          </div>
        </section>

        {/* Related Calculators */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/math/fraction-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Fraction Calculator</h3>
              <p className="text-sm text-gray-600">Add, subtract, multiply, and divide fractions</p>
            </Link>
            <Link href="/math/average-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Average Calculator</h3>
              <p className="text-sm text-gray-600">Calculate mean, median, mode, and range</p>
            </Link>
            <Link href="/math/gpa-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">GPA Calculator</h3>
              <p className="text-sm text-gray-600">Calculate your grade point average</p>
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
