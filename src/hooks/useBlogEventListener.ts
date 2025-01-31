import { useCallback, useContext, useState } from "react";
import { BlogPost } from "../context/BlogTypes";
import { BlogContext } from "../context/BlogContext";
import useStore from "./useStore";

const useBlogEventListener = (blogPost: BlogPost) => {
    const { state, dispatch } = useContext(BlogContext);
    const { userStore } = useStore();

    // 댓글 관리를 위한 state
    const [comment, setComment] = useState<string>("");

    // 북마크 변경 함수
    const handleBookmarkChange = useCallback(async () => {
        const isBookmark = userStore.getBookmarkList().includes(blogPost.postId);
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
    }, [blogPost.postId, userStore.getUserId(), userStore.getBookmarkList()]);

    // 좋아요 변경 함수
    const handleHeartChange = useCallback(async () => {
        const isIncrease = !userStore.getHeartList().includes(blogPost.postId);
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
    }, [blogPost.postId, userStore.getUserId(), userStore.getHeartList(), dispatch]);

    const handleDelete = useCallback(async () => {
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
                setTimeout(() => {
                    dispatch({ type: "SET_DATA", payload: updatedData });
                }, 0);
            } else {
                alert("게시글 삭제 실패");
            }
        } catch (error) {
            console.log("게시글 삭제 중 오류: ", error);
            alert("게시글 삭제 중 오류가 발생했습니다.");
        }
    }, [blogPost.postId, dispatch]);

    const handleRegisterReply = useCallback(async () => {
        try {
            // 서버로 POST 요청을 보낼 데이터 구성
            const newReply = { author: userStore.getUserName(), content: comment };
            const response = await fetch(`http://localhost:5000/posts/${blogPost.postId}/replies`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newReply),
            });
    
            if (response.ok) {
                // 서버에서 업데이트된 댓글 리스트를 가져옴
                const updatedPost = await response.json();
    
                setTimeout(() => {
                    // 상태 업데이트
                    const updateData = state.data.map((item) =>
                        item.postId === updatedPost.postId ? updatedPost : item
                    );
                    dispatch({ type: "SET_DATA", payload: updateData });
        
                    // 댓글 입력란 초기화
                    setComment("");
                }, 0);
            } else {
                alert("댓글 등록에 실패했습니다.");
            }
        } catch (error) {
            console.error("댓글 등록 중 오류:", error);
            alert("댓글 등록 중 오류가 발생했습니다.");
        }
    }, [blogPost.postId, userStore.getUserName(), dispatch, state.data, comment]);

    const handleReplyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    const handleReplyInputKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleRegisterReply();
        }
    }, [handleRegisterReply]);

    return { 
        handleBookmarkChange, 
        handleHeartChange, 
        handleDelete, 
        handleRegisterReply, 
        handleReplyInputChange, 
        handleReplyInputKeyDown, 
        comment, 
        setComment 
    };
};

export default useBlogEventListener;