# CLAUDE.md

This file provides guidance to Claude Code when working with this codebase.

## Project Overview

CalcHub is a comprehensive collection of 20 free online calculators organized into 5 categories: Finance, Health, Math, Date & Time, and Everyday. The platform is built to be fast, accurate, SEO-optimized, and mobile-friendly with a clean, modern design.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **UI**: React 19 with Server Components
- **Monetization**: Google AdSense (configurable)
- **Analytics**: Google Analytics (configurable)

## Project Structure

```
calc-hub/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with navbar, footer, scripts
│   │   ├── page.tsx            # Homepage with category grid
│   │   ├── globals.css         # Global styles (Tailwind imports)
│   │   ├── sitemap.ts          # Dynamic sitemap generation
│   │   └── robots.ts           # Robots.txt configuration
│   ├── components/
│   │   ├── layout/             # Layout components
│   │   │   ├── navbar.tsx      # Top navigation with category links
│   │   │   ├── footer.tsx      # Footer with all calculator links
│   │   │   └── ad-slot.tsx     # Google AdSense ad component
│   │   ├── calculator/         # Calculator components
│   │   │   ├── calculator-layout.tsx    # Shared layout wrapper
│   │   │   ├── related-calculators.tsx  # Related calculators grid
│   │   │   └── faq-section.tsx          # FAQ with JSON-LD
│   │   └── home/               # Homepage components
│   │       ├── category-grid.tsx        # Category cards grid
│   │       └── calculator-card.tsx      # Individual calculator card
│   ├── lib/
│   │   ├── config.ts           # Site configuration (from env vars)
│   │   ├── calculators.ts      # Calculator registry and utilities
│   │   └── seo.ts              # SEO metadata helper functions
│   └── data/
│       └── faq.ts              # FAQ data for all calculators
├── public/                     # Static assets
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── next.config.ts             # Next.js configuration
├── postcss.config.mjs         # PostCSS configuration
├── .env.example               # Environment variable template
└── CLAUDE.md                  # This file
```

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Code Style & Conventions

### Component Structure
- Use Server Components by default, Client Components only when needed (`'use client'`)
- Prefer composition over inheritance
- Keep components focused and single-responsibility
- Extract reusable logic into custom hooks or utilities

### Naming Conventions
- Components: PascalCase (e.g., `CalculatorLayout`)
- Files: kebab-case (e.g., `calculator-layout.tsx`)
- Functions: camelCase (e.g., `getCalculator`)
- Constants: camelCase or UPPER_SNAKE_CASE for true constants

### TypeScript
- Always define interfaces for props and data structures
- Use type inference where possible
- Avoid `any` type - use `unknown` if type is truly unknown
- Export interfaces when they might be used elsewhere

### Styling
- Use Tailwind utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing using Tailwind's spacing scale
- Use semantic color names (e.g., `text-blue-600` for primary actions)

### SEO Best Practices
- Every calculator page should have unique, descriptive metadata
- Use proper heading hierarchy (h1 → h2 → h3)
- Include structured data (JSON-LD) for FAQs
- Optimize for Core Web Vitals

## Calculator Development Pattern

When creating a new calculator, follow this pattern:

1. Add calculator metadata to `src/lib/calculators.ts`
2. Add FAQ entries to `src/data/faq.ts`
3. Create calculator component in `src/app/[category]/[calculator]/page.tsx`
4. Use `CalculatorLayout` wrapper for consistent structure
5. Implement calculator logic as a client component
6. Generate metadata using `generateCalculatorMetadata` from `src/lib/seo.ts`

### Example Calculator Structure

```typescript
// src/app/finance/mortgage-calculator/page.tsx
import { generateCalculatorMetadata } from '@/lib/seo';
import { getCalculator, getRelatedCalculators } from '@/lib/calculators';
import { getFAQForCalculator } from '@/data/faq';
import { CalculatorLayout } from '@/components/calculator/calculator-layout';
import { MortgageCalculatorClient } from './mortgage-calculator-client';

export async function generateMetadata() {
  const calc = getCalculator('finance', 'mortgage-calculator')!;
  return generateCalculatorMetadata({
    title: calc.name,
    description: calc.longDescription,
    path: `/finance/mortgage-calculator`,
    keywords: calc.keywords,
  });
}

export default function MortgageCalculatorPage() {
  const calc = getCalculator('finance', 'mortgage-calculator')!;
  const faq = getFAQForCalculator('mortgage-calculator');
  const related = getRelatedCalculators(calc);

  return (
    <CalculatorLayout
      title={calc.name}
      description={calc.longDescription}
      category={calc.category}
      categorySlug={calc.categorySlug}
      faqItems={faq}
      relatedCalculators={related}
    >
      <MortgageCalculatorClient />
    </CalculatorLayout>
  );
}
```

## Important Notes

### Environment Variables
- Set up `.env.local` based on `.env.example`
- AdSense and Analytics are optional - site works without them
- Never commit `.env.local` to version control

### Performance
- Use React Server Components for static content
- Minimize client-side JavaScript
- Lazy load heavy components when possible
- Optimize images and assets

### Accessibility
- Use semantic HTML elements
- Include proper ARIA labels
- Ensure keyboard navigation works
- Maintain sufficient color contrast

### Browser Support
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Android)
- Responsive design from 320px to 4K displays

## Design System

### Colors
- Primary: Blue (#2563EB / blue-600)
- Success: Green (green-600)
- Warning: Orange (orange-600)
- Error: Red (red-600)
- Text: Gray scale (gray-900, gray-600, gray-400)
- Background: White and gray-50

### Typography
- Font: Inter (Google Fonts)
- Headings: Bold, descending sizes
- Body: Regular weight, 16px base
- Code/Numbers: Monospace when appropriate

### Spacing
- Use Tailwind's spacing scale (4, 6, 8, 12, 16px etc.)
- Consistent padding within cards (p-6 to p-8)
- Adequate whitespace between sections

### Components
- Cards: White background, rounded-lg, shadow-lg
- Buttons: Solid blue for primary, outlined for secondary
- Inputs: Border, rounded, focus ring
- Hover states: Subtle transitions on all interactive elements
