'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function IdealWeightCalculator() {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [bodyFrame, setBodyFrame] = useState<'small' | 'medium' | 'large'>('medium');

  // Imperial inputs
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');

  // Metric inputs
  const [heightCm, setHeightCm] = useState('');

  const calculateIdealWeights = () => {
    let heightInInches: number;

    if (unit === 'imperial') {
      const feet = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      heightInInches = feet * 12 + inches;
    } else {
      const cm = parseFloat(heightCm);
      if (isNaN(cm)) return null;
      heightInInches = cm / 2.54;
    }

    if (heightInInches <= 60) return null; // Must be taller than 5 feet

    // All formulas calculate weight in kg for height in inches
    const heightAbove60 = heightInInches - 60;

    // Devine Formula
    const devine = gender === 'male'
      ? 50 + 2.3 * heightAbove60
      : 45.5 + 2.3 * heightAbove60;

    // Robinson Formula
    const robinson = gender === 'male'
      ? 52 + 1.9 * heightAbove60
      : 49 + 1.7 * heightAbove60;

    // Miller Formula
    const miller = gender === 'male'
      ? 56.2 + 1.41 * heightAbove60
      : 53.1 + 1.36 * heightAbove60;

    // Hamwi Formula
    const hamwi = gender === 'male'
      ? 48 + 2.7 * heightAbove60
      : 45.5 + 2.2 * heightAbove60;

    return { devine, robinson, miller, hamwi };
  };

  const getHealthyBMIRange = () => {
    let heightInInches: number;

    if (unit === 'imperial') {
      const feet = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      heightInInches = feet * 12 + inches;
    } else {
      const cm = parseFloat(heightCm);
      if (isNaN(cm)) return null;
      heightInInches = cm / 2.54;
    }

    if (heightInInches <= 0) return null;

    const heightMeters = heightInInches * 0.0254;
    const minWeight = 18.5 * heightMeters * heightMeters;
    const maxWeight = 24.9 * heightMeters * heightMeters;

    return { minWeight, maxWeight };
  };

  const formatWeight = (weightKg: number) => {
    if (unit === 'imperial') {
      return `${(weightKg * 2.20462).toFixed(1)} lbs`;
    } else {
      return `${weightKg.toFixed(1)} kg`;
    }
  };

  const weights = calculateIdealWeights();
  const bmiRange = getHealthyBMIRange();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href="/health" className="text-blue-600 hover:text-blue-800">Health</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-700">Ideal Weight Calculator</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Ideal Weight Calculator</h1>

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

          <div className="space-y-6">
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="male"
                    checked={gender === 'male'}
                    onChange={(e) => setGender(e.target.value as 'male')}
                    className="mr-2"
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="female"
                    checked={gender === 'female'}
                    onChange={(e) => setGender(e.target.value as 'female')}
                    className="mr-2"
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>

            {/* Imperial Height */}
            {unit === 'imperial' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Feet"
                    min="0"
                  />
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
            )}

            {/* Metric Height */}
            {unit === 'metric' && (
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
            )}

            {/* Body Frame (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Body Frame (Optional)
              </label>
              <select
                value={bodyFrame}
                onChange={(e) => setBodyFrame(e.target.value as 'small' | 'medium' | 'large')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="small">Small Frame</option>
                <option value="medium">Medium Frame</option>
                <option value="large">Large Frame</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Frame size can affect ideal weight. Small frames typically have lower ideal weights, large frames higher.
              </p>
            </div>
          </div>

          {/* Results */}
          {weights && bmiRange && (
            <div className="mt-8 space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ideal Weight Estimates</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <div>
                      <div className="font-semibold text-gray-900">Devine Formula</div>
                      <div className="text-xs text-gray-600">Most widely used formula</div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatWeight(weights.devine)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <div>
                      <div className="font-semibold text-gray-900">Robinson Formula</div>
                      <div className="text-xs text-gray-600">Modified version of Devine</div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatWeight(weights.robinson)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <div>
                      <div className="font-semibold text-gray-900">Miller Formula</div>
                      <div className="text-xs text-gray-600">Alternative calculation method</div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatWeight(weights.miller)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <div>
                      <div className="font-semibold text-gray-900">Hamwi Formula</div>
                      <div className="text-xs text-gray-600">Used in clinical settings</div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatWeight(weights.hamwi)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Average */}
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="text-sm text-gray-600 mb-2">Average Ideal Weight</div>
                <div className="text-4xl font-bold text-green-600">
                  {formatWeight((weights.devine + weights.robinson + weights.miller + weights.hamwi) / 4)}
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  Average of all four formulas
                </div>
              </div>

              {/* Healthy BMI Range */}
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Healthy Weight Range (BMI 18.5-24.9)</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {formatWeight(bmiRange.minWeight)} - {formatWeight(bmiRange.maxWeight)}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Weight range for healthy BMI at your height
                  </p>
                </div>
              </div>

              {/* Frame Adjustment Note */}
              {bodyFrame !== 'medium' && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Frame Adjustment:</strong> For a {bodyFrame} frame, your ideal weight may be{' '}
                    {bodyFrame === 'small' ? 'about 10% lower' : 'about 10% higher'} than the average estimates shown.
                    Consider the {bodyFrame === 'small' ? 'lower' : 'upper'} end of the healthy BMI range.
                  </p>
                </div>
              )}

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> These formulas provide general estimates. Ideal weight varies based on
                  body composition, muscle mass, bone density, and overall health. The healthy BMI range offers
                  a broader target. Consult healthcare professionals for personalized guidance.
                </p>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Ideal Weight Calculator</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              Our ideal weight calculator uses four scientifically-recognized formulas to estimate healthy body weight
              based on your height and gender. The Devine formula, developed in 1974, is the most widely used method
              and was originally created for calculating medication dosages. The Robinson, Miller, and Hamwi formulas
              are variations that provide alternative perspectives on ideal weight. By showing results from all four
              formulas plus an average, you get a comprehensive view of your ideal weight range rather than relying
              on a single calculation.
            </p>
            <p>
              It's important to understand that "ideal weight" is not a single number but rather a range. These
              formulas were developed using population averages and don't account for individual variations in body
              composition, muscle mass, bone density, or overall health. The calculator also displays the healthy
              weight range based on BMI (18.5-24.9), which provides additional context. Your body frame size can
              influence where you fall within these ranges - people with small frames typically have lower ideal
              weights, while those with large frames may have higher ideal weights.
            </p>
            <p>
              Use these calculations as general guidelines rather than absolute targets. Factors like athletic build,
              muscle development, age, and overall fitness level significantly impact what constitutes a healthy weight
              for you personally. Two people of the same height and gender can both be at healthy weights despite
              different numbers on the scale if they have different body compositions. Focus on overall health markers
              like energy levels, fitness, and medical health indicators. Always consult with healthcare professionals
              for personalized weight and health assessments tailored to your individual circumstances.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Why do the different formulas give different results?
              </h3>
              <p className="text-gray-700">
                Each formula was developed by different researchers using different methodologies and populations.
                They represent various approaches to estimating ideal weight. The variations show that ideal weight
                is a range, not a single number. Looking at multiple formulas provides a more complete picture.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Which formula is most accurate?
              </h3>
              <p className="text-gray-700">
                The Devine formula is most widely used in medical settings, but no single formula is definitively
                "most accurate" for everyone. Each person's ideal weight depends on individual factors like body
                composition and health status. The average of all formulas often provides a reasonable target.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do I determine my body frame size?
              </h3>
              <p className="text-gray-700">
                Body frame size can be estimated by measuring wrist circumference or elbow breadth. Generally,
                people with smaller bone structure have small frames, while those with larger bone structure have
                large frames. If you can wrap your thumb and middle finger around your wrist with overlap, you
                likely have a small frame.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What if I'm very muscular or athletic?
              </h3>
              <p className="text-gray-700">
                These formulas don't account for muscle mass, which weighs more than fat. Athletes and very muscular
                individuals may have healthy weights above these estimates. In such cases, body composition measurements
                and body fat percentage are better health indicators than weight alone.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Should I try to reach my calculated ideal weight?
              </h3>
              <p className="text-gray-700">
                Use these numbers as general references, not strict goals. Focus on achieving a weight where you
                feel healthy, energetic, and can maintain good health markers (blood pressure, cholesterol, etc.).
                A weight within the healthy BMI range that you can maintain comfortably is better than striving
                for a specific number that may not suit your body.
              </p>
            </div>
          </div>
        </section>

        {/* Related Calculators */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/health/bmi-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">BMI Calculator</h3>
              <p className="text-sm text-gray-600">Calculate your Body Mass Index</p>
            </Link>
            <Link href="/health/body-fat-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Body Fat Calculator</h3>
              <p className="text-sm text-gray-600">Estimate your body fat percentage</p>
            </Link>
            <Link href="/health/calorie-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Calorie Calculator</h3>
              <p className="text-sm text-gray-600">Calculate your daily calorie needs (TDEE)</p>
            </Link>
            <Link href="/fitness/macro-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Macro Calculator</h3>
              <p className="text-sm text-gray-600">Calculate protein, carbs, and fat needs</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
