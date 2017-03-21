import React from 'react'
import ReactDOM from 'react-dom'
//import thunk from 'redux-thunk'


import Router from './webapp/components/router'



//const store = createStore(reducer, applyMiddleware(thunk));
const containerId = 'employee-review-app';
const container = document.getElementById(containerId);

// f90Data is a global data object
ReactDOM.render(
    <Router/>, container);