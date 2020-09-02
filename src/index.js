import React from 'react';
import ReactDOM from 'react-dom';

// redux
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk"; // prevents constantly runing fetch, only on call
import allReducers from './reducers';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  allReducers,
  composeEnhancer(applyMiddleware(thunk)),
);

document.body.style.backgroundImage = `url(${process.env.PUBLIC_URL}/images/bg2.jpg)`;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
