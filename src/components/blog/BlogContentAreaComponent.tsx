import React, { useContext, useEffect, useMemo, useState } from "react";
import { BlogContext } from "../../context/BlogContext";
import useStore from "../../hooks/useStore";
import GridPostCardComponent from "./grid/GridPostCardComponent";
import styles from "../../styles/BlogContentArea.module.scss";
import classNames from "classnames";
import BlogNewPostPageComponent from "./BlogNewPostPageComponent";
import OneWayPostCardComponent from "./oneWay/OneWayPostCardComponent";
import NormalPostListComponent from "./normal/NormalPostListComponent";
import NormalPostComponent from "./normal/NormalPostComponent";

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
                return state.data.filter((item) => userStore.getBookmarkList().includes(item.postId));
            case "좋아요 게시글":
                return state.data.filter((item) => userStore.getHeartList().includes(item.postId));
            case "특정 작성자":
                return state.data.filter((item) => (item.author === specific));
            default:
                return state.data;
        }
    }, [state.data, state.filter, specific]);

    const sortedData = useMemo(() => {
        switch (state.sortType) {
            case "최신순":
                return [...filterdData].sort((a, b) => b.postId - a.postId);
            case "좋아요순":
                return [...filterdData].sort((a, b) => b.hearts - a.hearts);
            case "댓글순":
                return [...filterdData].sort((a, b) => b.reply.length - a.reply.length);
            default:
                return [...filterdData].sort((a, b) => b.postId - a.postId);
        }
    }, [filterdData, state.sortType]);

    const renderBlogPosts = useMemo(() => {
        switch (state.display) {
            case "격자식":
                return sortedData.map((item) => <GridPostCardComponent blogPost={item}/>);
            case "일자식":
                return sortedData.map((item) => <OneWayPostCardComponent blogPost={item}/>);
            case "일반식":
                return <NormalPostListComponent blogPosts={sortedData} />
            default:
                return sortedData.map((item) => <GridPostCardComponent blogPost={item}/>);
        }
    }, [sortedData, state.display]);

    const displayClass = classNames(styles.blog_content_area, {
        [styles["blog_content_area--grid"]]: !state.newPost && state.display === "격자식",
        [styles["blog_content_area--oneWay"]]: !state.newPost && state.display === "일자식",
        [styles["blog_content_area--narmal"]]: !state.newPost && state.display === "일반식",
        [styles["blog_content_area--newPost"]]: state.newPost,
    });

    return (
        <div className={displayClass}>
            {state.newPost ? 
                <BlogNewPostPageComponent /> :
                state.normalPost !== -1 ? 
                    <NormalPostComponent blogPost={sortedData.find((item) => item.postId === state.normalPost)} /> :
                    renderBlogPosts
            }
        </div>
    );
};

export default BlogContentAreaComponent;