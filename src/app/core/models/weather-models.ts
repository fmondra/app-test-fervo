export class WeatherModel {
    latitude?: number;
    longitude?: number;
    timezone?: string;
    timezone_abbreviation?: string;
    elevation?: number;
    daily_units?: DailyUnitsModel;
    daily?: DailyModel;
  
    constructor(data?: WeatherModel) {
      if (data) {
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.timezone = data.timezone;
        this.timezone_abbreviation = data.timezone_abbreviation;
        this.elevation = data.elevation;
        this.daily_units = data.daily_units ? new DailyUnitsModel(data.daily_units) : undefined;
        this.daily = data.daily ? new DailyModel(data.daily) : undefined;
      }
    }
  
    toViewModel(): WeatherViewModel {
      return new WeatherViewModel({
        latitude: this.latitude,
        longitude: this.longitude,
        timezone: this.timezone,
        elevation: this.elevation,
        dailyData: this.daily?.toViewModelArray() || [],
        dailyUnits: this.daily_units?.toViewModel()
      });
    }
  }

  export class DailyUnitsModel {
    temperature_2m_mean?: string;
    precipitation_sum?: string;
    temperature_2m_max?: string;
    temperature_2m_min?: string;
    wind_speed_10m_max?: string;
    relative_humidity_2m_mean?: string;
    snowfall_sum?: string;
  
    constructor(data?: DailyUnitsModel) {
      if (data) {
        this.temperature_2m_mean = data.temperature_2m_mean;
        this.precipitation_sum = data.precipitation_sum;
        this.temperature_2m_max = data.temperature_2m_max;
        this.temperature_2m_min = data.temperature_2m_min;
        this.wind_speed_10m_max = data.wind_speed_10m_max;
        this.snowfall_sum = data.snowfall_sum;
        this.relative_humidity_2m_mean = data.relative_humidity_2m_mean;
      }
    }

    toViewModel(): DailyUnitsViewModel{
      return new DailyUnitsViewModel({
        temperatureUnit: this.temperature_2m_mean,
        precipitationUnit: this.precipitation_sum,
        windSpeedUnit: this.wind_speed_10m_max,
        snowFallUnit: this.snowfall_sum,
        humidityUnit: this.relative_humidity_2m_mean
      })
    }
  }

  export class DailyModel {
    time?: string[];
    temperature_2m_mean?: number[];
    precipitation_sum?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    wind_speed_10m_max?: number[];
    relative_humidity_2m_mean?: number[];
    snowfall_sum?: number[];
  
    constructor(data?: DailyModel) {
      if (data) {
        this.time = data.time;
        this.temperature_2m_mean = data.temperature_2m_mean;
        this.precipitation_sum = data.precipitation_sum;
        this.temperature_2m_max = data.temperature_2m_max;
        this.temperature_2m_min = data.temperature_2m_min;
        this.wind_speed_10m_max = data.wind_speed_10m_max;
        this.relative_humidity_2m_mean = data.relative_humidity_2m_mean;
        this.snowfall_sum = data.snowfall_sum;
      }
    }
  
    toViewModelArray(): DailyWeatherViewModel[] {
      const days: DailyWeatherViewModel[] = [];
      const count = this.time?.length || 0;
  
      for (let i = 0; i < count; i++) {
        days.push(new DailyWeatherViewModel({
          date: this.time?.[i],
          avgTemp: this.temperature_2m_mean?.[i],
          maxTemp: this.temperature_2m_max?.[i],
          minTemp: this.temperature_2m_min?.[i],
          precipitation: this.precipitation_sum?.[i],
          windSpeed: this.wind_speed_10m_max?.[i],
          snowfall: this.snowfall_sum?.[i],
          humidity: this.relative_humidity_2m_mean?.[i]
        }));
      }
  
      return days;
    }
  }

  
  // VIEW MODELS
  export class WeatherViewModel {
    latitude?: number;
    longitude?: number;
    timezone?: string;
    elevation?: number;
    dailyData: DailyWeatherViewModel[] = [];
    dailyUnits?: DailyUnitsViewModel
  
    constructor(data?: WeatherViewModel) {
      if (data) {
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.timezone = data.timezone;
        this.elevation = data.elevation;
        this.dailyData = data.dailyData || [];
        this.dailyUnits = data.dailyUnits;
      }
    }
  }

  export class DailyUnitsViewModel{
    temperatureUnit?: string;
    precipitationUnit?: string;
    windSpeedUnit?: string;
    humidityUnit?: string;
    snowFallUnit?: string;
  
    constructor(data?: DailyUnitsViewModel) {
      if (data) {
        this.temperatureUnit = data.temperatureUnit;
        this.precipitationUnit = data.precipitationUnit;
        this.windSpeedUnit = data.windSpeedUnit;
        this.snowFallUnit = data.snowFallUnit;
        this.humidityUnit = data.humidityUnit;
      }
    }
  }
  
  export class DailyWeatherViewModel {
    date?: string;
    avgTemp?: number;
    maxTemp?: number;
    minTemp?: number;
    precipitation?: number;
    windSpeed?: number;
    snowfall?: number;
    humidity?: number;
  
    constructor(data?: DailyWeatherViewModel) {
      if (data) {
        this.date = data.date;
        this.avgTemp = data.avgTemp;
        this.maxTemp = data.maxTemp;
        this.minTemp = data.minTemp;
        this.precipitation = data.precipitation;
        this.windSpeed = data.windSpeed;
        this.snowfall = data.snowfall;
        this.humidity = data.humidity;
      }
    }
  }
  

  