import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormFilling from './FormFilling';

const FormSelection = () => {
  const [forms, setForms] = useState([]);
  const [selectedForms, setSelectedForms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/forms')
      .then(response => {
        setForms(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the forms!', error);
      });
  }, []);

  const handleSelection = (formId) => {
    setSelectedForms(prev => {
      if (prev.includes(formId)) {
        return prev.filter(id => id !== formId);
      } else {
        return [...prev, formId];
      }
    });
  };

  return (
    <div>
      <h2>Select Forms</h2>
      {forms.map(form => (
        <div key={form._id}>
          <input
            type="checkbox"
            value={form._id}
            onChange={() => handleSelection(form._id)}
          />
          {form.formName}
        </div>
      ))}
      {selectedForms.length > 0 && <FormFilling selectedForms={selectedForms} />}
    </div>
  );
};

export default FormSelection;
