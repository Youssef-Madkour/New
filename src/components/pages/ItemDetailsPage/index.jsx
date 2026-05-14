import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';

function ItemDetailsPage() {
  const { id } = useParams();
  const { data: products, loading, error } = useFetch('/data/products.json');

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl">Loading product details...</p>
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

  const product = products?.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl">Product not found</p>
        <Link to="/" className="text-blue-600 ml-2">Go back</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to products
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mt-4">
        <img 
          src={product.icon} 
          alt={product.title} 
          className="w-full h-96 object-contain rounded "
        />
        
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 text-lg mb-6">{product.desc}</p>
          
          <p className="text-4xl font-bold text-green-600 mb-8">{product.price}</p>
          
           <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailsPage;





// import { useLocation, useNavigate } from 'react-router-dom';
// function ItemDetailsPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { item } = location.state ?? {};
//   return (
//     <div className='flex flex-col'>
//       <button
//         onClick={() => navigate(-1)}
//         className='mb-5 w-fit px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer'
//       >
//         Back
//       </button>
//       {!item ? (
//         <div className='text-red-500'>Item not found!</div>
//       ) : (
//         <>
//           <img src={item.icon} alt='' className='size-25' />
//           <h1 className='text-2xl font-bold mt-2'>{item.title}</h1>
//           <p className='font-semibold - mt-1'>{item.desc}</p>
//           <p className='mt-2'>
//             <strong className='font-bold'>Price:</strong> {item.price}
//           </p>
//         </>
//       )}
//     </div>
//   );
// }
// export default ItemDetailsPage;
