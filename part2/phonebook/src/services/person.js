import client from './index'

const createPersons = payload => client.post('/persons', payload);
const deletePersons = id => client.delete(`/persons/${id}`);
const getPersons = () => client.get('/persons');
const updatePersons = (id, payload) => client.put(`/persons/${id}`, payload);

export { createPersons, deletePersons, getPersons, updatePersons };
