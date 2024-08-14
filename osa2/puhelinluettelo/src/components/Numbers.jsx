import React from "react";

const Numbers = ({ persons, filter }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter)
  );
  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name}&nbsp;{person.number}
        </p>
      ))}
    </div>
  );
};

export default Numbers;
