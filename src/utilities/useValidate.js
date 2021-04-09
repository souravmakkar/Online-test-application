import { useState } from 'react';
import validateInfo from './validateInfo';

const useValidate = (fields) => {
  const [values, setValues] = useState({
    ...fields,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSbmitted] = useState(false);

  const handleChange = (e) => {
    let target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInfo(values));
    setIsSbmitted(!isSubmitted);
  };

  return { values, handleChange, handleSubmit, errors, isSubmitted };
};

export default useValidate;
