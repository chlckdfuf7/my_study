import React, { JSX, useContext, useMemo, useState } from "react";
import { BlogPost } from "../../../context/BlogTypes";
import { BlogContext } from "../../../context/BlogContext";
import NormalPostListItemComponent from "./NormalPostListItemComponent";
import NormalPageNavigateControlComponent from "../control/NormalPageNavigateControlComponent";
import NormalPageNavigateMoveControlComponent from "../control/NormalPageNavigateMoveControlComponent";
import styles from "../../../styles/NormalPost.module.scss";

export interface Props {
    blogPosts: BlogPost[];
}

const NormalPostListComponent: React.FC<Props> = (props) => {
    const { blogPosts } = props;
    const blogLen = blogPosts.length;
    const { state } = useContext(BlogContext);
    const postNums = state.postNum;
    const [curPage, setCurPage] = useState<number>(1);
    const curPageGroup = useMemo(() => {
        return Math.ceil(curPage / postNums);
    }, [curPage]);

    const renderPostsList: JSX.Element[] = useMemo(() => {
        const renderItmes: JSX.Element[] = [];
        const startIndex = (curPage - 1) * postNums;
        for (let i = 0; i < postNums; i++) {
            if (i + startIndex >= blogLen) {
                renderItmes.push(<NormalPostListItemComponent />);
            } else {
                renderItmes.push(<NormalPostListItemComponent blogPost={blogPosts[i + startIndex]} />);
            }
        }
        return renderItmes;
    }, [blogPosts, postNums, curPage]);

    const handlePageNavigatorClick = (page: number) => {
        setCurPage(page);
    }

    const pageNavigate = useMemo(() => {
        const renderItmes: JSX.Element[] = [];
        const pageCount = Math.ceil(blogLen / postNums);
        const pageGroupStartNum = (curPageGroup - 1) * 5 + 1;
        const needNext = pageGroupStartNum + 4 < pageCount;
        const needPrev = pageGroupStartNum !== 1;

        const handleMoreButtonClick = (isPrev: boolean) => {
            if (isPrev) {
                setCurPage((curPageGroup - 1) * 5);
            } else {
                setCurPage((curPageGroup * 5 + 1));
            }
        };

        if (needPrev) {
            renderItmes.push(<NormalPageNavigateMoveControlComponent isPrev={true} handleClick={handleMoreButtonClick} />)
        }

        for (let i = 0; i < 5; i++) {
            if (pageGroupStartNum + i > pageCount)  break;
            renderItmes.push(<NormalPageNavigateControlComponent num={pageGroupStartNum + i} isSelected={pageGroupStartNum + i === curPage} handleClick={handlePageNavigatorClick}/>)
        }

        if (needNext) {
            renderItmes.push(<NormalPageNavigateMoveControlComponent isPrev={false} handleClick={handleMoreButtonClick} />)
        }

        return renderItmes;
    }, [state.postNum, curPage, curPageGroup])

    return (
        <div className={styles.normalList}>
            <div className={styles.table_container}>
                <table className={styles.list_table}>
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>좋아요</th>
                            <th>이벤트</th>
                        </tr>
                    </thead>
                    <tbody>
                        { renderPostsList }
                    </tbody>
                </table>
            </div>
            <div className={styles.page_navigator_container}>
                { pageNavigate }
            </div>
        </div>
    );
};

export default NormalPostListComponent;