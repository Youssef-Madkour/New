import { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';

function Storepage() {
  const { data: products } = useFetch('/data/products.json');
  const [counts, setCounts] = useState({});
  const handleClick = (productId) => {
    setCounts(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 })); };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      
      <div className="grid grid-cols-2 gap-6">
        {products?.map(product => (
          <div 
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-xl transition cursor-pointer text-center"
          > 
            <Link to={`/product/${product.id}`}>
              <img 
                src={product.icon} 
                alt={product.title} 
                className="h-48 w-full object-contain rounded mb-4"
              />
              <h3 className="font-bold text-lg">{product.title}</h3>
              <p className="text-red-600 text-sm mt-2">{product.desc}</p>
            </Link>

            {counts[product.id] > 0 && (
              <p className="text-green-600 font-bold mt-2">
                Clicked: {counts[product.id]} times
              </p>
            )} 
            
            <button 
              onClick={() => handleClick(product.id)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition mt-4 mx-auto block"
            >
              Checkout ({counts[product.id] || 0})
            </button> 
          </div>
        ))}
      </div>
    </div>
  );
}

export default Storepage;