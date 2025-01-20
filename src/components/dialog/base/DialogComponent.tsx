import React from "react";
import DialogTitleComponent, { DialogTitleProps } from "./DialogTitleComponent";
import { DialogContentsProps } from "./DialogContentsComponent";
import DialogFooterComponent, { DialogFooter } from "./DialogFooterComponent";
import DialogContentsComponent from "./DialogContentsComponent";
import { DialogContext } from "../../../hooks/useDialogContext";
import classNames from "classnames";
import styles from "../../../styles/DialogBaseComponent.module.scss";

export interface DialogProps {
    className: string;
    title: DialogTitleProps;
    contents: DialogContentsProps;
    footer: DialogFooter;
    onClose?: () => void;
    onAccept?: () => boolean | Promise<boolean> | void | Promise<void>;
};

const DialogComponent = ({
    className,
    title,
    contents,
    footer,
    onClose,
    onAccept
}: DialogProps): React.JSX.Element => {
    const handleClose = () => {
        onClose?.();
    }

    const handleAccept = () => {
        if (onAccept?.() === true) {
            handleClose();
        }
    }
    
    const contextValue = {
        handleClose,
        handleAccept,
    };
    return (
        <>
            <DialogContext.Provider value={contextValue}>
                <div
                    className={classNames(styles.dialog, className)}
                >
                    <DialogTitleComponent {...title} />
                    <DialogContentsComponent {...contents} />
                    <DialogFooterComponent {...footer} />
                </div>
            </DialogContext.Provider>
        </>
    )
}

export default React.memo(DialogComponent);