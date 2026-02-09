export interface Calculator {
  slug: string;          // e.g., "mortgage-calculator"
  name: string;          // e.g., "Mortgage Calculator"
  description: string;   // 1 sentence for cards
  longDescription: string; // 2-3 sentences for meta description
  category: string;      // e.g., "Finance"
  categorySlug: string;  // e.g., "finance"
  icon: string;          // emoji
  keywords: string[];    // SEO keywords
}

export interface Category {
  name: string;
  slug: string;
  icon: string;
  color: string;         // Tailwind color class
  description: string;
}

export const categories: Category[] = [
  { name: 'Finance', slug: 'finance', icon: '💰', color: 'text-green-600', description: 'Mortgage, loan, interest, and savings calculators' },
  { name: 'Health', slug: 'health', icon: '❤️', color: 'text-red-600', description: 'BMI, calorie, pregnancy, and body composition calculators' },
  { name: 'Math', slug: 'math', icon: '🔢', color: 'text-blue-600', description: 'Percentage, fraction, GPA, and average calculators' },
  { name: 'Date & Time', slug: 'date', icon: '📅', color: 'text-purple-600', description: 'Age, date difference, and countdown calculators' },
  { name: 'Everyday', slug: 'everyday', icon: '🛠️', color: 'text-orange-600', description: 'Discount, fuel cost, and unit converter tools' },
];

