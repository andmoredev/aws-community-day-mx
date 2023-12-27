export const handler = async (event) => {
  const input = JSON.parse(event.body);
  const { number1, number2 } = input;

  const result = number1 + number2;
  return {
    statusCode: 200,
    body: JSON.stringify({
      result,
      ...(result > 1000) && { warning: 'The result is greater than 1000.' }
    })
  };
};