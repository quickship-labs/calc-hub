export interface FAQItem {
  question: string;
  answer: string;
}

export const faqData: Record<string, FAQItem[]> = {
  'mortgage-calculator': [
    {
      question: 'How is my monthly mortgage payment calculated?',
      answer: 'Your monthly mortgage payment is calculated using the loan amount, interest rate, and loan term. The formula accounts for principal and interest payments over the life of the loan, ensuring the loan is fully paid off by the end of the term.',
    },
    {
      question: 'What is included in my monthly payment?',
      answer: 'The basic monthly payment includes principal and interest. However, your total payment may also include property taxes, homeowners insurance, HOA fees, and PMI if your down payment is less than 20%.',
    },
    {
      question: 'How does my down payment affect my mortgage?',
      answer: 'A larger down payment reduces your loan amount, which lowers your monthly payment and total interest paid. Additionally, putting down 20% or more typically eliminates the need for private mortgage insurance (PMI).',
    },
    {
      question: 'What is an amortization schedule?',
      answer: 'An amortization schedule shows how each monthly payment is split between principal and interest over the life of your loan. Early payments are mostly interest, while later payments pay down more principal.',
    },
  ],
  'loan-calculator': [
    {
      question: 'How do I calculate my monthly loan payment?',
      answer: 'Monthly loan payments are calculated using the loan amount, annual interest rate, and loan term. The calculator uses the standard amortization formula to determine a fixed payment that will pay off the loan over the specified period.',
    },
    {
      question: 'What types of loans can this calculator handle?',
      answer: 'This calculator works for any type of fixed-rate loan, including personal loans, auto loans, student loans, and more. It does not apply to credit cards or variable-rate loans.',
    },
    {
      question: 'How does the interest rate affect my total cost?',
      answer: 'A higher interest rate means you pay more over the life of the loan. Even a small difference in rate can significantly impact your total interest paid, especially on longer-term loans.',
    },
    {
      question: 'Should I choose a shorter or longer loan term?',
      answer: 'Shorter terms have higher monthly payments but lower total interest. Longer terms have lower monthly payments but cost more overall. Choose based on your budget and financial goals.',
    },
  ],
  'compound-interest-calculator': [
    {
      question: 'What is compound interest?',
      answer: 'Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. This creates exponential growth as you earn interest on your interest.',
    },
    {
      question: 'How often should interest compound?',
      answer: 'The more frequently interest compounds, the more your money grows. Daily compounding produces slightly more than monthly, which produces more than yearly. However, the difference is usually small.',
    },
    {
      question: 'How do regular contributions affect growth?',
      answer: 'Regular contributions significantly accelerate growth through dollar-cost averaging and increased compound effects. Even small monthly additions can make a big difference over time.',
    },
    {
      question: 'How long should I invest to see significant growth?',
      answer: 'Compound interest needs time to work its magic. The longer you invest, the more dramatic the growth. Even modest returns can build substantial wealth over 20-30 years.',
    },
  ],
  'tip-calculator': [
    {
      question: 'What is the standard tip percentage?',
      answer: 'In the United States, 15-20% is standard for good service at restaurants. 15% is for adequate service, 18-20% for good service, and more for exceptional service.',
    },
    {
      question: 'Should I tip on the pre-tax or total amount?',
      answer: 'Most people tip on the pre-tax amount, though tipping on the total is also acceptable. The difference is usually small, so choose what feels right to you.',
    },
    {
      question: 'How do I split a bill with different amounts?',
      answer: 'You can split evenly by dividing the total by the number of people, or split proportionally based on what each person ordered. Our calculator supports both methods.',
    },
  ],
  'savings-calculator': [
    {
      question: 'How much should I save each month?',
      answer: 'Financial experts often recommend saving 20% of your income, but any amount is better than nothing. Start with what you can afford and increase gradually over time.',
    },
    {
      question: 'What is a realistic interest rate for savings?',
      answer: 'High-yield savings accounts currently offer 4-5% APY, while traditional savings accounts offer much less. Investment accounts may offer higher returns but come with more risk.',
    },
    {
      question: 'Should I save or invest my money?',
      answer: 'Keep 3-6 months of expenses in easily accessible savings for emergencies. Beyond that, investing typically offers better long-term growth potential, though with more risk.',
    },
    {
      question: 'How long will it take to reach my savings goal?',
      answer: 'Use our calculator to see exactly how long it will take based on your initial deposit, monthly contributions, and interest rate. Consistent contributions are key to reaching your goal.',
    },
  ],
  'bmi-calculator': [
    {
      question: 'What is BMI and what does it measure?',
      answer: 'BMI (Body Mass Index) is a measure of body fat based on height and weight. It provides a quick assessment of whether you are underweight, normal weight, overweight, or obese.',
    },
    {
      question: 'Is BMI an accurate health indicator?',
      answer: 'BMI is a useful screening tool but has limitations. It does not account for muscle mass, bone density, or body composition. Athletes may have high BMI despite low body fat. Consult a healthcare provider for a complete assessment.',
    },
    {
      question: 'What is a healthy BMI range?',
      answer: 'A BMI between 18.5 and 24.9 is considered normal weight. Below 18.5 is underweight, 25-29.9 is overweight, and 30 or above is considered obese.',
    },
    {
      question: 'How can I improve my BMI?',
      answer: 'To improve BMI, focus on balanced nutrition and regular physical activity. Aim for gradual weight changes of 1-2 pounds per week. Always consult a healthcare provider before starting a weight loss program.',
    },
  ],
  'calorie-calculator': [
    {
      question: 'What is BMR and TDEE?',
      answer: 'BMR (Basal Metabolic Rate) is the calories you burn at rest. TDEE (Total Daily Energy Expenditure) is your BMR plus calories burned through activity. TDEE determines your maintenance calories.',
    },
    {
      question: 'How many calories should I eat to lose weight?',
      answer: 'To lose 1 pound per week, create a deficit of 500 calories per day. A safe rate is 1-2 pounds per week. Never eat below your BMR without medical supervision.',
    },
    {
      question: 'How accurate are calorie calculators?',
      answer: 'Calorie calculators provide estimates based on population averages. Your actual needs may vary by 10-20% due to genetics, metabolism, and other factors. Track your progress and adjust accordingly.',
    },
    {
      question: 'Should I eat the same calories every day?',
      answer: 'Consistency helps, but slight variations are normal. Focus on weekly averages rather than daily perfection. Listen to your body and adjust based on hunger, energy, and results.',
    },
  ],
  'pregnancy-due-date-calculator': [
    {
      question: 'How accurate is the due date calculation?',
      answer: 'Due dates are estimates based on a 40-week pregnancy from your last menstrual period. Only about 5% of babies are born on their exact due date. Most are born within two weeks before or after.',
    },
    {
      question: 'What if I do not know my last period date?',
      answer: 'If you do not know your last period date, your doctor can estimate your due date using an early ultrasound, which measures the size of the embryo or fetus.',
    },
    {
      question: 'How are trimesters divided?',
      answer: 'Pregnancy is divided into three trimesters. First trimester is weeks 1-12, second trimester is weeks 13-26, and third trimester is weeks 27-40.',
    },
    {
      question: 'When will I have my first ultrasound?',
      answer: 'The first ultrasound is typically scheduled between 8-14 weeks of pregnancy. This dating ultrasound confirms your due date and checks for multiples and early development.',
    },
  ],
  'ideal-weight-calculator': [
    {
      question: 'How is ideal weight calculated?',
      answer: 'Our calculator uses multiple scientific formulas including Devine, Robinson, Miller, and Hamwi. Each provides a slightly different estimate based on height and gender, giving you a healthy range.',
    },
    {
      question: 'Why do different formulas give different results?',
      answer: 'Different formulas were developed for different purposes and populations. Showing multiple formulas gives you a range rather than a single number, which is more realistic.',
    },
    {
      question: 'Should I aim for the exact ideal weight?',
      answer: 'Ideal weight is a range, not a specific number. Factors like muscle mass, frame size, and overall health matter more than hitting a precise weight. Focus on feeling healthy and strong.',
    },
    {
      question: 'How does frame size affect ideal weight?',
      answer: 'People with larger frames typically weigh more than those with smaller frames at the same height. Our formulas provide a range that accommodates different body types.',
    },
  ],
  'body-fat-calculator': [
    {
      question: 'How accurate is the Navy body fat method?',
      answer: 'The U.S. Navy method is reasonably accurate for most people, with an error margin of about 3-4%. For more precise measurements, consider DEXA scans or hydrostatic weighing.',
    },
    {
      question: 'What is a healthy body fat percentage?',
      answer: 'For men, 10-20% is athletic to fit, 20-25% is average. For women, 20-30% is athletic to fit, 30-35% is average. Essential fat is 2-5% for men and 10-13% for women.',
    },
    {
      question: 'How do I measure correctly?',
      answer: 'Measure each body part three times and use the average. Measure at the same time of day, preferably in the morning. Keep the tape snug but not tight, and do not hold your breath.',
    },
    {
      question: 'How can I reduce body fat percentage?',
      answer: 'Combine caloric deficit with strength training and cardiovascular exercise. Aim for gradual fat loss of 1-2 pounds per week while preserving muscle mass through adequate protein and resistance training.',
    },
  ],
  'percentage-calculator': [
    {
      question: 'How do I calculate percentage of a number?',
      answer: 'To find a percentage of a number, multiply the number by the percentage as a decimal. For example, 20% of 100 is 100 times 0.20, which equals 20.',
    },
    {
      question: 'How do I find what percent one number is of another?',
      answer: 'Divide the first number by the second number, then multiply by 100. For example, 25 is what percent of 200? 25 divided by 200 equals 0.125, times 100 equals 12.5%.',
    },
    {
      question: 'How do I calculate percentage increase or decrease?',
      answer: 'Subtract the original value from the new value, divide by the original value, then multiply by 100. Positive results are increases, negative are decreases.',
    },
  ],
  'fraction-calculator': [
    {
      question: 'How do you add fractions with different denominators?',
      answer: 'Find a common denominator by finding the least common multiple of the denominators. Convert each fraction to have that denominator, then add the numerators.',
    },
    {
      question: 'What does it mean to simplify a fraction?',
      answer: 'Simplifying means reducing the fraction to its lowest terms by dividing both numerator and denominator by their greatest common divisor. For example, 4/8 simplifies to 1/2.',
    },
    {
      question: 'How do you multiply fractions?',
      answer: 'Multiply the numerators together to get the new numerator, and multiply the denominators together to get the new denominator. Then simplify if possible.',
    },
    {
      question: 'How do you divide fractions?',
      answer: 'To divide fractions, multiply the first fraction by the reciprocal (flip) of the second fraction. Then simplify the result.',
    },
  ],
  'gpa-calculator': [
    {
      question: 'How is GPA calculated?',
      answer: 'GPA is calculated by multiplying each grade point by its credit hours, adding all products together, then dividing by total credit hours. A 4.0 scale is most common with A=4, B=3, C=2, D=1, F=0.',
    },
    {
      question: 'What is a good GPA?',
      answer: 'A GPA above 3.0 is generally considered good. 3.5 and above is very good, and 3.8+ is excellent. Requirements vary by institution and program.',
    },
    {
      question: 'Do all classes count equally toward GPA?',
      answer: 'No, classes are weighted by credit hours. A 4-credit class affects your GPA more than a 1-credit class. Some schools also weight honors and AP classes differently.',
    },
    {
      question: 'Can I raise my GPA significantly?',
      answer: 'The more credits you have, the harder it is to change your GPA dramatically. Early in your academic career, each class has more impact. Consistent good grades are key.',
    },
  ],
  'average-calculator': [
    {
      question: 'What is the difference between mean, median, and mode?',
      answer: 'Mean is the arithmetic average (sum divided by count). Median is the middle value when numbers are sorted. Mode is the most frequently occurring value. Each describes the data differently.',
    },
    {
      question: 'When should I use median instead of mean?',
      answer: 'Use median when your data has outliers or is skewed. For example, median income is more representative than mean income because a few very high earners can skew the mean.',
    },
    {
      question: 'What if there is no mode?',
      answer: 'If no number appears more than once, there is no mode. If multiple numbers appear with the same highest frequency, there are multiple modes (bimodal or multimodal).',
    },
  ],
  'age-calculator': [
    {
      question: 'How is age calculated in years, months, and days?',
      answer: 'Age is calculated by comparing your birth date to the current date, accounting for varying month lengths and leap years. The calculator shows exact age including partial years.',
    },
    {
      question: 'What day of the week was I born?',
      answer: 'Our calculator uses your birth date to determine which day of the week you were born. This is calculated using a mathematical algorithm that accounts for calendar patterns.',
    },
    {
      question: 'When is my next birthday?',
      answer: 'Your next birthday is shown along with a countdown of days remaining. This helps you plan celebrations and track annual milestones.',
    },
  ],
  'date-difference-calculator': [
    {
      question: 'How do you calculate the difference between two dates?',
      answer: 'The calculator subtracts the earlier date from the later date, accounting for varying month lengths, leap years, and calendar rules to give an exact count.',
    },
    {
      question: 'What are business days?',
      answer: 'Business days are weekdays (Monday through Friday), excluding weekends. Our calculator can show both calendar days and business days between dates.',
    },
    {
      question: 'Can I calculate dates in the past and future?',
      answer: 'Yes, you can calculate the difference between any two dates, whether they are both in the past, both in the future, or span from past to future.',
    },
  ],
  'days-between-dates-calculator': [
    {
      question: 'How do I count down to a specific event?',
      answer: 'Enter your event date and the calculator will show exactly how many years, months, weeks, and days remain until that date arrives.',
    },
    {
      question: 'Does the calculator account for leap years?',
      answer: 'Yes, the calculator automatically accounts for leap years when calculating the exact time remaining until your future date.',
    },
    {
      question: 'Can I see the countdown in different units?',
      answer: 'Yes, the calculator shows the remaining time in multiple formats including total days, weeks, months, and a combination of years, months, and days.',
    },
  ],
  'discount-calculator': [
    {
      question: 'How do you calculate a percentage discount?',
      answer: 'Multiply the original price by the discount percentage (as a decimal) to get the discount amount. Subtract this from the original price to get the final price.',
    },
    {
      question: 'Can I calculate multiple discounts?',
      answer: 'For multiple discounts, apply them one at a time. A 20% discount followed by 10% off is not the same as 30% off. Each discount applies to the new reduced price.',
    },
    {
      question: 'What is the difference between percent off and final percentage?',
      answer: 'Percent off is the discount (e.g., 25% off). Final percentage is what you pay (e.g., pay 75%). They are complementary and add up to 100%.',
    },
  ],
  'fuel-cost-calculator': [
    {
      question: 'How do you calculate fuel cost for a trip?',
      answer: 'Divide the distance by your vehicle fuel efficiency to get gallons needed. Multiply gallons by the price per gallon to get total fuel cost.',
    },
    {
      question: 'How can I improve my fuel efficiency?',
      answer: 'Maintain steady speeds, avoid rapid acceleration, keep tires properly inflated, remove excess weight, and keep up with regular vehicle maintenance.',
    },
    {
      question: 'Should I use city or highway MPG?',
      answer: 'Use highway MPG for mostly highway driving, city MPG for urban driving with frequent stops, or combined MPG for mixed driving. Your actual results may vary.',
    },
  ],
  'unit-converter': [
    {
      question: 'How do I convert between metric and imperial units?',
      answer: 'Our calculator uses precise conversion factors to convert between systems. Simply enter your value, select the unit types, and get instant results.',
    },
    {
      question: 'What is the difference between weight and mass?',
      answer: 'Mass is the amount of matter in an object (measured in grams or kilograms). Weight is the force of gravity on that mass (measured in pounds or newtons). For everyday use, the terms are often used interchangeably.',
    },
    {
      question: 'Why are temperature conversions different?',
      answer: 'Temperature scales have different zero points and intervals. The formulas account for these differences. For example, water freezes at 0°C, 32°F, and 273.15K.',
    },
  ],
};

export function getFAQForCalculator(slug: string): FAQItem[] {
  return faqData[slug] || [];
}
