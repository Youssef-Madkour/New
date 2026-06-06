import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../Zustand/store';
import { useProducts } from '../context/ProductsContext';
import type { IProduct } from '../Zustand/slices/cartSlice';

const PAGE_SIZE = 10;

const Pro = () => {
  const { products, loading, error } = useProducts();
  const addToCart = useStore((state) => state.addToCart);
  const increaseQty = useStore((state) => state.increaseQty);
  const decreaseQty = useStore((state) => state.decreaseQty);
  const cartProducts = useStore((state) => state.products);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleProducts: IProduct[] = products.slice(0, visibleCount);

  const getCartQty = (productId: number): number => {
    const item = cartProducts.find((p) => p.productId === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold text-center mb-4'>React Shop</h1>
      {error && <p className='text-red-500 text-center'>{error}</p>}
      {loading && products.length === 0 && (
        <p className='text-center text-gray-500'>Loading products…</p>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center gap-4'>
        {visibleProducts.map((product) => {
          const qty = getCartQty(product.id);

          return (
            <div
              key={product.id}
              className='bg-white rounded-lg shadow-lg p-4 hover:scale-105 transition-all duration-300'
            >
              <img
                className='object-contain w-full h-48 mb-4'
                src={product.image}
                alt={product.title}
              />
              <p className='text-gy6'>{product.category}</p>
              <p className='text-gn6 font-bold text-lg'>${product.price}</p>

              {qty === 0 ? (
                <button
                  onClick={() => addToCart(product.id)}
                  className='bg-b6 text-white px-6 py-2 rounded-lg hover:bg-b7 transition mt-4 w-full'
                >
                  Checkout
                </button>
              ) : (
                <div className='flex items-center justify-center gap-2 mt-4'>
                  <button
                    onClick={() => decreaseQty(product.id)}
                    className='bg-r1 text-r6 w-8 h-8 rounded-full hover:bg-r2 transition text-lg font-bold'
                  >
                    −
                  </button>
                  <span className='bg-b1 text-b8 px-3 py-1 rounded-full font-bold text-center min-w-[60px]'>
                    {qty}
                  </span>
                  <button
                    onClick={() => increaseQty(product.id)}
                    className='bg-gn1 text-gn6 w-8 h-8 rounded-full hover:bg-gn2 transition text-lg font-bold'
                  >
                    +
                  </button>
                </div>
              )}

              <Link
                to={`/product/${product.id}`}
                className='text-b6 text-sm mt-2 block hover:underline'
              >
                View Product →
              </Link>
            </div>
          );
        })}
      </div>

      {visibleCount < products.length && (
        <div>
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className='mt-6 bg-gy8 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition block mx-auto'
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Pro;
