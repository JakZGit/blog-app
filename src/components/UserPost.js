import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import BlogRecord from './BlogRecord';

class UserPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userPosts: []
		}
	}

	componentDidMount() {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios.get('/api/blog/user')
			.then((res) => {
				this.setState({ userPosts: res.data });
			})
			.catch((error) => {
				if(error.response.status === 401) {
					this.props.history.push('/login');
				}
			});
	}

	updatePost = (id) => {
	  this.props.history.push('/edit/' + id);
	}


	render() {
		return (
			<div class="container">
		        <div class="panel panel-default">
		          	<div class="panel-heading">
		            	<h3 class="panel-title">
		              	MY BLOGS &nbsp;
		              	{localStorage.getItem('jwtToken') &&
		              		(<div>
			              		<Link to="/edit"><button class="btn btn-lg btn-primary" type="buttton">Create</button></Link>
			              		<Link to="/"><button class="btn btn-lg btn-primary" type="buttton">All Post</button></Link>
			                	<button class="btn btn-primary float-right" onClick={this.logout}>Logout</button>
		                	</div>)
		              	}
		            	</h3>
		          	</div>
		          	<div class="panel-body">
		            	<table class="table table-stripe">
			              	<thead>
			                	<tr>
			                  		<th>#</th>
					                <th>Title</th>
					                <th>Author</th>
					                <th></th>
					                <th></th>
			                	</tr>
			              	</thead>
			              	<tbody>
			                	{this.state.userPosts.map((userPost,index) =>
			                  	<tr key={index} >
		                            <td>{index+1}</td>
		                            <td>{userPost.title}</td>
		                            <td>{userPost.author}</td>
				                  	<td>
		                              <span onClick={() => this.updatePost(userPost._id)} class="fas fa-edit"></span>
		                            </td>
		                            <td>
		                              <span class="fas fa-trash"></span>
		                            </td>
		                        </tr>
			                	)}
			              	</tbody>
		            	</table>
		          	</div>
		        </div>
		    </div>
		)
	}
}

export default UserPost;