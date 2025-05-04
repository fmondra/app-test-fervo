import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { filter, Subject, takeUntil, tap } from 'rxjs';
import { AddressViewModel } from '../core/models/address-models';
import {
  DailyWeatherViewModel,
  WeatherViewModel,
} from '../core/models/weather-models';
import { AddressService } from '../core/services/address.service';
import { WheaterViewModelService } from '../core/view-model-services/weather-view-model.service';
import { IChartModel } from '../utils/chart/chart-models';
import { ChartComponent } from '../utils/chart/chart.component';

@Component({
  selector: 'app-weather-info',
  imports: [CommonModule, ChartComponent, FormsModule, DatePicker],
  templateUrl: './weather-info.component.html',
  styleUrl: './weather-info.component.scss',
})
export class WeatherInfoComponent {
  private vms = inject(WheaterViewModelService);
  private service = inject(AddressService);

  chartList: IChartModel[] = [];
  currentAddress: AddressViewModel | undefined;
  weatherData: WeatherViewModel | undefined;

  today = new Date();

  startDate?: Date;
  endDate?: Date;

  destroy$ = new Subject<void>();

  constructor() {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    this.startDate = sevenDaysAgo;
    this.endDate = today;

    this.setSubscriptions();
  }

  setSubscriptions() {
    this.service
      .getAddress()
      .pipe(
        takeUntil(this.destroy$),
        tap((address) => {
          if (!address) {
            this.currentAddress = undefined;
            this.chartList = [];
          }
        }),
        filter((address?: AddressViewModel | null) => !!address),
        tap((x) => (this.chartList = []))
      )
      .subscribe((address: AddressViewModel) => {
        this.currentAddress = address;
        this.getWeatherInfoByDates();
      });
  }

  getWeatherInfoByDates() {
    this.vms
      .getWeatherByDatesAndCoordinates(
        this.currentAddress?.latitude!,
        this.currentAddress?.longitude!,
        this.startDate!,
        this.endDate!
      )
      .subscribe({
        next: (response?: WeatherViewModel) => {
          if (response) {
            console.log(
              `dati meteo ricevuti per: ${this.currentAddress!.address}`
            );
            console.log(response);

            this.weatherData = response;

            // lista dei giorni
            const datesList: string[] = response.dailyData.map(
              (data: DailyWeatherViewModel) => data.date ?? ''
            );

            // Temperature values list
            const tempList: number[] = response.dailyData.map(
              (data: DailyWeatherViewModel) => data.avgTemp ?? 0
            );

            // Creating model for temperature chart
            const temperatureChartModel: IChartModel = {
              title: {
                text: 'Temperature',
              },
              subtitle: {
                text: 'Fonte: <a href="https://open-meteo.com/en/docs/historical-forecast-api" target="_blank">Open Meteo</a>',
                useHTML: true,
              },
              xAxis: {
                categories: datesList,
              },
              yAxis: {
                title: {
                  text: `Temperature (${response.dailyUnits?.temperatureUnit})`,
                },
              },
              series: [
                {
                  name: '',
                  type: 'line',
                  data: tempList,
                },
              ],
            };

            // Humidity values list
            const humidityList: number[] = response.dailyData.map(
              (data: DailyWeatherViewModel) => data.humidity ?? 0
            );

            // Creating model for humidity chart
            const humidityChartModel: IChartModel = {
              title: {
                text: 'Humidity',
              },
              subtitle: {
                text: 'Fonte: <a href="https://open-meteo.com/en/docs/historical-forecast-api" target="_blank">Open Meteo</a>',
                useHTML: true,
              },
              xAxis: {
                categories: datesList,
              },
              yAxis: {
                title: {
                  text: `Humidity (${response.dailyUnits?.humidityUnit})`,
                },
              },
              series: [
                {
                  name: '',
                  type: 'line',
                  data: humidityList,
                },
              ],
            };

            // Wind speed values list
            const windList: number[] = response.dailyData.map(
              (data: DailyWeatherViewModel) => data.windSpeed ?? 0
            );

            // Creating model for precipitation chart
            const windSpeedChartModel: IChartModel = {
              title: {
                text: 'Wind Speed',
              },
              subtitle: {
                text: 'Fonte: <a href="https://open-meteo.com/en/docs/historical-forecast-api" target="_blank">Open Meteo</a>',
                useHTML: true,
              },
              xAxis: {
                categories: datesList,
              },
              yAxis: {
                title: {
                  text: `Wind speed (mm)`,
                },
              },
              series: [
                {
                  name: '',
                  type: 'line',
                  data: windList,
                },
              ],
            };

            this.chartList = [
              temperatureChartModel,
              windSpeedChartModel,
              humidityChartModel,
            ];
          }
        },
      });
  }

  // Downloading JSON file based on retrieved data
  downloadWeatherData(): void {
    if (!this.weatherData) {
      console.warn('No weather data available to download');
      return;
    }

    const jsonData = JSON.stringify(this.weatherData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'weather-data.json';
    link.click();

    URL.revokeObjectURL(url);
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
