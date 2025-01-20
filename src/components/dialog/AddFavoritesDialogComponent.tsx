import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom";
import DialogComponent from "./base/DialogComponent";
import useStore from "../../hooks/useStore";
import MultiSelectListBoxComponent from "../control/MultiSelectListBoxComponent";
import styles from "../../styles/AddFavoriteDialogComponent.module.scss";

const AddFavoriteDialogComponent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { informationStore } = useStore();
    const favorites = informationStore.getFavorites();
    const [addItems, setAddItems] = useState<string[]>([]);
    const [selectAddItem, setSelectAddItem] = useState<number>(-1);
    const [selectDeleteItem, setSelectDeleteItem] = useState<number>(-1);
    const tmp = ['홈', '날씨', '주식'];
    const contents = useMemo(() => {
        return (
            <>
                <div className={styles.listContainer}>
                    <div>
                        <div>전체 메뉴</div>
                        <MultiSelectListBoxComponent items={tmp} width={150} maxHeight={200} onSelect={setAddItems} />
                    </div>
                    <div>
                        <div>현재 목록</div>
                        <MultiSelectListBoxComponent items={tmp} width={150} maxHeight={200} onSelect={setAddItems} />
                    </div>
                </div>
            </>
        );
    }, [tmp]);

    const addFavorite = () => {
        console.log("추가하기");
    };

    const removeFavorite = () => {
        console.log("제거하기");
    };
    
    return ReactDOM.createPortal(
        <DialogComponent
            className="add-favorites"
            title={{ title: '즐겨찾기 추가' }}
            contents={{children: contents}}
            footer={{
                type: 'b',
                extraButtonLabel1: '추가하기',
                extraButtonLabel2: '제거하기',
                extraButtonClick: removeFavorite
            }}
            onClose={onClose}
            onAccept={addFavorite}
        />,
        document.body
    )
};

export default AddFavoriteDialogComponent;