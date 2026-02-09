'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CompoundInterestCalculatorPage() {
  const [initialInvestment, setInitialInvestment] = useState<number>(5000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(200);
  const [annualRate, setAnnualRate] = useState<number>(7);
  const [timePeriod, setTimePeriod] = useState<number>(10);
  const [compoundingFrequency, setCompoundingFrequency] = useState<number>(12);

  const [finalBalance, setFinalBalance] = useState<number>(0);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [effectiveRate, setEffectiveRate] = useState<number>(0);
  const [yearlyBreakdown, setYearlyBreakdown] = useState<Array<{
    year: number;
    contributions: number;
    interest: number;
    total: number;
  }>>([]);

  useEffect(() => {
    const r = annualRate / 100;
    const n = compoundingFrequency;
    const t = timePeriod;
    const P = initialInvestment;
    const PMT = monthlyContribution;

    const principalAmount = P * Math.pow(1 + r / n, n * t);

    const contributionAmount = PMT * ((Math.pow(1 + r / n, n * t) - 1) / (r / n)) * (12 / n);

    const final = principalAmount + contributionAmount;
    setFinalBalance(final);

    const contributions = P + (PMT * 12 * t);
    setTotalContributions(contributions);

    const interest = final - contributions;
    setTotalInterest(interest);

    const effective = (Math.pow(1 + r / n, n) - 1) * 100;
    setEffectiveRate(effective);

    const breakdown = [];
    for (let year = 1; year <= Math.min(timePeriod, 10); year++) {
      const yearPrincipal = P * Math.pow(1 + r / n, n * year);
      const yearContributions = PMT * ((Math.pow(1 + r / n, n * year) - 1) / (r / n)) * (12 / n);
      const yearTotal = yearPrincipal + yearContributions;
      const yearContributionsTotal = P + (PMT * 12 * year);
      const yearInterest = yearTotal - yearContributionsTotal;

      breakdown.push({
        year,
        contributions: yearContributionsTotal,
        interest: yearInterest,
        total: yearTotal,
      });
    }
    setYearlyBreakdown(breakdown);
  }, [initialInvestment, monthlyContribution, annualRate, timePeriod, compoundingFrequency]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const frequencyOptions = [
    { value: 365, label: 'Daily' },
    { value: 12, label: 'Monthly' },
    { value: 4, label: 'Quarterly' },
    { value: 1, label: 'Annually' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/#finance" className="hover:text-blue-600">Finance</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Compound Interest Calculator</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Compound Interest Calculator</h1>
      <p className="text-gray-600 mb-8">See how your investments grow over time with compound interest and regular contributions.</p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Investment
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Contribution
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
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
              Compounding Frequency
            </label>
            <select
              value={compoundingFrequency}
              onChange={(e) => setCompoundingFrequency(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {frequencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
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
              <div className="text-sm text-gray-600 mb-2">Final Balance</div>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(finalBalance)}</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-sm text-gray-600 mb-2">Total Contributions</div>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(totalContributions)}</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="text-sm text-gray-600 mb-2">Total Interest Earned</div>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(totalInterest)}</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-600 mb-1">Effective Annual Rate</div>
            <div className="text-2xl font-bold text-gray-900">{effectiveRate.toFixed(2)}%</div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Year-by-Year Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-2 font-semibold text-gray-700">Year</th>
                    <th className="text-right py-2 px-2 font-semibold text-gray-700">Contributions</th>
                    <th className="text-right py-2 px-2 font-semibold text-gray-700">Interest</th>
                    <th className="text-right py-2 px-2 font-semibold text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyBreakdown.map((row) => (
                    <tr key={row.year} className="border-b border-gray-100">
                      <td className="py-2 px-2 text-gray-900">{row.year}</td>
                      <td className="text-right py-2 px-2 text-gray-900">{formatCurrency(row.contributions)}</td>
                      <td className="text-right py-2 px-2 text-gray-900">{formatCurrency(row.interest)}</td>
                      <td className="text-right py-2 px-2 font-semibold text-gray-900">{formatCurrency(row.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {timePeriod > 10 && (
              <p className="text-sm text-gray-500 mt-2">Showing first 10 years only</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-gray-400 text-sm my-6">
        Ad Space
      </div>

      <section className="prose max-w-none mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">How Compound Interest Works</h2>
        <p className="text-gray-700 mb-4">
          Compound interest is the process where your investment earns interest, and then that interest earns interest as well.
          This creates exponential growth over time, making it one of the most powerful concepts in personal finance. Albert
          Einstein allegedly called compound interest "the eighth wonder of the world," noting that those who understand it
          earn it, while those who don't pay it. Our calculator uses the standard compound interest formula along with the
          future value of an annuity formula to account for regular monthly contributions.
        </p>
        <p className="text-gray-700 mb-4">
          The calculation combines two components: the growth of your initial investment and the growth of your regular
          contributions. Your initial investment grows according to the formula A = P(1 + r/n)^(nt), where P is the principal,
          r is the annual rate, n is the compounding frequency, and t is time in years. Your monthly contributions grow using
          the future value of an annuity formula, accounting for the fact that each contribution has less time to compound
          than the previous one.
        </p>
        <p className="text-gray-700">
          The compounding frequency makes a meaningful difference in your returns. More frequent compounding results in higher
          returns because interest is calculated and added to your principal more often. The effective annual rate shows what
          your actual yearly return is after accounting for compounding. Even small differences in interest rates or regular
          contributions can lead to dramatically different outcomes over long time periods, which is why starting early and
          contributing consistently are so important for building wealth.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">What is the difference between simple and compound interest?</h3>
            <p className="text-gray-600">Simple interest is calculated only on the principal amount, while compound interest is calculated on the principal plus accumulated interest. Compound interest grows your money much faster.</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">How does compounding frequency affect my returns?</h3>
            <p className="text-gray-600">More frequent compounding leads to higher returns. Daily compounding will yield more than monthly, which yields more than annual compounding, though the difference decreases as frequency increases.</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Should I invest a lump sum or make regular contributions?</h3>
            <p className="text-gray-600">Both strategies work well. A lump sum has more time to compound, but regular contributions make investing more accessible and take advantage of dollar-cost averaging.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Related Calculators</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/finance/savings-calculator" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
            <h3 className="font-semibold text-gray-900 mb-1">Savings Calculator</h3>
            <p className="text-sm text-gray-600">Plan your savings goals</p>
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
