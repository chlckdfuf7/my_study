import React, { useContext, useEffect, useMemo, useState } from "react";
import { BlogContext } from "../../context/BlogContext";
import useStore from "../../hooks/useStore";
import GridPostCardComponent from "./grid/GridPostCardComponent";
import styles from "../../styles/BlogContentArea.module.scss";
import classNames from "classnames";
import BlogNewPostPageComponent from "./BlogNewPostPageComponent";

export interface Props {
    specific: string;
}

const BlogContentAreaComponent: React.FC<Props> = (props) => {
    const { state } = useContext(BlogContext);
    const { userStore } = useStore();
    const myName = userStore.getUserName();
    const { specific } = props;

    const filterdData = useMemo(() => {
        switch (state.filter) {
            case "전체 게시글":
                return state.data;
            case "내 게시글":
                return state.data.filter((item) => (item.author === myName));
            case "스크랩 게시글":
                return state.data.filter((item) => (item.bookmark));
            case "특정 작성자":
                return state.data.filter((item) => (item.author === specific));
            default:
                return state.data;
        }
    }, [state.data, state.filter]);

    const renderBlogPosts = useMemo(() => {
        // 현재는 격자식만 구현했지만 추후에는 수정 필요.
        // state.display에 따라 다른 components를 return하도록 변경필요
        return filterdData.map((item) => <GridPostCardComponent blogPost={item}/>)
    }, [filterdData, state.display]);

    const displayClass = classNames(styles.blog_content_area, {
        [styles["blog_content_area--grid"]]: !state.newPost && state.display === "격자식",
        [styles["blog_content_area--one"]]: !state.newPost && state.display === "일자식",
        [styles["blog_content_area--narmal"]]: !state.newPost && state.display === "일반식",
        [styles["blog_content_area--newPost"]]: state.newPost,
    });

    return (
        <div className={displayClass}>
            {state.newPost ? 
                <BlogNewPostPageComponent /> :
                renderBlogPosts
            }
        </div>
    );
};

export default BlogContentAreaComponent;