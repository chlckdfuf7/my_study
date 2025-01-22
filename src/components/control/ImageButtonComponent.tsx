import React from "react";

export interface ImageButtonProps {
    imageUrl: string;
    onClick(val?: any): void;
    altText?: string;
    width?: number;
    height?: number;
};

const ImageButtonComponent: React.FC<ImageButtonProps> = (props: ImageButtonProps) => {
    return (
        <img 
            src={props.imageUrl}
            alt={props.altText}
            onClick={()=>props.onClick(props.altText)}
            style={{ width: `${props.width}px`, height: `${props.height}px`, cursor: 'pointer'}}
        />
    );
}

export default ImageButtonComponent;