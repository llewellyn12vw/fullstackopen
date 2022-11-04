import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog />', () => {
  const blog = {
    title: 'Title',
    author: 'Author',
    url: 'test.pi',
    likes: 0,
    user: {
      username: 'username',
      name: 'name',
    },
  }

  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} addLike = {mockHandler} deleteB = {mockHandler} />
    ).container
  })

  test('title and author not url and likes', () => {
    expect(component.querySelector('.blog')).toHaveTextContent(
      blog.title
    )
    expect(component.querySelector('.blog')).toHaveTextContent(
      blog.author
    )
    expect(component.querySelector('.blog')).not.toHaveTextContent(blog.url)
    expect(component.querySelector('.blog')).not.toHaveTextContent(blog.likes)
  })

  test('click button show url and likes', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    expect(component.querySelector('.blog')).toHaveTextContent(blog.url)
    expect(component.querySelector('.blog')).toHaveTextContent(blog.likes)

  })

  test('click like button twice event happens twice',async () => {
    const user = userEvent.setup()
    const button1 = screen.getByText('show')
    await user.click(button1)
    const button2 = screen.getByText('like')

    for(let i = 0; i<2 ; i++){
      await user.click(button2)
    }
    expect(mockHandler.mock.calls).toHaveLength(2)
  })


})