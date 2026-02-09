'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BodyFatCalculator() {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  // Imperial inputs
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [waistInches, setWaistInches] = useState('');
  const [neckInches, setNeckInches] = useState('');
  const [hipInches, setHipInches] = useState('');
  const [weightLbs, setWeightLbs] = useState('');

  // Metric inputs
  const [heightCm, setHeightCm] = useState('');
  const [waistCm, setWaistCm] = useState('');
  const [neckCm, setNeckCm] = useState('');
  const [hipCm, setHipCm] = useState('');
  const [weightKg, setWeightKg] = useState('');

  const calculateBodyFat = () => {
    let heightValue: number;
    let waistValue: number;
    let neckValue: number;
    let hipValue: number;
    let weightValue: number;

    if (unit === 'imperial') {
      const feet = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      heightValue = feet * 12 + inches;
      waistValue = parseFloat(waistInches);
      neckValue = parseFloat(neckInches);
      hipValue = parseFloat(hipInches);
      weightValue = parseFloat(weightLbs);

      if (heightValue === 0 || isNaN(waistValue) || isNaN(neckValue) || isNaN(weightValue)) return null;
      if (gender === 'female' && isNaN(hipValue)) return null;
    } else {
      heightValue = parseFloat(heightCm) / 2.54; // Convert to inches for formula
      waistValue = parseFloat(waistCm) / 2.54;
      neckValue = parseFloat(neckCm) / 2.54;
      hipValue = parseFloat(hipCm) / 2.54;
      weightValue = parseFloat(weightKg);

      if (isNaN(heightValue) || isNaN(waistValue) || isNaN(neckValue) || isNaN(weightValue)) return null;
      if (gender === 'female' && isNaN(hipValue)) return null;
    }

    // US Navy Body Fat Formula (all measurements in inches)
    let bodyFatPercentage: number;

    if (gender === 'male') {
      bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waistValue - neckValue) + 0.15456 * Math.log10(heightValue)) - 450;
    } else {
      bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waistValue + hipValue - neckValue) + 0.22100 * Math.log10(heightValue)) - 450;
    }

    // Calculate fat mass and lean mass
    const weightInKg = unit === 'imperial' ? weightValue * 0.453592 : weightValue;
    const fatMassKg = weightInKg * (bodyFatPercentage / 100);
    const leanMassKg = weightInKg - fatMassKg;

    return {
      bodyFatPercentage,
      fatMassKg,
      leanMassKg,
      weightInKg
    };
  };

  const getBodyFatCategory = (percentage: number, gender: 'male' | 'female') => {
    if (gender === 'male') {
      if (percentage < 6) return { label: 'Essential Fat', color: 'text-red-600', bgColor: 'bg-red-100', description: 'Too low - health risks' };
      if (percentage < 14) return { label: 'Athletes', color: 'text-blue-600', bgColor: 'bg-blue-100', description: 'Athletic performance range' };
      if (percentage < 18) return { label: 'Fitness', color: 'text-green-600', bgColor: 'bg-green-100', description: 'Good fitness level' };
      if (percentage < 25) return { label: 'Average', color: 'text-yellow-600', bgColor: 'bg-yellow-100', description: 'Acceptable range' };
      return { label: 'Obese', color: 'text-orange-600', bgColor: 'bg-orange-100', description: 'Above healthy range' };
    } else {
      if (percentage < 14) return { label: 'Essential Fat', color: 'text-red-600', bgColor: 'bg-red-100', description: 'Too low - health risks' };
      if (percentage < 21) return { label: 'Athletes', color: 'text-blue-600', bgColor: 'bg-blue-100', description: 'Athletic performance range' };
      if (percentage < 25) return { label: 'Fitness', color: 'text-green-600', bgColor: 'bg-green-100', description: 'Good fitness level' };
      if (percentage < 32) return { label: 'Average', color: 'text-yellow-600', bgColor: 'bg-yellow-100', description: 'Acceptable range' };
      return { label: 'Obese', color: 'text-orange-600', bgColor: 'bg-orange-100', description: 'Above healthy range' };
    }
  };

  const formatWeight = (weightKg: number) => {
    if (unit === 'imperial') {
      return `${(weightKg * 2.20462).toFixed(1)} lbs`;
    } else {
      return `${weightKg.toFixed(1)} kg`;
    }
  };

  const result = calculateBodyFat();
  const category = result ? getBodyFatCategory(result.bodyFatPercentage, gender) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href="/health" className="text-blue-600 hover:text-blue-800">Health</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-700">Body Fat Calculator</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Body Fat Calculator</h1>

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

            {/* Imperial Inputs */}
            {unit === 'imperial' && (
              <>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Waist Circumference (inches)
                  </label>
                  <input
                    type="number"
                    value={waistInches}
                    onChange={(e) => setWaistInches(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Measure at navel level"
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Measure around your waist at navel level</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Neck Circumference (inches)
                  </label>
                  <input
                    type="number"
                    value={neckInches}
                    onChange={(e) => setNeckInches(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Measure below Adam's apple"
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Measure around your neck below the larynx</p>
                </div>
                {gender === 'female' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hip Circumference (inches)
                    </label>
                    <input
                      type="number"
                      value={hipInches}
                      onChange={(e) => setHipInches(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Measure at widest point"
                      min="0"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Measure around the widest part of your hips</p>
                  </div>
                )}
              </>
            )}

            {/* Metric Inputs */}
            {unit === 'metric' && (
              <>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Waist Circumference (cm)
                  </label>
                  <input
                    type="number"
                    value={waistCm}
                    onChange={(e) => setWaistCm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Measure at navel level"
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Measure around your waist at navel level</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Neck Circumference (cm)
                  </label>
                  <input
                    type="number"
                    value={neckCm}
                    onChange={(e) => setNeckCm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Measure below Adam's apple"
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Measure around your neck below the larynx</p>
                </div>
                {gender === 'female' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hip Circumference (cm)
                    </label>
                    <input
                      type="number"
                      value={hipCm}
                      onChange={(e) => setHipCm(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Measure at widest point"
                      min="0"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Measure around the widest part of your hips</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Results */}
          {result && category && (
            <div className="mt-8 space-y-6">
              {/* Body Fat Percentage */}
              <div className="bg-purple-50 rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-600 mb-2">Body Fat Percentage</div>
                  <div className="text-5xl font-bold text-purple-600 mb-4">
                    {result.bodyFatPercentage.toFixed(1)}%
                  </div>
                  <span className={`inline-block px-4 py-2 rounded-full font-semibold ${category.color} ${category.bgColor}`}>
                    {category.label}
                  </span>
                  <div className="text-sm text-gray-600 mt-2">{category.description}</div>
                </div>
              </div>

              {/* Body Composition */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <div className="text-sm text-gray-600 mb-2">Fat Mass</div>
                  <div className="text-3xl font-bold text-blue-600">
                    {formatWeight(result.fatMassKg)}
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-6 text-center">
                  <div className="text-sm text-gray-600 mb-2">Lean Mass</div>
                  <div className="text-3xl font-bold text-green-600">
                    {formatWeight(result.leanMassKg)}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="text-sm text-gray-600 mb-2">Total Weight</div>
                  <div className="text-3xl font-bold text-gray-600">
                    {formatWeight(result.weightInKg)}
                  </div>
                </div>
              </div>

              {/* Body Fat Categories Chart */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Body Fat Categories</h3>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    {gender === 'male' ? 'Men' : 'Women'}
                  </div>
                  {gender === 'male' ? (
                    <>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-700">Essential Fat</span>
                        <span className="font-semibold text-red-600">2-5%</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-700">Athletes</span>
                        <span className="font-semibold text-blue-600">6-13%</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-700">Fitness</span>
                        <span className="font-semibold text-green-600">14-17%</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-700">Average</span>
                        <span className="font-semibold text-yellow-600">18-24%</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-700">Obese</span>
                        <span className="font-semibold text-orange-600">25%+</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-700">Essential Fat</span>
                        <span className="font-semibold text-red-600">10-13%</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-700">Athletes</span>
                        <span className="font-semibold text-blue-600">14-20%</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-700">Fitness</span>
                        <span className="font-semibold text-green-600">21-24%</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-700">Average</span>
                        <span className="font-semibold text-yellow-600">25-31%</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-700">Obese</span>
                        <span className="font-semibold text-orange-600">32%+</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> This calculator uses the US Navy method, which is an estimation based on
                  body measurements. For the most accurate body fat measurement, consider professional methods like
                  DEXA scans, hydrostatic weighing, or bioelectrical impedance analysis. Always consult healthcare
                  professionals for personalized health assessments.
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Body Fat Calculator</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              Our body fat calculator uses the U.S. Navy Circumference Method to estimate your body fat percentage
              based on simple measurements you can take at home with a tape measure. This method was developed by
              the military to provide a practical way to assess body composition without expensive equipment. Unlike
              BMI, which only considers height and weight, body fat percentage provides insight into your actual body
              composition by distinguishing between fat mass and lean mass (muscle, bone, organs, and water).
            </p>
            <p>
              The calculator requires different measurements for men and women because of natural differences in body
              composition and fat distribution. For men, you'll measure height, neck, and waist. For women, hip
              measurement is added because women typically carry more fat in the hip area. The calculator then uses
              these measurements with logarithmic formulas to estimate body fat percentage. It also calculates your
              fat mass and lean mass, helping you understand your body composition beyond just total weight.
            </p>
            <p>
              Body fat percentage is often a better health indicator than weight or BMI alone. Two people can weigh
              the same but have very different body compositions - one might be muscular with low body fat, while
              another might have less muscle and more fat. Understanding your body fat percentage helps you set
              appropriate fitness goals and track meaningful changes in body composition. However, remember that the
              Navy method provides estimates. For the most accurate measurements, consider professional methods like
              DEXA scans or hydrostatic weighing. Use this calculator as a convenient tracking tool and always
              consult healthcare or fitness professionals for comprehensive health assessments.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How accurate is the US Navy body fat method?
              </h3>
              <p className="text-gray-700">
                The US Navy method provides reasonable estimates with an accuracy of about ±3-4% when compared to
                more precise methods. Accuracy depends on taking measurements correctly and consistently. While not
                as precise as DEXA scans or hydrostatic weighing, it's a practical and cost-free method for tracking
                changes over time.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do I measure myself correctly?
              </h3>
              <p className="text-gray-700">
                Use a flexible tape measure and stand relaxed. For waist, measure at navel level without sucking in.
                For neck, measure below the Adam's apple at the smallest point. For hips (women), measure at the
                widest point. Keep the tape snug but not tight. Measure at the same time of day for consistency.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is a healthy body fat percentage?
              </h3>
              <p className="text-gray-700">
                For men, 14-24% is generally considered healthy, with athletes often between 6-13%. For women, 21-31%
                is healthy, with athletes typically at 14-20%. Essential fat (necessary for basic functions) is about
                2-5% for men and 10-13% for women. Going too low can be dangerous, while excessive body fat increases
                health risks.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Why is body fat percentage better than BMI?
              </h3>
              <p className="text-gray-700">
                Body fat percentage distinguishes between fat and muscle, while BMI only uses height and weight. A
                muscular person might have a high BMI but low body fat. Conversely, someone with normal BMI might
                have high body fat and low muscle mass. Body fat percentage provides better insight into actual
                health and fitness levels.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How often should I check my body fat percentage?
              </h3>
              <p className="text-gray-700">
                Measure every 4-6 weeks if you're actively trying to change body composition. Daily or weekly
                measurements aren't necessary because body fat changes slowly and measurements can vary with factors
                like hydration and time of day. Focus on long-term trends rather than day-to-day fluctuations.
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
            <Link href="/health/ideal-weight-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Ideal Weight Calculator</h3>
              <p className="text-sm text-gray-600">Find your ideal body weight using multiple formulas</p>
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
