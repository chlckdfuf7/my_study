import React from "react";
import { BlogPost, Reply } from "../../../context/BlogTypes";
import ReplyComponent from "../control/ReplyComponent";
import ImageButtonComponent from "../../control/ImageButtonComponent";
import useBlogEventListener from "../../../hooks/useBlogEventListener";
import styles from "../../../styles/OneWayPostCard.module.scss";

export interface Props {
    blogPost: BlogPost;
}

const OneWayPostCardReplyComponent: React.FC<Props> = (props) => {
    const { blogPost } = props;
    const renderReplies = () => {
        return blogPost.reply.map((item) => <ReplyComponent reply={item} />);
    };
    const imgUrl = "/resources/addReply.png";
    const { 
        handleRegisterReply, 
        handleReplyInputChange, 
        handleReplyInputKeyDown, 
        comment 
    } = useBlogEventListener(blogPost);

    return (
        <>
            <div className={styles["postCard__contentArea__replies"]}>
                {renderReplies()}
            </div>
            <div>
                <input className={styles["postCard__contentArea__input"]} type="text" onChange={handleReplyInputChange} onKeyDown={handleReplyInputKeyDown} placeholder="댓글을 입력해 주세요." value={comment}/>
                <ImageButtonComponent imageUrl={imgUrl} onClick={handleRegisterReply} altText="달기" width={15} height={15} />
            </div>
        </>
    );
};

export default OneWayPostCardReplyComponent;