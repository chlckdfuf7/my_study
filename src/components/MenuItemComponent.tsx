import React from "react";
import styles from "../styles/MenuBarComponent.module.scss";
import useStore from "../hooks/useStore";

// MenuItemComponent 생성을 위해 필요한 props
// menuIdx = 메뉴 index, item = 메뉴명
interface MenuItemProps {
    menuIdx: number;
    item: string;
}

const MenuItemComponent: React.FC<MenuItemProps> = (props: MenuItemProps) => {
    const { informationStore } = useStore();

    const handleMouseClik = () => {
        informationStore.setPage(props.menuIdx);
    };

    const handleMouseEnter = (e: React.MouseEvent) => {
        const menuItemElement = e.target as HTMLElement;
        menuItemElement.style.cursor = 'pointer';
    }

    return (
        <div 
            className={styles.MenuBarItem} 
            key = {props.menuIdx}
            onClick={handleMouseClik}
            onMouseEnter={handleMouseEnter}
        >
            {props.item}
        </div>
    );
}

export default MenuItemComponent;