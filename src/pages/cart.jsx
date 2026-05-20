import { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState({ userId: 1, date: "", products: [] });
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      const savedCart = JSON.parse(localStorage.getItem("cart") || '{"products":[]}');
      setCart(savedCart);

      const details = {};
      for (const item of savedCart.products) {
        try {
          const res = await axios.get(`https://fakestoreapi.com/products/${item.productId}`);
          details[item.productId] = res.data;
        } catch (err) {
          console.error("Failed to load product", item.productId);
        }
      }
      setProductDetails(details);
      setLoading(false);
    };

    loadCart();
    
    
    const handleUpdate = () => loadCart();
    window.addEventListener("cartUpdated", handleUpdate);
    return () => window.removeEventListener("cartUpdated", handleUpdate);
  }, []);

  const decreaseQty = (productId) => {
    let savedCart = JSON.parse(localStorage.getItem("cart") || '{"products":[]}');
    const itemIndex = savedCart.products.findIndex(p => p.productId === productId);

    if (itemIndex !== -1) {
      savedCart.products[itemIndex].quantity -= 1;

      if (savedCart.products[itemIndex].quantity <= 0) {
        savedCart.products.splice(itemIndex, 1);
      }

      savedCart.date = new Date().toISOString();
      localStorage.setItem("cart", JSON.stringify(savedCart));
      setCart({ ...savedCart });
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  const increaseQty = (productId) => {
    let savedCart = JSON.parse(localStorage.getItem("cart") || '{"products":[]}');
    const item = savedCart.products.find(p => p.productId === productId);

    if (item) {
      item.quantity += 1;
      savedCart.date = new Date().toISOString();
      localStorage.setItem("cart", JSON.stringify(savedCart));
      setCart({ ...savedCart });
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">🛒 Shopping Cart</h1>
      <a href="./Product" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Shop</a>

      {cart.products.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="bg-gray-100 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">User ID: {cart.userId}</p>
          <p className="text-sm text-gray-600 mb-4">Date: {new Date(cart.date).toLocaleString()}</p>

          <div className="space-y-2">
            {cart.products.map((item, index) => {
              const product = productDetails[item.productId];
              return (
                <div key={index} className="grid items-center bg-white rounded p-3 gap-4">
                  <span className="text-gray-400 font-bold">#{index + 1}</span>
                  
                  {product && (
                    <>
                      <img src={product.image} alt="" className="w-16 h-16 mx-auto block" />
                      <div className="flex-1 text-center">
                        <p className="font-semibold text-sm">{product.title}</p>
                        <p className="text-green-600">${product.price}</p>
                      </div>
                    </>
                  )}

                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => decreaseQty(item.productId)}
                      className="bg-red-100 text-red-600 w-8 h-8 rounded-full hover:bg-red-200 transition text-lg font-bold"
                    >
                      −
                    </button>

                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold text-center">
                      Qty: {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.productId)}
                      className="bg-green-100 text-green-600 w-8 h-8 rounded-full hover:bg-green-200 transition text-lg font-bold"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-bold text-blue-600 text-center">
                    ${product ? (product.price * item.quantity).toFixed(2) : "--"}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-300">
            <p className="text-lg font-bold text-right">
              Total Items: {cart.products.reduce((sum, p) => sum + p.quantity, 0)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;


