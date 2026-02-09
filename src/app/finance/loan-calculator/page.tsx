'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LoanCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [loanTerm, setLoanTerm] = useState<number>(36);
  const [termUnit, setTermUnit] = useState<'months' | 'years'>('months');

  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [payoffDate, setPayoffDate] = useState<string>('');

  useEffect(() => {
    const termInMonths = termUnit === 'years' ? loanTerm * 12 : loanTerm;
    const monthlyRate = interestRate / 100 / 12;

    if (monthlyRate === 0) {
      const payment = loanAmount / termInMonths;
      setMonthlyPayment(payment);
      setTotalInterest(0);
      setTotalCost(loanAmount);
    } else {
      const payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termInMonths)) /
                     (Math.pow(1 + monthlyRate, termInMonths) - 1);
      setMonthlyPayment(payment);
      const total = payment * termInMonths;
      setTotalInterest(total - loanAmount);
      setTotalCost(total);
    }

    const today = new Date();
    const payoff = new Date(today.setMonth(today.getMonth() + termInMonths));
    setPayoffDate(payoff.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, [loanAmount, interestRate, loanTerm, termUnit]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const principalPercentage = ((loanAmount / totalCost) * 100).toFixed(1);
  const interestPercentage = ((totalInterest / totalCost) * 100).toFixed(1);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/#finance" className="hover:text-blue-600">Finance</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Loan Calculator</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Loan Calculator</h1>
      <p className="text-gray-600 mb-8">Calculate monthly payments and total costs for personal loans, auto loans, and more.</p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
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
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full pr-8 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Term
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setTermUnit('months')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    termUnit === 'months'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Months
                </button>
                <button
                  onClick={() => setTermUnit('years')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    termUnit === 'years'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Years
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-sm text-gray-600 mb-2">Monthly Payment</div>
              <div className="text-4xl font-bold text-gray-900">{formatCurrency(monthlyPayment)}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-sm text-gray-600 mb-2">Payoff Date</div>
              <div className="text-2xl font-bold text-gray-900">{payoffDate}</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Total Interest Paid</span>
              <span className="text-lg font-semibold text-gray-900">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Total Cost of Loan</span>
              <span className="text-lg font-semibold text-gray-900">{formatCurrency(totalCost)}</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-sm font-medium text-gray-700 mb-2">Cost Breakdown</div>
            <div className="flex h-8 rounded-lg overflow-hidden">
              <div
                className="bg-blue-500 flex items-center justify-center text-white text-sm font-medium"
                style={{ width: `${principalPercentage}%` }}
              >
                {principalPercentage}%
              </div>
              <div
                className="bg-red-500 flex items-center justify-center text-white text-sm font-medium"
                style={{ width: `${interestPercentage}%` }}
              >
                {interestPercentage}%
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-gray-600">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded mr-1"></span>
                Principal
              </span>
              <span className="text-gray-600">
                <span className="inline-block w-3 h-3 bg-red-500 rounded mr-1"></span>
                Interest
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-gray-400 text-sm my-6">
        Ad Space
      </div>

      <section className="prose max-w-none mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">How the Loan Calculator Works</h2>
        <p className="text-gray-700 mb-4">
          Our loan calculator uses the standard loan amortization formula to determine your monthly payment amount. This formula
          accounts for the principal amount you're borrowing, the interest rate charged by the lender, and the length of time
          you have to repay the loan. The calculation ensures that each monthly payment covers both the interest charges and a
          portion of the principal, so by the end of the loan term, you'll have paid off the entire balance.
        </p>
        <p className="text-gray-700 mb-4">
          The monthly payment is calculated using the formula M = P[r(1+r)^n]/[(1+r)^n-1], where M is your monthly payment, P
          is the principal loan amount, r is your monthly interest rate (annual rate divided by 12), and n is the total number
          of monthly payments. This ensures consistent payments throughout the loan term, though the proportion going toward
          interest versus principal changes over time. Early payments are mostly interest, while later payments increasingly
          reduce the principal.
        </p>
        <p className="text-gray-700">
          Understanding the total cost of your loan is essential for making informed financial decisions. The total interest
          paid over the life of the loan can be substantial, sometimes equaling or exceeding the original loan amount for
          longer-term loans. By adjusting the loan term or interest rate, you can see how different scenarios impact your
          monthly budget and total cost, helping you choose the best option for your financial situation.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">What types of loans can I calculate?</h3>
            <p className="text-gray-600">This calculator works for any fixed-rate loan including personal loans, auto loans, student loans, and business loans. It's not suitable for adjustable-rate loans or credit cards.</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">How can I lower my monthly payment?</h3>
            <p className="text-gray-600">You can reduce your monthly payment by extending the loan term, negotiating a lower interest rate, or increasing your down payment to reduce the principal amount.</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Should I choose a shorter or longer loan term?</h3>
            <p className="text-gray-600">Shorter terms mean higher monthly payments but less total interest paid. Longer terms have lower monthly payments but cost more in interest over time. Choose based on your budget and financial goals.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Related Calculators</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/finance/mortgage-calculator" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
            <h3 className="font-semibold text-gray-900 mb-1">Mortgage Calculator</h3>
            <p className="text-sm text-gray-600">Calculate home loan payments</p>
          </Link>
          <Link href="/finance/compound-interest-calculator" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
            <h3 className="font-semibold text-gray-900 mb-1">Compound Interest</h3>
            <p className="text-sm text-gray-600">Calculate investment growth</p>
          </Link>
          <Link href="/finance/savings-calculator" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
            <h3 className="font-semibold text-gray-900 mb-1">Savings Calculator</h3>
            <p className="text-sm text-gray-600">Plan your savings goals</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
