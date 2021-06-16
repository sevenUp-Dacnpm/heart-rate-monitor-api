//process.env.NODE_ENV = 'test';
//const request = require('supertest');
//const { connectDB, closeDB } = require('../../src/loaders/mongoose');

//const config = require('../../src/config');

//const User = require('../../src/models/User');
const app = require('../../src/app');
const randomstring = require("randomstring");

const chaiHttp = require('chai-http');
const chai = require('chai');
const should = chai.should();
chai.use(chaiHttp);



describe('TEST API', () => {
  var token = '';
  let userId = '';
  const username = randomstring.generate(7);

  it('OK, creating a new user account', (done) => {
    chai.request(app)
    .post('/register')
    .send({
      username: username,
      password: '123456',
      profile: {
        fullName: 'Danh Phi Long 22',
        gender: 'male',
        weight: 100,
        height: 100,
        dob: '2021-01-01',
      }
    }).end((err,res)=>{
      if(err){
        console.log(err);
      }
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('profile');
      res.body.should.have.property('_id');
      res.body.should.have.property('username');
      done();
    })
  });

  it('OK, login successfully and get a token', (done) => {
    chai.request(app)
      .post('/login')
      .send({
        username: username,
        password: '123456',
      }).end((err,res) => {
        if(err){
          console.log(err);
        }
        token = res.body.token;
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('user');
        res.body.should.have.property('token');
        done();
      })
  });

  it('Fail, login is falure', (done) => {
    chai.request(app)
      .post('/login')
      .send({
        username: username,
        password: '111',
      }).end((err,res) => {
        if(err){
          console.log(err);
        }
        res.should.have.status(400);
        done();
      })
  });

  it('OK, verify token successfully', (done) => {
    chai.request(app)
      .get('/verify_token')
      .set('authorization', token)
      .end((err,res) => {
        if(err){
          console.log(err);
        }
        res.should.have.status(200);
        done();
      })
  });

  it('OK, Get user list', (done) => {
    chai.request(app)
      .get('/users')
      .set('authorization', token)
      .end((err,res) => {
        if(err){
          console.log(err)
        }
        const body = res.body;
        userId = body[0]._id;
        res.body.should.be.a('array');
        done();
      })
  });

  it('Fail, Get user list failure because wrong auth', (done) => {
    chai.request(app)
      .get('/users')
      .end((err,res) => {
        if(err){
          console.log(err);
        }
        res.should.have.status(401);
        done();
      })
  });

  it('OK, get user with specific id', (done) => {
    chai.request(app)
      .get(`/users/${userId}`)
      .set('authorization', token)
      .end((err,res) => {
        if(err){
          console.log(err);
        }
        const body = res.body;
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('profile');
        res.body.should.have.property('_id');
        res.body.should.have.property('username');
        done();
      })
  });
});
