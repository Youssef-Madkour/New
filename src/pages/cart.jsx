import { useMemo } from 'react';
import { useCart } from '../context/CartContext.js';
import { useProducts } from '../context/ProductsContext.js';

const Cart = () => {
  const { cart, increaseQty, decreaseQty } = useCart();
  const { getProductById, loading } = useProducts();

  const items = useMemo(
    () =>
      cart.products.map((item) => ({
        item,
        product: getProductById(item.productId),
      })),
    [cart.products, getProductById]
  );

  // Todo: use state
  const totalItems = useMemo(
    () => cart.products.reduce((sum, p) => sum + p.quantity, 0),
    [cart.products]
  );

  // Todo: use state
  const totalPrice = useMemo(
    () =>
      items.reduce(
        (sum, { item, product }) =>
          product ? sum + product.price * item.quantity : sum,
        0
      ),
    [items]
  );

  if (
    loading &&
    cart.products.length > 0 &&
    items.every(({ product }) => !product)
  ) {
    return <div className='text-center p-8'>Loading...</div>;
  }

  return (
    <div className='p-4 max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold text-center mb-6'>🛒 Shopping Cart</h1>
      <a
        href='./Product'
        className='text-blue-600 hover:underline mb-4 inline-block'
      >
        ← Back to Shop
      </a>

      {cart.products.length === 0 ? (
        <p className='text-center text-gray-500'>Your cart is empty</p>
      ) : (
        <div className='bg-gray-100 rounded-lg p-4'>
          <p className='text-sm text-gray-600 mb-2'>User ID: {cart.userId}</p>
          <p className='text-sm text-gray-600 mb-4'>
            Date: {cart.date ? new Date(cart.date).toLocaleString() : '—'}
          </p>

          <div className='space-y-2'>
            {items.map(({ item, product }, index) => (
              <div
                key={item.productId}
                className='grid items-center bg-white rounded p-3 gap-4'
              >
                <span className='text-gray-400 font-bold'>#{index + 1}</span>

                {product && (
                  <>
                    <img
                      src={product.image}
                      alt=''
                      className='w-16 h-16 mx-auto block'
                    />
                    <div className='flex-1 text-center'>
                      <p className='font-semibold text-sm'>{product.title}</p>
                      <p className='text-green-600'>${product.price}</p>
                    </div>
                  </>
                )}

                <div className='flex items-center justify-center gap-2'>
                  <button
                    onClick={() => decreaseQty(item.productId)}
                    className='bg-red-100 text-red-600 w-8 h-8 rounded-full hover:bg-red-200 transition text-lg font-bold'
                  >
                    −
                  </button>

                  <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold text-center'>
                    Qty: {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item.productId)}
                    className='bg-green-100 text-green-600 w-8 h-8 rounded-full hover:bg-green-200 transition text-lg font-bold'
                  >
                    +
                  </button>
                </div>

                <p className='font-bold text-blue-600 text-center'>
                  ${product ? (product.price * item.quantity).toFixed(2) : '--'}
                </p>
              </div>
            ))}
          </div>

          <div className='mt-4 pt-4 border-t border-gray-300 flex justify-between'>
            <p className='text-lg font-bold'>Total Items: {totalItems}</p>
            <p className='text-lg font-bold text-blue-600'>
              Subtotal: ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
