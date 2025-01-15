import React from "react";

const MenuBarComponent: React.FC = () => {
    const menu_list = ['홈', '날씨', '주기'];

    const renderMenuList = () => {
        return menu_list.map((item, index) => (
            <div key={index}>{item}</div>
        ))
    };

    return (
        <div>
            {renderMenuList()}
        </div>
    );
}

export default MenuBarComponent;