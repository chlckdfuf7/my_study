import React from "react";
import MenuBarComponent from "./MenuBarComponents";
import ContentAreasComponent from "./ContentAreasComponent";
import StatusBarComponent from "./StatusBarComponent";
import NavigatorComponent from "./NavigatorComponent";

const MainPageComponent: React.FC = () => {
    return (
        <div>
            <MenuBarComponent />
            <ContentAreasComponent />
            <StatusBarComponent />
            <NavigatorComponent />
        </div>
    );
};

export default MainPageComponent;