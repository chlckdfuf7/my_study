import React, { useContext, useMemo } from "react";
import { BlogPost } from "../../../context/BlogTypes";
import HeartComponent from "../control/HeartComponent";
import BookmarkComponent from "../control/BookmarkComponent";
import useStore from "../../../hooks/useStore";
import DeletePostComponent from "../control/DeletePostComponent";
import useBlogEventListener from "../../../hooks/useBlogEventListener";
import { BlogContext } from "../../../context/BlogContext";
import styles from "../../../styles/NormalPost.module.scss";
import { observer } from "mobx-react-lite";

export interface Props {
    blogPost?: BlogPost;
}

const NormalPostListItemComponent: React.FC<Props> = (props) => {
    const { blogPost } = props;
    const { userStore } = useStore();
    const { dispatch } = useContext(BlogContext);
    const isMine = blogPost?.author === userStore.getUserName();
    const { handleBookmarkChange, handleHeartChange, handleDelete } = useBlogEventListener(blogPost ?? {} as BlogPost);
    
    const controlItems = () => {
        if (blogPost) {
            const isSelectedHeart = userStore.getHeartList().includes(blogPost.postId);
            const isSelectedBookmark = userStore.getBookmarkList().includes(blogPost.postId);
            return (
                <div className={styles.control_container}>
                    <HeartComponent isSelected={isSelectedHeart} handleHeartChange={handleHeartChange} width={20} height={20} />
                    <BookmarkComponent isSelected={isSelectedBookmark} handleBookmarkChange={handleBookmarkChange} width={20} height={20} />
                    { isMine ? <DeletePostComponent handleDelete={handleDelete} width={20} height={20} /> : <></> }
                </div>
            );
        } else {
            return <></>;
        }
    };

    const handleClick = () => {
        if (!blogPost)  return;
        dispatch({ type: "SET_NORMAL_POST", payload: blogPost.postId });
    };

    return (
        <>
            <tr>
                <td><span onClick={handleClick}>{ blogPost ? blogPost.title : "" }</span></td>
                <td>{ blogPost ? blogPost.author : "" }</td>
                <td>{ blogPost ? blogPost.hearts : "" }</td>
                <td>
                    { controlItems() }
                </td>
            </tr>
        </>
    );
};

export default observer(NormalPostListItemComponent);