const request = require('supertest');
const app = require('../app.js');
const { Plan, Member, db } = require('../db')
/* eslint no-undef:0 */

describe('Test plan routes', () => {
  beforeAll((done) => {
  db.sync({ force: true })
    .then(() => {
      request(app).post('/api/v1/plans').send({
        planName: 'Jane',
        type: 'recurrent',
      })
      .end(() => {
        Member.create({
          firstName: "John",
          lastName: "Doe",
          dob: "10/12/2008",
          planId: 1
        });
        done()
      });
    });
  });

  afterAll((done) => {
    db.sync({ force: true })
    .then(()=>{
      db.close();
    });
    done();
  })

  test('A plan can be created', (done) => {
    const payload = { planName: 'Silver', type: 'recurrent'};
    request(app)
      .post('/api/v1/plans')
      .send(payload)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        done()
      });
  });

  test('Can list members belonging to a plan', (done) => {
    request(app)
      .get('/api/v1/plans/1/members')
      .then((response) => {
        expect(response.body.data.length).toBe(1);
        done()
      });
  });

  test('A member can be added to a plan', (done) => {
    request(app)
      .patch('/api/v1/plans/1/members/1')
      .then((response) => {
        Member.findById(1).then((member) => {
          expect(member.planId).toBe(1);
          done()
        })
      });
  });

  test('A plan must be created with a name', (done) => {
    const payload = { type: 'recurrent'};
    request(app).post('/api/v1/plans').send(payload)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body.error.planName).toEqual("planName must be provided");
        done()
      });
  });

  test('A plan type must be either recurrent or time limted', (done) => {
    const payload = { planName: 'Gold', type: 'other'};
    request(app).post('/api/v1/plans').send(payload)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body.error.type).toEqual(
          "type must be either 'recurrent' or 'timeLimited'"
        );
        done()
      });
  });

  test('Time limited plans must have a start date and end date', (done) => {
    const payload = { planName: "Gold", type: 'timeLimited'};
    request(app).post('/api/v1/plans').send(payload)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body.error.dates).toEqual(
          "Both start date and end date must be provided"
        );
        done()
      });
  });

  test('A member can only be added to an existing plan', (done) => {
    request(app)
      .patch('/api/v1/plans/99/members/1')
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.body.error.plan).toEqual("That plan does not exist");
        done()
      });
  });

  test('Only existing members can be added to a plan', (done) => {
    request(app)
      .patch('/api/v1/plans/1/members/99')
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.body.error.member).toEqual("That member does not exist");
        done()
      });
  });

  test('Show message if there are no members belonging to a plan', (done) => {
    Plan.create({
      planName: "Diamond"
    })
    .then((plan) => {
      request(app)
        .get(`/api/v1/plans/${plan.id}/members`)
        .then((response) => {
          expect(response.body.data).toEqual(
            "There are no members belonging to this plan"
          );
          done()
        });
    })
  });
});
