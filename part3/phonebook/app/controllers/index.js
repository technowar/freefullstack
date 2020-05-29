const { persons } = require('../../utils/db.json')

exports.index = (req, res) => res.send('<h1>Hello World!</h1>');
exports.info = (req, res) => {
  res.send(`
    Phonebook has info for ${persons.length} people
    <br />
    <br />
    ${new Date()}
  `);
};
