import React from 'react';

function ImageUpload({ onImageUpload }) {
  const inputRef = React.useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageUpload(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h2>Upload Your Photo ✨</h2>
        <p>Choose an image to apply dreamy filters</p>
        
        <button
          className="upload-btn"
          onClick={() => inputRef.current?.click()}
        >
          📁 Select Photo
        </button>
        
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
}

export default ImageUpload;