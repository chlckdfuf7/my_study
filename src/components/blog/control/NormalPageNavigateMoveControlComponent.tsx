import React from "react";
import ImageButtonComponent from "../../control/ImageButtonComponent";

interface Props {
    isPrev: boolean;
    handleClick: (prev: boolean) => void;
}

const NormalPageNavigateMoveControlComponent: React.FC<Props> = (props) => {
    const { isPrev, handleClick } = props;
    const imgUrl = isPrev ? '/resources/prev.png' : '/resources/next.png';

    return (
        <span>
            <ImageButtonComponent imageUrl={imgUrl} onClick={() => handleClick(isPrev)} altText="좋아요" width={15} height={15} />
        </span>
    )
};

export default NormalPageNavigateMoveControlComponent;