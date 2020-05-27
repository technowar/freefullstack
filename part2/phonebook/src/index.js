import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Filter from './components/Filter'
import Form from './components/Form'
import List from './components/List'
import { createPersons, deletePersons, getPersons, updatePersons } from './services/person'
import './index.css'

const App = () => {
  const [{ filter, name, number, persons }, setState] = useState({ filter: '', name: '', number: '', persons: [] });
  const fetchPersons = useCallback(async () => {
    try {
      const { data, status } = await getPersons();

      if (status >= 400) {
        throw new Error('Something went wrong');
      }

      setState((state) => ({ ...state, persons: data }));
    } catch (error) {
      window.alert(error.message);
    }
  }, []);
  const onChange = (type) => (evt) => {
    const { value } = evt.target;

    setState((state) => ({ ...state, [type]: value }));
  };
  const onClick = async ({ id, name }) => {
    try {
      const confirmDelete = window.confirm(`Delete ${name}?`);

      if (confirmDelete) {
        const { status } = await deletePersons(id);

        if (status >= 400) {
          throw new Error('Something went wrong');
        }

        setState((state) => ({ ...state, name: '', number: '', persons: persons.filter(person => person.id !== id) }));
      }
    } catch (error) {
      window.alert(error.message);
    }
  };
  const onSubmit = async (evt) => {
    try {
      evt.preventDefault();

      if (!name || !number) {
        throw new Error('Input fields cannot be empty');
      }

      const foundPerson = persons.findIndex(person => person.name === name.trim());

      if (foundPerson > -1) {
        const confirmReplace = window.confirm(`${persons[foundPerson].name} is already added to phonebook, replace the old number with the new one?`);

        if (confirmReplace) {
          const { data, status } = await updatePersons(persons[foundPerson].id, { name, number });

          if (status >= 400) {
            throw new Error('Something went wrong');
          }

          persons[foundPerson] = data;

          setState((state) => ({ ...state, name: '', number: '', persons }));
        }
      } else {
        const { data, status } = await createPersons({ name, number });

        if (status >= 400) {
          throw new Error('Something went wrong');
        }

        setState((state) => ({ ...state, name: '', number: '', persons: [...persons, { ...data }] }));
      }
    } catch (error) {
      window.alert(error.message);
    }
  };
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  useEffect(() => {
    fetchPersons();
  }, [fetchPersons]);

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
      <List persons={filteredPersons} onClick={onClick} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
