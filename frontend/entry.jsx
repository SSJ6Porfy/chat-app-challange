import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import { loadState, saveState } from './store/localStorage';

const persistedState = loadState();

document.addEventListener('DOMContentLoaded', () => {
  let store = configureStore(persistedState);

  store.subscribe(() => {
    saveState(store.getState());
  });
  
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store } />, root);
});
