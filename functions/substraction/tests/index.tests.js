const app = require('../index.js');
const { expect } = require('chai');

describe('Substraction', () => {
  describe('handler', () => {
    it('Success - no warning', async () => {
      const response = await app.handler({
        body: JSON.stringify({
          number1: 30,
          number2: 20
        })
      });

      expect(response).to.have.property('statusCode', 200);
      expect(response).to.have.property('body');
      const body = JSON.parse(response.body);
      expect(body).to.have.property('result', 10);
      expect(body).to.not.have.property('warning');
    });

    it('Success - no warning - result is negative', async () => {
      const response = await app.handler({
        body: JSON.stringify({
          number1: 20,
          number2: 30
        })
      });

      expect(response).to.have.property('statusCode', 200);
      expect(response).to.have.property('body');
      const body = JSON.parse(response.body);
      expect(body).to.have.property('result', -10);
      expect(body).to.not.have.property('warning');
    });

    it('Success - with warning', async () => {
      const response = await app.handler({
        body: JSON.stringify({
          number1: 499,
          number2: 1000
        })
      });

      expect(response).to.have.property('statusCode', 200);
      expect(response).to.have.property('body');
      const body = JSON.parse(response.body);
      expect(body).to.have.property('result', -501);
      expect(body).to.have.property('warning', 'The result is less than -500.');
    });
  });
});