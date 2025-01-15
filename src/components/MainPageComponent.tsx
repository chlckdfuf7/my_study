import React from "react";
import MenuBarComponent from "./MenuBarComponents";
import ContentAreasComponent from "./ContentAreasComponent";
import StatusBarComponent from "./StatusBarComponent";

const MainPageComponent: React.FC = () => {
    return (
        <div>
            <MenuBarComponent />
            <ContentAreasComponent />
            <StatusBarComponent />
        </div>
    );
};

export default MainPageComponent;