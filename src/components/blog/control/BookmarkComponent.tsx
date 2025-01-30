import React from "react";
import ImageButtonComponent from "../../control/ImageButtonComponent";
import styles from "../../../styles/BookmarkComponent.module.scss";

export interface Props {
    isSelected: boolean;
    handleBookmarkChange: () => void;
}

const BookmarkComponent: React.FC<Props> = (props) => {
    const { isSelected, handleBookmarkChange } = props;
    const imgUrl = isSelected ? '/resources/selectedbookmark.png' : '/resources/bookmark.png';

    return (
        <div className={styles.bookmark}>
            <ImageButtonComponent imageUrl={imgUrl} onClick={handleBookmarkChange} altText="책갈피" width={15} height={15} />
        </div>
    );
}

export default BookmarkComponent;