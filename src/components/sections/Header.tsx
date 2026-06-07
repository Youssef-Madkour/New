import { Link } from 'react-router-dom';
import { useStore } from '../../Zustand/store';

function Header() {
  const totalCount = useStore((state) =>
    state.products.reduce((sum, p) => sum + p.quantity, 0)
  );

  const user = useStore((state) => state.user);
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const logout = useStore((state) => state.logout);

  return (
    <header className='bg-navy text-white flex items-center justify-between p-2'>
      <h2 className='m-0'>My App</h2>

      <nav className='flex items-center gap-4'>
        <Link to='/'>Home</Link>
        <Link to='/product'>Shop</Link>

        {isLoggedIn && user ? (
          <div className='flex items-center gap-2'>
            <span>Hello, {user.name}</span>
            <button
              onClick={() => logout()}
              className='bg-r5 text-white px-3 py-1 rounded hover:bg-r6'
            >
              Logout
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
