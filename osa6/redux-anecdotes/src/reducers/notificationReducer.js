import { createSlice } from "@reduxjs/toolkit"

const initialState = ""

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    changeNotification(state, action) {
      return action.payload
    },
  },
})

export const setNotification = (content, time) => {
  return async (dispatch) => {
    setTimeout(() => dispatch(changeNotification("")), time * 1000)
    dispatch(changeNotification(content))
  }
}

export const { changeNotification } = notificationSlice.actions
export default notificationSlice.reducer
