const assert = require('assert');
const chai = require('chai');
const expect = chai.expect
const assertArrays = require('chai-arrays');
const request = require('supertest');
const app = require('./app')

chai.use(assertArrays);

describe('Testing /getAstronauts route', function() {
    it('should return status 200', () => {
      request(app)
        .get('/getAstronauts')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

    it('should return Astronaut object on call', function() {
    return request(app)
        .get('/getAstronauts')
        .then(function(response){
            expect(response.body).to.be.array();
        })
      });
});

describe('Testing /postNewAstronaut route', function() {
    it('should return status 200', () => {
      request(app)
        .post('/postNewAstronaut')
        .send({test: true, first: 'test', last: 'test', country:'test', gender:'test'})
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });
});

// describe('Testing /deleteAstronaut route', function() {
//     it('should return status 200', () => {
//       request(app)
//         .post('/deleteAstronaut')
//         .then(function(response){
//             assert.equal(response.status, 200)
//         })
//     });
// });

// describe('Testing /updateAstronaut route', function() {
//     it('should return status 200', () => {
//       request(app)
//         .post('/updateAstronaut')
//         .then(function(response){
//             assert.equal(response.status, 200)
//         })
//     });
// });
