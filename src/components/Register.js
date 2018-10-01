import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			name: '',
			message: ''
		};
	}

	onChange = (e) => {
		const state = this.state;
		state[e.target.name] = e.target.value;
		this.setState(state);
	}

	onSubmit = (e) => {
		e.preventDefault();
		const {username, password, name} = this.state;
		axios.post('/api/auth/register', {username, password, name} )
			.then((result) => {
				if(result.data.success) {
					this.setState({ message: ''});
					this.props.history.push("/login");
				}
				else
					this.setState({ message: result.data.msg} );
			})
	}

	render() {
		const { username, password, name, message } = this.state;
	    return (
	      <div class="container">
	        <form class="form-signin" onSubmit={this.onSubmit}>
	          <h2 class="form-signin-heading">Register</h2>
	           {message !== '' &&
	            <div class="alert alert-warning alert-dismissible" role="alert">
	              { message }
	            </div>
	          }
	          <label for="inputEmail" class="sr-only">Email address</label>
	          <input type="email" class="form-control" placeholder="Email address" name="username" value={username} onChange={this.onChange} required/>
	          <label for="inputPassword" class="sr-only">Password</label>
	          <input type="password" class="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
	          <label for="usr" class="sr-only">Name</label>
	          <input type="text" class="form-control" placeholder="Name" name="name" value={name} onChange={this.onChange} required/>
	          <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
	        </form>
	      </div>
	    );
	}
}

export default Register;