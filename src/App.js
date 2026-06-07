import React, { useState, useRef } from 'react';
import './App.css';
import ImageUpload from './components/ImageUpload';
import FilterPanel from './components/FilterPanel';
import FilmStrip from './components/FilmStrip';
import PreviewCanvas from './components/PreviewCanvas';

function App() {
  const [image, setImage] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('original');
  const canvasRef = useRef(null);

  const handleImageUpload = (imageData) => {
    setImage(imageData);
    setSelectedFilter('original');
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.href = canvasRef.current.toDataURL('image/png');
      link.download = `photo-${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📸 Dreamy Filters</h1>
        <p>VSCO & Fujifilm Inspired</p>
      </header>

      <main className="app-main">
        {!image ? (
          <ImageUpload onImageUpload={handleImageUpload} />
        ) : (
          <>
            <div className="editor-container">
              <div className="preview-section">
                <PreviewCanvas
                  ref={canvasRef}
                  image={image}
                  filter={selectedFilter}
                />
                <button className="download-btn" onClick={handleDownload}>
                  ⬇️ Download & Share
                </button>
              </div>

              <FilterPanel 
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
              />
            </div>

            <FilmStrip
              image={image}
              selectedFilter={selectedFilter}
              onFilterSelect={setSelectedFilter}
            />

            <button 
              className="reset-btn"
              onClick={() => setImage(null)}
            >
              ↻ Choose Another Photo
            </button>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
