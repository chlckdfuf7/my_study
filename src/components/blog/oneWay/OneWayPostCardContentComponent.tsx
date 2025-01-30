import React from "react";
import { BlogPost } from "../../../context/BlogTypes";
import styles from "../../../styles/OneWayPostCard.module.scss";

export interface Props {
    blogPost: BlogPost;
}

const OneWayPostCardContentComponent: React.FC<Props> = (props) => {
    const { blogPost } = props;

    return(
        <>
            <div className={styles["postCard__contentArea__author"]}>{blogPost.author}</div>
            <div className={styles["postCard__contentArea__title"]}>{blogPost.title}</div>            
            <div className={styles["postCard__contentArea__imgBox"]}>
                <img className={styles["postCard__contentArea__imgBox__img"]} src={`http://localhost:5000/resources/blogPost/${blogPost.img}`} alt={`${blogPost.img}`} />
            </div>
            <div className={styles["postCard__contentArea__content"]}>{blogPost.contents}</div>
        </>
    );
};

export default OneWayPostCardContentComponent;