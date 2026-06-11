import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../hooks/api';
import { useStore } from '../Zustand/store';
import type { Product } from '../Zustand/slices/cartSlice';

const CATEGORY_GLOW: Record<string, string> = {
  "electronics":      "#60a5fa",
  "jewelery":         "#f472b6",
  "men's clothing":   "#34d399",
  "women's clothing": "#fb923c",
};
const glow = (cat: string) => CATEGORY_GLOW[cat] ?? "#a78bfa";

interface DetailState {
  id: string | null;
  product: Product | null;
  error: boolean;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const addToCart    = useStore((state) => state.addToCart);
  const increaseQty  = useStore((state) => state.increaseQty);
  const decreaseQty  = useStore((state) => state.decreaseQty);
  const cartProducts = useStore((state) => state.products);
  const [data, setData] = useState<DetailState>({ id: null, product: null, error: false });

  const qty = id ? cartProducts.find((p) => p.productId === parseInt(id))?.quantity ?? 0 : 0;

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    api
      .get<Product>(`/products/${id}`)
      .then((res) => {
        if (!cancelled) setData({ id, product: res.data, error: false });
      })
      .catch((err: Error) => {
        if (!cancelled) {
          console.error('Failed to load product', err);
          setData({ id, product: null, error: true });
        }
      });
    return () => { cancelled = true; };
  }, [id]);

  const loading = data.id !== id;
  const product = data.product;

  if (loading) {
    return (
      <div style={{ background: '#0a0f1e', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #60a5fa', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
    );
  }

  if (data.error || !product) {
    return (
      <div style={{ background: '#0a0f1e', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif" }}>
        <p style={{ color: '#f87171', fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Product not found</p>
        <Link to='/product' style={{ color: '#60a5fa', fontSize: '13px', textDecoration: 'none' }}>← Back to Shop</Link>
      </div>
    );
  }

  const accentColor = glow(product.category);

  return (
    <div style={{ background: '#0a0f1e', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>

        <Link to='/product' style={{ color: '#60a5fa', fontSize: '13px', textDecoration: 'none', display: 'inline-block', marginBottom: '32px' }}>
          ← Back to Shop
        </Link>

        <div style={{ background: '#111827', borderRadius: '20px', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', animation: 'fadeUp 0.4s ease both' }}
          className='flex-col-mobile'>

          {/* Image */}
          <div style={{ background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px', position: 'relative', minHeight: '320px' }}>
            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, ${accentColor}18 0%, transparent 70%)` }} />
            <img
              src={product.image}
              alt={product.title}
              style={{ maxHeight: '260px', maxWidth: '100%', objectFit: 'contain', position: 'relative', zIndex: 1 }}
            />
            <span style={{
              position: 'absolute', top: '16px', left: '16px',
              background: `${accentColor}22`,
              border: `1px solid ${accentColor}55`,
              color: accentColor,
              fontSize: '11px',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'capitalize',
              padding: '4px 12px',
              borderRadius: '999px',
            }}>
              {product.category}
            </span>
          </div>

          {/* Info */}
          <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '22px', fontWeight: 800, color: '#f1f5f9', lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: '16px' }}>
                {product.title}
              </h1>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '32px', fontWeight: 800, color: '#34d399', letterSpacing: '-0.02em', marginBottom: '20px' }}>
                ${product.price}
              </p>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7 }}>
                {product.description}
              </p>
            </div>

            <div style={{ marginTop: '32px' }}>
              {qty === 0 ? (
                <button
                  onClick={() => addToCart(product.id)}
                  style={{ width: '100%', background: accentColor, color: '#0a0f1e', border: 'none', borderRadius: '12px', padding: '14px', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '15px', cursor: 'pointer', transition: 'opacity 0.15s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
                >
                  Add to Cart
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1e293b', borderRadius: '12px', padding: '4px', border: `1px solid ${accentColor}44` }}>
                  <button onClick={() => decreaseQty(product.id)} style={{ width: '44px', height: '44px', borderRadius: '9px', border: 'none', background: 'transparent', color: '#f87171', fontSize: '20px', fontWeight: 700, cursor: 'pointer' }}>−</button>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '20px', color: '#f1f5f9' }}>{qty}</span>
                    <p style={{ fontSize: '11px', color: '#475569', margin: 0 }}>in cart</p>
                  </div>
                  <button onClick={() => increaseQty(product.id)} style={{ width: '44px', height: '44px', borderRadius: '9px', border: 'none', background: 'transparent', color: '#34d399', fontSize: '20px', fontWeight: 700, cursor: 'pointer' }}>+</button>
                </div>
              )}

              <Link to='/cart' style={{ display: 'block', textAlign: 'center', color: '#60a5fa', fontSize: '13px', textDecoration: 'none', marginTop: '12px' }}>
                View Cart →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
