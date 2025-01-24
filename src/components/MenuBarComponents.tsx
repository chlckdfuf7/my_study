import React from "react";
import styles from "../styles/MenuBarComponent.module.scss";
import MenuItemComponent from "./MenuItemComponent";
import useStore from "../hooks/useStore";

const MenuBarComponent: React.FC = () => {
    const {informationStore} = useStore();
    const menu_list = informationStore.getWholeMenus();

    const renderMenuList = () => {
        return menu_list.map((item, index) => (
            <MenuItemComponent menuIdx={index} item = {item} />  
        ))
    };

    return (
        <div className={styles.MenuBar}>
            {renderMenuList()}
        </div>
    );
}

export default MenuBarComponent;