import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../Zustand/store';
import { useProducts } from '../context/ProductsContext';
import type { Product } from '../Zustand/slices/cartSlice';

const PAGE_SIZE = 12;

const CATEGORY_GLOW: Record<string, string> = {
  "electronics":      "#60a5fa",
  "jewelery":         "#f472b6",
  "men's clothing":   "#34d399",
  "women's clothing": "#fb923c",
};

const glow = (cat: string) => CATEGORY_GLOW[cat] ?? "#a78bfa";

const Pro = () => {
  const { products, loading, error } = useProducts();
  const addToCart    = useStore((s) => s.addToCart);
  const increaseQty  = useStore((s) => s.increaseQty);
  const decreaseQty  = useStore((s) => s.decreaseQty);
  const cartProducts = useStore((s) => s.products);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const getQty = (id: number) =>
    cartProducts.find((p) => p.productId === id)?.quantity ?? 0;

  return (
    <div style={{ background: '#0a0f1e', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '11px',
            letterSpacing: '0.25em',
            color: '#60a5fa',
            textTransform: 'uppercase',
            marginBottom: '10px',
          }}>
            Our Collection
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <h1 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              color: '#f1f5f9',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}>
              All Products
            </h1>
            <span style={{ color: '#475569', fontSize: '14px', paddingBottom: '6px' }}>
              {products.length} items
            </span>
          </div>
          <div style={{ height: '1px', background: 'linear-gradient(90deg, #60a5fa44, transparent)', marginTop: '10px' }} />
        </div>

        {error && (
          <div style={{ background: '#1e0a0a', border: '1px solid #dc2626', color: '#fca5a5', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        {loading && products.length === 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid #60a5fa', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          </div>
        )}

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
          {products.slice(0, visibleCount).map((product: Product, i: number) => {
            const qty = getQty(product.id);
            const accentColor = glow(product.category);

            return (
              <div
                key={product.id}
                style={{
                  background: '#111827',
                  border: '1px solid transparent',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  animation: `fadeUp 0.5s ease both`,
                  animationDelay: `${Math.min(i, 11) * 0.05}s`,
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(-6px)';
                  el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}55`;
                  el.style.borderColor = `${accentColor}55`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                  el.style.borderColor = 'rgba(255,255,255,0.07)';
                }}
              >
                {/* Image area */}
                <Link to={`/product/${product.id}`} style={{ display: 'block', textDecoration: 'none' }}>
                  <div style={{
                    background: '#1e293b',
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: `radial-gradient(circle at 50% 50%, ${accentColor}10 0%, transparent 70%)`,
                    }} />
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{ maxHeight: '140px', maxWidth: '100%', objectFit: 'contain', position: 'relative', zIndex: 1, transition: 'transform 0.4s ease' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.08)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                    />
                    <span style={{
                      position: 'absolute', top: '12px', left: '12px',
                      background: `${accentColor}22`,
                      border: `1px solid ${accentColor}55`,
                      color: accentColor,
                      fontSize: '10px',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'capitalize',
                      padding: '3px 10px',
                      borderRadius: '999px',
                    }}>
                      {product.category}
                    </span>
                  </div>
                </Link>

                {/* Info */}
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                    <p style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#cbd5e1',
                      lineHeight: '1.4',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {product.title}
                    </p>
                  </Link>

                  <div style={{ marginTop: 'auto', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <span style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      fontSize: '20px',
                      color: '#34d399',
                      letterSpacing: '-0.02em',
                    }}>
                      ${product.price}
                    </span>

                    {qty === 0 ? (
                      <button
                        onClick={() => addToCart(product.id)}
                        style={{
                          background: accentColor,
                          color: '#0a0f1e',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '8px 14px',
                          fontSize: '12px',
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 700,
                          cursor: 'pointer',
                          letterSpacing: '0.05em',
                          transition: 'opacity 0.15s, transform 0.1s',
                          whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
                        onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.96)'; }}
                        onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
                      >
                        + Add
                      </button>
                    ) : (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        background: '#1e293b',
                        borderRadius: '8px',
                        padding: '2px',
                        border: `1px solid ${accentColor}44`,
                      }}>
                        <button
                          onClick={() => decreaseQty(product.id)}
                          style={{ width: '28px', height: '28px', borderRadius: '6px', border: 'none', background: 'transparent', color: '#f87171', fontSize: '16px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >−</button>
                        <span style={{ width: '24px', textAlign: 'center', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '14px', color: '#f1f5f9' }}>{qty}</span>
                        <button
                          onClick={() => increaseQty(product.id)}
                          style={{ width: '28px', height: '28px', borderRadius: '6px', border: 'none', background: 'transparent', color: '#34d399', fontSize: '16px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >+</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load more */}
        {visibleCount < products.length && (
          <div style={{ textAlign: 'center', marginTop: '52px' }}>
            <button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#94a3b8',
                padding: '14px 40px',
                borderRadius: '12px',
                fontSize: '14px',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'border-color 0.2s, color 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.borderColor = '#60a5fa';
                b.style.color = '#60a5fa';
                b.style.background = 'rgba(96,165,250,0.05)';
              }}
              onMouseLeave={(e) => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.borderColor = 'rgba(255,255,255,0.15)';
                b.style.color = '#94a3b8';
                b.style.background = 'transparent';
              }}
            >
              Load more  ·  {products.length - visibleCount} remaining
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Pro;
