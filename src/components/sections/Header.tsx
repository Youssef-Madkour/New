import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../Zustand/store';

function Header() {
  const totalCount = useStore((state) =>
    state.products.reduce((sum, p) => sum + p.quantity, 0)
  );

  const user = useStore((state) => state.user);
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  return (
    <header className='bg-navy text-white sticky top-0 z-50 shadow-lg'>
      <div className='max-w-6xl mx-auto px-4 py-3 flex items-center justify-between'>
        <Link to='/' className='text-xl font-bold tracking-wide hover:opacity-80 transition'>
          🛍️ ShopZone
        </Link>

        <nav className='flex items-center gap-4'>
          
          {isLoggedIn && user ? (
            <button
              onClick={() => navigate('/profile')}
              className='flex items-center gap-2 bg-white/10 hover:bg-white/20 transition px-3 py-1.5 rounded-full'
            >
              <div className='w-7 h-7 rounded-full bg-b6 flex items-center justify-center text-sm font-bold uppercase'>
                {user.name.charAt(0)}
              </div>
              <span className='text-sm font-medium hidden sm:block'>{user.name}</span>
            </button>
          ) : (
            <Link
              to='/login'
              className='text-sm bg-white/10 hover:bg-white/20 transition px-4 py-1.5 rounded-full font-medium'
            >
              Login
            </Link>
          )}

          <Link
            to='/cart'
            className='relative bg-b6 hover:bg-b7 transition px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium shadow'
          >
            <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' />
            </svg>
            Cart
            {totalCount > 0 && (
              <span className='absolute -top-2 -right-2 bg-r5 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold'>
                {totalCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
