import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga';

import { sequencer } from './index';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const rootReducer = combineReducers({
  sequencer,
});

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(...middlewares)));

export default store;