import './globals.css';

export const metadata = {
  title: 'Time 4 Fun Carousel',
  description: 'A product carousel built with Next.js 14 and Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
