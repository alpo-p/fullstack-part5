import React, { useState } from 'react'

const BlogForm = ({ createBlog, userId }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      user: userId
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className='formDiv'>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            value={title}
            id='title'
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            id='author'
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            id='url'
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='create-button' type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm
