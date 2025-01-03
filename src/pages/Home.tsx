import { PageLayout } from '../components/layout/PageLayout';
import { HeroSection } from '../components/home/HeroSection';

export function Home() {
  return (
    <PageLayout showFooter={false}>
      <HeroSection />
    </PageLayout>
  );
}