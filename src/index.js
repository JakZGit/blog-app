import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import './components/bootstrap.min.css';
import './App.css';
import App from './App.js';
import Login from './components/Login';
import Register from './components/Register';
import Create from './components/Create';

ReactDOM.render(
	<BrowserRouter>
		<div>
			<Route exact path='/' component={App} />
			<Route path='/login' component={Login} />
			<Route path='/register' component={Register} />
			<Route path='/create' component={Create} />
		</div>
	</BrowserRouter>,
  document.getElementById('root')
);