import {createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware from 'redux-saga'
import rootReducer from "./reducers";
import mySaga from "./sagas/sagas";

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
);
const store = createStore(rootReducer, enhancer);
//const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(mySaga)


export default store