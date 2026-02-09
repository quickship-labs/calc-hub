'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PregnancyDueDateCalculator() {
  const [method, setMethod] = useState<'lmp' | 'conception'>('lmp');
  const [selectedDate, setSelectedDate] = useState('');

  const calculateDueDate = () => {
    if (!selectedDate) return null;

    const date = new Date(selectedDate);
    if (isNaN(date.getTime())) return null;

    let dueDate: Date;
    let conceptionDate: Date;

    if (method === 'lmp') {
      // Due date = LMP + 280 days
      dueDate = new Date(date);
      dueDate.setDate(dueDate.getDate() + 280);

      // Conception date estimate = LMP + 14 days
      conceptionDate = new Date(date);
      conceptionDate.setDate(conceptionDate.getDate() + 14);
    } else {
      // Due date = Conception + 266 days
      dueDate = new Date(date);
      dueDate.setDate(dueDate.getDate() + 266);

      conceptionDate = date;
    }

    return { dueDate, conceptionDate };
  };

  const calculateGestationalAge = (conceptionDate: Date) => {
    const today = new Date();
    const lmpDate = new Date(conceptionDate);
    lmpDate.setDate(lmpDate.getDate() - 14); // LMP is 14 days before conception

    const diffTime = today.getTime() - lmpDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    return { weeks, days, totalDays: diffDays };
  };

  const getTrimester = (weeks: number) => {
    if (weeks < 13) return '1st Trimester';
    if (weeks < 28) return '2nd Trimester';
    return '3rd Trimester';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getKeyDates = (lmpDate: Date) => {
    const dates = [];

    const firstTrimesterEnd = new Date(lmpDate);
    firstTrimesterEnd.setDate(firstTrimesterEnd.getDate() + 12 * 7);

    const secondTrimesterStart = new Date(lmpDate);
    secondTrimesterStart.setDate(secondTrimesterStart.getDate() + 13 * 7);

    const thirdTrimesterStart = new Date(lmpDate);
    thirdTrimesterStart.setDate(thirdTrimesterStart.getDate() + 28 * 7);

    const fullTerm = new Date(lmpDate);
    fullTerm.setDate(fullTerm.getDate() + 39 * 7);

    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 40 * 7);

    return [
      { milestone: 'End of 1st Trimester', weeks: 12, date: firstTrimesterEnd },
      { milestone: 'Start of 2nd Trimester', weeks: 13, date: secondTrimesterStart },
      { milestone: 'Start of 3rd Trimester', weeks: 28, date: thirdTrimesterStart },
      { milestone: 'Full Term', weeks: 39, date: fullTerm },
      { milestone: 'Estimated Due Date', weeks: 40, date: dueDate },
    ];
  };

  const result = calculateDueDate();
  const gestationalAge = result ? calculateGestationalAge(result.conceptionDate) : null;
  const trimester = gestationalAge ? getTrimester(gestationalAge.weeks) : null;

  const lmpDate = result ? (method === 'lmp' ? new Date(selectedDate) : (() => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 14);
    return d;
  })()) : null;

  const keyDates = lmpDate ? getKeyDates(lmpDate) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href="/health" className="text-blue-600 hover:text-blue-800">Health</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-700">Pregnancy Due Date Calculator</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Pregnancy Due Date Calculator</h1>

        {/* Calculator Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Method Toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-lg border border-gray-300 p-1">
              <button
                onClick={() => setMethod('lmp')}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  method === 'lmp'
                    ? 'bg-pink-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Last Menstrual Period
              </button>
              <button
                onClick={() => setMethod('conception')}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  method === 'conception'
                    ? 'bg-pink-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Conception Date
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {method === 'lmp' ? 'First Day of Last Menstrual Period' : 'Conception Date'}
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Results */}
          {result && gestationalAge && trimester && keyDates && (
            <div className="mt-8 space-y-6">
              {/* Due Date */}
              <div className="bg-pink-50 rounded-lg p-6 text-center">
                <div className="text-sm text-gray-600 mb-2">Estimated Due Date</div>
                <div className="text-4xl font-bold text-pink-600 mb-2">
                  {formatDate(result.dueDate)}
                </div>
                <div className="text-sm text-gray-600">40 weeks from LMP</div>
              </div>

              {/* Current Status */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-50 rounded-lg p-6">
                  <div className="text-sm text-gray-600 mb-2">Current Gestational Age</div>
                  <div className="text-3xl font-bold text-purple-600">
                    {gestationalAge.weeks} weeks, {gestationalAge.days} days
                  </div>
                </div>
                <div className="bg-indigo-50 rounded-lg p-6">
                  <div className="text-sm text-gray-600 mb-2">Current Trimester</div>
                  <div className="text-3xl font-bold text-indigo-600">
                    {trimester}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Week {gestationalAge.weeks}
                  </div>
                </div>
              </div>

              {/* Conception Date */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Estimated Conception Date</div>
                <div className="text-xl font-bold text-blue-600">
                  {formatDate(result.conceptionDate)}
                </div>
              </div>

              {/* Key Dates Timeline */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Milestones</h3>
                <div className="space-y-3">
                  {keyDates.map((item, index) => {
                    const isPast = new Date() > item.date;
                    return (
                      <div
                        key={index}
                        className={`flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0 ${
                          isPast ? 'opacity-60' : ''
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-gray-900">{item.milestone}</div>
                          <div className="text-sm text-gray-600">Week {item.weeks}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">{formatDate(item.date)}</div>
                          {isPast && <div className="text-xs text-green-600">Completed</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> This calculation provides an estimate based on a typical 280-day (40-week)
                  pregnancy. Only about 5% of babies are born on their exact due date. Most babies are born within
                  two weeks before or after the due date. Always consult with your healthcare provider for accurate
                  pregnancy dating and monitoring.
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Pregnancy Due Date Calculator</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              Our pregnancy due date calculator helps expectant mothers estimate when their baby will arrive. The
              calculator uses two common methods: the last menstrual period (LMP) method and the conception date
              method. The LMP method is most commonly used by healthcare providers and assumes a 280-day (40-week)
              pregnancy from the first day of your last period. This method works on the assumption that ovulation
              and conception occurred about 14 days after the start of your last period.
            </p>
            <p>
              If you know your conception date (perhaps from fertility treatment or tracking ovulation), you can
              use that method instead, which calculates the due date as 266 days from conception. The calculator
              provides your estimated due date, current gestational age in weeks and days, which trimester you're
              in, and important pregnancy milestones. Understanding these dates helps you track your pregnancy
              progress, prepare for prenatal appointments, and plan for your baby's arrival.
            </p>
            <p>
              It's important to remember that only about 5% of babies are born on their exact due date. Most babies
              arrive within two weeks before or after the estimated date. Your healthcare provider may adjust your
              due date based on ultrasound measurements, which can be more accurate than LMP calculations, especially
              if you have irregular periods or aren't sure of your LMP date. Use this calculator as a helpful guide,
              but always rely on your healthcare provider for official pregnancy dating and medical advice throughout
              your pregnancy journey.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How accurate is the due date calculator?
              </h3>
              <p className="text-gray-700">
                Due date calculators provide estimates based on standard pregnancy length. Only about 5% of babies
                are born on their exact due date. Most births occur within two weeks before or after the estimated
                date. Ultrasound measurements, especially in the first trimester, can provide more accurate dating.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Why do doctors use the last menstrual period instead of conception date?
              </h3>
              <p className="text-gray-700">
                Most women know the date of their last period more reliably than their exact conception date. The
                LMP method has been used for generations and provides a standardized way to date pregnancies. While
                conception typically occurs about 14 days after LMP, the exact timing can vary.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What if I have irregular periods?
              </h3>
              <p className="text-gray-700">
                If you have irregular periods or aren't sure of your LMP date, the calculator may be less accurate.
                Your healthcare provider will likely use ultrasound measurements to determine a more accurate due
                date. First-trimester ultrasounds are particularly accurate for pregnancy dating.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How long is a full-term pregnancy?
              </h3>
              <p className="text-gray-700">
                A full-term pregnancy is 39 to 40 weeks (273 to 280 days) from the first day of your last menstrual
                period. Babies born between 39 and 40 weeks have the best health outcomes. Pregnancies that reach
                37-38 weeks are considered early term, while those past 41 weeks are late term.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can my due date change?
              </h3>
              <p className="text-gray-700">
                Yes, your healthcare provider may adjust your due date based on ultrasound measurements, especially
                early in pregnancy. First-trimester ultrasounds are most accurate for dating. Your provider may
                change the due date if measurements suggest a significantly different gestational age than LMP
                calculations.
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
            <Link href="/health/calorie-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Calorie Calculator</h3>
              <p className="text-sm text-gray-600">Calculate your daily calorie needs</p>
            </Link>
            <Link href="/date/age-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Age Calculator</h3>
              <p className="text-sm text-gray-600">Calculate age and date differences</p>
            </Link>
            <Link href="/date/date-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Date Calculator</h3>
              <p className="text-sm text-gray-600">Add or subtract days from dates</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
