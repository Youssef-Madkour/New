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
    <header className='bg-navy text-white flex items-center justify-between p-2'>
      <h2 className='m-0'>My App</h2>

      <nav className='flex items-center gap-4'>
        {isLoggedIn && user ? (
          <div className='flex items-center gap-2'>
            <button
              onClick={() => navigate('/profile')}
              className='flex items-center gap-1 hover:opacity-75 transition'
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z'/>
              </svg>
              <span className='text-sm font-medium'>{user.name}</span>
            </button>
          </div>
        ) : (
          <Link to='/login' className='text-b6 hover:underline'>
            Login
          </Link>
        )}

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
      </nav>
    </header>
  );
}

export default Header;
