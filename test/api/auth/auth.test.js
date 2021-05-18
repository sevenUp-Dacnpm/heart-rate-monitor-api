process.env.NODE_ENV = 'test';

const {expect} = require('chai');
const request = require('supertest');

// const conn = require('../../../src/loaders/mongoose.js');
const {connectDB, closeDB} = require('../../../src/loaders/mongoose');

console.log(connectDB);

const config = require('../../../src/config');
const app = require('../../../src/app');

describe('POST /register', () => {
    let token = '';
    before((done) => {
        connectDB(config.dbUri)
            .then(() => done())
            .catch((err) => done(err));
    })

    after((done) => {
        closeDB()
            .then(() => done())
            .catch((err) => done(err));
    })

    it('OK, creating a new user account', (done) => {
        
        request(app).post('/register')
            .send({
                "username": "long9ka",
                "password": "123456",
                "profile": {
                    "fullName": "Danh Phi Long 22",
                    "gender": "male",
                    "weight": 100,
                    "height": 100,
                    "dob": "2021-01-01"
                }
            })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property('profile');
                expect(body).to.contain.property('_id');
                expect(body).to.contain.property('username');
                expect(body).to.contain.property('password');
                done();
            })
            .catch((err) => done(err));
    })

    it('OK, login successfully and get a token', (done) => {
        
        request(app).post('/login')
            .send({
                "username": "long9ka",
                "password": "123456"
            })
            .then((res) => {
                const body = res.body;
                token = body.token;
                expect(body).to.contain.property('user');
                expect(body).to.contain.property('token');
                done();
            })
            .catch((err) => done(err));
    })

    it('Fail, login is falure', (done) => {
        
        request(app).post('/login')
            .send({
                "username": "long9ka1",
                "password": "123456"
            })
            .expect(400)
            .then(res => {
                done();
            })
            .catch((err) => done(err));
    })

    it('OK, verify token successfully', (done) => {
        request(app).get('/verify_token')
            .set('authorization', token)
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property('profile');
                expect(body).to.contain.property('_id');
                expect(body).to.contain.property('username');
                expect(body).to.contain.property('password');
                done();
            })
            .catch((err) => done(err));
    })
})