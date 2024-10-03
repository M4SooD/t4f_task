import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProductDetail from './page';
import useProducts from '../../../hooks/useProducts';
import { useParams, useRouter } from 'next/navigation';

jest.mock('../../../hooks/useProducts');
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

describe('ProductDetail', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: '1' });

    useRouter.mockReturnValue({
      back: jest.fn(),
    });
  });

  it('renders product details correctly', () => {
    const mockProduct = {
      id: '1',
      title: 'Product 1',
      price: 100,
      image: '/product1.jpg',
      city: 'City A',
      presenter: 'Presenter A',
      runtime: 2,
      rate: 8,
      url: 'https://example.com',
    };

    useProducts.mockReturnValue({
      products: mockProduct,
      loading: false,
      error: null,
    });

    render(<ProductDetail />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('$' + 100)).toBeInTheDocument();
    expect(screen.getByText('City: City A')).toBeInTheDocument();
    expect(screen.getByText('Presenter: Presenter A')).toBeInTheDocument();
  });

  it('shows error message when loading fails', () => {
    useProducts.mockReturnValue({
      products: null,
      loading: false,
      error: 'Failed to load product',
    });

    render(<ProductDetail />);

    expect(screen.getByText('Failed to load product')).toBeInTheDocument();
  });
});
