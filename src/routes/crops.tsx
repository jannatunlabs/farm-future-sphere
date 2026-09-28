import { createFileRoute } from '@tanstack/react-router';
import { CropsPage } from '@/components/terrafarm/pages';

export const Route = createFileRoute('/crops')({
  head: () => ({ meta: [
    { title: 'Crop Advisor — TerraFarm AI' },
    { name: 'description', content: 'Compare suitable crops, yields, water needs, estimated profits and risks.' },
    { property: 'og:title', content: 'Crop Advisor — TerraFarm AI' },
    { property: 'og:description', content: 'Compare suitable crops, yields, water needs, estimated profits and risks.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: CropsPage,
});
