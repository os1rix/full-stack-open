import React, { useState } from "react";

import PersonForm from "./components/PersonForm";
import Numbers from "./components/Numbers";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: "Arto Hellas",
      number: "040-123456",
    },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (persons.every((p) => p.name !== newName)) {
      setPersons(persons.concat(newPerson));
    } else {
      alert(`${newName} is already added to phonebook`);
    }

    setNewName("");
    setNewNumber("");
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={newFilter} handlerFilter={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        handlerName={handleNameChange}
        handlerNumber={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Numbers filter={newFilter} persons={persons} />
    </div>
  );
};

export default App;
