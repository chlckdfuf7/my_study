import React from "react";
import ImageButtonComponent from "../../control/ImageButtonComponent";
import styles from "../../../styles/HeartComponent.module.scss";

export interface Props {
    isSelected: boolean;
    handleHeartChange: () => void;
}

const HeartComponent: React.FC<Props> = (props) => {
    const { isSelected, handleHeartChange } = props;
    const imgUrl = isSelected ? '/resources/selectedHeart.png' : '/resources/heart.png';

    return (
        <div className={styles.heart}>
            <ImageButtonComponent imageUrl={imgUrl} onClick={handleHeartChange} altText="좋아요" width={15} height={15} />
        </div>
    );
};

export default HeartComponent;