import React from "react";
import useDialogContext from "../../../hooks/useDialogContext";
import styles from "../../../styles/DialogFooter.module.scss";
import classNames from "classnames";

interface DialogFooterBase {
    className?: string;
}

interface DialogFooterA extends DialogFooterBase {
    type: 'a';
    extraButtonLabel: string;
}

interface DialogFooterB extends DialogFooterBase {
    type: 'b';
    extraButtonLabel1: string;
    extraButtonLabel2: string;
    extraButtonClick(): void;
}

export type DialogFooter = DialogFooterA | DialogFooterB;

function DialogFooter(props: DialogFooter): React.JSX.Element {
    const { handleAccept, handleClose } = useDialogContext();
    return (
        <div className = {styles.footer}>
            {props.type === 'a' && (
                <div onClick={handleAccept}>
                    {(props as DialogFooterA).extraButtonLabel}
                </div>
            )}
            {props.type === 'b' && (
                <>
                    <button
                        className={styles.firstItem} 
                        onClick={handleAccept}
                    >
                        {(props as DialogFooterB).extraButtonLabel1}
                    </button>
                    <button onClick={(props as DialogFooterB).extraButtonClick}>
                        {(props as DialogFooterB).extraButtonLabel2}
                    </button>
                </>
            )}
            <button onClick={handleClose}>
                닫기
            </button>
        </div>
    );
};

export default React.memo(DialogFooter);