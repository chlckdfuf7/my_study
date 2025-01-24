import React, { useContext, useReducer, useState } from "react";
import BlogControlAreaComponent from "./BlogControlAreaComponent";
import BlogContentAreaComponent from "./BlogContentAreaComponent";
import { blogReducer, initialState } from "../../context/BlogReducer";
import BlogProvider from "../../context/BlogContext";

const BlogMainPageComponent: React.FC = () => {
    const [state, dispatch] = useReducer(blogReducer, initialState);
    const [specific, setSpecific] = useState("");

    const searchSpecificAuthor = (name: string) => {
        setSpecific(name);
    }
    
    return (
        <BlogProvider value={{state, dispatch}}>
            <div className="blog_main_page">
                <BlogControlAreaComponent searchSpecificAuthor = {searchSpecificAuthor}/>
                <BlogContentAreaComponent specific = {specific} />
            </div>
        </BlogProvider>
    );
}

export default BlogMainPageComponent;