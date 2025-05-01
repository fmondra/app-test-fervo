import { inject, Injectable } from "@angular/core";
import { WheaterRestService } from "../rest-services/weather-rest.service";
import { WeatherModel, WeatherViewModel } from "../models/weather-models";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({providedIn: 'root'})
export class WheaterViewModelService {
    private restService = inject(WheaterRestService);
    
    getWeatherByDatesAndCoordinates(lat: number, lon: number, startDate: Date, endDate: Date): Observable<WeatherViewModel | undefined> {
        const startDateFormatted: string = this.formatDate(startDate);
        const endDateFormatted: string = this.formatDate(endDate);
      
        return this.restService.getWeatherByDatesAndCoordinates(lat, lon, startDateFormatted, endDateFormatted).pipe(
          map((response: WeatherModel | null | undefined) => {
            if (!response) return undefined;
            return new WeatherModel(response).toViewModel();
          }),
          catchError((error) => {
            console.error('Errore durante il recupero dei dati meteo:', error);
            return of(undefined); // restituisco undefined in caso di errore
          })
        );
      }

    formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }
}