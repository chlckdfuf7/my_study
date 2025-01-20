import React, { useState } from "react";
import styles from "../styles/NavigatorComponent.module.scss";
import AddFavoriteDialogComponent from "./dialog/AddFavoritesDialogComponent";

const AddFavoriteComponent: React.FC = () => {
    const [showDialog, setShowDialog] = useState(false);
    const openDialog = () => {
        setShowDialog(true);
    }
    const closeDialog = () => {
        setShowDialog(false);
    }
    return (
        <>
            <button 
                className={styles.Add}
                onClick={openDialog}
            >
                변경하기
            </button>
            {showDialog && <AddFavoriteDialogComponent onClose={closeDialog}/>}
        </>
    );
}

export default AddFavoriteComponent;