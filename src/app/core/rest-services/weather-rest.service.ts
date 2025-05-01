import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WeatherModel } from "../services/models/weather-models";

@Injectable({providedIn: 'root'})
export class WheaterRestService {
    private http = inject(HttpClient); 

    getWeatherByDatesAndCoordinates(lat: number, lon: number, startDate: string, endDate: string): Observable<WeatherModel>{
        const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&daily=weather_code,temperature_2m_mean,precipitation_sum,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,snowfall_sum&timezone=auto`;
        return this.http.get<WeatherModel>(`${url}`);
    }

}