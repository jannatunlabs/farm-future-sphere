import { createFileRoute } from '@tanstack/react-router';
import { ProfitPage } from '@/components/terrafarm/pages';

export const Route = createFileRoute('/profit')({
  head: () => ({ meta: [
    { title: 'Profit Simulator — TerraFarm AI' },
    { name: 'description', content: 'Compare crop revenue, cost and profit across three illustrative scenarios.' },
    { property: 'og:title', content: 'Profit Simulator — TerraFarm AI' },
    { property: 'og:description', content: 'Compare crop revenue, cost and profit across three illustrative scenarios.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: ProfitPage,
});
