const request = require('supertest');
const app = require('../app.js');
const { Plan, Member } = require('../db')
/* eslint no-undef:0 */

describe('Test plan routes', () => {
  beforeAll((done) => {
  Plan.sync({ force: true })
    .then(() => {
      request(app)
        .post('/api/v1/plans')
        .send({
          planName: 'Jane',
          type: 'recurssive',
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


  test('A plan can be created', (done) => {
    const payload = { planName: 'Silver', type: 'recurssive'};
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
        Member.findById(1))
        .then((member)=>{
          expect(member.planId).toBe(1);
        })
        done()
      });
  });
});
