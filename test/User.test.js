const request = require('supertest');
const app = require('../src/server');
const getToken = require('./utils/login');
// const { usuario: usuarioTrucade } = require('./utils/trucades')
let token;

// --reporter nyan

let usuarioDemo = {
    "name": "Daniel",
    "username": "daniel",
    "email": "danel@gmail.com.br",
    "password": "qazx123.",
    "phone": "9499910000384966"
};

describe('Users', () => {

    before('token', async () => {
        token = await getToken();
    })

    it('Create new user', async () => {

        const response = await request(app)
            .post('/user')
            // .set('Authorization', token)
            .send(usuarioDemo).expect(200)

            // console.log(response.body.docs[0]._id)

        usuarioDemo._id = response.body.docs[0]._id;

    });

 


    it('Create new user with username already registered', (done) => {
        let { _id, ...novoUsuarioDemo } = usuarioDemo;
        novoUsuarioDemo.email = 'daniel2@gmail.com';
        novoUsuarioDemo.phone = '9499910000384933';
 
        const response = request(app)
            .post('/user')
            .set('Authorization', token)
            .send(novoUsuarioDemo).expect(200).end(function (err, res) {
                if (err) return done(err);
                done();
            });

    })

    it('Create new user with already registered email', (done) => {
        let { _id, ...novoUsuarioDemo } = usuarioDemo;
        novoUsuarioDemo.username = 'daniel2';
        novoUsuarioDemo.phone = '9499910000384933';
 

        const response = request(app)
            .post('/user')
            .set('Authorization', token)
            .send(novoUsuarioDemo).expect(422).end(function (err, res) {
                if (err) return done(err);
                done();
            });


    })

    it('Create new user with already registered phone number', (done) => {
        let { _id, ...novoUsuarioDemo } = usuarioDemo;
        novoUsuarioDemo.email = 'daniel2@gmail.com';
        novoUsuarioDemo.username = 'daniel2';
 

        const response = request(app)
            .post('/user')
            .set('Authorization', token)
            .send(novoUsuarioDemo).expect(422).end(function (err, res) {
                if (err) return done(err);
                done();
            });

    })


    // it('Confirmar conta', (done) => {

    //     const response = request(app)
    //         .get(`/public/confirmar/conta/${usuarioDemo._id}`)
    //         .expect(200).end(function (err, res) {
    //             if (err) return done(err);
    //             done();
    //         });
    // })

    // it('Recuperação de senha', (done) => {

    //     const response = request(app)
    //         .get(`/public/esqueci/minha/senha/${usuarioDemo.email}`)
    //         .expect(200).end(function (err, res) {
    //             if (err) return done(err);
    //             done();
    //         });
    // })


    it('List all users', (done) => {

        request(app)
            .get('/users')
            .set('Authorization', token)
            .expect(200).end(function (err, res) {
                if (err) return done(err);
                done();
            });

    })

    it('List a user', (done) => {
        request(app)
            .get(`/user/${usuarioDemo._id}`)
            .set('Authorization', token)
            .expect(200).end(function (err, res) {
                if (err) return done(err);
                done();
            });
    })


    it('Update a user', (done) => {
        request(app)
            .put(`/user/${usuarioDemo._id}`)
            .set('Authorization', token)
            .send({
                nome: 'New with test'
            })
            .expect(200).end(function (err, res) {
                if (err) return done(err);
                done();
            });
    })


    it('Remove a user', (done) => {
        request(app)
            .delete(`/user/${usuarioDemo._id}`)
            .set('Authorization', token)
            .expect(200).end(function (err, res) {
                if (err) return done(err);
                done();
            });
    })





});