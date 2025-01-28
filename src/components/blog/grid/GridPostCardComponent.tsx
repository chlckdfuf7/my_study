import React, { useContext, useEffect, useRef, useState } from "react";
import { BlogPost } from "../../../context/BlogTypes";
import BookmarkComponent from "../control/BookmarkComponent";
import { BlogContext } from "../../../context/BlogContext";
import HeartComponent from "../control/HeartComponent";
import useStore from "../../../hooks/useStore";
import DeletePostComponent from "../control/DeletePostComponent";
import FoldingComponent from "../control/FoldingComponent";
import ReplyButtonComponent from "../control/ReplyButtonComponent";
import GridPostContentsAreaComponent from "./GridPostContentsAreaComponent";
import GridReplyContentComponent from "./GridReplyContentComponent";
import styles from "../../../styles/GridPostCard.module.scss";
import classNames from "classnames";

export interface Props {
    blogPost: BlogPost;
}

const GridPostCardComponent: React.FC<Props> = (props) => {
    const { blogPost } = props;
    const { state, dispatch } = useContext(BlogContext);
    const { userStore } = useStore();
    const isSelectedHeart = userStore.getHeartList().includes(blogPost.postId);
    const isMine = blogPost.author === userStore.getUserName();
    const [isFolding, setIsFolding] = useState(true);
    const [isReply, setIsReply] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [openLeft, setOpenLeft] = useState(false);

    useEffect(() => {
        if (cardRef.current) {
            const cardRect = cardRef.current.getBoundingClientRect();
            const parentRect = cardRef.current.parentElement?.getBoundingClientRect();

            if (parentRect && cardRect.right + 280 > parentRect.right) {
                setOpenLeft(true);
            } else {
                setOpenLeft(false);
            }
        }
    }, [state.data]);

    const handleBookmarkChange = () => {
        const updateData = state.data.map((item) => item === blogPost ? { ...item, bookmark: !blogPost.bookmark } : item);
        dispatch({ type: "SET_DATA", payload: updateData });
    };

    const handleHeartChange = () => {
        const isIncrease = !isSelectedHeart;
        const diff = isIncrease ? 1 : -1;
        const updateData = state.data.map((item) => item === blogPost ? { ...item, hearts: blogPost.hearts + diff } : item);
        dispatch({ type: "SET_DATA", payload: updateData });
        if (isIncrease) {
            userStore.addHeart(blogPost.postId);
        } else {
            userStore.deleteHeart(blogPost.postId);
        }
    };

    const handleDelete = () => {
        const updateData = state.data.filter((item) => item !== blogPost);
        dispatch({ type: "SET_DATA", payload: updateData});
    };

    const handleFoldingChange = () => {
        setIsFolding(!isFolding);
    };

    const handleReplyChange = () => {
        setIsReply(!isReply);
    }

    return (
        <div className={styles.postCard} ref={cardRef}>
            <div className={styles["postCard__imgBox"]}>
                <img className={styles["postCard__imgBox__img"]} src={`http://localhost:5000/resources/blogPost/${blogPost.img}`} alt={`${blogPost.img}`} />
            </div>
            <div className={styles["postCard__author"]}>{blogPost.author}</div>
            <div className={styles["postCard__title"]}>{blogPost.title}</div>
            <BookmarkComponent isSelected={blogPost.bookmark} handleBookmarkChange={handleBookmarkChange}/>
            <HeartComponent isSelected={isSelectedHeart} handleHeartChange={handleHeartChange} />
            {isMine ? <DeletePostComponent handleDelete={handleDelete} /> : <></>}
            <FoldingComponent handleFoldingChange={handleFoldingChange} />
            <ReplyButtonComponent handleReplyChange={handleReplyChange} />
            <div 
                className={classNames(styles["postCard__replyContents"], {
                    [styles["postCard__replyContents--show"]]: isReply,
                    [styles["postCard__replyContents--right"]]: !openLeft,
                    [styles["postCard__replyContents--left"]]: openLeft
                })}
            >
                <GridReplyContentComponent blogPost={blogPost} handleClose={handleReplyChange}/>
            </div>
            <div className={classNames(styles["postCard__contents"], {
                [styles["postCard__contents--show"]]: !isFolding
            })}>
                <GridPostContentsAreaComponent contents={blogPost.contents} handleClose={handleFoldingChange}/>
            </div>
        </div>
    );
};

export default GridPostCardComponent;