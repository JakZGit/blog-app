import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {Link} from 'react-router-dom';
import axios from 'axios';
import BlogRecord from './components/BlogRecord';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			blogs: [],
			mount: false
		};
	}

	componentDidMount() {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios.get('/api/blog')
			.then((res) => {
				this.setState({ blogs: res.data, mount: true });
			})
			.catch((error) => {
				if(error.response.status === 401) {
					this.props.history.push('/login');
				}
			});
	}

	logout = () => {
		localStorage.removeItem('jwtToken');
		window.location.reload();
	}

	render() {
		if(this.state.mount)
			return (
		      <div class="container">
		        <div class="panel panel-default">
		          <div class="panel-heading">
		            <h3 class="panel-title">
		              BLOGS &nbsp;
		              {localStorage.getItem('jwtToken') &&
		              	(<div>
			              	<Link to="/edit"><button class="btn btn-lg btn-primary" type="buttton">Create</button></Link>
			              	<Link to="/user"><button class="btn btn-lg btn-primary" type="buttton">My Post</button></Link>
			                <button class="btn btn-primary float-right" onClick={this.logout}>Logout</button>
		                </div>)
		              }
		            </h3>
		          </div>
		          <div class="panel-body">
		            <table class="table table-stripe">
		              <thead>
		                <tr>
		                  <th>Title</th>
		                  <th>Author</th>
		                  <th>Post</th>
		                </tr>
		              </thead>
		              <tbody>
		                {this.state.blogs.map(blog =>
		                  <BlogRecord key={blog._id} blog={blog} />
		                )}
		              </tbody>
		            </table>
		          </div>
		        </div>
		      </div>
		    );
		else
			return ( <div></div> );
	}
}

export default hot(module)(App);
