import React from 'react';
import './BlogContainer.css';
import CommentsService from '../../services/comments-service';
import UsersService from '../../services/users-service';
import TokenService from '../../services/token-service';

export default class BlogContainer extends React.Component {
  state = {
    edit: false,
    blog: null
  }

  //Get blog data from database on load
  componentDidMount = () => {
    this.getBlog();
  }
  
  //Change edit mode state
  handleEditBlog = (e) => {
    e.preventDefault();
    this.setState({
      edit: !this.state.edit
    })
  }

  //Get blog data from database
  getBlog = () => {
    UsersService.getUserBlog(TokenService.getUserId())
      .then(blogData => {
        this.setState({blog: blogData.blogpost})
      })
      .catch();
  }

  //Return Blog on display mode
  displayBlog = () => {
    return <p className="blog-post">{this.state.blog}</p>
  }

  //Return Blog as editable text area
  editBlog = () => {
  return <textarea name="blogpost" className="blog-post-edit" placeholder="Insert blog here...">{this.state.blog}</textarea>
  }

  //Submit Blog text area to database and update
  submitBlog = (e) => {
    e.preventDefault();
    const { blogpost } = e.target
    console.log(blogpost.value)
    UsersService.postUserBlog(TokenService.getUserId(), {blogpost: blogpost.value})
      .then(() => {
        this.setState({
          edit: false,
          blog: blogpost.value
        })
      })
  }

  render() {
    return (
      <form className="Blog-Form" onSubmit={this.submitBlog}>
        <h2>Blog Post</h2>
        {!this.state.edit && this.displayBlog()}
        {this.state.edit && this.editBlog()}
        
        <div className="buttons-container">
          {this.state.edit && <button className="submit" type="submit">Submit</button>}
          {this.state.edit && <button className="cancel" onClick={this.handleEditBlog}>Cancel</button>}
          {!this.state.edit && <button className="edit" onClick={this.handleEditBlog}>Edit Blog</button>}
        </div>
      </form>
    )
  }
}