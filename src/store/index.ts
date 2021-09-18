import { createStore,applyMiddleware,compose } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import rootReducer from "./reducers";
import rootSaga from "./saga/sagas";

const composeEnhancer =
(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose; 

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer,composeEnhancer(applyMiddleware(sagaMiddleware)))

export default store

sagaMiddleware.run(rootSaga)