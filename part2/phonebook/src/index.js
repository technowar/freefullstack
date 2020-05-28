import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Filter from './components/Filter'
import Form from './components/Form'
import List from './components/List'
import Notification from './components/Notification'
import { createPersons, deletePersons, getPersons, updatePersons } from './services/person'
import './index.css'

const App = () => {
  const [{
    filter,
    name,
    notification,
    notificationType,
    number,
    persons,
  }, setState] = useState({
    filter: '',
    name: '',
    notification: '',
    notificationType: 'notification success',
    number: '',
    persons: [],
  });
  const fetchPersons = useCallback(async () => {
    try {
      const { data, status } = await getPersons();

      if (status >= 400) {
        throw new Error('Something went wrong');
      }

      setState((state) => ({ ...state, persons: data }));
    } catch (error) {
      setState((state) => ({ ...state, notification: error.message, notificationType: 'notification error' }));
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

        setState((state) => ({
          ...state,
          name: '',
          notification: `Deleted ${name}`,
          notificationType: 'notification success',
          number: '',
          persons: persons.filter(person => person.id !== id),
        }));
      }
    } catch (error) {
      setState((state) => ({ ...state, notification: error.message, notificationType: 'notification error' }));
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

          setState((state) => ({
            ...state,
            name: '',
            notification: `Updated ${persons[foundPerson].name}'s number`,
            notificationType: 'notification success',
            number: '',
            persons,
          }));
        }
      } else {
        const { data, status } = await createPersons({ name, number });

        if (status >= 400) {
          throw new Error('Something went wrong');
        }

        setState((state) => ({
          ...state,
          name: '',
          notification: `Added ${name}`,
          notificationType: 'notification success',
          number: '',
          persons: [...persons, { ...data }],
        }));
      }
    } catch (error) {
      setState((state) => ({ ...state, notification: error.message, notificationType: 'notification error' }));
    }
  };
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  useEffect(() => {
    fetchPersons();
  }, [fetchPersons]);

  useEffect(() => {
    const timer = setTimeout(() => setState((state) => ({ ...state, notification: '', notificationType: 'notification success', })), 3000);

    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType} />
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
