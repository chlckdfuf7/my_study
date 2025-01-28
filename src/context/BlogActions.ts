import { BlogPost, BlogAction } from "./BlogTypes";

// 액션 생성자 함수
export const setFilter = (filter: string): BlogAction => ({
    type: "SET_FILTER",
    payload: filter,
});

export const setDisplay = (display: string): BlogAction => ({
    type: "SET_DISPLAY",
    payload: display,
});

export const setSortType = (sortType: string): BlogAction => ({
    type: "SET_SORT_TYPE",
    payload: sortType,
});

export const setData = (data: BlogPost[]): BlogAction => ({
    type: "SET_DATA",
    payload: data,
});

export const setNewPost = (isNew: boolean): BlogAction => ({
    type: "SET_NEW_POST",
    payload: isNew,
});