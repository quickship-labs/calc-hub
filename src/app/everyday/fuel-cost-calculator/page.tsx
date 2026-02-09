'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FuelCostCalculator() {
  const [distance, setDistance] = useState('');
  const [distanceUnit, setDistanceUnit] = useState<'miles' | 'km'>('miles');
  const [fuelEfficiency, setFuelEfficiency] = useState('');
  const [efficiencyUnit, setEfficiencyUnit] = useState<'mpg' | 'l100km'>('mpg');
  const [fuelPrice, setFuelPrice] = useState('');
  const [priceUnit, setPriceUnit] = useState<'gallon' | 'liter'>('gallon');
  const [roundTrip, setRoundTrip] = useState(false);

  const calculate = () => {
    const dist = parseFloat(distance);
    const efficiency = parseFloat(fuelEfficiency);
    const price = parseFloat(fuelPrice);

    if (isNaN(dist) || isNaN(efficiency) || isNaN(price) || dist <= 0 || efficiency <= 0 || price <= 0) {
      return null;
    }

    const actualDistance = roundTrip ? dist * 2 : dist;

    // Convert everything to miles and gallons for calculation
    let distanceInMiles = actualDistance;
    if (distanceUnit === 'km') {
      distanceInMiles = actualDistance * 0.621371; // km to miles
    }

    let milesPerGallon = efficiency;
    if (efficiencyUnit === 'l100km') {
      // Convert L/100km to MPG: MPG = 235.214 / (L/100km)
      milesPerGallon = 235.214 / efficiency;
    }

    const gallonsNeeded = distanceInMiles / milesPerGallon;

    // Convert gallons to desired price unit
    let fuelNeeded = gallonsNeeded;
    let pricePerUnit = price;
    let fuelUnit = 'gallons';

    if (priceUnit === 'liter') {
      fuelNeeded = gallonsNeeded * 3.78541; // gallons to liters
      fuelUnit = 'liters';
    }

    const totalCost = gallonsNeeded * (priceUnit === 'gallon' ? price : price * 3.78541);

    // Cost per distance unit
    const costPerDistanceUnit = totalCost / actualDistance;

    return {
      fuelNeeded: fuelNeeded,
      fuelUnit: fuelUnit,
      totalCost: totalCost,
      costPerUnit: costPerDistanceUnit,
      distanceUnit: distanceUnit === 'miles' ? 'mile' : 'km',
      totalDistance: actualDistance,
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
          <Link href="/everyday" className="text-blue-600 hover:text-blue-800">Everyday</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-700">Fuel Cost Calculator</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Fuel Cost Calculator</h1>

        {/* Calculator Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="space-y-6">
            {/* Distance Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distance
              </label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter distance"
                min="0"
                step="0.1"
              />
            </div>

            {/* Distance Unit Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Distance Unit
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDistanceUnit('miles')}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    distanceUnit === 'miles'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Miles
                </button>
                <button
                  onClick={() => setDistanceUnit('km')}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    distanceUnit === 'km'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Kilometers
                </button>
              </div>
            </div>

            {/* Fuel Efficiency Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fuel Efficiency
              </label>
              <input
                type="number"
                value={fuelEfficiency}
                onChange={(e) => setFuelEfficiency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={efficiencyUnit === 'mpg' ? 'Enter MPG' : 'Enter L/100km'}
                min="0"
                step="0.1"
              />
            </div>

            {/* Efficiency Unit Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Efficiency Unit
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setEfficiencyUnit('mpg')}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    efficiencyUnit === 'mpg'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  MPG
                </button>
                <button
                  onClick={() => setEfficiencyUnit('l100km')}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    efficiencyUnit === 'l100km'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  L/100km
                </button>
              </div>
            </div>

            {/* Fuel Price Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fuel Price
              </label>
              <input
                type="number"
                value={fuelPrice}
                onChange={(e) => setFuelPrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={priceUnit === 'gallon' ? 'Price per gallon' : 'Price per liter'}
                min="0"
                step="0.01"
              />
            </div>

            {/* Price Unit Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Price Unit
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPriceUnit('gallon')}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    priceUnit === 'gallon'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Per Gallon
                </button>
                <button
                  onClick={() => setPriceUnit('liter')}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    priceUnit === 'liter'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Per Liter
                </button>
              </div>
            </div>

            {/* Round Trip Toggle */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="roundTrip"
                checked={roundTrip}
                onChange={(e) => setRoundTrip(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="roundTrip" className="ml-2 text-sm font-medium text-gray-700">
                Round trip (calculate for return journey)
              </label>
            </div>

            {/* Results */}
            {result && (
              <div className="bg-blue-50 rounded-lg p-6 space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Fuel Needed</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {result.fuelNeeded.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{result.fuelUnit}</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-500">
                    <div className="text-sm text-gray-600 mb-2">Total Cost</div>
                    <div className="text-3xl font-bold text-green-600">
                      ${result.totalCost.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Cost Per {result.distanceUnit}</div>
                    <div className="text-2xl font-bold text-blue-600">
                      ${result.costPerUnit.toFixed(3)}
                    </div>
                  </div>
                </div>

                {roundTrip && (
                  <div className="text-sm text-gray-700 pt-4 border-t border-blue-200">
                    <p className="font-medium">Round Trip Details:</p>
                    <p className="mt-1">Total distance: {result.totalDistance.toFixed(1)} {distanceUnit === 'miles' ? 'miles' : 'km'} (one way: {(result.totalDistance / 2).toFixed(1)} {distanceUnit === 'miles' ? 'miles' : 'km'})</p>
                  </div>
                )}
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Fuel Cost Calculator</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              The Fuel Cost Calculator helps you estimate the total cost of fuel for any trip, whether you're planning
              a daily commute, a road trip, or comparing vehicle fuel efficiency. By entering your trip distance, your
              vehicle's fuel efficiency, and current fuel prices, you can instantly calculate how much fuel you'll need
              and what it will cost. The calculator supports both imperial units (miles, MPG, gallons) and metric units
              (kilometers, L/100km, liters), making it useful for travelers anywhere in the world.
            </p>
            <p>
              Understanding fuel costs is essential for budgeting road trips, comparing vehicle operating costs, or
              deciding between driving and alternative transportation. The round trip feature doubles your distance
              automatically, making it easy to calculate the full cost of a journey when you need to return. By showing
              the cost per mile or kilometer, you can also compare the efficiency of different routes or vehicles, helping
              you make cost-effective transportation decisions for both short commutes and long-distance travel.
            </p>
            <p>
              This calculator is particularly valuable when fuel prices fluctuate significantly or when you're considering
              purchasing a new vehicle and want to estimate long-term fuel costs. Whether you're planning a vacation road
              trip across multiple states, calculating business mileage expenses, or simply trying to budget your monthly
              commuting costs, this tool provides accurate, real-time calculations that adapt to your specific vehicle
              and current fuel prices in your area.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do I find my vehicle's fuel efficiency?
              </h3>
              <p className="text-gray-700">
                Check your vehicle's owner's manual, the EPA fuel economy sticker on the window (for new cars), or
                calculate it yourself by dividing miles driven by gallons used between fill-ups. Many modern vehicles
                also display real-time MPG on the dashboard.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is L/100km and how does it compare to MPG?
              </h3>
              <p className="text-gray-700">
                L/100km (liters per 100 kilometers) is the metric standard for fuel efficiency, commonly used outside
                the United States. Unlike MPG (where higher is better), with L/100km, lower numbers indicate better
                efficiency. For example, 25 MPG equals approximately 9.4 L/100km.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Should I use highway or city fuel efficiency?
              </h3>
              <p className="text-gray-700">
                For highway driving, use the highway MPG rating. For city driving, use the city rating. For mixed
                driving, use the combined rating or calculate an average based on the percentage of highway versus
                city driving in your trip. Highway driving typically achieves better fuel efficiency.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Does driving speed affect fuel cost?
              </h3>
              <p className="text-gray-700">
                Yes, significantly. Fuel efficiency typically decreases at speeds above 50-60 mph due to increased
                air resistance. Aggressive acceleration and frequent braking also reduce efficiency. For the most
                accurate calculations, consider your actual driving conditions and adjust the MPG accordingly.
              </p>
            </div>
          </div>
        </section>

        {/* Related Calculators */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/everyday/discount-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Discount Calculator</h3>
              <p className="text-sm text-gray-600">Calculate sale prices and savings</p>
            </Link>
            <Link href="/everyday/unit-converter" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Unit Converter</h3>
              <p className="text-sm text-gray-600">Convert between different units</p>
            </Link>
            <Link href="/math/percentage-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Percentage Calculator</h3>
              <p className="text-sm text-gray-600">Calculate percentages and ratios</p>
            </Link>
            <Link href="/finance/budget-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Budget Calculator</h3>
              <p className="text-sm text-gray-600">Plan and track your finances</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
