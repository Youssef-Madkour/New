// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import AuthGuard from './components/common/AuthGuard';
import Home from './pages/Home';
import Product from './pages/Product';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard requireAuth={false} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<Layout />}>
          <Route element={<AuthGuard requireAuth={true} />}>
            <Route index element={<Home />} />
            <Route path="product" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;