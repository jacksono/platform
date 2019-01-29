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
  if (req.body.type  === 'timeLimited' && (!req.body.startDate || !req.body.endDate) ) {
    errors['dates'] = "Both start date and end date must be provided"
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
  Plan.findById(req.params.planId)
    .then((plan) => {
      if (!plan) {
        res.status(404);
        res.json({
          error: { plan: "That plan does not exist" }
        })
        return;
      }
      Member.findById(req.params.memberId)
        .then((member) => {
          if (!member) {
            throw Error("That member does not exist");
          }
          member.updateAttributes({planId: plan.id})
          res.status(200)
          res.json({
            message: "Updated Succesfully",
          });
        })
        .catch((error) => {
          if (error.message === "That member does not exist") {
            res.status(404);
            res.json({
              error: { member: "That member does not exist" }
            })
          } else {
            res.status(500).send({ message: 'Internal Server Error' });
            console.error(error);
          }
        });
  })

});

module.exports = planRoutes;
