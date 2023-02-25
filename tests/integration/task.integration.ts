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

    describe('Fetch phase task', () => {
        it('should fetch a phase task successfully', (done) => {
            request(app)
            .get('/api/v1/phases/tasks/1/2')
            .set('Accept', 'application/json')
            .end((req, res) => {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.code).to.be.equal(200);
                expect(res.body.status).to.be.equal('success');
                expect(res.body.message).to.be.equal('Task fetched successfully');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.have.property('taskId');
                expect(res.body.data).to.have.property('taskName');
                expect(res.body.data).to.have.property('isComplete');
                done();
            });
        });

        it('should return error if task is not found', (done) => {
            request(app)
            .get('/api/v1/phases/tasks/1/200')
            .set('Accept', 'application/json')
            .end((req, res) => {
                expect(res.statusCode).to.be.equal(404);
                expect(res.body.code).to.be.equal(404);
                expect(res.body.status).to.be.equal('error');
                expect(res.body.message).to.be.equal('Task not found');
                done();
            });
        });
    })
});