const addService = (numberOne, numberTwo) => {
  // if (!numberOne || !numberTwo) {
  //   return { message: "Number can not be empty" }
  // }

  if(numberOne === "0" || numberTwo === "0"){
    return { message: "Numbers can not be zero" }
  }


  const sum = parseInt(numberOne) + parseInt(numberTwo);

  // This Feature will be added in the test 
  // let sum = Number(numberOne) + Number(numberTwo);

  // This will be hotfix
  // if (numberOne < 0 || numberTwo < 0) {
  //   res.status(400).send({ message: "Number can not be negative" })
  // }
  return { sum, message: "Sum success" };
}

module.exports = addService;