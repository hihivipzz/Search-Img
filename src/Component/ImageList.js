import './ImageList.css';
import React from 'react';

const ImageList = ({ images }) => {
  return (
    <div className="image-list">
      {images.map((image) => (
        <div key={image.id} className="image-item">
          <img src={image.url} alt={image.alt} />
        </div>
      ))}
    </div>
  );
};

export default ImageList;