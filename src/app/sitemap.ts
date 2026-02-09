import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
import { calculators } from '@/lib/calculators';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  // Add all calculator pages
  calculators.forEach((calc) => {
    routes.push({
      url: `${siteConfig.url}/${calc.categorySlug}/${calc.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  return routes;
}
