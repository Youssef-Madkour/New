import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../hooks/api';
import { useCartStore } from '../Zustand/cartStore';

const ProductDetails = () => {
  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const [data, setData] = useState({ id: null, product: null, error: false });

  useEffect(() => {
    let cancelled = false;
    api
      .get(`/products/${id}`)  
      .then((res) => {
        if (!cancelled) setData({ id, product: res.data, error: false });
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('Failed to load product', err);
          setData({ id, product: null, error: true });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const loading = data.id !== id;
  const product = data.product;

  if (loading)
    return <div className='text-center p-8 text-gy5'>Loading...</div>;
  if (data.error || !product)
    return <div className='text-center p-8 text-r6'>Product not found</div>;

  return (
    <div className='p-4 max-w-2xl mx-auto'>
      <Link to='/Product' className='text-b6 hover:underline mb-4 block'>
        ← Back to Shop
      </Link>

      <div className='bg-white rounded-lg shadow-lg p-6'>
        <img
          src={product.image}
          alt={product.title}
          className='w-full h-64 object-contain mb-4'
        />
        <h1 className='text-2xl font-bold mb-2 text-gy7'>{product.title}</h1>
        <p className='text-gy5 mb-2 text-center'>{product.category}</p>
        <p className='text-gy6 mb-6'>{product.description}</p>
        <p className='text-gn6 font-bold text-xl text-center mb-4'>
          ${product.price}
        </p>
        <button
          onClick={() => addToCart(product.id)}
          className='bg-b6 text-white px-6 py-3 rounded-lg hover:bg-b7 transition w-full'
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default ProductDetails;