import { Link } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';

function Storepage() {
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
          <div className="border rounded-lg p-4 shadow hover:shadow-xl transition cursor-pointer text-center"> 
            {/* to={`/item/${product.id}`} 
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-xl transition cursor-pointer"
           */}
            <img 
              src={product.icon} 
              alt={product.title} 
              className="h-48 w-full object-contain rounded mb-4"
            />
            <h3 className="font-bold text-lg ">{product.title}</h3>
            <p className="text-red-600 text-sm  mt-2">{product.desc}</p>
            <button className=" bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition mt-2 ">
            Checkout
          </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Storepage;
