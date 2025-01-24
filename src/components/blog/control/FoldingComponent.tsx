import React from "react";
import ImageButtonComponent from "../../control/ImageButtonComponent";
import styles from "../../../styles/FoldingComponent.module.scss";

export interface Props {
    handleFoldingChange: () => void;
}

const FoldingComponent: React.FC<Props> = (props) => {
    const imgUrl = "/resources/folding.png";
    const { handleFoldingChange } = props;
    
    return (
        <div className={styles.folding}>
            <ImageButtonComponent imageUrl={imgUrl} onClick={handleFoldingChange} altText="내용보기" width={15} height={15} />
        </div>
    );
};

export default FoldingComponent;