import { useState, useEffect } from 'react';
import axios from 'axios';

const useProducts = (id = null, shouldShuffle = false) => {
  const [products, setProducts] = useState(id ? null : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = id
          ? `https://66e20997c831c8811b57050e.mockapi.io/api/v1/home/items/${id}`
          : `https://66e20997c831c8811b57050e.mockapi.io/api/v1/home/items`;

        const response = await axios.get(url);
        let data = response.data;

        if (!id && shouldShuffle) {
          data = data.sort(() => Math.random() - 0.5);
        }

        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id, shouldShuffle]);

  return { products, loading, error };
};

export default useProducts;
