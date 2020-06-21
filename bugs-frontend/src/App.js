import React from 'react';
import './App.css';
import Bugs from './components/bugs';
import BugsList from './components/bugsList';
import configureStore from './store/configureStore';
import StoreContext from './context/storeContext';
import { Provider } from 'react-redux';
const store = configureStore();
function App() {
  return (
    <Provider store={store}>
      {' '}
      <BugsList />
      <Bugs />
    </Provider>
  );
}

export default App;
