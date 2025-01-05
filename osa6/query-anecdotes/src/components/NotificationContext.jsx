/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      state = action.payload
      setTimeout(
        () => NotificationDispatcher({ type: "CLEAR_NOTIFICATION" }),
        5000
      )
      return state
    case "CLEAR_NOTIFICATION":
      return ""
    default:
      return state
  }
}

export const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  )
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const NotificationValue = () => {
  const counterAndDispatch = useContext(NotificationContext)
  return counterAndDispatch[0]
}

export const NotificationDispatcher = () => {
  const counterAndDispatch = useContext(NotificationContext)
  return counterAndDispatch[1]
}
