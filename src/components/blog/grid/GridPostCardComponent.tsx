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
import { observer } from "mobx-react-lite";

export interface Props {
    blogPost: BlogPost;
}

const GridPostCardComponent: React.FC<Props> = observer((props) => {
    const { blogPost } = props;
    const { state, dispatch } = useContext(BlogContext);
    const { userStore } = useStore();
    const isSelectedHeart = userStore.getHeartList().includes(blogPost.postId);
    const isBookmark = userStore.getBookmarkList().includes(blogPost.postId);
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

    const handleBookmarkChange = async () => {
        try {
            const response = await fetch(`http://localhost:5000/changeBookmark/${userStore.getUserId()}/${blogPost.postId}/${!isBookmark}`, {
                method: "POST",
            })
            if (response.ok) {
                if (!isBookmark) {
                    userStore.addBookmark(blogPost.postId);
                } else {
                    userStore.deleteBookmark(blogPost.postId);
                }
            } else {
                alert("북마크 실패");
            }
        } catch (error) {
            console.log("북마크 클릭 중 에러: ", error);
            alert("북마크 클릭 중 오류가 발생했습니다.");
        }
    };

    const handleHeartChange = async () => {
        const isIncrease = !isSelectedHeart;
        try {
            const response = await fetch(`http://localhost:5000/heart/${isIncrease}/${blogPost.postId}/${userStore.getUserId()}`, {
                method: "POST",
            });
            
            if (response.ok) {
                const updatedData = await response.json();
                dispatch({ type: "SET_DATA", payload: updatedData });
                if (isIncrease) {
                    userStore.addHeart(blogPost.postId);
                } else {
                    userStore.deleteHeart(blogPost.postId);
                }
            } else {
                alert("좋아요 클릭 실패");
            }
        } catch (error) {
            console.log("좋아요 클릭 중 에러: ", error);
            alert("좋아요 클릭 중 오류가 발생했습니다.");
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/deletePost/${blogPost.postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            });
            
            if (response.ok) {
                const updatedData = await response.json();
                dispatch({ type: "SET_DATA", payload: updatedData });
            } else {
                alert("게시글 삭제 실패");
            }
        } catch (error) {
            console.log("게시글 삭제 중 오류: ", error);
            alert("게시글 삭제 중 오류가 발생했습니다.");
        }
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
            <BookmarkComponent isSelected={isBookmark} handleBookmarkChange={handleBookmarkChange}/>
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
});

export default GridPostCardComponent;