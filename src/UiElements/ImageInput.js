import React, { useState } from 'react';

const ImageUploadInput = ({ label, name, value, onChange, accept = "image/*", required = false }) => {
  // Handle file change to convert image to Base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // When the file is successfully loaded, pass the Base64 result back to the parent component
        onChange(reader.result);
      };
      reader.readAsDataURL(file); // Convert the file to Base64
    }
  };

  return (
    <div className="image-upload-input">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type="file"
        id={name}
        name={name}
        accept={accept}  // Specify the accepted file types (default is image/*)
        onChange={handleFileChange}
        required={required}
      />
      {value && (
        <div className="image-preview">
          <img src={value} alt="Preview" style={{ maxWidth: '100px', marginTop: '10px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploadInput;
