import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
//import thunk from 'redux-thunk'

//import reducer from './reducers'
import Router from './webapp/components/router'

const store = createStore();

//const store = createStore(reducer, applyMiddleware(thunk));
const containerId = 'employee-review-app';
const container = document.getElementById(containerId);

// f90Data is a global data object
ReactDOM.render(<Router/>, container);