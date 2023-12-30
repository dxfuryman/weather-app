import axios from "axios";
//https://api.open-meteo.com/v1/forecast?current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime

export function getweather(lat, lon, timezone){
return axios.get(
    "https://api.open-meteo.com/v1/forecast?current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime",{ params: {
    letitude: lat,
        longitude: lon,
        timezone,
    }})
}