'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BMICalculator() {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');

  // Imperial inputs
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weightLbs, setWeightLbs] = useState('');

  // Metric inputs
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');

  const calculateBMI = () => {
    let heightMeters: number;
    let weightKilograms: number;

    if (unit === 'imperial') {
      const feet = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      const totalInches = feet * 12 + inches;
      const lbs = parseFloat(weightLbs);

      if (totalInches === 0 || isNaN(lbs)) return null;

      heightMeters = totalInches * 0.0254;
      weightKilograms = lbs * 0.453592;
    } else {
      const cm = parseFloat(heightCm);
      const kg = parseFloat(weightKg);

      if (isNaN(cm) || isNaN(kg) || cm === 0) return null;

      heightMeters = cm / 100;
      weightKilograms = kg;
    }

    const bmi = weightKilograms / (heightMeters * heightMeters);
    return bmi;
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (bmi < 25) return { label: 'Normal weight', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { label: 'Obese', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const getHealthyWeightRange = () => {
    let heightMeters: number;

    if (unit === 'imperial') {
      const feet = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      const totalInches = feet * 12 + inches;
      if (totalInches === 0) return null;
      heightMeters = totalInches * 0.0254;
    } else {
      const cm = parseFloat(heightCm);
      if (isNaN(cm) || cm === 0) return null;
      heightMeters = cm / 100;
    }

    const minWeight = 18.5 * heightMeters * heightMeters;
    const maxWeight = 24.9 * heightMeters * heightMeters;

    if (unit === 'imperial') {
      return {
        min: (minWeight * 2.20462).toFixed(1),
        max: (maxWeight * 2.20462).toFixed(1),
        unit: 'lbs'
      };
    } else {
      return {
        min: minWeight.toFixed(1),
        max: maxWeight.toFixed(1),
        unit: 'kg'
      };
    }
  };

  const bmi = calculateBMI();
  const category = bmi ? getBMICategory(bmi) : null;
  const healthyRange = getHealthyWeightRange();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href="/health" className="text-blue-600 hover:text-blue-800">Health</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-700">BMI Calculator</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">BMI Calculator</h1>

        {/* Calculator Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Unit Toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-lg border border-gray-300 p-1">
              <button
                onClick={() => setUnit('imperial')}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  unit === 'imperial'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Imperial
              </button>
              <button
                onClick={() => setUnit('metric')}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  unit === 'metric'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Metric
              </button>
            </div>
          </div>

          {/* Imperial Inputs */}
          {unit === 'imperial' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Feet"
                      min="0"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={heightInches}
                      onChange={(e) => setHeightInches(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Inches"
                      min="0"
                      max="11"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (lbs)
                </label>
                <input
                  type="number"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter weight in pounds"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
          )}

          {/* Metric Inputs */}
          {unit === 'metric' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter height in centimeters"
                  min="0"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter weight in kilograms"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
          )}

          {/* Results */}
          {bmi !== null && category && (
            <div className="mt-8 space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-600 mb-2">Your BMI</div>
                  <div className="text-5xl font-bold text-blue-600 mb-4">
                    {bmi.toFixed(1)}
                  </div>
                  <span className={`inline-block px-4 py-2 rounded-full font-semibold ${category.color} ${category.bgColor}`}>
                    {category.label}
                  </span>
                </div>
              </div>

              {/* BMI Scale Visual */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700 mb-3">BMI Scale</div>
                <div className="relative h-8 rounded-lg overflow-hidden flex">
                  <div className="w-1/4 bg-yellow-300 flex items-center justify-center text-xs font-semibold text-gray-700">
                    &lt;18.5
                  </div>
                  <div className="w-1/4 bg-green-400 flex items-center justify-center text-xs font-semibold text-gray-700">
                    18.5-24.9
                  </div>
                  <div className="w-1/4 bg-orange-400 flex items-center justify-center text-xs font-semibold text-gray-700">
                    25-29.9
                  </div>
                  <div className="w-1/4 bg-red-400 flex items-center justify-center text-xs font-semibold text-gray-700">
                    30+
                  </div>
                </div>
                <div className="text-xs text-gray-600 grid grid-cols-4 text-center mt-1">
                  <div>Underweight</div>
                  <div>Normal</div>
                  <div>Overweight</div>
                  <div>Obese</div>
                </div>
              </div>

              {/* Healthy Weight Range */}
              {healthyRange && (
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Healthy Weight Range for Your Height</div>
                  <div className="text-2xl font-bold text-green-600">
                    {healthyRange.min} - {healthyRange.max} {healthyRange.unit}
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the BMI Calculator</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              The Body Mass Index (BMI) calculator is a widely used tool for assessing whether your weight is within
              a healthy range for your height. BMI is calculated by dividing your weight in kilograms by the square
              of your height in meters. This simple measurement provides a quick screening tool to categorize
              individuals as underweight, normal weight, overweight, or obese.
            </p>
            <p>
              While BMI is a useful general indicator, it's important to understand its limitations. BMI doesn't
              distinguish between muscle mass and fat mass, so athletes with high muscle mass may be categorized
              as overweight despite having low body fat. Similarly, older adults who have lost muscle mass might
              fall into the normal range despite having higher body fat percentages. BMI also doesn't account for
              bone density, overall body composition, or fat distribution.
            </p>
            <p>
              Our BMI calculator supports both imperial and metric units for your convenience, automatically
              calculating your BMI and providing your category classification. It also shows you the healthy
              weight range for your height based on BMI guidelines. Use this tool as a starting point for
              understanding your weight status, but always consult with healthcare professionals for personalized
              health assessments and advice.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is a healthy BMI range?
              </h3>
              <p className="text-gray-700">
                A healthy BMI typically falls between 18.5 and 24.9. A BMI below 18.5 is considered underweight,
                25-29.9 is overweight, and 30 or above is classified as obese. However, these ranges should be
                interpreted with consideration of individual factors like age, muscle mass, and overall health.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How accurate is BMI as a health indicator?
              </h3>
              <p className="text-gray-700">
                BMI is a useful screening tool but not a diagnostic measure. It doesn't account for muscle mass,
                bone density, or fat distribution. Athletes may have high BMIs due to muscle mass, while some
                individuals with normal BMI may still have unhealthy body fat levels. It's best used alongside
                other health assessments.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Does BMI differ for men and women?
              </h3>
              <p className="text-gray-700">
                The BMI formula is the same for both men and women, though women typically have more body fat
                than men at the same BMI. Some experts suggest considering gender-specific interpretations, but
                the standard BMI categories are applied to both sexes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I use BMI for children?
              </h3>
              <p className="text-gray-700">
                BMI can be calculated for children, but it's interpreted differently using age and sex-specific
                percentile charts. Children's BMI is compared to growth charts because body composition changes
                as they develop. Always consult a pediatrician for children's weight assessments.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What should I do if my BMI is outside the normal range?
              </h3>
              <p className="text-gray-700">
                If your BMI is outside the healthy range, consult with a healthcare provider. They can assess
                your overall health, body composition, and risk factors. They may recommend lifestyle changes,
                nutrition counseling, or further testing to develop a personalized health plan.
              </p>
            </div>
          </div>
        </section>

        {/* Related Calculators */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/health/body-fat-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Body Fat Calculator</h3>
              <p className="text-sm text-gray-600">Estimate your body fat percentage using measurements</p>
            </Link>
            <Link href="/health/calorie-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Calorie Calculator</h3>
              <p className="text-sm text-gray-600">Calculate your daily calorie needs (TDEE)</p>
            </Link>
            <Link href="/health/ideal-weight-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Ideal Weight Calculator</h3>
              <p className="text-sm text-gray-600">Find your ideal body weight using multiple formulas</p>
            </Link>
            <Link href="/fitness/macro-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Macro Calculator</h3>
              <p className="text-sm text-gray-600">Calculate your daily macronutrient needs</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
