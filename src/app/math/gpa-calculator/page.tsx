'use client';

import { useState } from 'react';
import Link from 'next/link';

type Course = {
  id: string;
  name: string;
  grade: string;
  credits: string;
};

const gradeValues: { [key: string]: number } = {
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'F': 0.0,
};

const gradeOptions = Object.keys(gradeValues);

export default function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: '', grade: '', credits: '' },
    { id: '2', name: '', grade: '', credits: '' },
    { id: '3', name: '', grade: '', credits: '' },
    { id: '4', name: '', grade: '', credits: '' },
  ]);

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: '',
      grade: '',
      credits: '',
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof Course, value: string) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, [field]: value } : course
      )
    );
  };

  const calculateGPA = () => {
    let totalCredits = 0;
    let totalQualityPoints = 0;

    const validCourses = courses.filter(
      (course) =>
        course.grade &&
        course.credits &&
        !isNaN(parseFloat(course.credits)) &&
        parseFloat(course.credits) > 0
    );

    if (validCourses.length === 0) return null;

    validCourses.forEach((course) => {
      const credits = parseFloat(course.credits);
      const gradeValue = gradeValues[course.grade];
      const qualityPoints = credits * gradeValue;

      totalCredits += credits;
      totalQualityPoints += qualityPoints;
    });

    const gpa = totalQualityPoints / totalCredits;

    return {
      gpa,
      totalCredits,
      qualityPoints: totalQualityPoints,
      courseCount: validCourses.length,
    };
  };

  const result = calculateGPA();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href="/math" className="text-blue-600 hover:text-blue-800">Math</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-700">GPA Calculator</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">GPA Calculator</h1>

        {/* Calculator Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="space-y-4 mb-6">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 bg-gray-50 rounded-lg"
              >
                <div className="md:col-span-5">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Course Name
                  </label>
                  <input
                    type="text"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder={`Course ${index + 1}`}
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Grade
                  </label>
                  <select
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">Select</option>
                    {gradeOptions.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade} ({gradeValues[grade].toFixed(1)})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Credits
                  </label>
                  <input
                    type="number"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="0"
                    min="0"
                    step="0.5"
                  />
                </div>
                <div className="md:col-span-1 flex items-end">
                  <button
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length === 1}
                    className="w-full px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                    title="Remove course"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addCourse}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium mb-6"
          >
            + Add Course
          </button>

          {/* Results */}
          {result && (
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="text-sm text-gray-600 mb-2">Your GPA</div>
                <div className="text-5xl font-bold text-blue-600">
                  {result.gpa.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600 mt-1">out of 4.0</div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-blue-200">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Total Credits</div>
                  <div className="text-2xl font-semibold text-gray-800">
                    {result.totalCredits.toFixed(1)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Quality Points</div>
                  <div className="text-2xl font-semibold text-gray-800">
                    {result.qualityPoints.toFixed(2)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Courses</div>
                  <div className="text-2xl font-semibold text-gray-800">
                    {result.courseCount}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-blue-200 text-sm text-gray-700">
                <p className="font-medium mb-2">Calculation:</p>
                <p>GPA = Total Quality Points ÷ Total Credits</p>
                <p>GPA = {result.qualityPoints.toFixed(2)} ÷ {result.totalCredits.toFixed(1)} = {result.gpa.toFixed(2)}</p>
              </div>

              {result.gpa >= 3.7 && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                  Excellent! You're on the Dean's List track.
                </div>
              )}
              {result.gpa >= 3.0 && result.gpa < 3.7 && (
                <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-lg text-blue-800 text-sm">
                  Good work! You're maintaining a solid GPA.
                </div>
              )}
              {result.gpa >= 2.0 && result.gpa < 3.0 && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
                  You're passing, but there's room for improvement.
                </div>
              )}
              {result.gpa < 2.0 && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                  Consider seeking academic support to improve your grades.
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the GPA Calculator</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              The GPA Calculator helps students quickly and accurately calculate their Grade Point Average on the
              standard 4.0 scale. Simply enter your courses, select the letter grade you received, and input the
              credit hours for each class. The calculator automatically computes your GPA along with total credits
              and quality points, providing a complete overview of your academic performance.
            </p>
            <p>
              Understanding your GPA is crucial for academic planning, scholarship applications, and graduate school
              admissions. This calculator uses the standard 4.0 grading scale where A = 4.0, B = 3.0, C = 2.0, D = 1.0,
              and F = 0.0, with plus and minus grades weighted accordingly. Quality points are calculated by multiplying
              each course's grade value by its credit hours, then your GPA is the total quality points divided by total
              credit hours.
            </p>
            <p>
              The tool allows you to add or remove courses as needed, making it perfect for calculating semester GPAs,
              cumulative GPAs, or planning what grades you need in remaining courses to achieve your target GPA. Whether
              you're tracking your academic progress or planning your course load, this calculator provides instant,
              accurate results to help you stay on top of your educational goals.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How is GPA calculated?
              </h3>
              <p className="text-gray-700">
                GPA is calculated by multiplying each grade's point value by the course's credit hours to get quality
                points, then dividing the total quality points by total credit hours. For example, an A (4.0) in a
                3-credit course gives 12 quality points.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is a good GPA?
              </h3>
              <p className="text-gray-700">
                Generally, a 3.0 GPA or higher is considered good. A 3.5+ is very good and competitive for most
                opportunities, while a 3.7+ is excellent and often qualifies for Dean's List and top scholarships.
                However, what's considered "good" can vary by institution and field of study.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What are quality points?
              </h3>
              <p className="text-gray-700">
                Quality points (also called grade points) are calculated by multiplying the numeric value of your grade
                by the number of credit hours for that course. They represent the weighted value of your grades and are
                used to calculate your GPA.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Does a plus or minus grade matter?
              </h3>
              <p className="text-gray-700">
                Yes, plus and minus grades affect your GPA. For example, an A- (3.7) is lower than an A (4.0), and a
                B+ (3.3) is higher than a B (3.0). These small differences can add up over multiple courses.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I calculate my cumulative GPA?
              </h3>
              <p className="text-gray-700">
                Yes! Simply enter all courses from all semesters. The calculator will compute your overall cumulative
                GPA across all courses, along with your total credits earned.
              </p>
            </div>
          </div>
        </section>

        {/* Related Calculators */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/math/percentage-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Percentage Calculator</h3>
              <p className="text-sm text-gray-600">Calculate percentages and percentage changes</p>
            </Link>
            <Link href="/math/average-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Average Calculator</h3>
              <p className="text-sm text-gray-600">Calculate mean, median, mode, and range</p>
            </Link>
            <Link href="/math/fraction-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Fraction Calculator</h3>
              <p className="text-sm text-gray-600">Add, subtract, multiply, and divide fractions</p>
            </Link>
            <Link href="/date/age-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Age Calculator</h3>
              <p className="text-sm text-gray-600">Calculate age and days until birthday</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
