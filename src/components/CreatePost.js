import React, {Component} from 'react';
import axios from 'axios';

class CreatePost extends Component {
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
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		if(this.props.match.params.id) {
			axios.get('/api/blog/user/' + this.props.match.params.id)
			.then((result) => {
				this.setState ({ title: result.data[0].title, post: result.data[0].post })
			})
			.catch((error) => {
				if(error.response.status === 401) {
					this.props.history.push('/login');
				}
			});
		}
	}

	onChange = (e) => {
		const state = this.state;
		state[e.target.name] = e.target.value;
		this.setState(state);
	}

	onSubmit = (e) => {
		e.preventDefault();
		const {title, post} = this.state;
		let blog_id = this.props.match.params.id;
		var url = blog_id ? '/api/blog/' + blog_id : '/api/blog/';
		axios.post(url, {title, post})
			.then((result) => {
				this.props.history.push("/user");
			})
			.catch((error) => {
				if(error.response.status === 401) {
					this.props.history.push('/login');
				}
			});
	}

	render() {
		const {title, post} = this.state;
		return (
			<form onSubmit={this.onSubmit}>
				<div class="input-group mb-3">
				  <div class="input-group-prepend">
				    <span class="input-group-text" id="basic-addon1">Title</span>
				  </div>
				  <input type="text" class="form-control" name="title" aria-label="Username" aria-describedby="basic-addon1" value={title} onChange={this.onChange} required/>
				</div>
				<div class="input-group">
				  <textarea class="form-control textbox-height" name="post" value={post} onChange={this.onChange} required></textarea>
				</div>
				<button class="btn btn-lg btn-primary" type="submit">Save</button>
			</form>
		);
	}
}

export default CreatePost;