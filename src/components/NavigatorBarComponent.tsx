import React, { useState } from "react";
import styles from "../styles/NavigatorComponent.module.scss";

export interface Props {
    onMouseDown: (e: React.MouseEvent) => void;
    isDragging: boolean
}

const NavigatorBarComponent: React.FC<Props> = (props: Props) => {
    return (
        <div
            className={`${styles.naviBar} ${props.isDragging ? styles.dragging : ""}`}
            onMouseDown={props.onMouseDown}
        >
            즐겨찾기
        </div>
    );
};

export default NavigatorBarComponent;