import React, { useEffect, useRef } from 'react';
import { applyFilter } from '../filters/filterEngine';

const PreviewCanvas = React.forwardRef(({ image, filter }, ref) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (image && canvasRef.current) {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        canvas.width = img.width;
        canvas.height = img.height;
        applyFilter(canvas, img, filter);
      };
      img.src = image;
    }
  }, [image, filter]);

  React.useImperativeHandle(ref, () => canvasRef.current);

  return (
    <div className="preview-container">
      <canvas ref={canvasRef} className="preview-canvas" />
    </div>
  );
});

PreviewCanvas.displayName = 'PreviewCanvas';
export default PreviewCanvas;