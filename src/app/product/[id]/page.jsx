'use client';

import { useParams, useRouter } from 'next/navigation';
import useProducts from '@/hooks/useProducts';
import Image from 'next/image';
import { useEffect } from 'react';
import Skeleton from '@/components/Skeleton'; // Changed from Spinner to Skeleton

const ProductDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const { products: product, loading, error } = useProducts(id);

  useEffect(() => {
    if (id) {
      localStorage.setItem('lastViewedProduct', id);
    }
  }, [id]);

  const goBackToCarousel = () => {
    router.back();
  };

  if (loading) return <Skeleton />; // Show skeleton instead of Spinner
  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button
          onClick={() => router.reload()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-5 text-center">
          {product?.title}
        </h1>
        <Image
          src={product?.image}
          alt={product?.title}
          width={640}
          height={480}
          className="rounded-lg"
          loading="lazy"
        />
        <p className="text-lg text-gray-600 mt-5">
          Price: <span className="font-semibold">${product?.price}</span>
        </p>
        <p className="text-md text-gray-500 mt-2">City: {product?.city}</p>
        <p className="text-md text-gray-500 mt-2">
          Presenter: {product?.presenter}
        </p>
        <p className="text-md text-gray-500 mt-2">
          Runtime: {product?.runtime} hrs
        </p>
        <p className="text-md text-gray-500 mt-2">Rating: {product?.rate}/10</p>
        <a
          href={product?.url}
          className="text-blue-500 underline mt-2 inline-block"
        >
          Visit Website
        </a>

        <button
          onClick={goBackToCarousel}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
        >
          Back to Carousel
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
