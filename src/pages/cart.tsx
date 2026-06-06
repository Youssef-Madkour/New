import { Link } from 'react-router-dom';
import { useStore } from '../Zustand/store';
import { useProducts } from '../context/ProductsContext';
import type { IProduct } from '../Zustand/slices/cartSlice';
import type { ICartItem } from '../Zustand/slices/cartSlice';

interface ICartRow {
  item: ICartItem;
  product: IProduct | null;
}

const Cart = () => {
  const cart = useStore((state) => state);
  const increaseQty = useStore((state) => state.increaseQty);
  const decreaseQty = useStore((state) => state.decreaseQty);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const { getProductById, loading } = useProducts();

  const items: ICartRow[] = cart.products.map((item) => ({
    item,
    product: getProductById(item.productId),
  }));

  const totalItems: number = cart.getTotalItems();
  const totalPrice: number = cart.getTotalPrice(getProductById);

  if (loading && cart.products.length > 0 && items.every(({ product }) => !product)) {
    return <div className='text-center p-8'>Loading...</div>;
  }

  return (
    <div className='p-4 max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold text-center mb-6'>🛒 Shopping Cart</h1>
      <Link to='/product' className='text-b6 hover:underline mb-4 inline-block'>
        ← Back to Shop
      </Link>

      {cart.products.length === 0 ? (
        <div className='text-center py-16'>
          <p className='text-gy5 text-lg mb-4'>Your cart is empty</p>
          <Link
            to='/product'
            className='bg-b6 text-white px-6 py-2 rounded-lg hover:bg-b7 transition'
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className='bg-gray-100 rounded-lg p-4'>
          <div className='space-y-2'>
            {items.map(({ item, product }, index) => (
              <div
                key={item.productId}
                className='grid items-center bg-white rounded p-3 gap-4'
              >
                <span className='text-gy5 font-bold'>#{index + 1}</span>

                {product && (
                  <>
                    <img src={product.image} alt='' className='w-16 h-16 mx-auto block' />
                    <div className='flex-1 text-center'>
                      <p className='font-semibold text-sm'>{product.title}</p>
                      <p className='text-gn6'>${product.price}</p>
                    </div>
                  </>
                )}

                <div className='flex items-center justify-center gap-2'>
                  <button
                    onClick={() => decreaseQty(item.productId)}
                    className='bg-r1 text-r6 w-8 h-8 rounded-full hover:bg-r2 transition text-lg font-bold'
                  >
                    −
                  </button>
                  <span className='bg-b1 text-b8 px-3 py-1 rounded-full font-bold text-center'>
                    Qty: {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQty(item.productId)}
                    className='bg-gn1 text-gn6 w-8 h-8 rounded-full hover:bg-gn2 transition text-lg font-bold'
                  >
                    +
                  </button>
                </div>

                <p className='font-bold text-b6 text-center'>
                  ${product ? (product.price * item.quantity).toFixed(2) : '--'}
                </p>

                <button
                  onClick={() => removeFromCart(item.productId)}
                  className='text-r6 hover:text-r7 text-sm underline text-center'
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className='mt-4 pt-4 border-t border-gy3 flex justify-between'>
            <p className='text-lg font-bold'>Total Items: {totalItems}</p>
            <p className='text-lg font-bold text-b6'>
              Subtotal: ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
