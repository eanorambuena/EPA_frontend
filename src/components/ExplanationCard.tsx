import React, { useState } from 'react';

interface Props {
  title: string;
  text: string;
  images: string[];
}
console.log(window.innerWidth)
const ExplanationCard = ({ title, text, images }: Props) => {
  const [indice_imagen, set_indice_imagen] = useState(0);

  const imagen_previa = () => {
    set_indice_imagen(indice_actual => indice_actual === 0 ? images.length - 1 : indice_actual - 1);
  };

  const imagen_siguiente = () => {
    set_indice_imagen(indice_actual => (indice_actual + 1) % images.length);
  };

  return (
    <div
      style={{
        width: '100%',
        marginRight: '20px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        border: '1px solid #E1DFDF',
        padding: '20px',
        boxSizing: 'border-box',
      }}
      className='bg-amber-300 dark:bg-violet-700'
    >
      <h2 className='text-xl font-bold' style={{ textAlign: 'left' }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '20px' }}>
        <h3 className='text-xl' style={{ width: '100%' }} dangerouslySetInnerHTML={{ __html: text }}></h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {images.length > 0 && (
          <img
            src={images[indice_imagen]}
            alt={`Explanation image ${indice_imagen + 1}`}
            style={{ width: '100%', maxWidth: window.innerWidth > 1100 ? '45%' : '100%', height: 'auto', marginBottom: '10px', borderRadius: '5px', objectFit: 'contain' }}
          />
        )}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button style={{ marginRight: '10px', color: 'black' }} onClick={imagen_previa}>
            <img
              src="public/assets/views/square-arrow-left.png"
              alt="<--"
              style={{ width: '50px', height: '50px', borderRadius: '20%' }}
            />
          </button>
          <button style={{ marginRight: '10px', color: 'black' }} onClick={imagen_siguiente}>
            <img
              src="public/assets/views/square-arrow-right.png"
              alt="<--"
              style={{ width: '50px', height: '50px', borderRadius: '20%' }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExplanationCard;
