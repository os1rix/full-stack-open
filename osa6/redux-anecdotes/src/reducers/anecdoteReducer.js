import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const initialState = []

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: initialState,
  reducers: {
    updateAnecdote(state, action) {
      const functionState = JSON.parse(JSON.stringify(state))
      const votedAnecdote = functionState.find(
        (anecdote) => anecdote.id === action.payload
      )
      const changedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1,
      }
      console.log(
        functionState.map((anecdote) =>
          anecdote.id !== action.payload ? anecdote : changedAnecdote
        )
      )
      return functionState.map((anecdote) =>
        anecdote.id !== action.payload ? anecdote : changedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (content, id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(content, id)
    dispatch(updateAnecdote(id))
  }
}

export const { updateAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer
