import { NotificationValue } from "./NotificationContext"
import { NotificationDispatcher } from "./NotificationContext"

const Notification = () => {
  const notification = NotificationValue()
  const dispatch = NotificationDispatcher()
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  if (notification) {
    setTimeout(() => dispatch({ type: "CLEAR_NOTIFICATION" }), 5000)
    return <div style={style}>{notification}</div>
  }
}

export default Notification
