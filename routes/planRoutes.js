const express = require('express');
const { Plan, Member } = require('../db');

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
        data: response,
      });
    })
    .catch((error) => {
      res.status(500).send({ error: 'Internal Server Error' });
      console.error(error);
    });
});

// list members by plan
planRoutes.get('/:planId/members', (req, res) => {
    Member.findAll({ where: { planId: req.params.planId } })
      .then((result) => {
        res.status(200)
        res.json({
          data: result,
        });
      })
      .catch((error) => {
        res.status(500).send({ message: 'Internal Server Error' });
        console.error(error);
      });
});

module.exports = planRoutes;
