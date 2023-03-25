import { expect } from 'chai';
import request from 'supertest';
import app from '../../app/server';

describe('Phases', () => {
  it('should fetch phases successfully', (done) => {
    request(app)
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
          query phases {
            phases {
              phaseId
              phaseName
              status
              isDone
            }
           } 
        `,
      })
      .end((req, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('phases');
        done();
      });
  });

  describe('Fetch single phase', () => {
    it('should fetch a phase successfully', (done) => {
      request(app)
        .post('/graphql')
        .set('Accept', 'application/json')
        .send({
          query: `{
              phase(id: 1) {
                phaseId
                phaseName
                status
                isDone
              }
            }
          `,
        })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('phase');
          done();
        });
    });
  });

  describe('Create phase', () => {
    it('should create a phase successfully', (done) => {
      request(app)
        .post('/graphql')
        .set('Accept', 'application/json')
        .send({
          query: `mutation {
            phaseCreate(input: {name: "new phase"}) {
              phaseId
              phaseName
              status
              isDone
            }
           }
          `,
          variables: {
            input: {
              name: 'New Phase',
            },
          },
        })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('phaseCreate');
          done();
        });
    });
  });
});
