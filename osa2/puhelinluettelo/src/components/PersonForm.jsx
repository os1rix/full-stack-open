import React from "react";

const PersonForm = ({
  handlerName,
  handlerNumber,
  newName,
  newNumber,
  addPerson,
}) => {
  return (
    <div>
      <label htmlFor="name">name:</label>
      <input type="text" onChange={handlerName} value={newName} />
      <br />
      <label htmlFor="number">number:</label>
      <input type="text" onChange={handlerNumber} value={newNumber} />
      <br />
      <button onClick={addPerson}>add</button>
    </div>
  );
};

export default PersonForm;
