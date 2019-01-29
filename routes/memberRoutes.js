const express = require('express');
const { Member } = require('../db');

const memberRoutes = express.Router();


// Add a member
memberRoutes.post('/', (req, res) => {
  let errors = {};
  if (!req.body.firstName) {
    errors['firstName'] = "First name must be provided"
  }
  if (!req.body.lastName) {
    errors['lastName'] = "Last name must be provided"
  }
  if (!req.body.dob) {
    errors['dob'] = "DOB must be provided"
  }
  if (Object.keys(errors).length !== 0) {
    res.status(400);
    res.json({
      error: errors
    })
    return;
  }

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
