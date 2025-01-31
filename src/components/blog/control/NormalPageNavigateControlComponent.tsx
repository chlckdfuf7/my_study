import classNames from "classnames";
import React from "react";
import styles from "../../../styles/NormalPost.module.scss";

interface Props {
    num: number;
    isSelected: boolean;
    handleClick: (page: number) => void;
}

const NormalPageNavigateControlComponent: React.FC<Props> = (props) => {
    const { num, isSelected, handleClick } = props;

    return(
        <span className={classNames(styles.page_navigator, { [styles.selected_page]: isSelected })} onClick={() => handleClick(num)}>{num}</span>
    );
};

export default NormalPageNavigateControlComponent;