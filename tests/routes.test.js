const request = require('supertest');
const app = require('../app.js');
/* eslint no-undef:0 */
describe('Test all routes', () => {
  test('Index route returns success message', (done) => {
    const msg = 'Success';
    request(app).get('/api')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(msg);
        done()
      });
  });
});
