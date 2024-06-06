import React, { useState, useEffect } from 'react'

interface Image {
  src: string;
  title: string;
  description: string;
}

interface ImageGalleryProps {
  images: Image[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [images])

  // function nextImage() {
  //   setImageIndex((prevIndex) =>
  //     prevIndex === images.length - 1 ? 0 : prevIndex + 1
  //   )
  // }

  return (
    <main className="flex flex-col justify-center items-center w-full">
      <div className="image-gallery w-full">
        <div className={'display: justify-center flex w-full transition active:scale-150 ease-in-out duration-200 z-50 motion-reduce:transition-none motion-reduce:hover:transform-none'}>
          <img src={images[imageIndex].src} alt="gallery" />
        </div>
        <div className="image-info text-center mt-4">
          <h2 className="text-lg font-bold text-gray-500">{images[imageIndex].title}</h2>
          <p className="text-sm text-gray-500">{images[imageIndex].description}</p>
        </div>
      </div>
    </main>
  )
}

export default ImageGallery