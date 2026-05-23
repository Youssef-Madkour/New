import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to load product");
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center p-8 text-gy5">Loading...</div>;
  if (!product) return <div className="text-center p-8 text-r6">Product not found</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Link to="/Product" className="text-b6 hover:underline mb-4 block">← Back to Shop</Link>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-64 object-contain mb-4"
        />
        <h1 className="text-2xl font-bold mb-2 text-gy7">{product.title}</h1>
        <p className="text-gy5 mb-2 text-center">{product.category}</p>
        <p className="text-gy6 mb-6">{product.description}</p>
        <p className="text-gn6 font-bold text-xl text-center mb-4">${product.price}</p>
        <button 
          onClick={() => {
            let savedCart = JSON.parse(localStorage.getItem("cart") || JSON.stringify({
              userId: 1,
              date: new Date().toISOString(),
              products: []
            }));
            const existing = savedCart.products.find(p => p.productId === product.id);
            if (existing) {
              existing.quantity += 1;
            } else {
              savedCart.products.push({ productId: product.id, quantity: 1 });
            }
            savedCart.date = new Date().toISOString();
            localStorage.setItem("cart", JSON.stringify(savedCart));
            window.dispatchEvent(new Event("cartUpdated"));
          }}
          className="bg-b6 text-white px-6 py-3 rounded-lg hover:bg-b7 transition w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;