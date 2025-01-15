import React, { useState } from "react";
import styles from "../styles/ContentAreasComponent.module.scss";
import useStore from "../hooks/useStore";
import HomePageComponent from "./HomePageComponent";
import WeatherSearchComponent from "./WeatherSearchComponent";

const ContentAreasComponent: React.FC = () => {
    const { informationStore } = useStore();
    const curPageNum = informationStore.getPage();

    const renderPage = () => {
        switch (curPageNum) {
            case 0: {
                return (<HomePageComponent />);
            }
            case 1: {
                return (<WeatherSearchComponent />);
            }
            default:
                break;
        }
    }

    return (
        <div className={styles.ContentArea}>
            { renderPage() }
        </div>
    );
}

export default ContentAreasComponent;