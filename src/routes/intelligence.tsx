import { createFileRoute } from '@tanstack/react-router';
import { IntelligencePage } from '@/components/terrafarm/pages';

export const Route = createFileRoute('/intelligence')({
  head: () => ({ meta: [
    { title: 'Land Intelligence — TerraFarm AI' },
    { name: 'description', content: 'Understand temperature, rainfall, vegetation and seasonal patterns across the demo farm.' },
    { property: 'og:title', content: 'Land Intelligence — TerraFarm AI' },
    { property: 'og:description', content: 'Understand temperature, rainfall, vegetation and seasonal patterns across the demo farm.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: IntelligencePage,
});
