import { useState, useEffect } from "react";
import Services from "./Services";
import PersonForm from "./components/PersonForm";
import Numbers from "./components/Numbers";
import Filter from "./components/Filter";
import Alert from "./components/Alert";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [alert, setAlert] = useState(null);
  const [isError, setError] = useState(null);

  useEffect(() => {
    Services.getAll().then((response) => setPersons(response));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (persons.every((person) => person.name !== newName)) {
      Services.create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response));
          setAlertTime(`${newPerson.name} was added`);
        })
        .catch((error) => {
          console.log(error);
          setErrorTime(error.message);
        });
    } else if (
      window.confirm(
        `${newPerson.name} is already added in the phonebook, replace the old number with a new one?`
      )
    ) {
      const id = persons.find((person) => person.name == newPerson.name).id;
      console.log(id);
      Services.update(id, newPerson)
        .then((response) => {
          setPersons(
            persons.map((person) =>
              person.id !== response.id ? person : response
            )
          );
          setAlertTime(`New number for ${newPerson.name} was added`);
        })
        .catch((error) => {
          console.log(error);
          setErrorTime(error.message);
        });
    }

    setNewName("");
    setNewNumber("");
  };

  const removePerson = (id) => {
    const name = persons.find((person) => person.id === id).name;
    console.log(name);
    if (window.confirm(`Delete ${name}`)) {
      console.log("moro");
      Services.remove(id)
        .then(() => {
          console.log("wassup");
          setPersons(persons.filter((person) => person.name !== name));
          setAlertTime(`${name} was deleted`);
        })
        .catch(() => {
          setErrorTime(
            `Information of ${name} has already been removed from server`
          );
        });
    }
  };

  const setAlertTime = (text) => {
    setAlert(text);
    setTimeout(() => setAlert(null), 5000);
  };

  const setErrorTime = (text) => {
    setError(true);
    setAlert(text);
    setTimeout(() => setAlert(null), 5000);
    setTimeout(() => setError(null), 5000);
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
      <Alert alert={alert} isError={isError} />
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

      <Numbers filter={newFilter} persons={persons} remove={removePerson} />
    </div>
  );
};

export default App;
