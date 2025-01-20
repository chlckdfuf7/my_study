import React, { useState } from "react";
import styles from "../styles/NavigatorComponent.module.scss";

const NavigatorComponent = () => {
    const [position, setPosition] = useState({ x: 90, y: 100});
    const [isDragging, setIsDragging] = useState(false);
    
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        document.body.style.userSelect = "none";
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging)    return;
        setPosition({
            x: e.clientX - 50,
            y: e.clientY - 50
        })
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        setIsDragging(false);
        document.body.style.userSelect = "auto";
    };

    return (
        <div 
            className={`${styles.navi} ${isDragging ? styles.dragging : ""}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            navigator
        </div>
    );
}

export default NavigatorComponent;