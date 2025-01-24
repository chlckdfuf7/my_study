import React, { useContext, useState } from "react";
import { BlogPost, Reply } from "../../../context/BlogTypes";
import ImageButtonComponent from "../../control/ImageButtonComponent";
import ReplyComponent from "../control/ReplyComponent";
import { BlogContext } from "../../../context/BlogContext";
import useStore from "../../../hooks/useStore";
import styles from "../../../styles/GridPostCard.module.scss";

export interface Props {
    blogPost: BlogPost;
    handleClose: () => void;
}

const GridReplyContentComponent: React.FC<Props> = (props) => {
    const { blogPost, handleClose } = props;
    const imgUrl = "/resources/addReply.png";
    const cancelImgUrl = "/resources/cancel.png"
    const replies = blogPost.reply;
    const { state, dispatch } = useContext(BlogContext);
    const [comment, setComment] = useState("");
    const { userStore } = useStore();

    const renderReplies = () => {
        return replies.map((item) => <ReplyComponent reply={item} />);
    };

    const handleRegisterReply = () => {
        const updateReplies = [ ...blogPost.reply, { author: userStore.getUserName(), content: comment }];
        const updateData = state.data.map((item) => item === blogPost ? { ...item, reply: updateReplies } : item);
        dispatch({ type: "SET_DATA", payload: updateData} );
        setComment("");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleRegisterReply();
        }
    }

    return (
        <div className={styles["postCard__replyBox"]}>
            <div className={styles["postCard__replyBox__list"]}>
                { renderReplies() }
            </div>
            <div>
                <input className={styles["postCard__replyBox__input"]} type="text" onChange={handleChange} onKeyDown={handleKeyDown} placeholder="댓글을 입력해 주세요." value={comment}/>
                <ImageButtonComponent imageUrl={imgUrl} onClick={handleRegisterReply} altText="달기" width={15} height={15} />
            </div>
            <div className={styles["postCard__replyBox__close"]}>
                <ImageButtonComponent imageUrl={cancelImgUrl} onClick={handleClose} altText="닫기" width={15} height={15} />
            </div>
        </div>
    );
};

export default GridReplyContentComponent;