const express = require('express');
const { Member } = require('../db');

const memberRoutes = express.Router();


// Add a member
memberRoutes.post('/', (req, res) => {
  if (!req.body.firstName) {
    res.status(400);
    res.json({
      error: "First name must be provided"
    })
    return;
  }
  if (!req.body.lastName) {
    res.status(400);
    res.json({
      error: "Last name must be provided"
    })
    return;
  }
  if (!req.body.dob) {
    res.status(400);
    res.json({
      error: "DOB must be provided"
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
