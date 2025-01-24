import { BlogState, BlogAction, BlogPost } from "./BlogTypes";
import data from "../tempData/postData.json";

export const initialState: BlogState = {
    filter: "전체 게시글",
    display: "격자식",
    sortType: "최신순",
    data: data as BlogPost[],
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
        default:
            return state;
    }
};
