import React from "react";
import { WeatherInfo } from "./WeatherSearchComponent";

export interface Props {
    weatherInfo: WeatherInfo;
}
const WeatherInfoComponent: React.FC<Props> = (props: Props) => {
    const weatherInfo = props.weatherInfo;

    function convertFahrenheightToCelsius(f: number): number {
        return (f - 32) * 5 / 9;
    }

    function convertUnitTimeToLocaleTime(time: number): string {
        return new Date(time * 1000).toLocaleTimeString();
    }

    return (
        <div>
            <h2>날씨를 측정한 시간은 {convertUnitTimeToLocaleTime(weatherInfo.dataTime)} 입니다.</h2>
            <table>
                <tr>
                    <th>종류</th>
                    <th>정보</th>
                </tr>
                <tr>
                    <td>도시 이름</td>
                    <td>{weatherInfo.city}</td>
                </tr>
                <tr>
                    <td>현재 온도</td>
                    <td>{convertFahrenheightToCelsius(weatherInfo.temp).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>최고 온도</td>
                    <td>{convertFahrenheightToCelsius(weatherInfo.temp_max).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>최저 온도</td>
                    <td>{convertFahrenheightToCelsius(weatherInfo.temp_min).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>습도</td>
                    <td>{weatherInfo.humidity}</td>
                </tr>
                <tr>
                    <td>바람 세기</td>
                    <td>{weatherInfo.windSpeed}</td>
                </tr>
                <tr>
                    <td>체감 온도</td>
                    <td>{weatherInfo.feels_like}</td>
                </tr>
                <tr>
                    <td>구름 양</td>
                    <td>{weatherInfo.cloud}</td>
                </tr>
                <tr>
                    <td>일출 시간</td>
                    <td>{convertUnitTimeToLocaleTime(weatherInfo.sunrise)}</td>
                </tr>
                <tr>
                    <td>일몰 시간</td>
                    <td>{convertUnitTimeToLocaleTime(weatherInfo.sunset)}</td>
                </tr>
                <tr>
                    <td>가시거리</td>
                    <td>{weatherInfo.visibility}</td>
                </tr>
                <tr>
                    <td>종합 날씨</td>
                    <td>{weatherInfo.main}</td>
                </tr>
                <tr>
                    <td>종합 날씨 설명</td>
                    <td>{weatherInfo.description}</td>
                </tr>
            </table>
        </div>
    )
}

export default WeatherInfoComponent;