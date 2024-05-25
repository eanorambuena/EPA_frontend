import { useState } from "react";
import "./ZoomImage.css";

const ZoomImage = ({ src }) => {
    const [zoom, setZoom] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    
    function handleMouseMove(e) {
        setPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }
    
    return (
        <div
        className="zoom-image"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        >
        <img
            src={src}
            alt="gallery"
            style={{
            transform: zoom ? "scale(2)" : "scale(1)",
            transformOrigin: `${position.x}px ${position.y}px`,
            }}
        />
        </div>
    );
};

export default ZoomImage;