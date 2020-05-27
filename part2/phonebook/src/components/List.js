import React from 'react'

export default function List({ persons, onClick }) {
  return persons.map(person => (
    <div key={person.id}>
      <span>{person.name} {person.number}</span>
      <button onClick={() => onClick(person)}>Delete</button>
    </div>
  ));
};
