import {createStore, applyMiddleware} from "redux";
import rootReducer from "./reducers/rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
import {createLogger} from "redux-logger";

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({collapsed: true});
const middlewares = [sagaMiddleware, logger];
const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga)

export default store;