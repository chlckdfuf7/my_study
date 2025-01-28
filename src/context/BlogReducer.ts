import { BlogState, BlogAction, BlogPost } from "./BlogTypes";

export const initialState: BlogState = {
    filter: "전체 게시글",
    display: "격자식",
    sortType: "최신순",
    data: [],
    newPost: false,
};

export const blogReducer = (state: BlogState, action: BlogAction): BlogState => {
    switch (action.type) {
        case "SET_FILTER":
            return { ...state, filter: action.payload };
        case "SET_DISPLAY":
            return { ...state, display: action.payload };
        case "SET_SORT_TYPE":
            return { ...state, sortType: action.payload };
        case "SET_DATA":
            return { ...state, data: action.payload };
        case "SET_NEW_POST":
            return { ...state, newPost: action.payload};
        default:
            return state;
    }
};
