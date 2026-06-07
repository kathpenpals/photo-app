import React, { useEffect, useRef } from 'react';
import { applyFilter } from '../filters/filterEngine';

function FilmStrip({ image, selectedFilter, onFilterSelect }) {
  const filters = ['original', 'clarendon', 'juno', 'lark', 'ludwig', 'perpetua', 'reyes', 'slumber'];
  const canvasRefs = useRef({});

  useEffect(() => {
    if (!image) return;

    filters.forEach((filterId) => {
      if (canvasRefs.current[filterId]) {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRefs.current[filterId];
          canvas.width = 100;
          canvas.height = 100;
          applyFilter(canvas, img, filterId);
        };
        img.src = image;
      }
    });
  }, [image]);

  return (
    <div className="film-strip">
      <div className="film-strip-track">
        {filters.map((filterId) => (
          <div
            key={filterId}
            className={`film-frame ${selectedFilter === filterId ? 'active' : ''}`}
            onClick={() => onFilterSelect(filterId)}
          >
            <canvas
              ref={(el) => {
                if (el) canvasRefs.current[filterId] = el;
              }}
              className="film-thumbnail"
            />
            <span className="film-label">
              {filterId === 'original' ? '📷' : '✨'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilmStrip;