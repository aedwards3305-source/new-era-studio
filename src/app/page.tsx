import { Hero } from '@/components/home/Hero';
import { FeaturedCollections } from '@/components/home/FeaturedCollections';
import { BestSellers } from '@/components/home/BestSellers';
import { ValueProps } from '@/components/home/ValueProps';
import { Testimonials } from '@/components/home/Testimonials';
import { BookInstallBanner } from '@/components/home/BookInstallBanner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <BestSellers />
      <ValueProps />
      <BookInstallBanner />
      <Testimonials />
    </>
  );
}
