import { createFileRoute } from '@tanstack/react-router';
import { LandPage } from '@/components/terrafarm/pages';

export const Route = createFileRoute('/select-land')({
  head: () => ({ meta: [
    { title: 'Select Land — AgroMind' },
    { name: 'description', content: 'Explore the demo farm boundary and environmental map layers.' },
    { property: 'og:title', content: 'Select Land — AgroMind' },
    { property: 'og:description', content: 'Explore the demo farm boundary and environmental map layers.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: LandPage,
});
