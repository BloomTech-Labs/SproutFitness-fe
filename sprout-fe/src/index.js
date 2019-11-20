import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';


const store = createStore(
	applyMiddleware(thunk)
);

ReactDOM.render(
<Provider store={store}>
	<BrowserRouter>
		<App />
	</BrowserRouter>
</Provider>,
document.getElementById('root'));