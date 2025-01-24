import React from "react";
import ImageButtonComponent from "../../control/ImageButtonComponent";
import styles from "../../../styles/ReplyButtonComponent.module.scss";

export interface Props {
    handleReplyChange: () => void;
}

const ReplyButtonComponent: React.FC<Props> = (props) => {
    const imgUrl = "/resources/reply.png";
    const { handleReplyChange } = props
    return (
        <div className={styles.reply}>
            <ImageButtonComponent imageUrl={imgUrl} onClick={handleReplyChange} altText="댓글" width={15} height={15} />
        </div>
    );
};

export default ReplyButtonComponent;