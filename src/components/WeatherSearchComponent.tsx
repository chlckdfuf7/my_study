import React, { useEffect, useState } from "react";
import WeatherInfoComponent from "./WeatherInfoComponent";

export interface WeatherInfo {
    city: string;
    humidity: number; // main
    temp: number; // main
    temp_max: number; // main
    temp_min: number; // main
    feels_like: number; // main
    visibility: number; // visibility
    cloud: string; // clouds -> all
    sunrise: number; // sys
    sunset: number; // sys
    windSpeed: number; // wind
    main: string; // weather[0] -> main
    description: string; // weather[0] -> description
    dataTime: number;
}

const WeatherSearchComponent: React.FC = () => {
    const [selectCity, setSelectCity] = useState('');
    const [weather, setWeather] = useState<WeatherInfo | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectCity(e.target.value);
    };
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const suffix = `&units=imperial&appid=${apiKey}`;

    const getWeather = async(city: string) => {
        const response = await fetch(baseUrl + city + suffix);
        if (response.status === 200) {
            const jsonWeather = await response.json();
            console.log(jsonWeather);
            const mainInfo = jsonWeather.main;
            const cloudsInfo = jsonWeather.clouds;
            const sysInfo = jsonWeather.sys;
            const windInfo = jsonWeather.wind;
            const weathers = jsonWeather.weather;
            
            const cityWeather: WeatherInfo = {
                city: selectCity,
                humidity: mainInfo.humidity,
                temp: mainInfo.temp, 
                temp_max: mainInfo.temp_max, 
                temp_min: mainInfo.temp_min, 
                feels_like: mainInfo.feels_like, 
                visibility: jsonWeather.visibility, 
                cloud: cloudsInfo.all, 
                sunrise: sysInfo.sunrise, 
                sunset: sysInfo.sunset, 
                windSpeed: windInfo.speed, 
                main: weathers[0]?.main, 
                description: weathers[0]?.description,
                dataTime: jsonWeather.dt
            }
            setWeather(cityWeather);
        } else {
            setWeather(null);
        }
    };

    useEffect(() => { getWeather(selectCity) }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        getWeather(selectCity);
    }

    const has = (value: any): value is boolean => !!value;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type = "text" placeholder = "도시를 영문명으로 입력하세요." onChange={handleChange} />
                <button type = "submit">날씨 가져오기</button>
                {has(weather) ? (
                    <WeatherInfoComponent weatherInfo = {weather} />
                ) : (
                    <h2>도시 이름을 확인해주세요.</h2>
                )}
            </form>
        </>
    );
}

export default WeatherSearchComponent;