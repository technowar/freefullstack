import React from 'react'

export default function List({ persons }) {
  return persons.map(person => (
    <div key={person.name}>
      <span>{person.name} {person.number}</span>
    </div>
  ));
};
