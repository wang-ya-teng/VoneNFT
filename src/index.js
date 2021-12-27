import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import 'antd/dist/antd.css'
import store from './Store';
import { Provider } from 'react-redux';
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
