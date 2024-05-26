import React, { useState, useEffect } from "react";
import "./ImageGallery.css";


const ImageGallery = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [images]);

  function nextImage() {
    setImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }

  function prevImage() {
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }

  return (
    <div className="image-gallery">
      <button
        className={`display: flex max-w-[80%] md:max-w-[70%] transition active:scale-150 ease-in-out duration-200 z-50 motion-reduce:transition-none motion-reduce:hover:transform-none`}
      >
        <img 
        src={images[imageIndex]} 
        alt="gallery" />
      </button>
    </div>
  );
};

export default ImageGallery;