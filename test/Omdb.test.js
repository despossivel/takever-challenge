const request = require('supertest'),
 host = 'https://www.omdbapi.com/';

describe('OMDB', () => {
    const t = 'batman',
    apiKey = '9e0debd5';
  
    it('Get Actors in OMDB', (done) => {
        request(host)
        .post(`?t=${t}&apikey=${apiKey}`)
        .send({}).expect(200).end(function (err, res) {
            if (err) return done(err);
            done();
        });
    })
});