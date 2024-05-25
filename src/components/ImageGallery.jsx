import { useState, useEffect } from "react";
import "./ImageGallery.css";
import ZoomImage from "./ZoomImage";

const ImageGallery = (allImages) => {

  const images = allImages;

  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) =>
        prevIndex === allImages.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [allImages.images]);

  function nextImage() {
    setImageIndex((prevIndex) =>
      prevIndex === allImages.images.length - 1 ? 0 : prevIndex + 1
    );
  }

  function prevImage() {
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? allImages.images.length - 1 : prevIndex - 1
    );
  }

  function getImage(index) {
    return allImages.images[index];
  }

  return (
    <div className="image-gallery">
      <ZoomImage src={getImage(imageIndex)} />
      <div className="controls">
        <button onClick={prevImage}>Previous</button>
        <button onClick={nextImage}>Next</button>
      </div>
    </div>
  );

};

export default ImageGallery;

