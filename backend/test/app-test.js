const request = require('supertest');
const app = require('../app');

//this test checks to see that the /words route is received successfully
//this is the main objective of the backend
describe('GET /words', function(){
    it('respond with json', function(done){
      request(app)
        .get('/words')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });