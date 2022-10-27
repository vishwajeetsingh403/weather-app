import { useEffect, useState } from "react";
import './index.scss';
import moment from "moment";
import { getCurrentWeather, getForecast } from "../../api/weather";
import cities from '../../assets/static/cities-fr.json';
import Preloader from "../../components/Preloader";
import { CityType, ForecastList } from "../../interface";

const Home = () => {

  const initialState: CityType = {
    id: cities[0].id,
    nm: cities[0].nm,
    lat: cities[0].lat,
    lon: cities[0].lon
  }

  const weatherToIconMapping: any = {
    Clouds: "wi-icon-802",
    Thunderstorm: "wi-icon-200",
    Drizzle: "wi-icon-300",
    Rain: "wi-icon-501",
    Snow: "wi-icon-600",
    Mist: "wi-icon-701",
    Clear: "wi-icon-800",
    Showers: "wi-icon-501",
    Fog: "wi-icon-602"
  };

  const [city, setCity] = useState<string>(initialState.nm);
  const [currentCity, setCurrentCity] = useState<CityType>(initialState);
  const [weather, setWeather] = useState<number>(0);
  const [weatherIcon, setWeatherIcon] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [forecast, setForecast] = useState<Array<ForecastList>>([]);

  const handleDropdown = (e: any) => {
    setIsloading(true);
    setCity(e.target.value);
    let selectedCity = cities.find((ct: CityType) => {
      return ct.nm === e.target.value;
    });
    if(selectedCity) setCurrentCity(selectedCity);
  };

  const getFilteredForecast = (arr: any) => {
    let day1 = moment().add(1, 'days').format("YYYY-MM-DD") + " 00:00:00";
    let day2 = moment().add(2, 'days').format("YYYY-MM-DD") + " 00:00:00";
    let day3 = moment().add(3, 'days').format("YYYY-MM-DD") + " 00:00:00";
    let filteredList = arr.filter((obj: any) => obj.dt_txt.includes(day1) || obj.dt_txt.includes(day2) || obj.dt_txt.includes(day3))
    filteredList.map((item: any, index: any) => {
      return item.day = moment().add(index+1, 'days').format('dddd').substring(0,3)
    });
    return filteredList;
  }

  useEffect(() => {
    Promise.all([getCurrentWeather(currentCity.lat,currentCity.lon), getForecast(currentCity.lat,currentCity.lon)]).then((data: any) => {
      setIsloading(false);
      setWeather(data[0].main.temp);
      setWeatherIcon(data[0].weather[0].main)
      setForecast(getFilteredForecast(data[1].list));
    });
  }, [currentCity.lat, currentCity.lon]);

    return (
      <div className="main-container">
        {isLoading ? <div className="preloader"><Preloader /></div> : null}
        <div className="city-dropdown">Select a City</div>
        <select onChange={handleDropdown}>
          {cities.map((city) => {
            return (
              <option key={city.id}>{city.nm}</option>
            )
          })}
        </select>
        {!isLoading && 
        <div className="forecast-wrapper">
          <div className="city-name">{city.toUpperCase()}</div>
          <i className={weatherToIconMapping[weatherIcon]}></i>
          <div className="font"><strong>{weather}&deg;</strong></div>
          <br />
          <div className="forecast">{forecast.map((frcst: any, index: any) => (
            <div key={index} className="forecast-inner-wrapper">
              <div className="forecast-background">
                <div>{frcst.day.toUpperCase()}</div>
              </div>
              <div className="forecast-temp">
                <div>
                <i className={weatherToIconMapping[frcst.weather[0].main]}></i>
                <div>{frcst.main.temp}&deg;</div>
                <div>{frcst.main.feels_like}&deg;</div>
                </div>
              </div>
            </div>
          ))}</div>
        </div>
        }
      </div>
    );
};

export default Home;