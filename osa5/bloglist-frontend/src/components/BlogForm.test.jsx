import { render, screen } from "@testing-library/react"
import BlogForm from "./BlogForm"
import userEvent from "@testing-library/user-event"

const newBlog = {
  user: 123333333456903,
  likes: 1,
  author: "Oskari",
  title: "Silvoniemi",
  url: "www.google.com",
}

test("<BlogForm/> calls handleSubmit and has right", async () => {
  const handleSubmit = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm handleSubmit={handleSubmit} />)

  const input = screen.getAllByRole("textbox")
  const sendButton = screen.getByText("Create")
  //   console.log(input)

  await user.type(input[0], `${newBlog.title}`)
  await user.type(input[1], `${newBlog.author}`)
  await user.type(input[2], `${newBlog.url}`)
  await user.click(sendButton)

  expect(handleSubmit.mock.calls).toHaveLength(1)
  expect(handleSubmit.mock.calls[0][0].title).toBe(`${newBlog.title}`)
  expect(handleSubmit.mock.calls[0][0].author).toBe(`${newBlog.author}`)
  expect(handleSubmit.mock.calls[0][0].url).toBe(`${newBlog.url}`)
})
