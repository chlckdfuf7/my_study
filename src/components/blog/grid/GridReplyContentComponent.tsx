import React, { useContext, useState } from "react";
import { BlogPost, Reply } from "../../../context/BlogTypes";
import ImageButtonComponent from "../../control/ImageButtonComponent";
import ReplyComponent from "../control/ReplyComponent";
import styles from "../../../styles/GridPostCard.module.scss";
import useBlogEventListener from "../../../hooks/useBlogEventListener";

export interface Props {
    blogPost: BlogPost;
    handleClose: () => void;
}

const GridReplyContentComponent: React.FC<Props> = (props) => {
    const { blogPost, handleClose } = props;
    const imgUrl = "/resources/addReply.png";
    const cancelImgUrl = "/resources/cancel.png"
    const replies = blogPost.reply;
    const { 
        handleRegisterReply, 
        handleReplyInputChange, 
        handleReplyInputKeyDown, 
        comment 
    } = useBlogEventListener(blogPost);

    const renderReplies = () => {
        return replies?.map((item) => <ReplyComponent reply={item} />);
    };

    return (
        <div className={styles["postCard__replyBox"]}>
            <div className={styles["postCard__replyBox__list"]}>
                { renderReplies() }
            </div>
            <div>
                <input className={styles["postCard__replyBox__input"]} type="text" onChange={handleReplyInputChange} onKeyDown={handleReplyInputKeyDown} placeholder="댓글을 입력해 주세요." value={comment}/>
                <ImageButtonComponent imageUrl={imgUrl} onClick={handleRegisterReply} altText="달기" width={15} height={15} />
            </div>
            <div className={styles["postCard__replyBox__close"]}>
                <ImageButtonComponent imageUrl={cancelImgUrl} onClick={handleClose} altText="닫기" width={15} height={15} />
            </div>
        </div>
    );
};

export default GridReplyContentComponent;