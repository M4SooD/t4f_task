import ProductCarousel from '@/components/ProductCarousel';

export default function Home() {
  return (
    <main className="min-h-screen bg-green-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Product Carousel</h1>
      <ProductCarousel />
    </main>
  );
}
