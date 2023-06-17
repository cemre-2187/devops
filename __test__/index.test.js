const addService = require('../addService');

test('Adding two numbers', async () => {
  expect(addService(123, 3)).toStrictEqual({ sum: 126, message: "Sum success" })
})

test('Test Negative Numbers', async () => {
expect(addService(123, -3)).toStrictEqual({ sum: 120, message: "Sum success" })
 //  expect(addService(123, -3)).toStrictEqual({ message: "Number can not be negative" })
})