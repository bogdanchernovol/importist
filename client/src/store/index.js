import "regenerator-runtime/runtime";
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Raven from "raven-js";
import createRavenMiddleware from "raven-for-redux";
import rootReducer from './reducers';
import sagas from './sagas';

Raven.config(process.env.SENTRY_API_KEY).install();

export default function configureStore(initialState) {
  
  const sagaMiddleware = createSagaMiddleware();
  const setry = createRavenMiddleware(Raven);
  
  function _getMiddleware() {
    const middleware = [      
      sagaMiddleware, 
      setry
    ];

    return applyMiddleware(...middleware);
  }
  const composeEnhancers =
    typeof window === 'object' && process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  const store = composeEnhancers(_getMiddleware())(createStore)(
    rootReducer,
    initialState,      
  );

  sagaMiddleware.run(sagas);
  
  if (module.hot) {
    module.hot.accept(rootReducer, () => {
      store.replaceReducer(rootReducer.default);
    });
  }
  
  return store;
}