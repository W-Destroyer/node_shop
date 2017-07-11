import { createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';
import { logger } from 'redux-logger';
import { routerMiddleware } from "react-router-redux";
import { browserHistory } from "react-router";

import reducers from '../reducers/reducers';

import { composeWithDevTools } from 'redux-devtools-extension';

// const loggerMiddlerware = createLogger();

const routerHistoryMiddleware = routerMiddleware(browserHistory)

export default function configureStore(preloadedState) {
    preloadedState = preloadedState || {}
    return createStore(
        reducers,
        preloadedState,
        composeWithDevTools(applyMiddleware(
                thunkMiddleware,
                logger,
                routerHistoryMiddleware
            )
        )
    )
}