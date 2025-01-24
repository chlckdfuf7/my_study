import React from "react";
import ImageButtonComponent from "../../control/ImageButtonComponent";
import styles from "../../../styles/GridPostCard.module.scss";

export interface Props {
    contents: string;
    handleClose: () => void;
}

const GridPostContentsAreaComponent: React.FC<Props> = (props) => {
    const { contents, handleClose } = props;
    const imgUrl = "/resources/cancel.png"

    return (
        <div className={styles["postCard__contentsArea"]}>
            <div className={styles["postCard__contentsArea__close"]}>
                <ImageButtonComponent imageUrl={imgUrl} onClick={handleClose} altText="닫기" width={15} height={15} />
            </div>
            <div className={styles["postCard__contentsArea__contents"]}>
                {contents}
            </div>
        </div>
    );
};

export default GridPostContentsAreaComponent;