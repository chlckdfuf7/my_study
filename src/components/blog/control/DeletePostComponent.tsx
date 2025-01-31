import React, { useContext } from "react";
import ImageButtonComponent from "../../control/ImageButtonComponent";
import styles from "../../../styles/DeletePostComponent.module.scss";
import { BlogContext } from "../../../context/BlogContext";

export interface Props {
    handleDelete: () => void;
    width?: number;
    height?: number;
}

const DeletePostComponent: React.FC<Props> = (props) => {
    const imgUrl = "/resources/delete.png";
    const { handleDelete, width, height } = props;
    const { state } = useContext(BlogContext);

    const deleteClass = 
        state.display === "일자식" ? styles.oneWay :
        state.display === "격자식" ? styles.grid :
        state.display === "일반식" ? styles.normal :
        styles.grid;

    return (
        <div className={deleteClass}>
            <ImageButtonComponent imageUrl={imgUrl} onClick={handleDelete} altText="삭제" width={width ?? 15} height={height ?? 15} />
        </div>
    );
};

export default DeletePostComponent;