import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import Cart from './pages/cart';
import ProductDetails from './pages/ProductDetails';

// Todo: Totally remove unused routes and coponents - Leave Home empty (done)
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ='/' element ={<Layout />}>
          <Route index element ={<Home />} />
          <Route path ='Product' element ={<Product />} />
          <Route path ='/product/:id' element ={<ProductDetails />} />
          <Route path ='Cart' element ={<Cart />} />
        </Route>
        <Route path='*' element ={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
