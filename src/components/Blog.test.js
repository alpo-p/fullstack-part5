import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

const testUser = {
  username: 'alpo',
  name: 'aaalpo',
  id: '604b4b069c72a259f21c9009'
}

const config = () => {
  window.localStorage.setItem('loggedBlogUser', JSON.stringify(testUser))
}

const blog = {
  title: 'Otsikko',
  author: 'Kirjoittaja',
  url: 'Nettisivu',
  likes: 42,
  user: testUser
}

test('renders title and author but not url or likes by default', () => {
  config()

  const component = render(
    <Blog blog={blog} />
  )

  expect(
    component.container.querySelector('.titleAndAuthor')
  ).toBeDefined()

  expect(
    component.container.querySelector('.extraInfo')
  ).toHaveStyle('display: none')

})

test('blogs url and likes are shown when show details button is pressed', () => {
  config()

  const component = render(
    <Blog blog={blog} />
  )

  expect(
    component.container.querySelector('.extraInfo')
  ).toHaveStyle('display: none')

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(
    component.container.querySelector('.extraInfo')
  ).toHaveStyle('display: block ')
})

test('if like button is clicked twice, the props is called twice', () => {
  config()

  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} updateLikes={mockHandler} />
  )


  const likeButton = component.container.querySelector('#likeButton')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})