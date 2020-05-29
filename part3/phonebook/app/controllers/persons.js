const fs = require('fs')
const path = require('path')
let { persons } = require('../../utils/db.json')

exports.deletePerson = async (req, res) => {
  try {
    const user = persons.find(person => person.id === Number.parseInt(req.params.id, 10));

    if (!user) {
      const err = {
        code: 404,
        error: 'not found'
      };

      throw err;
    }

    await fs.writeFileSync(`${path.resolve(__dirname, '..', '..')}/utils/db.json`, JSON.stringify({
      persons: persons.filter(person => person.id !== Number.parseInt(req.params.id, 10))
    }));

    return res.json({ message: 'user deleted' });
  } catch (error) {
    return res.status(error.code).json({ error: error.error });
  }
};
exports.createPerson = async (req, res) => {
  try {
    const { name, number } = req.body;

    if (!name || !number) {
      const err = {
        code: 400,
        error: 'content missing'
      };

      throw err;
    }

    if (persons.find(person => person.name === name)) {
      const err = {
        code: 400,
        error: 'name must be unique'
      };

      throw err;
    }

    await fs.writeFileSync(`${path.resolve(__dirname, '..', '..')}/utils/db.json`, JSON.stringify({
      persons: [...persons, { name, number, id: Math.floor(Math.random() * 10000000000) }]
    }));

    return res.json({ message: 'user created' });
  } catch (error) {
    return res.status(error.code).json({ error: error.error });
  }
};
exports.getPersons = (req, res) => res.json(persons);
exports.getPersonById = (req, res) => {
  try {
    const user = persons.find(person => person.id === Number.parseInt(req.params.id, 10));

    if (!user) {
      const err = {
        code: 404,
        error: 'not found'
      };

      throw err;
    }

    return res.json(user);
  } catch (error) {
    return res.status(error.code).json({ error: error.error });
  }
};
