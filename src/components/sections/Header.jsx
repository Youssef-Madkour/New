import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.js';

function Header() {
  const { totalCount } = useCart();

  return (
    <header className='bg-[#001529] text-white flex items-center justify-between p-2'>
      <h2 className='m-0'>My App</h2>
      <Link
        to='/cart'
        className='bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow relative'
      >
        🛒 cart
        {totalCount > 0 && (
          <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold'>
            {totalCount}
          </span>
        )}
      </Link>
    </header>
  );
}

export default Header;
