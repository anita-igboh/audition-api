import { expect } from 'chai';
import request from 'supertest';
import app from '../../app/server';

describe('Tasks', () => {

    describe('Create task', () => {
        it('should successfully create task', (done) => {
          request(app)
            .post('/api/v1/phases/tasks')
            .set('Accept', 'application/json')
            .send({
              name: 'new-task',
              phaseId: 2
            })
            .end((req, res) => {          
              expect(res.statusCode).to.be.equal(201);
              expect(res.body.code).to.be.equal(201);
              expect(res.body.status).to.be.equal('success');
              expect(res.body.message).to.be.equal('Task added successfully to phase');
              expect(res.body).to.have.property('data');
              done();
            });
        });
    
        it('should throw error for incomplete fields', (done) => {
          request(app)
            .post('/api/v1/phases/tasks')
            .set('Accept', 'application/json')
            .send({
              name: 'new-task',
            })
            .end((req, res) => {
              expect(res.statusCode).to.be.equal(400);
              expect(res.body.code).to.be.equal(400);
              expect(res.body.status).to.be.equal('error');
              done();
            });
        });
      });
    });