import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom";
import DialogComponent from "./base/DialogComponent";
import useStore from "../../hooks/useStore";
import MultiSelectListBoxComponent from "../control/MultiSelectListBoxComponent";
import styles from "../../styles/AddFavoriteDialogComponent.module.scss";

const AddFavoriteDialogComponent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { informationStore, userStore } = useStore();
    const favorites = userStore.getFavoriteList();
    const wholeMenu = informationStore.getWholeMenus();
    const [addItems, setAddItems] = useState<string[]>([]);
    const [deleteItems, setDeleteItems] = useState<string[]>([]);
    const contents = useMemo(() => {
        return (
            <>
                <div className={styles.listContainer}>
                    <div>
                        <div>전체 메뉴</div>
                        <MultiSelectListBoxComponent items={wholeMenu} width={150} maxHeight={200} onSelect={setAddItems} />
                    </div>
                    <div>
                        <div>현재 목록</div>
                        <MultiSelectListBoxComponent items={favorites} width={150} maxHeight={200} onSelect={setDeleteItems} />
                    </div>
                </div>
            </>
        );
    }, [favorites]);

    const updateFavoriteData = async () => {
        try {
            const userId = userStore.getUserId();
            const response = await fetch(`http://localhost:5000/updateNavigate/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userStore.getFavoriteList())
            });

            if (response.ok) {
                console.log("업데이트 성공");
            } else {
                console.error("업데이트 실패");
            }
        } catch (error) {
            console.log("즐겨찾기 업데이트 중 오류: ", error);
            alert("즐겨찾기 업데이트 중 오류가 발생했습니다.");
        }
    }

    const addFavorite = () => {
        addItems.forEach(item => {
            if (!favorites.includes(item)) {
                userStore.addFavorite(item);
            }
        });
        updateFavoriteData();
        setAddItems([]);
    };

    const removeFavorite = () => {
        userStore.deleteFavorites(deleteItems);
        updateFavoriteData();
        setDeleteItems([]);
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