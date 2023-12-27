import { expect } from 'chai';
import { handler } from '../index.mjs';

describe('Addition', () => {
  describe('handler', () => {
    it('Success - no warning', async () => {
      const response = await handler({
        body: JSON.stringify({
          number1: 10,
          number2: 20
        })
      });

      expect(response).to.have.property('statusCode', 200);
      expect(response).to.have.property('body');
      const body = JSON.parse(response.body);
      expect(body).to.have.property('result', 30);
      expect(body).to.not.have.property('warning');
    });

    it('Success - with warning', async () => {
      const response = await handler({
        body: JSON.stringify({
          number1: 500,
          number2: 501
        })
      });

      expect(response).to.have.property('statusCode', 200);
      expect(response).to.have.property('body');
      const body = JSON.parse(response.body);
      expect(body).to.have.property('result', 1001);
      expect(body).to.have.property('warning', 'The result is greater than 1000.');
    });
  });
});