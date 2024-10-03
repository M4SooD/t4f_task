import { useState, useEffect } from 'react';
import axios from 'axios';

const useProducts = (id = null, shouldShuffle = false) => {
  const [products, setProducts] = useState(id ? null : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = `https://66e20997c831c8811b57050e.mockapi.io/api/v1/home/items${
          id ? `/${id}` : ''
        }`;
        const response = await axios.get(url);
        let data = response.data;

        if (!id && shouldShuffle) {
          data = data.sort(() => Math.random() - 0.5);
        }

        setProducts(data);
        setError(null);
      } catch (err) {
        if (retryCount < 3) {
          setTimeout(() => setRetryCount((prev) => prev + 1), 1000);
        } else {
          setError('Failed to fetch products after multiple attempts.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id, shouldShuffle, retryCount]);

  return { products, loading, error };
};

export default useProducts;
