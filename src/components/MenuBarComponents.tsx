import React from "react";
import styles from "../styles/MenuBarComponent.module.scss";
import MenuItemComponent from "./MenuItemComponent";

const MenuBarComponent: React.FC = () => {
    const menu_list = ['홈', '날씨'];

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