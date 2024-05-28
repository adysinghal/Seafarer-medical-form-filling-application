import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormFilling = ({ selectedForms }) => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    if (selectedForms.length > 0) {
      axios.post('http://localhost:5000/api/forms/fields', { formIds: selectedForms })
        .then(response => {
          setFields(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the fields!', error);
        });
    } else {
      setFields([]);
    }
  }, [selectedForms]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await axios.post('http://localhost:5000/api/forms/submit', data);
      const filePath = response.data.filePath;

      // Download the PDF
      const link = document.createElement('a');
      link.href = `http://localhost:5000${filePath}`;
      link.setAttribute('download', 'form.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(field => (
        <div key={field.name}>
          <label>{field.name}</label>
          <input type={field.type} name={field.name} required={field.required} />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormFilling;
