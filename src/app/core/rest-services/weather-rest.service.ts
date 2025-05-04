import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WeatherModel } from "../models/weather-models";

@Injectable({providedIn: 'root'})
export class WheaterRestService {
    private http = inject(HttpClient); 

    getWeatherByDatesAndCoordinates(lat: number, lon: number, startDate: string, endDate: string): Observable<WeatherModel>{
        const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&daily=weather_code,temperature_2m_mean,precipitation_sum,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,snowfall_sum,relative_humidity_2m_mean&timezone=auto`;
        https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2025-04-18&end_date=2025-05-02&daily=temperature_2m_mean,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weather_code,relative_humidity_2m_mean
        
        return this.http.get<WeatherModel>(`${url}`);
    }

}