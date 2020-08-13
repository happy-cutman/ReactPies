import {combineReducers, createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';

import filters from './filters_reducer'
import pies from './pies_reducer'
import cart from './cart_reducer'

// compose нужен для использования нескольких middleware (thunk и расширения хром) одновременно
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//applyMiddleware для указание какие именно middleware хочу использовать

// объединение редьюсеров
const reducers = combineReducers({
    filters,
    pies,
    cart,
});

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;