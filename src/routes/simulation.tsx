import { createFileRoute } from '@tanstack/react-router';
import { SimulationPage } from '@/components/terrafarm/pages';

export const Route = createFileRoute('/simulation')({
  head: () => ({ meta: [
    { title: 'Future Simulation — AgroMind' },
    { name: 'description', content: 'Watch an educational model-based flood scenario unfold on the demo farm.' },
    { property: 'og:title', content: 'Future Simulation — AgroMind' },
    { property: 'og:description', content: 'Watch an educational model-based flood scenario unfold on the demo farm.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: SimulationPage,
});
