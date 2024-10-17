// src/components/TextInput.js
import React from 'react';

const TextInput = ({ label, name, value, onChange, required }) => {
  return (
    <div>
      <label>
        {label}
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      </label>
    </div>
  );
};

export default TextInput;