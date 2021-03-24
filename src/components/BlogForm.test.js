import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<NoteForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()
  const userId = '604b4b069c72a259f21c9009'

  const component = render(
    <BlogForm createBlog={createBlog} userId={userId} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, { target: { value: 'otsikko' } })
  fireEvent.change(author, { target: { value: 'kirjoittaja' } })
  fireEvent.change(url, { target: { value: 'nettisivu' } })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('otsikko')
  expect(createBlog.mock.calls[0][0].author).toBe('kirjoittaja')
  expect(createBlog.mock.calls[0][0].url).toBe('nettisivu')
})