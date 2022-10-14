const request = require('supertest'),
 host = 'https://www.episodate.com/api';

describe('Episodate', () => {
    it('Get list TV Shows', (done) => {
        request(host)
        .post('/most-popular')
        .send({}).expect(200).end(function (err, res) {
            if (err) return done(err);
            done();
        });
    })

    it('Get Most Populate TV Shows', (done) => {
        request(host)
        .post('/show-details?q=35624')
        .send({}).expect(200).end(function (err, res) {
            if (err) return done(err);
            done();
        });
    })
});