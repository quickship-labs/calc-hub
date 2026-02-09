'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CalorieCalculator() {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState('1.55');

  // Imperial inputs
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weightLbs, setWeightLbs] = useState('');

  // Metric inputs
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');

  const calculateBMR = () => {
    let heightCentimeters: number;
    let weightKilograms: number;

    if (unit === 'imperial') {
      const feet = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      const totalInches = feet * 12 + inches;
      const lbs = parseFloat(weightLbs);

      if (totalInches === 0 || isNaN(lbs)) return null;

      heightCentimeters = totalInches * 2.54;
      weightKilograms = lbs * 0.453592;
    } else {
      const cm = parseFloat(heightCm);
      const kg = parseFloat(weightKg);

      if (isNaN(cm) || isNaN(kg)) return null;

      heightCentimeters = cm;
      weightKilograms = kg;
    }

    const ageNum = parseFloat(age);
    if (isNaN(ageNum)) return null;

    // Mifflin-St Jeor Formula
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weightKilograms + 6.25 * heightCentimeters - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightKilograms + 6.25 * heightCentimeters - 5 * ageNum - 161;
    }

    return bmr;
  };

  const bmr = calculateBMR();
  const tdee = bmr ? bmr * parseFloat(activityLevel) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href="/health" className="text-blue-600 hover:text-blue-800">Health</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-700">Calorie Calculator</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Calorie Calculator (TDEE)</h1>

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
            {/* Age and Gender */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter age"
                  min="1"
                  max="120"
                />
              </div>
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
              </>
            )}

            {/* Activity Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity Level
              </label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1.2">Sedentary (little to no exercise)</option>
                <option value="1.375">Lightly Active (light exercise 1-3 days/week)</option>
                <option value="1.55">Moderately Active (moderate exercise 3-5 days/week)</option>
                <option value="1.725">Very Active (hard exercise 6-7 days/week)</option>
                <option value="1.9">Extra Active (very hard exercise, physical job)</option>
              </select>
            </div>
          </div>

          {/* Results */}
          {bmr !== null && tdee !== null && (
            <div className="mt-8 space-y-6">
              {/* BMR and TDEE */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <div className="text-sm text-gray-600 mb-2">Basal Metabolic Rate (BMR)</div>
                  <div className="text-4xl font-bold text-blue-600">{Math.round(bmr)}</div>
                  <div className="text-sm text-gray-600 mt-1">calories/day</div>
                </div>
                <div className="bg-green-50 rounded-lg p-6 text-center">
                  <div className="text-sm text-gray-600 mb-2">Total Daily Energy Expenditure</div>
                  <div className="text-4xl font-bold text-green-600">{Math.round(tdee)}</div>
                  <div className="text-sm text-gray-600 mt-1">calories/day</div>
                </div>
              </div>

              {/* Calorie Goals */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Calorie Goals</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Extreme Weight Loss (-1000 cal)</span>
                    <span className="font-bold text-red-600">{Math.round(tdee - 1000)} cal/day</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Weight Loss (-500 cal)</span>
                    <span className="font-bold text-orange-600">{Math.round(tdee - 500)} cal/day</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Mild Weight Loss (-250 cal)</span>
                    <span className="font-bold text-yellow-600">{Math.round(tdee - 250)} cal/day</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700 font-semibold">Maintenance</span>
                    <span className="font-bold text-green-600">{Math.round(tdee)} cal/day</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Mild Weight Gain (+250 cal)</span>
                    <span className="font-bold text-blue-600">{Math.round(tdee + 250)} cal/day</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Weight Gain (+500 cal)</span>
                    <span className="font-bold text-indigo-600">{Math.round(tdee + 500)} cal/day</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> These calculations are estimates. Individual needs vary based on metabolism,
                  body composition, and other factors. Consult a healthcare professional or registered dietitian
                  for personalized nutrition advice.
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Calorie Calculator</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              Our calorie calculator helps you determine your Total Daily Energy Expenditure (TDEE) - the number of
              calories you burn each day. It uses the Mifflin-St Jeor equation, one of the most accurate formulas for
              calculating Basal Metabolic Rate (BMR), and then adjusts for your activity level to provide your total
              daily calorie needs. Understanding your TDEE is essential for effective weight management, whether your
              goal is to lose weight, maintain your current weight, or gain muscle mass.
            </p>
            <p>
              The calculator provides your BMR, which represents the calories your body needs at complete rest to
              maintain vital functions like breathing, circulation, and cell production. Your TDEE accounts for all
              daily activities and exercise. Based on your TDEE, the calculator shows calorie targets for various goals:
              a deficit of 500 calories per day typically results in losing about 1 pound per week, while a surplus
              of 500 calories supports gradual weight gain. The moderate options with 250-calorie adjustments offer
              slower but more sustainable changes.
            </p>
            <p>
              Remember that these calculations provide estimates based on population averages. Individual metabolic
              rates can vary due to factors like genetics, body composition, medical conditions, and metabolic
              adaptation. Use these numbers as a starting point and adjust based on your actual results over time.
              For optimal health and sustainable results, combine appropriate calorie intake with balanced nutrition
              and regular physical activity. Always consult healthcare professionals before making significant dietary
              changes.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is the difference between BMR and TDEE?
              </h3>
              <p className="text-gray-700">
                BMR (Basal Metabolic Rate) is the number of calories your body needs at complete rest to maintain
                basic functions. TDEE (Total Daily Energy Expenditure) includes your BMR plus all calories burned
                through daily activities and exercise. TDEE is always higher than BMR because you burn additional
                calories through movement and physical activity.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How accurate is the Mifflin-St Jeor equation?
              </h3>
              <p className="text-gray-700">
                The Mifflin-St Jeor equation is considered one of the most accurate predictive equations for BMR,
                with an accuracy rate of about 10% for most people. However, individual variations exist due to
                factors like muscle mass, genetics, and metabolic health. Use the results as a starting point and
                adjust based on your actual progress.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How many calories should I cut to lose weight safely?
              </h3>
              <p className="text-gray-700">
                A safe and sustainable calorie deficit is typically 250-500 calories per day, which results in losing
                0.5-1 pound per week. Larger deficits may lead to faster weight loss but can be harder to maintain
                and may result in muscle loss. Never go below 1200 calories per day for women or 1500 for men without
                medical supervision.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Which activity level should I choose?
              </h3>
              <p className="text-gray-700">
                Choose based on your weekly exercise: Sedentary (little to no exercise), Lightly Active (1-3 days/week),
                Moderately Active (3-5 days/week), Very Active (6-7 days/week), or Extra Active (daily intense exercise
                or physical job). When in doubt, start with a lower activity level to avoid overestimating calorie needs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Should I eat back exercise calories?
              </h3>
              <p className="text-gray-700">
                If you selected an activity level that includes your exercise, you don't need to add extra calories
                for workouts. However, if you chose "Sedentary" and exercise regularly, you may need to eat some of
                those calories back. Many people eat back 50-75% of estimated exercise calories to account for
                overestimation in calorie burn calculations.
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
            <Link href="/health/ideal-weight-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Ideal Weight Calculator</h3>
              <p className="text-sm text-gray-600">Find your ideal body weight</p>
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
