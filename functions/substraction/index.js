const { initializePowertools } = process.env.LAMBDA_TASK_ROOT ?
  require('/opt/nodejs/lambda-powertools') :
  require('../../layers/lambda-powertools/lambda-powertools');

exports.handler = initializePowertools(async (event) => {
  const input = JSON.parse(event.body);
  const { number1, number2 } = input;

  const result = number1 - number2;
  return {
    statusCode: 200,
    body: JSON.stringify({
      result,
      ...(result < -500) && { warning: 'The result is less than -500.' }
    })
  };
});