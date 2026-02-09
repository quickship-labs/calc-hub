'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SavingsCalculatorPage() {
  const [startingAmount, setStartingAmount] = useState<number>(1000);
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(100);
  const [annualRate, setAnnualRate] = useState<number>(4);
  const [timePeriod, setTimePeriod] = useState<number>(5);

  const [totalSavings, setTotalSavings] = useState<number>(0);
  const [totalDeposits, setTotalDeposits] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [monthlyBreakdown, setMonthlyBreakdown] = useState<Array<{
    month: number;
    deposit: number;
    interest: number;
    balance: number;
  }>>([]);

  useEffect(() => {
    const monthlyRate = annualRate / 100 / 12;
    const totalMonths = timePeriod * 12;

    let balance = startingAmount;
    const breakdown = [];

    for (let month = 1; month <= Math.min(totalMonths, 12); month++) {
      const interestEarned = balance * monthlyRate;
      balance += interestEarned + monthlyDeposit;

      breakdown.push({
        month,
        deposit: monthlyDeposit,
        interest: interestEarned,
        balance,
      });
    }

    for (let month = 13; month <= totalMonths; month++) {
      const interestEarned = balance * monthlyRate;
      balance += interestEarned + monthlyDeposit;
    }

    setMonthlyBreakdown(breakdown);
    setTotalSavings(balance);

    const deposits = startingAmount + (monthlyDeposit * totalMonths);
    setTotalDeposits(deposits);

    const interest = balance - deposits;
    setTotalInterest(interest);
  }, [startingAmount, monthlyDeposit, annualRate, timePeriod]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const savingsPercentage = ((totalDeposits / totalSavings) * 100).toFixed(1);
  const interestPercentage = ((totalInterest / totalSavings) * 100).toFixed(1);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/#finance" className="hover:text-blue-600">Finance</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Savings Calculator</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Savings Calculator</h1>
      <p className="text-gray-600 mb-8">Calculate how your savings will grow over time with regular deposits and interest.</p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Starting Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={startingAmount}
                onChange={(e) => setStartingAmount(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Deposit
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={monthlyDeposit}
                onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Interest Rate
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full pr-8 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period (Years)
            </label>
            <input
              type="number"
              value={timePeriod}
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="text-sm text-gray-600 mb-2">Total Savings</div>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(totalSavings)}</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-sm text-gray-600 mb-2">Total Deposits</div>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(totalDeposits)}</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="text-sm text-gray-600 mb-2">Interest Earned</div>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(totalInterest)}</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm font-medium text-gray-700 mb-2">Savings Composition</div>
            <div className="flex h-8 rounded-lg overflow-hidden">
              <div
                className="bg-blue-500 flex items-center justify-center text-white text-sm font-medium"
                style={{ width: `${savingsPercentage}%` }}
              >
                {savingsPercentage}%
              </div>
              <div
                className="bg-purple-500 flex items-center justify-center text-white text-sm font-medium"
                style={{ width: `${interestPercentage}%` }}
              >
                {interestPercentage}%
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-gray-600">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded mr-1"></span>
                Your Deposits
              </span>
              <span className="text-gray-600">
                <span className="inline-block w-3 h-3 bg-purple-500 rounded mr-1"></span>
                Interest Earned
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">First Year Monthly Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-2 font-semibold text-gray-700">Month</th>
                    <th className="text-right py-2 px-2 font-semibold text-gray-700">Deposit</th>
                    <th className="text-right py-2 px-2 font-semibold text-gray-700">Interest</th>
                    <th className="text-right py-2 px-2 font-semibold text-gray-700">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyBreakdown.map((row) => (
                    <tr key={row.month} className="border-b border-gray-100">
                      <td className="py-2 px-2 text-gray-900">{row.month}</td>
                      <td className="text-right py-2 px-2 text-gray-900">{formatCurrency(row.deposit)}</td>
                      <td className="text-right py-2 px-2 text-gray-900">{formatCurrency(row.interest)}</td>
                      <td className="text-right py-2 px-2 font-semibold text-gray-900">{formatCurrency(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Quick Summary</h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">Monthly savings goal:</span>
                <span className="font-semibold text-gray-900 ml-2">{formatCurrency(monthlyDeposit)}</span>
              </div>
              <div>
                <span className="text-gray-600">Final balance after {timePeriod} years:</span>
                <span className="font-semibold text-gray-900 ml-2">{formatCurrency(totalSavings)}</span>
              </div>
              <div>
                <span className="text-gray-600">Return on investment:</span>
                <span className="font-semibold text-gray-900 ml-2">{((totalInterest / totalDeposits) * 100).toFixed(2)}%</span>
              </div>
              <div>
                <span className="text-gray-600">Average monthly interest:</span>
                <span className="font-semibold text-gray-900 ml-2">{formatCurrency(totalInterest / (timePeriod * 12))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-gray-400 text-sm my-6">
        Ad Space
      </div>

      <section className="prose max-w-none mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">How the Savings Calculator Works</h2>
        <p className="text-gray-700 mb-4">
          This savings calculator helps you understand how your money will grow over time when you make regular deposits into
          a savings account or other interest-bearing account. The calculation takes into account your starting balance,
          monthly contributions, interest rate, and time period to show you exactly how much you'll have saved. The interest
          is compounded monthly, meaning you earn interest on both your deposits and on previously earned interest, which
          accelerates your savings growth over time.
        </p>
        <p className="text-gray-700 mb-4">
          The power of consistent saving becomes clear when you see the monthly breakdown. Each month, your account balance
          grows from three sources: your new monthly deposit, interest earned on your existing balance, and the compounding
          effect of earning interest on previous interest payments. Even with modest interest rates available from savings
          accounts, the combination of regular deposits and compound interest can lead to significant wealth accumulation over
          time. The key is consistency and starting as early as possible.
        </p>
        <p className="text-gray-700">
          Understanding the composition of your final savings helps you set realistic goals. The visualization shows how much
          of your total comes from your own deposits versus interest earned. Higher interest rates and longer time periods
          increase the proportion from interest, while higher monthly deposits increase the proportion from your contributions.
          Use this calculator to experiment with different scenarios and find a savings plan that fits your budget while
          helping you reach your financial goals, whether that's an emergency fund, down payment, or retirement savings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">How much should I save each month?</h3>
            <p className="text-gray-600">Financial experts often recommend saving 20% of your income, but any amount is better than nothing. Start with what you can afford and increase gradually as your income grows.</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">What's a good interest rate for a savings account?</h3>
            <p className="text-gray-600">High-yield savings accounts typically offer 3-5% APY, much better than traditional savings accounts at 0.01-0.5%. Online banks often have the highest rates.</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Should I save or invest my money?</h3>
            <p className="text-gray-600">Keep 3-6 months of expenses in savings for emergencies. For longer-term goals beyond 5 years, investing typically offers higher returns but with more risk.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Related Calculators</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/finance/compound-interest-calculator" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
            <h3 className="font-semibold text-gray-900 mb-1">Compound Interest</h3>
            <p className="text-sm text-gray-600">See investment growth over time</p>
          </Link>
          <Link href="/finance/loan-calculator" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
            <h3 className="font-semibold text-gray-900 mb-1">Loan Calculator</h3>
            <p className="text-sm text-gray-600">Calculate loan payments</p>
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
