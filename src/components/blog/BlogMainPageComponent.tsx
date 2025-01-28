import React, { useEffect, useReducer, useState } from "react";
import BlogControlAreaComponent from "./BlogControlAreaComponent";
import BlogContentAreaComponent from "./BlogContentAreaComponent";
import { blogReducer, initialState } from "../../context/BlogReducer";
import BlogProvider from "../../context/BlogContext";

const BlogMainPageComponent: React.FC = () => {
    const [state, dispatch] = useReducer(blogReducer, initialState);
    const [specific, setSpecific] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("http://localhost:5000/posts");
                if (response.ok) {
                    const posts = await response.json();
                    dispatch({ type: "SET_DATA", payload: posts });
                } else {
                    console.error("게시글 데이터를 불러오는 데 실패했습니다.");
                }
            } catch (error) {
                console.error("서버와의 통신 중 오류:", error);
            }
        };

        fetchPosts();
    }, []); // 컴포넌트가 마운트될 때 한 번 실행

    const searchSpecificAuthor = (name: string) => {
        setSpecific(name);
    };

    const createNewPost = () => {
        dispatch({ type: "SET_NEW_POST", payload: true });
    };
    
    return (
        <BlogProvider value={{state, dispatch}}>
            <div className="blog_main_page" style={{ display: "flex", flexDirection: "column"}}>
                <BlogControlAreaComponent searchSpecificAuthor = {searchSpecificAuthor} createNewPost = {createNewPost} />
                <BlogContentAreaComponent specific = {specific} />
            </div>
        </BlogProvider>
    );
}

export default BlogMainPageComponent;