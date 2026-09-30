import { createFileRoute } from '@tanstack/react-router';
import { ScenariosPage } from '@/components/terrafarm/pages';

export const Route = createFileRoute('/scenarios')({
  head: () => ({ meta: [
    { title: 'Scenario Lab — AgroMind' },
    { name: 'description', content: 'Test what-if farming scenarios and compare changes in yield, profit and risk.' },
    { property: 'og:title', content: 'Scenario Lab — AgroMind' },
    { property: 'og:description', content: 'Test what-if farming scenarios and compare changes in yield, profit and risk.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: ScenariosPage,
});
