import React, { useState } from 'react';
import axios from 'axios';

const FormCreation = () => {
  const [formName, setFormName] = useState('');
  const [fields, setFields] = useState([{ name: '', type: 'text', required: false }]);

  const handleFormNameChange = (event) => {
    setFormName(event.target.value);
  };

  const handleFieldChange = (index, event) => {
    const newFields = fields.slice();
    newFields[index][event.target.name] = event.target.value;
    setFields(newFields);
  };

  const handleAddField = () => {
    setFields([...fields, { name: '', type: 'text', required: false }]);
  };

  const handleRemoveField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newForm = { formName, fields };
    try {
      await axios.post('http://localhost:5000/api/forms/create', newForm);
      setFormName('');
      setFields([{ name: '', type: 'text', required: false }]);
      alert('Form created successfully!');
    } catch (error) {
      console.error('There was an error creating the form!', error);
    }
  };

  return (
    <div>
      <h2>Create a New Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Form Name:</label>
          <input type="text" value={formName} onChange={handleFormNameChange} required />
        </div>
        <h3>Fields</h3>
        {fields.map((field, index) => (
          <div key={index}>
            <label>Field Name:</label>
            <input type="text" name="name" value={field.name} onChange={(e) => handleFieldChange(index, e)} required />
            <label>Type:</label>
            <select name="type" value={field.type} onChange={(e) => handleFieldChange(index, e)}>
              <option value="text">Text</option>
              <option value="date">Date</option>
              <option value="number">Number</option>
            </select>
            <label>Required:</label>
            <input type="checkbox" name="required" checked={field.required} onChange={(e) => handleFieldChange(index, { target: { name: 'required', value: e.target.checked } })} />
            <button type="button" onClick={() => handleRemoveField(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddField}>Add Field</button>
        <button type="submit" >Create Form</button>
      </form>
    </div>
  );
};

export default FormCreation;
