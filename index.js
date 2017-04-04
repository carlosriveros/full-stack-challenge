import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import reducer from './webapp/reducers/reducers'

import Router from './webapp/components/router'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));
const containerId = 'employee-review-app';
const container = document.getElementById(containerId);

ReactDOM.render(<Provider store={store}><Router/></Provider>
   , container);