import React, { useState } from 'react'

const Blog = ({ blog, deleteBlog, updateLikes }) => {
  const [likes, setLikes] = useState(blog.likes)

  const [show, setShow] = useState(false)
  const toggleShow = () => setShow(!show)
  const displayDetails = { display: show ? '' : 'none' }

  const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
  const loggedUserId = JSON.parse(loggedUserJSON).id
  const isSameOwnerAsLoggedUser = () => (blog.user.id === loggedUserId)
  const displayRemove = { display: isSameOwnerAsLoggedUser() ? '' : 'none' }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  const increaseLikes = () => {
    const blogObject = {
      _id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1,
      user: blog.user
    }
    updateLikes(blogObject)
    setLikes(likes + 1)
  }

  return (
    <div id="blog" className='blog' style={style}>
      <div className='titleAndAuthor'>{blog.title} {blog.author}</div>
      <button onClick={toggleShow}>
        {show ? 'hide' : 'view'}
      </button>
      <div className='extraInfo' style={displayDetails}>
        {blog.url} <br />
        likes {likes}
        <button id='likeButton' onClick={increaseLikes}>like</button>
        <br />
        { blog.user.name }
        <br />
        <div style={displayRemove}>
          <button onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

const style = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}


export default Blog