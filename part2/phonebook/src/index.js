import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Filter from './components/Filter'
import Form from './components/Form'
import List from './components/List'
import './index.css'

const App = () => {
  const [{
    filter,
    name,
    number,
    persons,
  }, setState] = useState({
    filter: '',
    name: '',
    number: '',
    persons: [
      { name: 'Arto Hellas', number: '040-123456' },
      { name: 'Ada Lovelace', number: '39-44-5323523' },
      { name: 'Dan Abramov', number: '12-43-234345' },
      { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ],
  });
  const onSubmit = (evt) => {
    evt.preventDefault();

    const arr = [...persons];

    arr.push({ name, number });
    setState((state) => ({ ...state, name: '', number: '', persons: arr }));
  };
  const onChange = (type) => (evt) => {
    const { value } = evt.target;

    setState((state) => ({ ...state, [type]: value }));
  };
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={onChange('filter')} />
      <h2>add a new</h2>
      <Form
        name={name}
        number={number}
        onChange={onChange}
        onSubmit={onSubmit}
      />
      <h2>Numbers</h2>
      <List persons={filteredPersons}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
