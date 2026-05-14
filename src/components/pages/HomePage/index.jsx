import { Link } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';

function HomePage() {
  const { data: products, loading, error } = useFetch('/data/products.json');

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      
      <div className="grid grid-cols-2 gap-6">
        {products?.map(product => (
          <Link 
            to={`/item/${product.id}`} 
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-xl transition cursor-pointer"
          >
            <img 
              src={product.icon} 
              alt={product.title} 
              className="h-48 w-full object-contain rounded mb-4"
            />
            <h3 className="font-bold text-lg text-center">{product.title}</h3>
            <p className="text-red-600 text-sm text-center mt-2">{product.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;


// import { Link } from 'react-router-dom';
// import { MockItems } from '../../../utils';

// const HomePage = () => {
//   return (
//     <div>
//       <h1 className='text-3xl font-bold mb-6'>Electronics</h1>
//       {MockItems.map((item) => (
//         <div key={item.id} className='border border-white p-4 mb-2.5 rounded'>
//           <img src={item.icon} alt={item.desc} className='size-25' />
//           <h3 className='text-xl font-semibold mt-2 '>{item.title}</h3>
//           <p className='font-medium'>{item.desc}</p>
//           <Link
//             to={`item/${item.id}`}
//             state={{ item }}
//             className='text-blue-500 hover:text-blue-700 underline mt-2 inline-block'
//           >
//             View Details
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default HomePage;
