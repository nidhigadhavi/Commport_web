/**
 * Author : Nidhi Gadhavi
 * Purpose : Redux store
 */

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();

// export const store = createStore(
//     rootReducer,
//     applyMiddleware(
//         thunkMiddleware,
//         loggerMiddleware
//     )
// );

export default function configureStore(initialState={}) {
  return createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
  );
}