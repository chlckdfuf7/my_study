import React from "react";
import MenuBarComponent from "./MenuBarComponents";
import ContentAreasComponent from "./ContentAreasComponent";
import StatusBarComponent from "./StatusBarComponent";
import NavigatorComponent from "./NavigatorComponent";
import styles from "../styles/MainPage.module.scss";

const MainPageComponent: React.FC = () => {
    return (
        <div className={styles.mainPage}>
            <MenuBarComponent />
            <ContentAreasComponent />
            <StatusBarComponent />
            <NavigatorComponent />
        </div>
    );
};

export default MainPageComponent;