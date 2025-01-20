import React from "react";
import styles from "../../../styles/DialogContents.module.scss";
import classNames from 'classnames';

export interface DialogContentsProps {
    className?: string;
    children? : React.ReactNode;
}

function DialogContents({ children, className }: DialogContentsProps) {
    return (
        <div className={classNames(styles.default, className)}>
            {children}
        </div>
    )
}

export default React.memo(DialogContents);