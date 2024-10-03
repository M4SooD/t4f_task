'use client';

import React, { useState, useEffect } from 'react';
import useProducts from '../hooks/useProducts';
import Spinner from './Spinner';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const ProductCarousel = () => {
  const { products, loading, error } = useProducts();
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const lastViewedProductId = localStorage.getItem('lastViewedProduct');
    if (lastViewedProductId && products.length > 0) {
      const productIndex = products.findIndex(
        (product) => product.id === lastViewedProductId
      );
      if (productIndex !== -1) {
        setCurrentIndex(productIndex);
      }
    }
  }, [products]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const viewProductDetail = (id) => {
    localStorage.setItem('lastViewedProduct', id);
    router.push(`/product/${id}`);
  };

  if (loading) return <Spinner />;
  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500">Failed to load products: {error}</p>
        <button
          onClick={() => router.reload()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
          aria-label="Retry loading products"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="relative">
        <div className="relative overflow-hidden">
          <motion.div
            className="flex transition-transform duration-150"
            animate={{ x: -currentIndex * 100 + '%' }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="min-w-full p-4 bg-white rounded-lg shadow-lg cursor-pointer"
                onClick={() => viewProductDetail(product.id)}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${product.title}`}
              >
                <Image
                  src={product.image}
                  alt={`Image of ${product.title}`}
                  width={640}
                  height={480}
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                />
                <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
                <p className="text-gray-600">Price: ${product.price}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-400 transition"
          aria-label="Previous Slide"
        >
          &lt;
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-400 transition"
          aria-label="Next Slide"
        >
          &gt;
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center space-x-2 mt-4">
        {products.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(ProductCarousel);
