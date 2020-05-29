const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

module.exports = function(app) {
  app.use(express.json());
  app.use(express.static('build'));
  app.use(cors());
  app.use(morgan('combined'));
};
