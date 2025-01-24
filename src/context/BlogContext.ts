import React, { createContext, useReducer, ReactNode } from "react";
import { initialState } from "./BlogReducer";
import { BlogState, BlogAction } from "./BlogTypes";

// Context 생성
export const BlogContext = createContext<{
    state: BlogState;
    dispatch: React.Dispatch<BlogAction>;
}>({
    state: initialState,
    dispatch: () => null,
});
const BlogProvider = BlogContext.Provider;

export default BlogProvider;
