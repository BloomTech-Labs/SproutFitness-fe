import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';


const store = createStore (
    (state = {}) => state,
    applyMiddleware(thunk)
);

render (
    <Provider store={store}>
        <Router />
    </Provider>
)
