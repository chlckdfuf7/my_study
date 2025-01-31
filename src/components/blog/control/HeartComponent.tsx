import React, { useContext } from "react";
import ImageButtonComponent from "../../control/ImageButtonComponent";
import styles from "../../../styles/HeartComponent.module.scss";
import { BlogContext } from "../../../context/BlogContext";

export interface Props {
    isSelected: boolean;
    handleHeartChange: () => void;
    width?: number;
    height?: number;
}

const HeartComponent: React.FC<Props> = (props) => {
    const { isSelected, handleHeartChange, width, height } = props;
    const imgUrl = isSelected ? '/resources/selectedHeart.png' : '/resources/heart.png';
    const { state } = useContext(BlogContext);

    const heartClass = 
        state.display === "일자식" ? styles.oneWay :
        state.display === "격자식" ? styles.grid :
        state.display === "일반식" ? styles.normal :
        styles.grid;

    return (
        <div className={heartClass}>
            <ImageButtonComponent imageUrl={imgUrl} onClick={handleHeartChange} altText="좋아요" width={width ?? 15} height={height ?? 15} />
        </div>
    );
};

export default HeartComponent;