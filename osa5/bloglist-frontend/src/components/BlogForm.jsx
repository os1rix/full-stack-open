import React from "react"

const BlogForm = () => {
  return (
    <div>
      <h1>Create New</h1>
      <form onSubmit={addiNotes}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default BlogForm
