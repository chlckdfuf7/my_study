import React from "react";

export interface ImageButtonProps {
    imageUrl: string;
    onClick: () => void;
    altText?: string;
    width?: number;
    height?: number;
};

const ImageButtonComponent: React.FC<ImageButtonProps> = (props: ImageButtonProps) => {
    return (
        <img 
            src={props.imageUrl}
            alt={props.altText}
            onClick={props.onClick}
            style={{ width: `${props.width}px`, height: `${props.height}px`, cursor: 'pointer'}}
        />
    );
}

export default ImageButtonComponent;