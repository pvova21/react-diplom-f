import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { createRoot } from 'react-dom'; // Импортируйте createRoot
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store/index';
import { Provider } from 'react-redux';

const root = createRoot(document.getElementById('root')); // Создайте корневой контейнер

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

serviceWorker.unregister();
