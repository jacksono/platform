const express = require('express');
const { Member } = require('../db');

const memberRoutes = express.Router();


// Add a member
memberRoutes.post('/', (req, res) => {
  Member.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
  })
    .then((response) => {
      res.status(201);
      res.json({
        data: response,
      });
    })
    .catch((error) => {
      res.status(500).send({ error: 'Internal Server Error' });
      console.error(error);
    });
});


module.exports = memberRoutes;
