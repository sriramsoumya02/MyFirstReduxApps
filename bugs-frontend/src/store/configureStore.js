// import { createStore } from 'redux';
// import reducer from './bugs';
// import devToolsEnhancer from 'redux-devtools-extension';

// //const store = createStore(reducer, devToolsEnhancer());

// export default function configureStore() {
//   const store = createStore(
//     reducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ &&
//       window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
//   );
//   return store;
// }

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';
import logger from './middleware/logger';
import func from './middleware/func';
import toast from './middleware/toast';
import api from './middleware/api';

export default function () {
  return configureStore({
    reducer,
    // middleware: [logger, func]
    middleware: [...getDefaultMiddleware(), logger, toast, api],
  });
}
