import React from "react"
import PropTypes from "prop-types"

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

Message.propTypes = {
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
}

export default Message
