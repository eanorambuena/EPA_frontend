import React, { useState } from "react";
import "./ExplanationCard.css";

const ExplanationCard = (props) => {
  const {color, title, text, images } = props;
  const [indice_imagen, set_indice_imagen] = useState(0);

  const imagen_previa = () => {
    set_indice_imagen(indice_actual => indice_actual === 0 ? images.length - 1 : indice_actual - 1);
  };

  const imagen_siguiente = () => {
    set_indice_imagen(indice_actual => (indice_actual + 1) % images.length);
  };

  return (
    <div style={{
      width: "70%",
      height: "auto",
      marginRight: "20px",
      display: "grid",
      gridTemplateRows: "auto 1fr",
      gridTemplateColumns: "1fr",
      backgroundColor: "white",
      borderRadius: "10px",
      border: "1px solid #E1DFDF",
      padding: "1%",
      gap: "1%",
      boxSizing: "border-box",
      backgroundColor: color
    }}>
      <h2 className='text-xl font-bold' style={{textAlign: "left", fontFamily: "Open Sans" }}>{title}</h2>
      <div style={{display: "grid", gridTemplateColumns: "50% 45%", gap: "20px", height: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", overflowWrap: "break-word", wordWrap: "break-word", overflow: "hidden" }}>
          {/* Texto de la instrucción */}
          <h3 className='text-xl' style={{ width: "90%", fontFamily: "Open Sans" }} dangerouslySetInnerHTML={{ __html: text }}></h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "100%" }}>
          {/* Div para mostrar la imagen actual basada en el índice */}
          {images.length > 0 && (
            <img
              src={images[indice_imagen]}
              alt={`Explanation image  ${indice_imagen + 1}`}
              style={{ width: "100%", maxWidth: "100%", height: "auto", marginBottom: "10px", borderRadius: "5px" }}
            />
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* Div de los botones del carrusel de imágenes */}
            <button style={{ marginRight: "10px", color: "black" }} onClick={imagen_previa}>
              <img
                src="https://w7.pngwing.com/pngs/654/136/png-transparent-arrow-computer-icons-encapsulated-postscript-left-arrow-angle-rectangle-black-thumbnail.png"
                alt="<--"
                style={{ width: "20px", height: "20px", borderRadius: "20%" }}
              />
            </button>
            <button style={{ marginRight: "10px", color: "black" }} onClick={imagen_siguiente}>
              <img
                src="https://toppng.com/uploads/preview/flecha-mirando-para-la-derecha-11550104467jwwuxtd8ip.png"
                alt="<--"
                style={{ width: "20px", height: "20px", borderRadius: "20%" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplanationCard;
