import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

const newBlog = {
  user: 123333333456903,
  likes: 1,
  author: "Oskari",
  title: "Silvoniemi",
  url: "www.google.com",
}

test("renders title", () => {
  render(<Blog blog={newBlog} />)

  const element = screen.getByText("Silvoniemi Oskari")
  expect(element).toBeDefined()
})

test("renders additional information", async () => {
  render(<Blog blog={newBlog} />)

  const user = userEvent.setup()

  const showButton = screen.getByText("show")
  await user.click(showButton)

  const element = screen.getByText("Silvoniemi Oskari")
  const element2 = screen.getByText("www.google.com")
  const element3 = screen.getByText(1)

  expect(element).toBeDefined()
  expect(element2).toBeDefined()
  expect(element3).toBeDefined()
})

test("like button updates likes", async () => {
  const mockHandler = vi.fn()
  render(<Blog blog={newBlog} likeHandler={mockHandler} />)

  const user = userEvent.setup()
  const showButton = screen.getByText("show")
  await user.click(showButton)

  screen.debug()

  const likeButton = screen.getByText("like")
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
