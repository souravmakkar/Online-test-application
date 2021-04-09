export default function validateInfo(fields) {
  let errors = {};

  for (let field in fields) {
    const currentField = fields[field]; //fields[empName] ==sourav

    if (field === 'empName' && currentField.trim() === '') {
      errors[field] = `Employee name  is required!`;
    }
    if (field === 'empId' && currentField.trim() === '') {
      errors[field] = `Employee Id  is required!`;
    }
    if (field === 'agrementTerms' && !currentField) {
      errors[field] = 'Please agree to the terms';
    }
    if (field === 'skill' && !currentField) {
      errors[field] = 'Please choose a skill level';
    }
  }

  // if (!values.empName.trim()) {
  //   errors.empName = "Employee name is required";
  // } else if (!(values.empName.length >= 3 && values.empName.length < 15)) {
  //   errors.empName =
  //     "Employee name must contains 3 alphabets an maximum up to 15";
  // }
  // if (!values.empId) {
  //   errors.empId = "Employee id is required";
  // } else if (values.empId.length < 7) {
  //   errors.empId = "Employee id needs to be 7 no's";
  // }
  return errors;
}
