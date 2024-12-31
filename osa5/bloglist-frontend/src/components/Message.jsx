import React from "react"

const Message = ({ successMessage, errorMessage }) => {
  return (
    <div>
      {successMessage && (
        <div className="greenstyle">
          <h2>{successMessage}</h2>
        </div>
      )}
      {errorMessage && (
        <div className="redstyle">
          <h2>{errorMessage}</h2>
        </div>
      )}
    </div>
  )
}

export default Message
