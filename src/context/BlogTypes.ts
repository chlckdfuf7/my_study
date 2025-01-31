export interface Reply {
    author: string;
    content: string;
}

export interface BlogPost {
    postId: number;
    author: string;
    title: string;
    img: string;
    hearts: number;
    contents: string;
    bookmark: boolean;
    reply: Reply[];
}

export interface BlogState {
    filter: string;
    display: string;
    sortType: string;
    data: BlogPost[];
    newPost: boolean;
    postNum: number;
    normalPost: number;
}

// 액션 타입
export type BlogAction =
    | { type: "SET_FILTER"; payload: string }
    | { type: "SET_DISPLAY"; payload: string }
    | { type: "SET_SORT_TYPE"; payload: string }
    | { type: "SET_DATA"; payload: BlogPost[] }
    | { type: "SET_NEW_POST"; payload: boolean }
    | { type: "SET_POST_NUM"; payload: number }
    | { type: "SET_NORMAL_POST"; payload: number };
