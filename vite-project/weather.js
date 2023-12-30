import axios from "axios";
//https://api.open-meteo.com/v1/forecast?current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime

export function getWeather(lat, lon, timezone){
return axios.get(
    "https://api.open-meteo.com/v1/forecast",
    { params: {
        latitude: lat,
        longitude: lon,
        timezone,
        current: "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m",
        hourly: "temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m",
        daily: "weather_code,temperature_2m_max,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_hours,wind_speed_10m_max,wind_gusts_10m_max",
        wind_speed_unit: "mph",
        precipitation_unit: "inch",
        timeformat: "unixtime"
    },
    }
).then(({data}) => {
    return {
        current: parseCurrentWeather(data.current),
        daily: parseDailyWeather(data.daily),
        hourly: parseHourlyWeather(data.hourly)
    }
})
}
function parseCurrentWeather({ apparent_temperature, daily}){

    const {
        temperature: currentTemp,
        windspeed: windSpeed,
        weathercode: iconCode,
    } = apparent_temperature;
    console.log(apparent_temperature);
    const {
        temperature_2m_max: [maxTemp],
        temperature_2m_min: [minTemp],
        apparent_temperature_max: [maxFeelsLike],
        apparent_temperature_min: [minFeelsLike],
        precipitation_sum: [precip],
    } = daily

    return {
        currentTemp: Math.round(currentTemp),
        highTemp: Math.round(maxTemp),
        lowTemp: Math.round(minTemp),
        highFeelsLike: Math.round(maxFeelsLike),
        lowFeelsLike: Math.round(minFeelsLike),
        windSpeed: Math.round(windSpeed),
        precip: Math.round(precip * 100) / 100,
        iconCode,
    }
}
function parseDailyWeather({ daily }){
    return daily.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            iconCode: daily.weathercode[index],
            maxTemp: Math.round(daily.temperature_2m_max[index]),
        }
    })
}
function parseHourlyWeather({ hourly, apparent_temperature }) {
    return hourly.time
        .map((time, index) => {
            return {
                timestamp: time * 1000,
                iconCode: hourly.weathercode[index],
                temp: Math.round(hourly.temperature_2m[index]),
                feelsLike: Math.round(hourly.apparent_temperature[index]),
                windSpeed: Math.round(hourly.windspeed_10m[index]),
                precip: Math.round(hourly.precipitation[index] * 100) / 100,
            }
        })
        .filter(({ timestamp }) => timestamp >= apparent_temperature.time * 1000)
}