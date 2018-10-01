import React from 'react';

const BlogRecord = ( {blog: { title, author, post }} ) => {
	return (
		 <tr>
            <td>{title}</td>
            <td>{author}</td>
            <td>{post}</td>
          </tr>
		)
}

export default BlogRecord;