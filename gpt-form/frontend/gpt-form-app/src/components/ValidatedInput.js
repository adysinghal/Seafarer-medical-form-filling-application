// src/components/ValidatedInput.js

import React, { useState } from 'react';
import './ValidatedInput.css';

const ValidatedInput = ({ fieldName, value, onChange }) => {
    const [error, setError] = useState('');

    const validate = (name, value) => {
        let errorMessage = '';
        if (name === 'First name' || name === 'Last name' || name === 'Middle name') {
            const regex = /^[A-Za-z]+$/;
            if (!regex.test(value)) {
                errorMessage = `${name} should only contain alphabets`;
            }
        }
        return errorMessage;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        const errorMessage = validate(name, value);
        setError(errorMessage);
        if (!errorMessage) {
            onChange(event);
        }
    };

    return (
        <div className="validated-input-container">
            <label>{fieldName}</label>
            <input
                type="text"
                name={fieldName}
                value={value}
                onChange={handleChange}
                style={{ maxWidth: 300 }}
            />
            {error && <span className="error">{error}</span>}
        </div>
    );
};

export default ValidatedInput;
