import { expect } from 'chai';
import request from 'supertest';
import app from '../../app/server';

describe('Tasks', () => {
  describe('Create task', () => {
    it('should successfully create task', (done) => {
      request(app)
        .post('/graphql')
        .set('Accept', 'application/json')
        .send({
          query: `mutation {
                      taskCreate(input: {
                          name: "Finish work now",
                          phaseId: 2
                        }) {
                          phaseId
                          phaseName
                          status
                          isDone
                          tasks {
                              taskId
                              taskName
                              isComplete
                          }
                      }
                  }
              `,
        })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('taskCreate');
          done();
        });
    });
  });

  describe('Fetch phase task', () => {
    it('should fetch a phase task successfully', (done) => {
      request(app)
        .post('/graphql')
        .set('Accept', 'application/json')
        .send({
          query: `query {
                        phaseTask(phaseId: 1, taskId: 1) {
                            taskId
                            taskName
                            isComplete
                        }
                    }
              `,
        })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('phaseTask');
          done();
        });
    });
  });
});

describe('Update task status', () => {
  it('should update a phase task successfully', (done) => {
    request(app)
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `mutation {
                    taskStatusUpdate(phaseId: 2, taskId: 2) {
                    taskId
                        taskName
                        isComplete
                    }
                }
            `,
      })
      .end((req, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('taskStatusUpdate');
        done();
      });
  });
});