export const calculators: Calculator[] = [
  // Finance (5)
  { slug: 'mortgage-calculator', name: 'Mortgage Calculator', description: 'Calculate monthly mortgage payments, total interest, and amortization.', longDescription: 'Free mortgage calculator to estimate monthly payments, total interest paid, and full cost of your home loan. Supports different terms and down payments.', category: 'Finance', categorySlug: 'finance', icon: '🏠', keywords: ['mortgage calculator', 'home loan calculator', 'mortgage payment calculator'] },
  { slug: 'loan-calculator', name: 'Loan Calculator', description: 'Calculate monthly payments and total cost for any loan.', longDescription: 'Free loan calculator to figure out monthly payments, total interest, and payoff schedule for personal loans, auto loans, and more.', category: 'Finance', categorySlug: 'finance', icon: '💳', keywords: ['loan calculator', 'personal loan calculator', 'auto loan calculator'] },
  { slug: 'compound-interest-calculator', name: 'Compound Interest Calculator', description: 'See how your money grows with compound interest over time.', longDescription: 'Free compound interest calculator showing how investments grow over time. Compare different compounding frequencies and contribution amounts.', category: 'Finance', categorySlug: 'finance', icon: '📈', keywords: ['compound interest calculator', 'investment calculator', 'interest calculator'] },
  { slug: 'tip-calculator', name: 'Tip Calculator', description: 'Calculate tips and split the bill between friends.', longDescription: 'Free tip calculator to quickly figure out tip amounts and split bills. Supports custom percentages and multiple people.', category: 'Finance', categorySlug: 'finance', icon: '🧾', keywords: ['tip calculator', 'bill split calculator', 'gratuity calculator'] },
  { slug: 'savings-calculator', name: 'Savings Calculator', description: 'Project your savings growth with regular contributions.', longDescription: 'Free savings calculator to project how your savings will grow with regular monthly contributions and compound interest.', category: 'Finance', categorySlug: 'finance', icon: '🏦', keywords: ['savings calculator', 'savings goal calculator', 'savings growth calculator'] },

  // Health (5)
  { slug: 'bmi-calculator', name: 'BMI Calculator', description: 'Calculate your Body Mass Index and see your weight category.', longDescription: 'Free BMI calculator supporting both metric and imperial units. See your BMI category and healthy weight range instantly.', category: 'Health', categorySlug: 'health', icon: '⚖️', keywords: ['bmi calculator', 'body mass index calculator', 'bmi chart'] },
  { slug: 'calorie-calculator', name: 'Calorie Calculator', description: 'Find your daily calorie needs based on your goals.', longDescription: 'Free calorie calculator using the Mifflin-St Jeor equation. Get your BMR, TDEE, and calorie targets for weight loss, maintenance, or gain.', category: 'Health', categorySlug: 'health', icon: '🔥', keywords: ['calorie calculator', 'tdee calculator', 'bmr calculator'] },
  { slug: 'pregnancy-due-date-calculator', name: 'Pregnancy Due Date Calculator', description: 'Estimate your due date and track pregnancy milestones.', longDescription: 'Free pregnancy due date calculator based on your last menstrual period or conception date. See trimester dates and key milestones.', category: 'Health', categorySlug: 'health', icon: '🤰', keywords: ['due date calculator', 'pregnancy calculator', 'pregnancy due date'] },
  { slug: 'ideal-weight-calculator', name: 'Ideal Weight Calculator', description: 'Find your ideal weight range using multiple formulas.', longDescription: 'Free ideal weight calculator using Devine, Robinson, Miller, and Hamwi formulas. See your healthy weight range based on height and gender.', category: 'Health', categorySlug: 'health', icon: '🎯', keywords: ['ideal weight calculator', 'healthy weight calculator', 'ideal body weight'] },
  { slug: 'body-fat-calculator', name: 'Body Fat Calculator', description: 'Estimate your body fat percentage using body measurements.', longDescription: 'Free body fat percentage calculator using the U.S. Navy method. Get your body fat category, fat mass, and lean mass estimates.', category: 'Health', categorySlug: 'health', icon: '💪', keywords: ['body fat calculator', 'body fat percentage calculator', 'body composition calculator'] },

  // Math (4)
  { slug: 'percentage-calculator', name: 'Percentage Calculator', description: 'Calculate percentages, increases, decreases, and more.', longDescription: 'Free percentage calculator with three modes: find a percentage of a number, find what percent one number is of another, and calculate percentage change.', category: 'Math', categorySlug: 'math', icon: '%', keywords: ['percentage calculator', 'percent calculator', 'percentage change calculator'] },
  { slug: 'fraction-calculator', name: 'Fraction Calculator', description: 'Add, subtract, multiply, and divide fractions easily.', longDescription: 'Free fraction calculator for addition, subtraction, multiplication, and division. Results shown as simplified fractions and decimals.', category: 'Math', categorySlug: 'math', icon: '½', keywords: ['fraction calculator', 'fraction solver', 'fraction math'] },
  { slug: 'gpa-calculator', name: 'GPA Calculator', description: 'Calculate your grade point average from course grades.', longDescription: 'Free GPA calculator for college and high school students. Add your courses, grades, and credit hours to compute your cumulative GPA.', category: 'Math', categorySlug: 'math', icon: '🎓', keywords: ['gpa calculator', 'grade calculator', 'college gpa calculator'] },
  { slug: 'average-calculator', name: 'Average Calculator', description: 'Find the mean, median, mode, and range of any numbers.', longDescription: 'Free average calculator that computes mean, median, mode, range, sum, and count from your list of numbers.', category: 'Math', categorySlug: 'math', icon: '📊', keywords: ['average calculator', 'mean calculator', 'median calculator'] },

  // Date & Time (3)
  { slug: 'age-calculator', name: 'Age Calculator', description: 'Calculate exact age in years, months, and days.', longDescription: 'Free age calculator to find your exact age in years, months, and days. Also shows your next birthday countdown and day of the week you were born.', category: 'Date & Time', categorySlug: 'date', icon: '🎂', keywords: ['age calculator', 'how old am i', 'birthday calculator'] },
  { slug: 'date-difference-calculator', name: 'Date Difference Calculator', description: 'Find the exact time between any two dates.', longDescription: 'Free date difference calculator showing the time between two dates in years, months, weeks, days, and business days.', category: 'Date & Time', categorySlug: 'date', icon: '📆', keywords: ['date difference calculator', 'days between dates', 'date calculator'] },
  { slug: 'days-between-dates-calculator', name: 'Days Until Calculator', description: 'Count down the days until any future date.', longDescription: 'Free countdown calculator to find how many days, weeks, and months until any future date or event.', category: 'Date & Time', categorySlug: 'date', icon: '⏳', keywords: ['days until calculator', 'countdown calculator', 'how many days until'] },

  // Everyday (3)
  { slug: 'discount-calculator', name: 'Discount Calculator', description: 'Calculate sale prices and how much you save.', longDescription: 'Free discount calculator to instantly see the final price after a percentage or dollar discount, and how much you save.', category: 'Everyday', categorySlug: 'everyday', icon: '🏷️', keywords: ['discount calculator', 'sale price calculator', 'percent off calculator'] },
  { slug: 'fuel-cost-calculator', name: 'Fuel Cost Calculator', description: 'Estimate fuel costs for any trip distance.', longDescription: 'Free fuel cost calculator to estimate how much gas you need and the total cost for any trip based on distance, fuel efficiency, and gas price.', category: 'Everyday', categorySlug: 'everyday', icon: '⛽', keywords: ['fuel cost calculator', 'gas cost calculator', 'trip fuel calculator'] },
  { slug: 'unit-converter', name: 'Unit Converter', description: 'Convert between units of length, weight, temperature, and more.', longDescription: 'Free unit converter supporting length, weight, temperature, volume, area, and speed conversions between metric and imperial units.', category: 'Everyday', categorySlug: 'everyday', icon: '🔄', keywords: ['unit converter', 'conversion calculator', 'metric converter'] },
];

export function getCalculator(categorySlug: string, calcSlug: string): Calculator | undefined {
  return calculators.find(c => c.categorySlug === categorySlug && c.slug === calcSlug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

export function getCalculatorsByCategory(categorySlug: string): Calculator[] {
  return calculators.filter(c => c.categorySlug === categorySlug);
}

export function getRelatedCalculators(current: Calculator, limit = 5): Calculator[] {
  const sameCategory = calculators.filter(c => c.categorySlug === current.categorySlug && c.slug !== current.slug);
  const others = calculators.filter(c => c.categorySlug !== current.categorySlug);
  return [...sameCategory, ...others].slice(0, limit);
}
