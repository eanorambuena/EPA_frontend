import React, { useState, useEffect } from 'react'

interface Image {
  src: string;
  title: string;
  description: string;
}

interface MemberCardProps {
  images: Image[];
}

const MemberCard: React.FC<MemberCardProps> = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [images])

  function nextImage() {
    setImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <main className="flex justify-center items-center">
      <div className="member-card">
        <button
          className={'display: justify-center flex max-w-[80%] md:max-w-[70%] transition active:scale-150 ease-in-out duration-200 z-50 motion-reduce:transition-none motion-reduce:hover:transform-none'}
          onClick={nextImage}
        >
          <img src={images[imageIndex].src} alt="card" />
        </button>
        <div className="image-info text-center mt-4">
          <h2 className="text-lg font-bold text-gray-500">{images[imageIndex].title}</h2>
          <p className="text-sm text-gray-500">{images[imageIndex].description}</p>
        </div>
      </div>
    </main>
  )
}

export default MemberCard