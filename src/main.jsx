import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Redux/store';
import { ProductsProvider } from './context/ProductsProvider';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div className="text-center p-8">Loading...</div>} persistor={persistor}>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);