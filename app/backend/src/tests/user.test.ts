import * as sinon from 'sinon';
import * as chai from 'chai';
import { before } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import model from '../database/models/user';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de login', () => {
  before(() => {
    sinon.stub(model, 'findOne').resolves({
      username: 'admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    } as unknown as model);
  })
  after(() => {
    (model.findOne as sinon.SinonStub).restore();
  })


  it("A rota post /login deve retornar o token", async () => {
    const token = await chai.request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      }).then((res) => res)
    expect(token.body).to.have.property("token");
  });
});
