import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {connect, Provider} from "react-redux"

import store from "./store/store";
import {BrowserRouter} from "react-router-dom";

export const setValueToStore = (obj) => {
  store.dispatch(obj)
}

export const getItemFromLocalStore = (key) => {
  return localStorage.getItem(key)
}

export const setItemToLocalStore = (key, value) => {
  localStorage.setItem(key, value)
}

export const setItemToSessionStore = (key, value) => {
  sessionStorage.setItem(key, value)
}

export const getItemFromSessionStore = (key) => {
  return sessionStorage.getItem(key)
}

const OwnApp = connect((state)=>({global: state.globalReducer}))(App)
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <OwnApp/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);