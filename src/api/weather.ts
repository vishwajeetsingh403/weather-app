import axios from 'axios';
import { API_KEY } from '../config';
const baseUrl = 'https://api.openweathermap.org/data/2.5';

const ENDPOINTS = {
    CURRENT_WEATHER: {
        endpoint: (lat: number, lon: number) => `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    },
    FORECAST: {
        endpoint: (lat: number, lon: number) => `${baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    }
}

const getCurrentWeather = (lat: number, lon: number) => {
    return new Promise((resolve, reject) => {
        axios.get(ENDPOINTS.CURRENT_WEATHER.endpoint(lat, lon)).then((res) => {
            resolve(res.data);
        }).catch((err) => reject(err));
    })
}

const getForecast = (lat: number, lon: number) => {
    return new Promise((resolve, reject) => {
        axios.get(ENDPOINTS.FORECAST.endpoint(lat, lon)).then((res) => {
            resolve(res.data);
        }).catch((err) => reject(err));
    })
}

export {getCurrentWeather, getForecast};