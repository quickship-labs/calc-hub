'use client';

import { useState } from 'react';
import Link from 'next/link';

type Category = 'length' | 'weight' | 'temperature' | 'volume' | 'speed';

interface ConversionFactors {
  [key: string]: number;
}

interface UnitConfig {
  name: string;
  baseUnit: string;
  units: string[];
  factors: ConversionFactors;
}

const conversionConfig: Record<Category, UnitConfig> = {
  length: {
    name: 'Length',
    baseUnit: 'm',
    units: ['mm', 'cm', 'm', 'km', 'in', 'ft', 'yd', 'mi'],
    factors: {
      mm: 0.001,
      cm: 0.01,
      m: 1,
      km: 1000,
      in: 0.0254,
      ft: 0.3048,
      yd: 0.9144,
      mi: 1609.344,
    },
  },
  weight: {
    name: 'Weight',
    baseUnit: 'g',
    units: ['mg', 'g', 'kg', 'oz', 'lb'],
    factors: {
      mg: 0.001,
      g: 1,
      kg: 1000,
      oz: 28.3495,
      lb: 453.592,
    },
  },
  temperature: {
    name: 'Temperature',
    baseUnit: 'C',
    units: ['°C', '°F', 'K'],
    factors: {}, // Temperature uses formulas instead
  },
  volume: {
    name: 'Volume',
    baseUnit: 'mL',
    units: ['mL', 'L', 'gal', 'qt', 'cup', 'fl oz'],
    factors: {
      mL: 1,
      L: 1000,
      gal: 3785.41,
      qt: 946.353,
      cup: 236.588,
      'fl oz': 29.5735,
    },
  },
  speed: {
    name: 'Speed',
    baseUnit: 'm/s',
    units: ['m/s', 'km/h', 'mph', 'knots'],
    factors: {
      'm/s': 1,
      'km/h': 0.277778,
      mph: 0.44704,
      knots: 0.514444,
    },
  },
};

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [value, setValue] = useState('');

  const convertTemperature = (value: number, from: string, to: string): number => {
    // Convert to Celsius first
    let celsius: number;
    if (from === '°C') {
      celsius = value;
    } else if (from === '°F') {
      celsius = (value - 32) * 5 / 9;
    } else { // Kelvin
      celsius = value - 273.15;
    }

    // Convert from Celsius to target
    if (to === '°C') {
      return celsius;
    } else if (to === '°F') {
      return celsius * 9 / 5 + 32;
    } else { // Kelvin
      return celsius + 273.15;
    }
  };

  const convert = (): number | null => {
    const val = parseFloat(value);
    if (isNaN(val)) return null;

    const config = conversionConfig[category];

    // Temperature uses formulas
    if (category === 'temperature') {
      return convertTemperature(val, fromUnit, toUnit);
    }

    // Other categories use factors
    const fromFactor = config.factors[fromUnit];
    const toFactor = config.factors[toUnit];

    if (!fromFactor || !toFactor) return null;

    // Convert to base unit, then to target unit
    const baseValue = val * fromFactor;
    const result = baseValue / toFactor;

    return result;
  };

  const result = convert();

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    const config = conversionConfig[newCategory];
    setFromUnit(config.units[0]);
    setToUnit(config.units[1]);
    setValue('');
  };

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const config = conversionConfig[category];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href="/everyday" className="text-blue-600 hover:text-blue-800">Everyday</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-700">Unit Converter</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Unit Converter</h1>

        {/* Calculator Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Category Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(conversionConfig) as Category[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    category === cat
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {conversionConfig[cat].name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* From Section */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Unit
                </label>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {config.units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Value
                </label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter value"
                  step="any"
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSwap}
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
                title="Swap units"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
              </button>
            </div>

            {/* To Section */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Unit
                </label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {config.units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Result
                </label>
                <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-green-50 border-green-300">
                  {result !== null ? (
                    <span className="text-xl font-bold text-green-600">
                      {result.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 6,
                      })}
                    </span>
                  ) : (
                    <span className="text-gray-400">Enter a value</span>
                  )}
                </div>
              </div>
            </div>

            {/* Conversion Display */}
            {result !== null && value && (
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <p className="text-lg text-gray-700">
                  <span className="font-bold text-blue-600">{value} {fromUnit}</span>
                  {' = '}
                  <span className="font-bold text-green-600">
                    {result.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 6,
                    })} {toUnit}
                  </span>
                </p>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Unit Converter</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              The Unit Converter is a comprehensive tool that helps you quickly convert between different units of
              measurement across five essential categories: length, weight, temperature, volume, and speed. Whether
              you're working on a home improvement project, following a recipe from another country, planning
              international travel, or studying science, this converter provides instant, accurate conversions between
              both metric and imperial units. The intuitive interface lets you switch between categories with a single
              click and swap units effortlessly using the swap button.
            </p>
            <p>
              Understanding unit conversions is crucial in our increasingly global world. Different countries use
              different measurement systems, and being able to convert between them helps with cooking, construction,
              travel planning, and scientific work. This converter handles the complex mathematics behind temperature
              conversions (which use formulas rather than simple multiplication) and provides precise results for all
              other unit types using standardized conversion factors. The tool displays results with appropriate
              precision, showing enough decimal places to be useful while avoiding unnecessary complexity.
            </p>
            <p>
              This multi-category converter eliminates the need for multiple specialized conversion tools or manual
              calculations. From converting miles to kilometers for trip planning, to converting Fahrenheit to Celsius
              for weather comparisons, to converting cups to milliliters for baking, this tool handles everyday
              conversion needs with speed and accuracy. The real-time calculation updates as you type, making it easy to
              explore different conversions and compare values across measurement systems instantly.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What's the difference between metric and imperial units?
              </h3>
              <p className="text-gray-700">
                Metric units (meters, liters, grams) are based on powers of 10 and are used in most countries worldwide.
                Imperial units (feet, gallons, pounds) are primarily used in the United States and have more complex
                conversion relationships. Metric is generally considered easier for calculations because of its decimal
                base.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Why does temperature conversion work differently?
              </h3>
              <p className="text-gray-700">
                Temperature scales (Celsius, Fahrenheit, Kelvin) don't have a simple multiplicative relationship like
                other units. They use different zero points and scales, requiring formulas for conversion. For example,
                Celsius to Fahrenheit requires multiplying by 9/5 and adding 32, not just multiplying by a single factor.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How accurate are these conversions?
              </h3>
              <p className="text-gray-700">
                The conversions use standard, internationally recognized conversion factors and are highly accurate for
                practical purposes. Results are displayed with up to 6 decimal places to ensure precision for scientific
                and engineering applications, though everyday use typically requires only 2-3 decimal places.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What's the difference between US and UK gallons?
              </h3>
              <p className="text-gray-700">
                This converter uses US gallons (3.785 liters). UK imperial gallons are larger at 4.546 liters. Similarly,
                US and UK fluid ounces differ slightly. Always verify which measurement system a recipe or instruction is
                using, especially when dealing with older British sources.
              </p>
            </div>
          </div>
        </section>

        {/* Related Calculators */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/everyday/fuel-cost-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Fuel Cost Calculator</h3>
              <p className="text-sm text-gray-600">Calculate trip fuel costs</p>
            </Link>
            <Link href="/everyday/discount-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Discount Calculator</h3>
              <p className="text-sm text-gray-600">Calculate sale prices and savings</p>
            </Link>
            <Link href="/math/percentage-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Percentage Calculator</h3>
              <p className="text-sm text-gray-600">Calculate percentages and ratios</p>
            </Link>
            <Link href="/health/bmi-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">BMI Calculator</h3>
              <p className="text-sm text-gray-600">Calculate body mass index</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
