import client from './index'

const createPersons = payload => client.post('/api/persons', payload);
const deletePersons = id => client.delete(`/api/persons/${id}`);
const getPersons = () => client.get('/api/persons');
const updatePersons = (id, payload) => client.put(`/api/persons/${id}`, payload);

export { createPersons, deletePersons, getPersons, updatePersons };
