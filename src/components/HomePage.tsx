import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className='min-h-[80vh] flex flex-col'>
      <div className='flex-1 flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-br from-navy via-b9 to-b8'>
        <span className='text-5xl mb-6'>🛍️</span>
        <h1 className='text-5xl font-extrabold text-white mb-4 leading-tight'>
          Shop Everything.<br />
          <span className='text-b5'>Pay Less.</span>
        </h1>
        <p className='text-blue-200 text-lg mb-10 max-w-md'>
          Browse hundreds of products across all categories. Fast, easy, and secure.
        </p>
        <Link
          to='/product'
          className='bg-b5 hover:bg-b6 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg transition hover:scale-105 active:scale-95'
        >
          Browse Products →
        </Link>
      </div>

      <div className='bg-white py-12 px-6'>
        <div className='max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center'>
          <div>
            <div className='text-3xl mb-2'>🚀</div>
            <h3 className='font-bold text-gy8 mb-1'>Fast Delivery</h3>
            <p className='text-gy5 text-sm'>Get your orders delivered quickly</p>
          </div>
          <div>
            <div className='text-3xl mb-2'>🔒</div>
            <h3 className='font-bold text-gy8 mb-1'>Secure Payments</h3>
            <p className='text-gy5 text-sm'>Your data is always safe with us</p>
          </div>
          <div>
            <div className='text-3xl mb-2'>↩️</div>
            <h3 className='font-bold text-gy8 mb-1'>Easy Returns</h3>
            <p className='text-gy5 text-sm'>30-day hassle-free returns</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
