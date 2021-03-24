import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [isError, setIsError] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => (a.likes > b.likes) ? -1 : 1)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setIsError(true)
      setNotificationMsg('Incorrect username or password!')
      setTimeout(() => {
        setNotificationMsg(null)
      }, 2000)
      setPassword('')
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
    blogService.setToken('')
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setIsError(false)
        setNotificationMsg(`a new blog ${blogObject.title} by ${blogObject.author} added`)
        setTimeout(() => {
          setNotificationMsg(null)
        }, 2000)
      })
  }

  const deleteBlog = (id) => {
    blogService.del(id, user.id)
      .then(() => {
        setBlogs(blogs.filter(item => item.id !== id))
      })
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} userId={user.id}/>
    </Togglable>
  )

  const updateLikes = (blogObject) => {
    blogService.update(blogObject._id, blogObject)
  }

  if (user === null) {
    return (
      <div>
        <Notification message={notificationMsg} error={isError} />
        <LoginForm
          handleLogin={ handleLogin }
          username={ username }
          handleUsernameChange={({ target }) => setUsername(target.value)}
          password={ password }
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMsg} error={isError} />
      <br />
      <span>{ user.name } logged in </span><button onClick={handleLogout}>logout</button>
      <br />
      {blogForm()}
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} updateLikes={updateLikes}/>
      )}
    </div>
  )
}

export default App