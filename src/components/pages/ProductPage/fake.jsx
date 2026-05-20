import { useEffect, useState } from "react";
import axios from "axios";

const Pro = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch (err) {
        setError("Failed to load products");
      }
    };
    fetchProducts();
  }, []);
                 
  
                
  const handleClick = (productId) => {
   
    const cart = JSON.parse(localStorage.getItem("cart") || JSON.stringify({
      userId: 1,
      date: new Date().toISOString(),
      products: []
    }));

   
    const existing = cart.products.find(p => p.productId === productId);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.products.push({ productId: productId, quantity: 1 });
    }

    
    cart.date = new Date().toISOString(); // Update date
  localStorage.setItem("cart", JSON.stringify(cart));  // Save
    window.dispatchEvent(new Event("cartUpdated")); // header update
  };

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">React Shop</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center gap-4">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg p-4 hover:scale-105 transition-all duration-300"
          >
            <img
              className="object-contain w-full h-48 mb-4"
              src={product.image}
              alt={product.title}
            />
           
            <p className="text-gray-600">{product.category}</p>
            <p className="text-green-600 font-bold text-lg">${product.price}</p>

            <button
              onClick={() => handleClick(product.id)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition mt-4 w-full"
            >
              Checkout
            </button>
          </div>
        ))}
      </div>

      {visibleCount < products.length && (
        <div> 
        <button
          onClick={() => setVisibleCount(visibleCount + 10)}
          className="mt-6 bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition block mx-auto"
        >
          Load More
          </button>
          </div>
      )}
    </div>
  );
};

export default Pro;