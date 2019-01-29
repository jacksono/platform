const request = require('supertest');
const app = require('../app.js');
const { Member,db } = require('../db')
/* eslint no-undef:0 */

describe('Test member routes', () => {
  beforeAll((done) => {
  db.sync({ force: true })
    .then(() => {
      request(app).post('/api/v1/members').send({
        firstName: 'Jane',
        lastName: 'Doe',
        dob: '10/12/2000'
      })
      .end(() => {
        done()
      });
    });
  });

  afterAll((done) => {
    db.close();
    done();
  })

  test('A member can be created', (done) => {
    const payload = { firstName: 'Mbaga', lastName: 'Bob', dob: '9/5/1990'};
    request(app).post('/api/v1/members').send(payload)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        done()
      });
  });

  test('A member must be created with a  first name', (done) => {
    const payload = { lastName: 'Bob', dob: '9/5/1990'};
    request(app).post('/api/v1/members').send(payload)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toEqual("First name must be provided");
        done()
      });
  });

  test('A member must be created with a last name', (done) => {
    const payload = { firstName: 'Bob', dob: '9/5/1990'};
    request(app).post('/api/v1/members').send(payload)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toEqual("Last name must be provided");
        done()
      });
  });

  test('A member must be created with a dob', (done) => {
    const payload = { firstName: 'Bob', lastName: 'James'};
    request(app).post('/api/v1/members').send(payload)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toEqual("DOB must be provided");
        done()
      });
  });
});
