const Numbers = ({ persons, filter, remove }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          <p>
            {person.name}&nbsp;{person.number}
            &nbsp;<button onClick={() => remove(person.id)}>delete</button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Numbers;
