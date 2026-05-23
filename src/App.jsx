import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Details from './pages/Details';           
import StorePage from './components/pages/Storepage';
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import Cart from './pages/cart';
import ProductDetail from "./components/pages/ProductDetail/single";



function App() {
  return (


    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='item/:id' element={<Details />} />           
          <Route path='store' element={<StorePage />} />
          <Route path='Product' element={<Product/>} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path='Cart' element={<Cart/>} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


