import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCarousel from './ProductCarousel';
import useProducts from '../hooks/useProducts';

jest.mock('../hooks/useProducts');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('ProductCarousel', () => {
  const mockProducts = [
    { id: '1', title: 'Product 1', price: 100, image: '/product1.jpg' },
    { id: '2', title: 'Product 2', price: 200, image: '/product2.jpg' },
  ];

  beforeEach(() => {
    useProducts.mockReturnValue({
      products: mockProducts,
      loading: false,
      error: null,
    });
  });

  it('renders product carousel correctly', () => {
    render(<ProductCarousel />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('shows the next product when the next button is clicked', () => {
    render(<ProductCarousel />);

    const nextButton = screen.getByLabelText('Next Slide');
    fireEvent.click(nextButton);

    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('shows the previous product when the previous button is clicked', () => {
    render(<ProductCarousel />);

    const prevButton = screen.getByLabelText('Previous Slide');
    fireEvent.click(prevButton);

    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('shows an error message on failure', () => {
    useProducts.mockReturnValue({
      products: [],
      loading: false,
      error: 'Failed to load products',
    });
    render(<ProductCarousel />);

    expect(
      screen.getByText('Failed to load products: Failed to load products')
    ).toBeInTheDocument();
  });
});
