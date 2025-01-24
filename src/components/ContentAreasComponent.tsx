import React, { useState } from "react";
import styles from "../styles/ContentAreasComponent.module.scss";
import useStore from "../hooks/useStore";
import HomePageComponent from "./HomePageComponent";
import WeatherSearchComponent from "./WeatherSearchComponent";
import { observer } from "mobx-react-lite";
import BlogMainPageComponent from "./blog/BlogMainPageComponent";

const ContentAreasComponent: React.FC = observer(() => {
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
            case 5: {
                return (<BlogMainPageComponent />);
            }
            case 2:
            case 3:
            case 4:
            default:
                break;
        }
    }

    return (
        <div className={styles.ContentArea}>
            { renderPage() }
        </div>
    );
});

export default ContentAreasComponent;