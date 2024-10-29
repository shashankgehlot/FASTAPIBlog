// src/hooks/useForm.js
import { useState } from 'react';

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };


  const resetForm = () => {
    setValues(initialValues);
  };

  const setFormValues = (newValues) => {
    setValues((prevValues) => ({
      ...prevValues,
      ...newValues,
    }));
  };


  return {
    values,
    handleChange,
    resetForm,
    setFormValues,
  };
};

export default useForm;
