import { createFileRoute } from '@tanstack/react-router';
import { HomePage } from '@/components/terrafarm/pages';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Overview — TerraFarm AI' },
    { name: 'description', content: 'Explore a demo farm with Earth intelligence, crop recommendations, climate risks and future scenarios.' },
    { property: 'og:title', content: 'Overview — TerraFarm AI' },
    { property: 'og:description', content: 'Explore a demo farm with Earth intelligence, crop recommendations, climate risks and future scenarios.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: HomePage,
});
