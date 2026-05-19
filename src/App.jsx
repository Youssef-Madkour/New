import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Details from './pages/Details';           
import StorePage from './components/pages/Storepage';
import NotFound from './pages/NotFound';

function App() {
  return (
// dasdkldandaslda

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='item/:id' element={<Details />} />           
          <Route path='store' element={<StorePage />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


