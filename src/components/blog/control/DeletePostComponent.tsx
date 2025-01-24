import React from "react";
import ImageButtonComponent from "../../control/ImageButtonComponent";
import styles from "../../../styles/DeletePostComponent.module.scss";

export interface Props {
    handleDelete: () => void;
}

const DeletePostComponent: React.FC<Props> = (props) => {
    const imgUrl = "/resources/delete.png";
    const { handleDelete } = props;

    return (
        <div className={styles.delete}>
            <ImageButtonComponent imageUrl={imgUrl} onClick={handleDelete} altText="삭제" width={15} height={15} />
        </div>
    );
};

export default DeletePostComponent;