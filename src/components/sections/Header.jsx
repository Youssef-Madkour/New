import { Link } from 'react-router-dom';
import { useCartStore } from '../../Zustand/cartStore';


function Header() {
  const cart = useCartStore((state) => state);
  const totalCount = cart.products.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <header className='bg-navy text-white flex items-center justify-between p-2'>
      <h2 className='m-0'>My App</h2>
      <Link
        to='/cart'
        className='bg-b6 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow relative'
      >
        🛒 cart
        {totalCount > 0 && (
          <span className='absolute -top-2 -right-2 bg-r5 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold'>
            {totalCount}
          </span>
        )}
      </Link>
    </header>
  );
}

export default Header;