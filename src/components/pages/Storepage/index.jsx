import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';

function Storepage() {
  const { data: products } = useFetch('/data/products.json');
  const [counts, setCounts] = useState({});

  const increase = (productId) => {
    setCounts((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };

  const decrease = (productId) => {
    setCounts((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) - 1, 0),
    }));
  };

  // Calculate total items in cart
  const totalCount = Object.values(counts).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <div className='p-6'>
      <div className='relative mb-8'>
        <h1 className='text-3xl font-bold text-center'>Our Products</h1>
        <div className='absolute right-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-6 rounded-full flex items-center gap-2 shadow text-sm'>
          <span>🛒</span>
          <span className='font-bold'>{totalCount}</span>
        </div>
      </div>{' '}
      <div className='grid grid-cols-2 gap-6'>
        {products?.map((product) => (
          <div
            key={product.id}
            className='border rounded-lg p-4 shadow hover:shadow-xl transition text-center'
          >
            <Link
              to={`/product/${product.id}?clicks=${counts[product.id] || 0}`}
            >
              <img
                src={product.icon}
                alt={product.title}
                className='h-48 w-full object-contain rounded mb-4'
              />
              <h3 className='font-bold text-lg'>{product.title}</h3>
              <p className='text-red-600 text-sm mt-2'>{product.desc}</p>
            </Link>

            {/* Quantity Counter */}
            <div className='flex items-center justify-center gap-4 mt-4'>
              <button
                onClick={() => decrease(product.id)}
                className='bg-gray-200 text-gray-700 w-10 h-10 rounded-full hover:bg-gray-300 transition text-xl font-bold'
              >
                −
              </button>

              <span className='text-xl font-bold w-8'>
                {counts[product.id] || 0}
              </span>

              <button
                onClick={() => increase(product.id)}
                className='bg-blue-600 text-white w-10 h-10 rounded-full hover:bg-blue-700 transition text-xl font-bold'
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Storepage;

// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useFetch } from '../../../hooks/useFetch';

// function Storepage() {
//   const { data: products } = useFetch('/data/products.json');
//   const [counts, setCounts] = useState({});

//   const increase = (productId) => {
//     setCounts(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
//   };

//   const decrease = (productId) => {
//     setCounts(prev => ({
//       ...prev,
//       [productId]: Math.max((prev[productId] || 0) - 1, 0)
//     }));
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>

//       <div className="grid grid-cols-2 gap-6">
//         {products?.map(product => (
//           <div
//             key={product.id}
//             className="border rounded-lg p-4 shadow hover:shadow-xl transition cursor-pointer text-center"
//           >
//             <img
//               src={product.icon}
//               alt={product.title}
//               className="h-48 w-full object-contain rounded mb-4"
//             />
//             <h3 className="font-bold text-lg">{product.title}</h3>
//             <p className="text-red-600 text-sm mt-2">{product.desc}</p>

//             <div className="flex items-center justify-center gap-4 mt-4">
//               <button
//                 onClick={() => decrease(product.id)}
//                 className="bg-gray-200 text-gray-700 w-10 h-10 rounded-full hover:bg-gray-300 transition text-xl font-bold"
//               >
//                 −
//               </button>

//               <span className="text-xl font-bold w-8">
//                 {counts[product.id] || 0}
//               </span>

//               <button
//                 onClick={() => increase(product.id)}
//                 className="bg-blue-600 text-white w-10 h-10 rounded-full hover:bg-blue-700 transition text-xl font-bold"
//               >
//                 +
//               </button>
//             </div>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Storepage;

// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useFetch } from '../../../hooks/useFetch';

// function Storepage() {
//   const { data: products } = useFetch('/data/products.json');
//   const [counts, setCounts] = useState({});
//   const handleClick = (productId) => {
//     setCounts(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 })); };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>

//       <div className="grid grid-cols-2 gap-6">
//         {products?.map(product => (
//           <div
//             key={product.id}
//             className="border rounded-lg p-4 shadow hover:shadow-xl transition cursor-pointer text-center"
//           >
//             <Link to={`/product/${product.id}`}>
//               <img
//                 src={product.icon}
//                 alt={product.title}
//                 className="h-48 w-full object-contain rounded mb-4"
//               />
//               <h3 className="font-bold text-lg">{product.title}</h3>
//               <p className="text-red-600 text-sm mt-2">{product.desc}</p>
//             </Link>

//             {counts[product.id] > 0 && (
//               <p className="text-green-600 font-bold mt-2">
//                 Clicked: {counts[product.id]} times
//               </p>
//             )}

//             <button
//               onClick={() => handleClick(product.id)}
//               className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition mt-4 mx-auto block"
//             >
//               Checkout ({counts[product.id] || 0})
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Storepage;
