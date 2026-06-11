import { Link } from 'react-router-dom';
import { useStore } from '../Zustand/store';
import { useProducts } from '../context/ProductsContext';
import type { Product } from '../Zustand/slices/cartSlice';
import type { CartItem } from '../Zustand/slices/cartSlice';

const CATEGORY_GLOW: Record<string, string> = {
  "electronics":      "#60a5fa",
  "jewelery":         "#f472b6",
  "men's clothing":   "#34d399",
  "women's clothing": "#fb923c",
};
const glow = (cat: string) => CATEGORY_GLOW[cat] ?? "#a78bfa";

interface CartRow {
  item: CartItem;
  product: Product | null;
}

const Cart = () => {
  const cart = useStore((state) => state);
  const increaseQty = useStore((state) => state.increaseQty);
  const decreaseQty = useStore((state) => state.decreaseQty);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const { getProductById, loading } = useProducts();

  const items: CartRow[] = cart.products.map((item) => ({
    item,
    product: getProductById(item.productId),
  }));

  const totalItems: number = cart.getTotalItems();
  const totalPrice: number = cart.getTotalPrice(getProductById);

  if (loading && cart.products.length > 0 && items.every(({ product }) => !product)) {
    return (
      <div style={{ background: '#0a0f1e', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #60a5fa', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
    );
  }

  return (
    <div style={{ background: '#0a0f1e', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: '#f1f5f9', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '8px' }}>
            🛒 Shopping Cart
          </h1>
          <Link to='/product' style={{ color: '#60a5fa', fontSize: '13px', textDecoration: 'none' }}>
            ← Back to Shop
          </Link>
          <div style={{ height: '1px', background: 'linear-gradient(90deg, #60a5fa44, transparent)', marginTop: '16px' }} />
        </div>

        {cart.products.length === 0 ? (
          <div style={{ background: '#111827', borderRadius: '20px', padding: '80px 24px', textAlign: 'center' }}>
            <p style={{ color: '#475569', fontSize: '16px', marginBottom: '20px' }}>Your cart is empty</p>
            <Link to='/product' style={{ background: '#60a5fa', color: '#0a0f1e', padding: '12px 32px', borderRadius: '10px', textDecoration: 'none', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '14px' }}>
              Start Shopping
            </Link>
          </div>
        ) : (
          <div style={{ background: '#111827', borderRadius: '20px', padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {items.map(({ item, product }, index) => {
                const accentColor = product ? glow(product.category) : '#a78bfa';
                return (
                  <div
                    key={item.productId}
                    style={{
                      background: '#1e293b',
                      borderRadius: '14px',
                      padding: '14px 16px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: '16px',
                      animation: 'fadeUp 0.4s ease both',
                      animationDelay: `${index * 0.05}s`,
                      borderLeft: `3px solid ${accentColor}`,
                    }}
                  >
                    {/* # */}
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: '#475569', fontSize: '13px' }}>
                      #{index + 1}
                    </span>

                    {/* Image */}
                    {product && (
                      <div style={{ width: '72px', height: '72px', background: '#0f172a', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle, ${accentColor}15, transparent 70%)` }} />
                        <img src={product.image} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', position: 'relative' }} />
                      </div>
                    )}

                    {/* Title + price */}
                    {product && (
                      <div style={{ textAlign: 'left', flex: 1, minWidth: '120px' }}>
                        <p style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {product.title}
                        </p>
                        <p style={{ color: '#34d399', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '15px', marginTop: '4px' }}>
                          ${product.price}
                        </p>
                      </div>
                    )}

                    {/* Qty controls */}
                    <div style={{ display: 'flex', alignItems: 'center', background: '#0f172a', borderRadius: '10px', padding: '3px', border: `1px solid ${accentColor}33` }}>
                      <button onClick={() => decreaseQty(item.productId)} style={{ width: '30px', height: '30px', borderRadius: '7px', border: 'none', background: 'transparent', color: '#f87171', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}>−</button>
                      <span style={{ width: '40px', textAlign: 'center', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '13px', color: '#f1f5f9' }}>Qty: {item.quantity}</span>
                      <button onClick={() => increaseQty(item.productId)} style={{ width: '30px', height: '30px', borderRadius: '7px', border: 'none', background: 'transparent', color: '#34d399', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}>+</button>
                    </div>

                    {/* Line total */}
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '16px', color: '#60a5fa', minWidth: '70px', textAlign: 'right' }}>
                      ${product ? (product.price * item.quantity).toFixed(2) : '--'}
                    </span>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      style={{ fontSize: '12px', color: '#475569', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#f87171'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#475569'; }}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '16px', color: '#cbd5e1' }}>
                Total Items: {totalItems}
              </p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '22px', color: '#34d399', letterSpacing: '-0.02em' }}>
                Subtotal: ${totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;
