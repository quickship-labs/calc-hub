'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TipCalculatorPage() {
  const [billAmount, setBillAmount] = useState<number>(50);
  const [tipPercentage, setTipPercentage] = useState<number>(18);
  const [customTip, setCustomTip] = useState<string>('');
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);

  const tipPresets = [10, 15, 18, 20, 25];

  const handleTipPreset = (preset: number) => {
    setTipPercentage(preset);
    setCustomTip('');
  };

  const handleCustomTip = (value: string) => {
    setCustomTip(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setTipPercentage(numValue);
    }
  };

  const tipAmount = (billAmount * tipPercentage) / 100;
  const totalBill = billAmount + tipAmount;
  const amountPerPerson = totalBill / numberOfPeople;
  const tipPerPerson = tipAmount / numberOfPeople;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/#finance" className="hover:text-blue-600">Finance</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Tip Calculator</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Tip Calculator</h1>
      <p className="text-gray-600 mb-8">Calculate tips and split bills quickly and accurately.</p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bill Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">$</span>
            <input
              type="number"
              step="0.01"
              value={billAmount}
              onChange={(e) => setBillAmount(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-3 text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tip Percentage
          </label>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {tipPresets.map((preset) => (
              <button
                key={preset}
                onClick={() => handleTipPreset(preset)}
                className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                  tipPercentage === preset && !customTip
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {preset}%
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              placeholder="Custom tip %"
              value={customTip}
              onChange={(e) => handleCustomTip(e.target.value)}
              className="w-full pr-8 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of People
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setNumberOfPeople(Math.max(1, numberOfPeople - 1))}
              className="w-12 h-12 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 font-bold text-xl"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(Math.max(1, Number(e.target.value)))}
              className="flex-1 px-4 py-2 text-center text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={() => setNumberOfPeople(numberOfPeople + 1)}
              className="w-12 h-12 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 font-bold text-xl"
            >
              +
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-6">
              <div className="text-sm text-gray-600 mb-1">Tip Amount</div>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(tipAmount)}</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="text-sm text-gray-600 mb-1">Total Bill</div>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(totalBill)}</div>
            </div>
          </div>

          {numberOfPeople > 1 && (
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Split Between {numberOfPeople} People</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Amount Per Person</div>
                  <div className="text-2xl font-bold text-gray-900">{formatCurrency(amountPerPerson)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Tip Per Person</div>
                  <div className="text-2xl font-bold text-gray-900">{formatCurrency(tipPerPerson)}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Bill Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-900">{formatCurrency(billAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tip ({tipPercentage}%)</span>
              <span className="font-medium text-gray-900">{formatCurrency(tipAmount)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-bold text-gray-900">{formatCurrency(totalBill)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-gray-400 text-sm my-6">
        Ad Space
      </div>

      <section className="prose max-w-none mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Use the Tip Calculator</h2>
        <p className="text-gray-700 mb-4">
          Tipping can be confusing, especially when dining out with friends or in unfamiliar places. Our tip calculator makes
          it simple to determine the appropriate tip amount and split the bill fairly among your group. Whether you're at a
          restaurant, bar, or getting delivery, this tool helps you calculate tips quickly and accurately. Simply enter your
          bill amount, select your desired tip percentage, and if you're splitting the bill, indicate how many people are
          sharing the cost.
        </p>
        <p className="text-gray-700 mb-4">
          The standard tip percentages in the United States typically range from 15% to 20% for good service at restaurants,
          with 18% being a common middle ground. For exceptional service, many people tip 25% or more. Lower percentages like
          10% might be used for adequate but not outstanding service. Different service industries have different tipping norms,
          so our quick-select buttons cover the most common scenarios while also allowing you to enter a custom percentage for
          any situation.
        </p>
        <p className="text-gray-700">
          When splitting bills among multiple people, calculating individual portions can get complicated, especially after a
          long meal. Our calculator automatically divides both the total bill and the tip amount evenly among your group,
          showing you exactly how much each person owes. This eliminates awkward math discussions at the table and ensures
          everyone pays their fair share, including their portion of the tip.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">What is the standard tip percentage?</h3>
            <p className="text-gray-600">In the United States, 15-20% is standard for restaurant service, with 18-20% being most common. Exceptional service might warrant 25% or more.</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Should I tip on the pre-tax or post-tax amount?</h3>
            <p className="text-gray-600">Either is acceptable, though tipping on the pre-tax amount is more common. The difference is usually minimal. This calculator works with whatever total you enter.</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Do I need to tip for takeout orders?</h3>
            <p className="text-gray-600">While not required, 10-15% is appreciated for takeout as staff still prepare and package your order. For delivery, 15-20% is standard.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Related Calculators</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/finance/loan-calculator" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
            <h3 className="font-semibold text-gray-900 mb-1">Loan Calculator</h3>
            <p className="text-sm text-gray-600">Calculate loan payments</p>
          </Link>
          <Link href="/finance/savings-calculator" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
            <h3 className="font-semibold text-gray-900 mb-1">Savings Calculator</h3>
            <p className="text-sm text-gray-600">Plan your savings goals</p>
          </Link>
          <Link href="/finance/mortgage-calculator" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
            <h3 className="font-semibold text-gray-900 mb-1">Mortgage Calculator</h3>
            <p className="text-sm text-gray-600">Calculate home loan payments</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
