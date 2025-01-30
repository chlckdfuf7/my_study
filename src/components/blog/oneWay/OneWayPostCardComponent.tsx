import React, { useState } from "react";
import HeartComponent from "../control/HeartComponent";
import BookmarkComponent from "../control/BookmarkComponent";
import DeletePostComponent from "../control/DeletePostComponent";
import useBlogEventListener from "../../../hooks/useBlogEventListener";
import { BlogPost } from "../../../context/BlogTypes";
import useStore from "../../../hooks/useStore";
import OneWayPostCardContentComponent from "./OneWayPostCardContentComponent";
import OneWayPostCardReplyComponent from "./OneWayPostCardReplyComponent";
import styles from "../../../styles/OneWayPostCard.module.scss";

export interface Props {
    blogPost: BlogPost;
}

const OneWayPostCardComponent: React.FC<Props> = (props) => {
    const { blogPost } = props;
    const { handleBookmarkChange, handleHeartChange, handleDelete } = useBlogEventListener(blogPost);
    const { userStore } = useStore();
    const isBookmarkSelected = userStore.getBookmarkList().includes(blogPost.postId);
    const isHeartSelected = userStore.getHeartList().includes(blogPost.postId);
    const isMine = userStore.getUserName() === blogPost.author;

    return (
        <div className={styles.postCard}>
            <div className={styles["postCard__contentArea"]}>
                <OneWayPostCardContentComponent blogPost={blogPost} />
                <BookmarkComponent isSelected={isBookmarkSelected} handleBookmarkChange={handleBookmarkChange} />
                <HeartComponent isSelected={isHeartSelected} handleHeartChange={handleHeartChange }/>
                {isMine ? <DeletePostComponent handleDelete={handleDelete} /> : <></>}
            </div>
            <div className={styles["postCard__replyArea"]}>
                <OneWayPostCardReplyComponent blogPost={blogPost} />
            </div>
        </div>
    );
};

export default OneWayPostCardComponent;