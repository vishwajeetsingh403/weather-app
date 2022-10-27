 export interface CityType {
    id: number,
    nm: string,
    lat: number,
    lon: number
  };

  export interface Weather {
    coord: object,
    weather: Array<object>,
    base: string,
    main: object,
    visibility: number,
    wind: object,
    rain: object,
    clouds: object,
    dt: number,
    sys: object,
    timezone: number,
    id: number,
    name: string,
    cod: number
  };

  export interface Forecast {
    city: object,
    cnt: number,
    list: Array<object>,
    message: number
  };

  export interface Main {
    temp: number,
    feels_like: number,
  };

  export interface WeatherList {
    main: Array<Main>
  };

  export interface ForecastList {
    clouds: object,
    dt: number,
    dt_txt: string,
    main: Main,
    pop: number,
    sys: object,
    visibility: number,
    weather: WeatherList,
    wind: object,
    day: string
  };