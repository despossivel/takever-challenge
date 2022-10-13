const request = require('supertest');

const app = require('../src/server');

const createUserInitial = require('./utils/createUserInitial');
const { user: trucade } = require('./utils/trucades')

describe('Authentication', () => {

  before(async () => {
    await trucade();
    await createUserInitial()
  })

  it('Efetuar login', (done) => {

    request(app).post('/auth')
      .send({
        email: "mattbmoller@gmail.com",
        password: "qazx123."
      }).expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });

  });


  it('Login with wrong password', (done) => {

     request(app).post('/auth')
      .send({
        email: "mattbmoller@gmail.com",
        password: "qazx123"
      }).expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });

  });


});

