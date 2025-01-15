import React from "react";
import styles from "../styles/MenuBarComponent.module.scss";

const MenuBarComponent: React.FC = () => {
    const menu_list = ['홈', '날씨'];

    const renderMenuList = () => {
        return menu_list.map((item, index) => (
            <div className={styles.MenuBarItem} key={index}>{item}</div>
        ))
    };

    return (
        <div className={styles.MenuBar}>
            {renderMenuList()}
        </div>
    );
}

export default MenuBarComponent;