import { useState } from 'react';

// recibe el estado inicial
export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  // para limpiar el formulario
  const resetForm = () => {
    setValues(initialState);
  };

  return { values, handleChange, resetForm };
};