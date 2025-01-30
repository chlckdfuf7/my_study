import React, { useContext } from "react";
import ImageButtonComponent from "../../control/ImageButtonComponent";
import styles from "../../../styles/BookmarkComponent.module.scss";
import { BlogContext } from "../../../context/BlogContext";

export interface Props {
    isSelected: boolean;
    handleBookmarkChange: () => void;
}

const BookmarkComponent: React.FC<Props> = (props) => {
    const { isSelected, handleBookmarkChange } = props;
    const { state } = useContext(BlogContext);
    const imgUrl = isSelected ? '/resources/selectedbookmark.png' : '/resources/bookmark.png';

    const bookmarkClass = 
        state.display === "일자식" ? styles.oneWay :
        state.display === "격자식" ? styles.grid :
        state.display === "일반식" ? styles.normal :
        styles.grid;
    
    return (
        <div className={bookmarkClass}>
            <ImageButtonComponent imageUrl={imgUrl} onClick={handleBookmarkChange} altText="책갈피" width={15} height={15} />
        </div>
    );
}

export default BookmarkComponent;