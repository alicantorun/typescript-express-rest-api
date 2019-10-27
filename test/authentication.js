const chai = require('chai');
const request = require('supertest');
const app = require('../src/config/server/server').default;
const user = require('./fixtures/user.json');
chai.should();

/**
 * storing globals to access them in API requests
 */
global.token = '';
/**
 * Authentication tests
 */
describe('Authentication', () => {
    it('register to app', (done) => {
        request(app)
            .post('/auth/signup')
            .send(user)
            .expect('Content-type', /json/)
            .expect((res) => {
                res.status.should.equal(200);
                res.body.message.should.be.a('string');
            })
            .end(done)
    });

    it('register user with existing email', (done) => {
        request(app)
            .post('/auth/signup')
            .send(user)
            .expect('Content-type', /json/)
            .expect((res) => {
                res.status.should.equal(400);
            })
            .end(done);
    });

    it('login to app', (done) => {
        request(app)
            .post('/auth/login')
            .send(user)
            .expect('Content-type', /json/)
            .expect((res) => {
                res.status.should.equal(200);
                res.body.message.should.be.a('string');
                res.header.authorization.should.not.null;
                global.token = res.header.authorization;
                global.bearerToken = `Bearer ${res.header.authorization}`;
            })
            .end(done);
    });

    it('get authenticated user', (done) => {
        request(app)
            .get('/auth/user')
            .set('Authorization', global.bearerToken)
            .expect((res) => {
                res.status.should.equal(200);
                res.body.user.should.not.null;
                res.body.user.email.should.equal(user.email);
            })
            .end(done);
    });
});
