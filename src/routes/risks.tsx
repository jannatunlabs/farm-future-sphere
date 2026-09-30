import { createFileRoute } from '@tanstack/react-router';
import { RisksPage } from '@/components/terrafarm/pages';

export const Route = createFileRoute('/risks')({
  head: () => ({ meta: [
    { title: 'Risk Center — AgroMind' },
    { name: 'description', content: 'Explore flood, heat, drought and extreme rainfall risks with recommended actions.' },
    { property: 'og:title', content: 'Risk Center — AgroMind' },
    { property: 'og:description', content: 'Explore flood, heat, drought and extreme rainfall risks with recommended actions.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: RisksPage,
});
