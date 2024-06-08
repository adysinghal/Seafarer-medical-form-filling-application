// src/components/FileInput.js

import React from 'react';

const FileInput = ({ onFileChange }) => (
    <div>
        <input type="file" accept="application/pdf" multiple onChange={onFileChange} />
    </div>
);

export default FileInput;