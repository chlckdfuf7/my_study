import React, { useState } from "react";
import styles from "../styles/NavigatorComponent.module.scss";
import FavoritesComponent from "./FavoritesComponent";
import AddFavoriteComponent from "./AddFavoriteComponent";
import NavigatorBarComponent from "./NavigatorBarComponent";

const NavigatorComponent: React.FC = () => {
    const [position, setPosition] = useState({ x: 90, y: 100});
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0});


    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
        document.body.style.userSelect = "none";
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging)    return;
        setPosition({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y
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
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <NavigatorBarComponent onMouseDown = {handleMouseDown} isDragging = {isDragging} />
            <FavoritesComponent />
            <AddFavoriteComponent />
        </div>
    );
}

export default NavigatorComponent;