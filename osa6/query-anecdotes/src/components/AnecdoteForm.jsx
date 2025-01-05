import { createAnecdote } from "../requests.js"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { NotificationDispatcher } from "./NotificationContext.jsx"

const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = NotificationDispatcher()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] })
    },
    onError: (error) => {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: `too short anecdote, must have length 5 or more`,
      })
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    console.log("new anecdote")
    newAnecdoteMutation.mutate({ content: content, id: getId(), votes: 0 })
    dispatch({
      type: "SET_NOTIFICATION",
      payload: `anecdote "${content}" created`,
    })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
