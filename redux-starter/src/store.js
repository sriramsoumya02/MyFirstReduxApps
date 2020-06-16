import { createStore } from 'redux';
import reducer from './reducer';
import devToolsEnhancer from 'redux-devtools-extension';

//const store = createStore(reducer, devToolsEnhancer());
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
);
export default store;
