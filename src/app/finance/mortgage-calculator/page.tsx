'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MortgageCalculatorPage() {
  const [homePrice, setHomePrice] = useState<number>(300000);
  const [downPayment, setDownPayment] = useState<number>(60000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [usePercentage, setUsePercentage] = useState<boolean>(true);

  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    if (usePercentage) {
      setDownPayment((homePrice * downPaymentPercent) / 100);
    } else {
      setDownPaymentPercent((downPayment / homePrice) * 100);
    }
  }, [homePrice, downPayment, downPaymentPercent, usePercentage]);

  useEffect(() => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      setMonthlyPayment(principal / numberOfPayments);
      setTotalInterest(0);
      setTotalCost(principal);
    } else {
      const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                     (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      setMonthlyPayment(payment);
      setTotalInterest(payment * numberOfPayments - principal);
      setTotalCost(payment * numberOfPayments);
    }
  }, [homePrice, downPayment, interestRate, loanTerm]);

  const propertyTax = homePrice * 0.012 / 12;
  const insurance = homePrice * 0.005 / 12;
  const totalMonthly = monthlyPayment + propertyTax + insurance;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/#finance" className="hover:text-blue-600">Finance</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Mortgage Calculator</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Mortgage Calculator</h1>
      <p className="text-gray-600 mb-8">Calculate your monthly mortgage payments and total interest over the life of your loan.</p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Home Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Down Payment
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                {usePercentage ? (
                  <>
                    <input
                      type="number"
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full pr-8 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                  </>
                ) : (
                  <>
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </>
                )}
              </div>
              <button
                onClick={() => setUsePercentage(!usePercentage)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
              >
                {usePercentage ? '$' : '%'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Term
            </label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={15}>15 years</option>
              <option value={20}>20 years</option>
              <option value={30}>30 years</option>
            </select>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Payment Breakdown</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Principal & Interest</div>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(monthlyPayment)}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Property Tax (est.)</div>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(propertyTax)}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Home Insurance (est.)</div>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(insurance)}</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Total Monthly Payment</div>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalMonthly)}</div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Interest Paid</span>
              <span className="text-lg font-semibold text-gray-900">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Cost of Loan</span>
              <span className="text-lg font-semibold text-gray-900">{formatCurrency(totalCost)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-gray-400 text-sm my-6">
        Ad Space
      </div>

      <section className="prose max-w-none mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">How the Mortgage Calculator Works</h2>
        <p className="text-gray-700 mb-4">
          This mortgage calculator helps you estimate your monthly mortgage payment using the standard amortization formula.
          The calculation takes into account four key factors: the home price, your down payment, the interest rate, and the
          loan term. The monthly payment is calculated using the formula M = P[r(1+r)^n]/[(1+r)^n-1], where P is the principal
          (home price minus down payment), r is the monthly interest rate (annual rate divided by 12), and n is the total
          number of payments (loan term in years times 12).
        </p>
        <p className="text-gray-700 mb-4">
          In addition to the principal and interest payment, we provide estimates for property taxes (typically 1.2% of home
          value annually) and homeowners insurance (typically 0.5% annually). These are rough estimates and can vary
          significantly based on your location and specific circumstances. The total monthly payment combines all these
          components to give you a realistic picture of your housing costs.
        </p>
        <p className="text-gray-700">
          Understanding how much you'll pay in interest over the life of the loan is crucial for financial planning. A lower
          interest rate or shorter loan term can save you tens of thousands of dollars, though it will increase your monthly
          payment. Use this calculator to experiment with different scenarios and find the best option for your budget.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">What is included in my monthly mortgage payment?</h3>
            <p className="text-gray-600">Your monthly mortgage payment typically includes principal and interest (P&I), property taxes, homeowners insurance, and possibly PMI if you put down less than 20%.</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">How much should I put down on a house?</h3>
            <p className="text-gray-600">While 20% is traditional and helps you avoid PMI, many buyers put down less. FHA loans allow as little as 3.5% down, while conventional loans can go as low as 3%.</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Should I choose a 15-year or 30-year mortgage?</h3>
            <p className="text-gray-600">A 15-year mortgage has higher monthly payments but you'll pay much less interest overall. A 30-year mortgage has lower monthly payments but costs more in total interest.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Related Calculators</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/finance/loan-calculator" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
            <h3 className="font-semibold text-gray-900 mb-1">Loan Calculator</h3>
            <p className="text-sm text-gray-600">Calculate payments for any loan</p>
          </Link>
          <Link href="/finance/savings-calculator" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
            <h3 className="font-semibold text-gray-900 mb-1">Savings Calculator</h3>
            <p className="text-sm text-gray-600">Plan your savings goals</p>
          </Link>
          <Link href="/finance/compound-interest-calculator" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
            <h3 className="font-semibold text-gray-900 mb-1">Compound Interest</h3>
            <p className="text-sm text-gray-600">See your investments grow</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
