import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] p-6 text-center'>
      <h1 className='text-4xl font-bold text-gy8 mb-4'>Welcome to React Shop</h1>
      <p className='text-gy5 text-lg mb-8 max-w-md'>
        Browse our collection of products and add your favorites to the cart.
      </p>
      <Link
        to='/product'
        className='bg-b6 text-white px-8 py-3 rounded-lg hover:bg-b7 transition text-lg font-semibold'
      >
        Browse Products →
      </Link>
    </div>
  );
}

export default HomePage;
