import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('blogform', () => {
  let component
  const createBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <BlogForm createBlog = {createBlog}/>
    ).container
  })

  test('createBlog prop called with correct inputs', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('create')
    
    const title = screen.getByPlaceholderText('title')
    const author = screen.getByPlaceholderText('author')
    const url = screen.getByPlaceholderText('url')

    await userEvent.type(title, 'japie')
    await userEvent.type(author, 'lord lvw')
    await userEvent.type(url, 'bing.io')
    await userEvent.click(button)
    expect(createBlog.mock.calls[0][0].title).toBe('japie')
    expect(createBlog.mock.calls[0][0].author).toBe('lord lvw')
    expect(createBlog.mock.calls[0][0].url).toBe('bing.io')

  })
})