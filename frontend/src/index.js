import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './app/store';

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { CookiesProvider } from 'react-cookie';

import { BrowserRouter } from 'react-router-dom'
import App from './app/App';

const container = document.querySelector('#root')
const root = createRoot(container);

let persistor = persistStore(store);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CookiesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CookiesProvider>
    </PersistGate>
  </Provider>,
);
