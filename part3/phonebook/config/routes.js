const index = require('../app/controllers')
const persons = require('../app/controllers/persons')

module.exports = function(app) {
  app.get('/', index.index);
  app.get('/info', index.info);

  app.delete('/api/persons/:id', persons.deletePerson);
  app.get('/api/persons', persons.getPersons);
  app.get('/api/persons/:id', persons.getPersonById);
  app.post('/api/persons', persons.createPerson);
};
