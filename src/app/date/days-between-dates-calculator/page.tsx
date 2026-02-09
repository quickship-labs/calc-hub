'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DaysBetweenDatesCalculator() {
  const [targetDate, setTargetDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const formatted = today.toISOString().split('T')[0];
    setCurrentDate(formatted);
  }, []);

  const calculate = () => {
    if (!targetDate || !currentDate) return null;

    const target = new Date(targetDate);
    const current = new Date(currentDate);

    const diffTime = target.getTime() - current.getTime();
    const isPast = diffTime < 0;
    const absDiffTime = Math.abs(diffTime);

    const days = Math.floor(absDiffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44); // Average month length
    const hours = Math.floor(absDiffTime / (1000 * 60 * 60));

    return {
      days,
      weeks,
      months,
      hours,
      isPast,
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
          <Link href="/date" className="text-blue-600 hover:text-blue-800">Date & Time</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-700">Days Between Dates Calculator</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Days Between Dates Calculator</h1>

        {/* Calculator Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Date
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Results */}
          {result && (
            <div className={`rounded-lg p-8 ${result.isPast ? 'bg-gray-50' : 'bg-blue-50'}`}>
              <div className="text-center mb-6">
                <div className="text-sm text-gray-600 mb-3">
                  {result.isPast ? 'Days Since' : 'Days Until'}
                </div>
                <div className={`text-7xl font-bold mb-2 ${result.isPast ? 'text-gray-700' : 'text-blue-600'}`}>
                  {result.days.toLocaleString()}
                </div>
                <div className="text-2xl text-gray-700">
                  day{result.days !== 1 ? 's' : ''}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-gray-300">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-2">
                    {result.isPast ? 'Weeks Since' : 'Weeks Until'}
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {result.weeks.toLocaleString()}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-2">
                    {result.isPast ? 'Months Since' : 'Months Until'}
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {result.months.toLocaleString()}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-2">
                    {result.isPast ? 'Hours Since' : 'Hours Until'}
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {result.hours.toLocaleString()}
                  </div>
                </div>
              </div>

              {!result.isPast && result.days > 0 && result.days <= 30 && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <div className="text-green-800 font-semibold">Coming soon!</div>
                  <div className="text-green-700 text-sm mt-1">
                    Only {result.days} day{result.days !== 1 ? 's' : ''} to go
                  </div>
                </div>
              )}

              {result.days === 0 && (
                <div className="mt-6 p-4 bg-blue-100 border border-blue-300 rounded-lg text-center">
                  <div className="text-blue-900 font-bold text-lg">Today is the day!</div>
                </div>
              )}

              {result.isPast && (
                <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg text-center">
                  <div className="text-gray-700 text-sm">
                    This date was {result.days.toLocaleString()} day{result.days !== 1 ? 's' : ''} ago
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Days Between Dates Calculator</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              The Days Between Dates Calculator is designed to help you count down to important future events or
              measure time since past milestones. With a prominent display of the exact number of days, this tool
              makes it easy to track time until vacations, weddings, graduations, project deadlines, or any significant
              date. It also works in reverse, showing how many days have passed since historical events or memorable
              moments.
            </p>
            <p>
              The calculator presents results in multiple time units including days, weeks, months, and hours, giving
              you different perspectives on the time span. The large countdown display makes it perfect for sharing
              or tracking major life events, while the alternative time units help you conceptualize the duration in
              ways that might be more meaningful for your specific context. For example, weeks are great for pregnancy
              tracking, while months work well for long-term planning.
            </p>
            <p>
              Whether you're eagerly anticipating an upcoming event, tracking progress toward a goal with a deadline,
              or reflecting on time since a past occasion, this calculator provides instant, accurate results. The
              visual countdown format makes it engaging and easy to understand at a glance, and it automatically
              detects whether your target date is in the future or past to display the appropriate messaging. Perfect
              for event planning, project management, or simply satisfying your curiosity about time.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Does this calculator work for past dates?
              </h3>
              <p className="text-gray-700">
                Yes! While it's designed primarily as a countdown tool for future dates, it automatically detects
                when the target date is in the past and shows "days since" instead of "days until." This makes it
                useful for tracking time since important events.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How accurate is the countdown?
              </h3>
              <p className="text-gray-700">
                The countdown is accurate to the day. It calculates the exact difference between today's date and
                your target date, accounting for varying month lengths and leap years automatically.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Why is the months calculation approximate?
              </h3>
              <p className="text-gray-700">
                Months have different lengths (28-31 days), so the calculator uses an average month length of 30.44
                days for the months calculation. This provides a reasonable estimate for general planning purposes,
                though the days count is always exact.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I use this for event planning?
              </h3>
              <p className="text-gray-700">
                Absolutely! This calculator is perfect for event planning. Use it to track time until weddings,
                parties, conferences, or any event. Knowing exactly how many days, weeks, or months remain helps
                you plan and prepare effectively.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What happens when the target date is today?
              </h3>
              <p className="text-gray-700">
                When the target date matches the current date, the calculator shows 0 days and displays a special
                "Today is the day!" message to celebrate that your target date has arrived.
              </p>
            </div>
          </div>
        </section>

        {/* Related Calculators */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/date/date-difference-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Date Difference Calculator</h3>
              <p className="text-sm text-gray-600">Calculate time between two dates</p>
            </Link>
            <Link href="/date/age-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Age Calculator</h3>
              <p className="text-sm text-gray-600">Calculate age from birth date</p>
            </Link>
            <Link href="/math/percentage-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Percentage Calculator</h3>
              <p className="text-sm text-gray-600">Calculate percentages and changes</p>
            </Link>
            <Link href="/everyday/discount-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Discount Calculator</h3>
              <p className="text-sm text-gray-600">Calculate discounts and savings</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
