const request = require('supertest');
const app = require('../app.js');
const { Plan } = require('../db')
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
});
