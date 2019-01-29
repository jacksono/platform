const request = require('supertest');
const app = require('../app.js');
const { Member } = require('../db')
/* eslint no-undef:0 */

describe('Test member routes', () => {
  beforeAll((done) => {
  Member.sync({ force: true })
    .then(() => {
      request(app)
        .post('/api/v1/members')
        .send({
          firstName: 'Jane',
          lastName: 'Doe',
          dob: '10/12/2000'
        })
        .end(() => {
          done()
        });
    });
});


  test('A member can be created', (done) => {
    const payload = { firstName: 'Mbaga', lastName: 'Bob', dob: '9/5/1990'};
    request(app)
      .post('/api/v1/members')
      .send(payload)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        done()
      });
  });
});