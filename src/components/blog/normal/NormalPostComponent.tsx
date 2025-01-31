import React from "react";
import { BlogPost } from "../../../context/BlogTypes";
import useStore from "../../../hooks/useStore";
import HeartComponent from "../control/HeartComponent";
import BookmarkComponent from "../control/BookmarkComponent";
import DeletePostComponent from "../control/DeletePostComponent";
import useBlogEventListener from "../../../hooks/useBlogEventListener";
import ImageButtonComponent from "../../control/ImageButtonComponent";
import ReplyComponent from "../control/ReplyComponent";
import styles from "../../../styles/NormalPost.module.scss";

export interface Props {
    blogPost?: BlogPost;
}

const NormalPostComponent: React.FC<Props> = (props) => {
    const { blogPost } = props;
    const { userStore } = useStore();
    const isMine = blogPost?.author === userStore.getUserName();
    const isSelectedHeart = blogPost ? userStore.getHeartList().includes(blogPost.postId) : false;
    const isSelectedBookmark = blogPost ? userStore.getBookmarkList().includes(blogPost.postId) : false;
    const imgUrl = "/resources/addReply.png";
    
    const renderReplies = () => {
        return blogPost && blogPost.reply.length > 0 ? blogPost.reply.map((item) => <ReplyComponent reply={item} />) : <>댓글이 없습니다. 댓글을 달아주세요.</>;
    };

    const { 
        handleBookmarkChange, 
        handleHeartChange, 
        handleDelete, 
        handleRegisterReply, 
        handleReplyInputChange, 
        handleReplyInputKeyDown, 
        comment, 
    } = useBlogEventListener(blogPost ?? {} as BlogPost);

    return (
        <div>
            {blogPost ? 
                <div className={styles.post_container}>
                    <div className={styles.author}>{blogPost.author}</div>
                    <div className={styles.title}>{blogPost.title}</div>
                    <div className={styles.img_box}>
                        <img className={styles.img} src={`http://localhost:5000/resources/blogPost/${blogPost.img}`} alt={`${blogPost.img}`} />
                    </div>
                    <div className={styles.content}>{blogPost.contents}</div>
                    <div className={styles.control_container}>
                        <HeartComponent isSelected={isSelectedHeart} handleHeartChange={handleHeartChange} width={20} height={20} />
                        <BookmarkComponent isSelected={isSelectedBookmark} handleBookmarkChange={handleBookmarkChange} width={20} height={20} />
                        {isMine ? <DeletePostComponent handleDelete={handleDelete} width={20} height={20} /> : <></>}
                    </div>
                    <div className={styles.reply_container}>
                        <div className={styles.reply_contents}>
                            { renderReplies() }
                        </div>
                        <div className={styles.reply_register}>
                            <input className={styles.input} type="text" onChange={handleReplyInputChange} onKeyDown={handleReplyInputKeyDown} placeholder="댓글을 입력해 주세요." value={comment}/>
                            <ImageButtonComponent imageUrl={imgUrl} onClick={handleRegisterReply} altText="달기" width={15} height={15} />
                        </div>
                    </div>
                </div> :
                <>유효하지 않은 게시글입니다.</>
            }
        </div>
    );
};

export default NormalPostComponent;