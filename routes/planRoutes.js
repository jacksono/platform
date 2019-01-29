const express = require('express');
const { Plan } = require('../db');

const planRoutes = express.Router();


// Add a plan
planRoutes.post('/', (req, res) => {
  Plan.create({
    planName: req.body.planName,
    type: req.body.type
  })
    .then((response) => {
      res.status(201);
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.status(500).send({ error: 'Internal Server Error' });
      console.error(error);
    });
});


module.exports = planRoutes;
