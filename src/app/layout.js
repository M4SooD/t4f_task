import Head from 'next/head';
import './globals.css';

export const metadata = {
  title: 'Time 4 Fun Carousel',
  description:
    'A product carousel built with Next.js 14 and Tailwind CSS. Explore a wide range of products with seamless navigation and responsive design.',
  keywords:
    'Next.js, Tailwind CSS, Product Carousel, E-commerce, Web Development',
  image: '/images/product-carousel.png',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content="Masood Moosavi" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
