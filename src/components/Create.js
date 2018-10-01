import React, {Component} from 'react';
import axios from 'axios';

class Create extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			post: ''
		}
	}

	componentDidMount() {
		if(localStorage.getItem('jwtToken') === null)
			this.props.history.push('/login');
	}

	onChange = (e) => {
		const state = this.state;
		state[e.target.name] = e.target.value;
		this.setState(state);
	}

	onSubmit = (e) => {
		e.preventDefault();
		const {title, post} = this.state;
		axios.post('/api/blog', {title, post})
			.then((result) => {
				this.props.history.push("/");
			})
			.catch((error) => {
				if(error.response.status === 401) {
					this.props.history.push('/login');
				}
			});
	}

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<div class="input-group mb-3">
				  <div class="input-group-prepend">
				    <span class="input-group-text" id="basic-addon1">Title</span>
				  </div>
				  <input type="text" class="form-control" name="title" aria-label="Username" aria-describedby="basic-addon1" onChange={this.onChange} required/>
				</div>
				<div class="input-group">
				  <textarea class="form-control textbox-height" name="post" onChange={this.onChange} required></textarea>
				</div>
				<button class="btn btn-lg btn-primary" type="submit">Save</button>
			</form>
		);
	}
}

export default Create;