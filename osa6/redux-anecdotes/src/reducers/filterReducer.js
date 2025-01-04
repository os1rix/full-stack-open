const initialState = ""

export const filterChange = (filter) => {
  return {
    type: "CHANGE_FILTER",
    payload: filter,
  }
}

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_FILTER":
      return action.payload
    default:
      return state
  }
}

export default filterReducer
