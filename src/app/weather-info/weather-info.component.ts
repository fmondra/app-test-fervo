import { Component, inject, Input } from '@angular/core';
import { AddressViewModel } from '../core/models/address-models';
import { CommonModule } from '@angular/common';
import { WheaterViewModelService } from '../core/view-model-services/weather-view-model.service';
import {
  DailyWeatherViewModel,
  WeatherViewModel,
} from '../core/models/weather-models';
import { ChartComponent } from '../utils/chart/chart.component';
import { AddressService } from '../core/services/address.service';
import { filter, tap } from 'rxjs';
import { IChartModel } from '../utils/chart/chart-models';

@Component({
  selector: 'app-weather-info',
  imports: [CommonModule, ChartComponent],
  templateUrl: './weather-info.component.html',
  styleUrl: './weather-info.component.scss',
})
export class WeatherInfoComponent {
  private vms = inject(WheaterViewModelService);
  private service = inject(AddressService);

  chartList: IChartModel[] = [];
  currentAddress: AddressViewModel | undefined;
  weatherData: WeatherViewModel | undefined;

  constructor() {
    this.setSubscriptions();
  }

  setSubscriptions() {
    this.service
      .getAddress()
      .pipe(
        filter((address?: AddressViewModel | null) => !!address),
        tap((x) => (this.chartList = []))
      )
      .subscribe((address: AddressViewModel) => {
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);
        this.currentAddress = address;
        this.getWeatherInfoByDates(address, sevenDaysAgo, today);
      });
  }

  getWeatherInfoByDates(ad: AddressViewModel, startDate: Date, endDate: Date) {
    this.vms
      .getWeatherByDatesAndCoordinates(
        ad.latitude!,
        ad.longitude!,
        startDate,
        endDate
      )
      .subscribe({
        next: (response?: WeatherViewModel) => {
          if (response) {
            console.log(`dati meteo ricevuti per: ${ad.address}`);
            console.log(response);

            this.weatherData = response;

            // lista dei giorni
            const datesList: string[] = response.dailyData.map(
              (data: DailyWeatherViewModel) => data.date ?? ''
            );

            // lista dei valori della temperatura
            const tempList: number[] = response.dailyData.map(
              (data: DailyWeatherViewModel) => data.avgTemp ?? 0
            );

            const temperatureChartModel: IChartModel = {
              title: {
                text: 'Last 7 days temperature',
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
                  text: `Temperature`,
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

            // lista dei valori neve
            const showFallList: number[] = response.dailyData.map(
              (data: DailyWeatherViewModel) => data.snowfall ?? 0
            );

            const showFallChartModel: IChartModel = {
              title: {
                text: 'Last 7 days snow fall',
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
                  text: `Temperature`,
                },
              },
              series: [
                {
                  name: '',
                  type: 'line',
                  data: showFallList,
                },
              ],
            };

            // lista dei valori delle precipitazioni
            const preciList: number[] = response.dailyData.map(
              (data: DailyWeatherViewModel) => data.precipitation ?? 0
            );

            const precipitationChartModel: IChartModel = {
              title: {
                text: 'Last 7 days precipitation',
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
                  text: `Temperature`,
                },
              },
              series: [
                {
                  name: '',
                  type: 'line',
                  data: preciList,
                },
              ],
            };

            this.chartList = [temperatureChartModel, precipitationChartModel, showFallChartModel];
          }
        },
      });
  }

  downloadWeatherData(): void {
    if (!this.weatherData) {
      console.warn('No weather data available to download');
      return;
    }
  
    const jsonData = JSON.stringify(this.weatherData, null, 2); // pretty print
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = 'weather-data.json';
    link.click();
  
    URL.revokeObjectURL(url);
  }
  
}
