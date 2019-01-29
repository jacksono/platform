const express = require('express');
const { Plan, Member } = require('../db');

const planRoutes = express.Router();


// Add a plan
planRoutes.post('/', (req, res) => {
  let errors = {};
  const planTypes = ['recurrent', 'timeLimited']
  if (!req.body.planName) {
    errors['planName'] = "planName must be provided"
  }
  if (req.body.type && !planTypes.includes(req.body.type) ) {
    errors['type'] = "type must be either 'recurrent' or 'timeLimited'"
  }
  if (Object.keys(errors).length !== 0) {
    res.status(400);
    res.json({
      error: errors
    })
    return;
  }

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

// add a member to a plan
planRoutes.patch('/:planId/members/:memberId', (req, res) => {
  Member.findById(req.params.memberId )
      .then((result) => {
        result.updateAttributes({planId: req.params.planId})
        res.status(200)
        res.json({
          data: "Updated Succesfully",
        });
      })
      .catch((error) => {
        res.status(500).send({ message: 'Internal Server Error' });
        console.error(error);
      });
});

module.exports = planRoutes;
