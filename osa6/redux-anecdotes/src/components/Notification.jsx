import { useSelector, useDispatch } from "react-redux"
import { changeNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  }

  return notification ? <div style={style}>{notification}</div> : null
}

export default Notification
