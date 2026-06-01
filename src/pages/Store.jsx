import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

function Storepage() {
  const { data: products } = useFetch('/data/products.json');
  const [counts, setCounts] = useState({});

  // Todo: Depricate unused code 
  // i will use it with the button of checkout to inc and dec 
  const increase = (productId) => {
    setCounts((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };

  const decrease = (productId) => {
    setCounts((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) - 1, 0),
    }));
  };

  const totalCount = Object.values(counts).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <div className='p-6'>
      <div className='relative mb-8'>
        <h1 className='text-3xl font-bold text-center'>Our Products</h1>
        <div className='absolute right-0 top-1/2 -translate-y-1/2 bg-b6 text-white px-6 py-6 rounded-full flex items-center gap-2 shadow text-sm'>
          <span>🛒</span>
          <span className='font-bold'>{totalCount}</span>
        </div>
      </div>{' '}
      <div className='grid grid-cols-2 gap-6'>
        {products?.map((product) => (
          <div
            key={product.id}
            className='border rounded-lg p-4 shadow hover:shadow-xl transition text-center'
          >
            <Link
              to={`/product/${product.id}?clicks=${counts[product.id] || 0}`}
            >
              <img
                src={product.icon}
                alt={product.title}
                className='h-48 w-full object-contain rounded mb-4'
              />
              <h3 className='font-bold text-lg'>{product.title}</h3>
              <p className='text-r6 text-sm mt-2'>{product.desc}</p>
              <p className='font-bold text-lg text-center'>{product.price} </p>
            </Link>
            <button className='bg-b6 text-white w-50 h-10 rounded-full hover:bg-b7 transition text-xl font-bold'>
              Checkout
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Storepage;
