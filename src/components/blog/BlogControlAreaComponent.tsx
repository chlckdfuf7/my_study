import React, { useContext, useMemo, useState } from "react";
import SelectBoxComponent from "../control/SelectBoxComponent";
import { BlogContext } from "../../context/BlogContext";
import SpecificAuthorSearchComponent from "./control/SpecificAuthorSearchComponent";
import styles from "../../styles/BlogControlArea.module.scss";

export interface Props {
    searchSpecificAuthor: (name: string) => void;
    createNewPost: () => void;
}

const BlogControlAreaComponent: React.FC<Props> = (props) => {
    const filterList = ['전체 게시글', '내 게시글', '스크랩 게시글', '좋아요 게시글', '특정 작성자'];
    const displayMode = ['격자식', '일자식', '일반식'];
    const sortTypes = ['최신순', '좋아요순', '댓글순'];
    const postNums = ["5", "10", "15"];
    const { state, dispatch } = useContext(BlogContext);
    const { searchSpecificAuthor, createNewPost } = props;
    
    const onFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: "SET_FILTER", payload: e.target.value} );
    };

    const onDisplayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: "SET_DISPLAY", payload: e.target.value} );
    };

    const onSortTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: "SET_SORT_TYPE", payload: e.target.value} );
    };

    const onPostNumsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: "SET_POST_NUM", payload: parseInt(e.target.value) });
    };

    const handleButtonClick = () =>{
        dispatch({ type: "SET_NORMAL_POST", payload: -1 });
    };

    const renderSpecificAuthor = () => {
        return (
            <SpecificAuthorSearchComponent onClick={searchSpecificAuthor}/>
        );
    };

    const controlArea = useMemo(() => {
        if (state.newPost) {
            return (
                <div style={{ alignSelf: "center", fontSize: "50px", fontWeight:"bold", borderBottom:"1px dashed", marginBottom:"10px"}}>새 글 쓰기</div>
            );
        } else if (state.normalPost !== -1) {
            return (
                <button style={{width:"200px", marginLeft:"10px", marginTop:"5px"}} type="button" onClick={handleButtonClick}>돌아가기</button>
            );
        } else {
            return (
                <div className="blog_control_area">
                    <div className={styles.container}>
                        <div className={styles.select_group}>
                            <SelectBoxComponent list={filterList} className="blog_filter" onChange={(e) => onFilterChange(e)} />
                            <SelectBoxComponent list={displayMode} className="blog_display" onChange={(e) => onDisplayChange(e)} />
                            <SelectBoxComponent list={sortTypes} className="blog_sort" onChange={(e) => onSortTypeChange(e)} />
                            {state.display === "일반식" ? 
                                <SelectBoxComponent list={postNums} className="blog_postNum" onChange={(e) => onPostNumsChange(e)} /> :
                                <></>
                            }
                        </div>
                        <button className={styles.write_button} onClick={createNewPost}>글쓰기</button>
                    </div>
                    {state.filter === "특정 작성자" ? renderSpecificAuthor() : <></>}            
                </div>
            );
        }
    }, [state.newPost, state.filter, state.display, state.normalPost]);

    return (
        <>
            {controlArea}
        </>
    );
};

export default BlogControlAreaComponent;