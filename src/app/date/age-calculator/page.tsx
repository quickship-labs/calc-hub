'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const formatted = today.toISOString().split('T')[0];
    setCurrentDate(formatted);
  }, []);

  const getZodiacSign = (month: number, day: number) => {
    const signs = [
      { name: 'Capricorn', start: [12, 22], end: [1, 19] },
      { name: 'Aquarius', start: [1, 20], end: [2, 18] },
      { name: 'Pisces', start: [2, 19], end: [3, 20] },
      { name: 'Aries', start: [3, 21], end: [4, 19] },
      { name: 'Taurus', start: [4, 20], end: [5, 20] },
      { name: 'Gemini', start: [5, 21], end: [6, 20] },
      { name: 'Cancer', start: [6, 21], end: [7, 22] },
      { name: 'Leo', start: [7, 23], end: [8, 22] },
      { name: 'Virgo', start: [8, 23], end: [9, 22] },
      { name: 'Libra', start: [9, 23], end: [10, 22] },
      { name: 'Scorpio', start: [10, 23], end: [11, 21] },
      { name: 'Sagittarius', start: [11, 22], end: [12, 21] },
    ];

    for (const sign of signs) {
      const [startMonth, startDay] = sign.start;
      const [endMonth, endDay] = sign.end;

      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay)
      ) {
        return sign.name;
      }
    }

    return 'Capricorn';
  };

  const getDayOfWeek = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  const calculate = () => {
    if (!birthDate || !currentDate) return null;

    const birth = new Date(birthDate);
    const current = new Date(currentDate);

    if (birth > current) return null;

    // Calculate age
    let years = current.getFullYear() - birth.getFullYear();
    let months = current.getMonth() - birth.getMonth();
    let days = current.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(current.getFullYear(), current.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Total calculations
    const totalDays = Math.floor((current.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    // Next birthday
    const nextBirthday = new Date(
      current.getFullYear(),
      birth.getMonth(),
      birth.getDate()
    );

    if (nextBirthday < current) {
      nextBirthday.setFullYear(current.getFullYear() + 1);
    }

    const daysUntilBirthday = Math.ceil(
      (nextBirthday.getTime() - current.getTime()) / (1000 * 60 * 60 * 24)
    );

    const dayOfWeekBorn = getDayOfWeek(birth);
    const zodiacSign = getZodiacSign(birth.getMonth() + 1, birth.getDate());

    return {
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      dayOfWeekBorn,
      nextBirthdayDays: daysUntilBirthday,
      zodiacSign,
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
          <span className="text-gray-700">Age Calculator</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Age Calculator</h1>

        {/* Calculator Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Birth Date
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                max={currentDate}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Results */}
            {result && (
              <div className="bg-blue-50 rounded-lg p-6 space-y-6">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-3">Your Age</div>
                  <div className="text-5xl font-bold text-blue-600 mb-2">
                    {result.years}
                  </div>
                  <div className="text-lg text-gray-700">
                    {result.years} year{result.years !== 1 ? 's' : ''}, {result.months} month{result.months !== 1 ? 's' : ''}, {result.days} day{result.days !== 1 ? 's' : ''}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-blue-200">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Total Months</div>
                    <div className="text-2xl font-semibold text-gray-800">
                      {result.totalMonths.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Total Weeks</div>
                    <div className="text-2xl font-semibold text-gray-800">
                      {result.totalWeeks.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Total Days</div>
                    <div className="text-2xl font-semibold text-gray-800">
                      {result.totalDays.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-blue-200">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Born On</div>
                    <div className="text-xl font-semibold text-gray-800">
                      {result.dayOfWeekBorn}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Zodiac Sign</div>
                    <div className="text-xl font-semibold text-gray-800">
                      {result.zodiacSign}
                    </div>
                  </div>
                </div>

                <div className="text-center pt-4 border-t border-blue-200">
                  <div className="text-sm text-gray-600 mb-2">Next Birthday Countdown</div>
                  <div className="text-3xl font-bold text-green-600">
                    {result.nextBirthdayDays} day{result.nextBirthdayDays !== 1 ? 's' : ''}
                  </div>
                  {result.nextBirthdayDays === 0 && (
                    <div className="mt-2 text-lg font-semibold text-green-600">
                      Happy Birthday! 🎉
                    </div>
                  )}
                </div>
              </div>
            )}

            {birthDate && new Date(birthDate) > new Date(currentDate) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                Birth date cannot be in the future
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Age Calculator</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              The Age Calculator provides a comprehensive breakdown of your age and life timeline from your birth date.
              Beyond simply calculating years, this tool shows your exact age in years, months, and days, along with
              total counts in various time units including months, weeks, and days. It also reveals interesting details
              like the day of the week you were born and your zodiac sign.
            </p>
            <p>
              Age calculation is more complex than simple subtraction because it must account for varying month lengths
              and leap years. This calculator handles all these complexities automatically, providing accurate results
              down to the day. The tool also features a birthday countdown that shows exactly how many days remain until
              your next birthday, making it fun to track this special annual milestone.
            </p>
            <p>
              Whether you're curious about your exact age for filling out forms, want to know how many days you've
              been alive, or are planning for upcoming birthdays, this calculator provides all the information you need.
              The zodiac sign feature adds an entertaining element, while the day-of-week born detail is a fun fact many
              people don't know about themselves. It's perfect for personal use, party planning, or satisfying your
              curiosity about time's passage.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How is age calculated exactly?
              </h3>
              <p className="text-gray-700">
                Age is calculated by finding the difference between your birth date and the current date, accounting
                for years, months, and days. The calculator handles varying month lengths and leap years automatically
                to provide an accurate result.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Why does the calculator show my age in different units?
              </h3>
              <p className="text-gray-700">
                Different contexts require different measurements. While we commonly use years, knowing your age in
                months is useful for young children, weeks can be interesting for tracking life milestones, and total
                days gives perspective on your lifetime.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How accurate is the birthday countdown?
              </h3>
              <p className="text-gray-700">
                The birthday countdown is accurate to the day. It calculates the exact number of days remaining until
                your next birthday anniversary, automatically accounting for the current year or next year depending
                on whether your birthday has already passed this year.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What determines my zodiac sign?
              </h3>
              <p className="text-gray-700">
                Your zodiac sign is determined by the position of the sun at your birth date. The calculator uses the
                traditional Western zodiac system with 12 signs, each corresponding to specific date ranges throughout
                the year.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Does this account for leap years?
              </h3>
              <p className="text-gray-700">
                Yes, the age calculator automatically accounts for leap years when calculating your exact age and the
                total number of days you've been alive, ensuring accurate results regardless of leap year complexities.
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
              <p className="text-sm text-gray-600">Calculate days between two dates</p>
            </Link>
            <Link href="/date/days-between-dates-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Days Between Dates</h3>
              <p className="text-sm text-gray-600">Countdown to a future date</p>
            </Link>
            <Link href="/math/percentage-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Percentage Calculator</h3>
              <p className="text-sm text-gray-600">Calculate percentages and percentage changes</p>
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
