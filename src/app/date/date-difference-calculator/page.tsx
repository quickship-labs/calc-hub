'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const calculate = () => {
    if (!startDate || !endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diffTime / (1000 * 60 * 60));
    const totalWeeks = Math.floor(totalDays / 7);

    // Calculate years, months, days
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalMonths = years * 12 + months;

    // Calculate business days
    let businessDays = 0;
    const current = new Date(start);
    const endTime = end.getTime();

    while (current.getTime() <= endTime) {
      if (!isWeekend(current)) {
        businessDays++;
      }
      current.setDate(current.getDate() + 1);
    }

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      businessDays,
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
          <span className="text-gray-700">Date Difference Calculator</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Date Difference Calculator</h1>

        {/* Calculator Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="bg-blue-50 rounded-lg p-6 space-y-6">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-3">Time Difference</div>
                <div className="text-3xl font-bold text-blue-600">
                  {result.years > 0 && `${result.years} year${result.years !== 1 ? 's' : ''}`}
                  {result.years > 0 && (result.months > 0 || result.days > 0) && ', '}
                  {result.months > 0 && `${result.months} month${result.months !== 1 ? 's' : ''}`}
                  {result.months > 0 && result.days > 0 && ', '}
                  {result.days > 0 && `${result.days} day${result.days !== 1 ? 's' : ''}`}
                  {result.years === 0 && result.months === 0 && result.days === 0 && '0 days'}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-blue-200">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Total Days</div>
                  <div className="text-2xl font-semibold text-gray-800">
                    {result.totalDays.toLocaleString()}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Total Weeks</div>
                  <div className="text-2xl font-semibold text-gray-800">
                    {result.totalWeeks.toLocaleString()}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Total Months</div>
                  <div className="text-2xl font-semibold text-gray-800">
                    {result.totalMonths.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-blue-200">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Total Hours</div>
                  <div className="text-2xl font-semibold text-gray-800">
                    {result.totalHours.toLocaleString()}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Business Days</div>
                  <div className="text-2xl font-semibold text-gray-800">
                    {result.businessDays.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">(Mon-Fri only)</div>
                </div>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Date Difference Calculator</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              The Date Difference Calculator computes the exact time span between two dates with precision and
              versatility. Whether you need to know the duration between project milestones, calculate the length
              of a contract period, or simply satisfy your curiosity about time between events, this tool provides
              comprehensive results in multiple formats including years, months, days, weeks, hours, and business days.
            </p>
            <p>
              Calculating date differences is more complex than simple arithmetic because months have varying lengths
              and leap years add complexity. This calculator handles all these nuances automatically, providing both
              compound results (years + months + days) and total counts in each time unit. The business days feature
              is particularly useful for project planning and deadline tracking, excluding weekends to show only
              Monday through Friday working days.
            </p>
            <p>
              This tool serves numerous practical purposes from tracking relationship anniversaries and calculating
              employment tenure to planning events and managing project timelines. The multiple output formats ensure
              you get the information in the most relevant form for your needs, whether that's total days for precise
              measurements or years and months for a more human-readable format. It's an essential utility for anyone
              who needs to work with date ranges and time periods.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How are business days calculated?
              </h3>
              <p className="text-gray-700">
                Business days include only Monday through Friday, excluding weekends (Saturday and Sunday). The
                calculator counts each weekday between the start and end dates. Note that it does not account for
                public holidays, which vary by location.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What's the difference between total days and the compound result?
              </h3>
              <p className="text-gray-700">
                The compound result breaks down the difference into years, months, and days (like "2 years, 3 months,
                5 days") while total days shows the complete duration as a single number. Both are accurate but serve
                different purposes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Does the calculator account for leap years?
              </h3>
              <p className="text-gray-700">
                Yes, the calculator automatically accounts for leap years when computing the difference between dates,
                ensuring accurate results regardless of whether the date range includes February 29th in a leap year.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I calculate differences for dates in the past and future?
              </h3>
              <p className="text-gray-700">
                Yes, the calculator works for any two dates regardless of whether they're in the past or future. It
                calculates the absolute difference between the dates, so the order doesn't affect the result.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Why are total months different from years × 12 + months?
              </h3>
              <p className="text-gray-700">
                Total months represents the complete span in months only, calculated from the date range. It might
                differ slightly from multiplying years by 12 and adding remaining months because it accounts for
                partial months and exact date calculations.
              </p>
            </div>
          </div>
        </section>

        {/* Related Calculators */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/date/age-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Age Calculator</h3>
              <p className="text-sm text-gray-600">Calculate age from birth date</p>
            </Link>
            <Link href="/date/days-between-dates-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Days Between Dates</h3>
              <p className="text-sm text-gray-600">Countdown to a specific date</p>
            </Link>
            <Link href="/math/percentage-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Percentage Calculator</h3>
              <p className="text-sm text-gray-600">Calculate percentages and changes</p>
            </Link>
            <Link href="/everyday/unit-converter" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Unit Converter</h3>
              <p className="text-sm text-gray-600">Convert between different units</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
