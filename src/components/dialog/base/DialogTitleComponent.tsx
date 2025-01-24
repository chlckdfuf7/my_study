import React from "react";
import ImageButtonComponent from "../../control/ImageButtonComponent";
import useDialogContext from "../../../hooks/useDialogContext";
import styles from "../../../styles/DialogTitle.module.scss";
import classNames from "classnames";

export interface DialogTitleProps {
    title: string;
    className?: string;
}

const DialogTitle = ({
    title,
    className
}: DialogTitleProps): React.JSX.Element => {
    const { handleClose } = useDialogContext();
    const imageUrl = '/resources/cancel.png';
    return (
        <div className={classNames(styles.title, className)}>
            {title}
            <ImageButtonComponent imageUrl={imageUrl} onClick={handleClose} altText="닫기" width = {20} height = {20} />
        </div>
    )
}

export default React.memo(DialogTitle);