// src/components/FieldForm.js

import React from 'react';
import ValidatedInput from './ValidatedInput';

const FieldForm = ({ fieldNames, formData, onInputChange, onSubmit }) => (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        {fieldNames.map((fieldName) => (
            <ValidatedInput
                key={fieldName}
                fieldName={fieldName}
                value={formData[fieldName] || ''}
                onChange={onInputChange}
            />
        ))}
        <button type="submit" style={{ maxWidth: 200 }}>Submit</button>
    </form>
);

export default FieldForm;
