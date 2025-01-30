import React, { useMemo } from "react";
import useStore from "../hooks/useStore";
import styles from "../styles/NavigatorComponent.module.scss";
import ImageButtonComponent from "./control/ImageButtonComponent";
import { observer } from "mobx-react-lite";

const FavoritesComponent: React.FC = () => {
    const { informationStore, userStore } = useStore();
    const favorites = userStore.getFavoriteList();

    const movePage = (name: string) => {
        const wholeMenu = informationStore.getWholeMenus();
        const idx = wholeMenu.indexOf(name);
        if (idx !== -1) {
            informationStore.setPage(idx);
        }
    };

    const findImage = (name: string) => {
        const imageInfo = {imageUrl: '', altText: name};
        switch (name) {
            case '날씨': {
                imageInfo.imageUrl = '/resources/weather.png';
                break;
            }
            case '홈': {
                imageInfo.imageUrl = '/resources/home.png';
                break;
            }
            case '주가': {
                imageInfo.imageUrl = '/resources/stock.png';
                break;
            }
            case '게임': {
                imageInfo.imageUrl = '/resources/game.png';
                break;
            }
            case '쇼핑': {
                imageInfo.imageUrl = '/resources/shopping.png';
                break;
            }
            case '블로그': {
                imageInfo.imageUrl = '/resources/blog.png';
                break;
            }
            default:
                break;
        }
        if (imageInfo.imageUrl === '') {
            console.log("unexpected item");
            return <></>;
        }
        return <ImageButtonComponent imageUrl={imageInfo.imageUrl} altText={imageInfo.altText} onClick={movePage} width = {25} height = {25} />
    };

    const renderFavorites = useMemo(() => {
        return favorites.map((item) => (
            <div className={styles.icon}>
                {findImage(item)}
            </div>
        ));
    }, [favorites]);

    return (
        <div className={styles.icon_container}>
            {renderFavorites}
        </div>
    );
};

export default observer(FavoritesComponent);