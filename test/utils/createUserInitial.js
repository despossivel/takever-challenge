const request = require('supertest');
const app = require('../../src/server');
const createUserInitial = async () => {
    await request(app)
        .post('/user')
        // .set('Authorization', token)
        .send({
            "name": "Matheus",
            "username": "despossivel",
            "email": "mattbmoller@gmail.com",
            "password": "qazx123.",
            "phone": "949991384966",
            "status": true
        }).expect(200);
}


module.exports = createUserInitial;