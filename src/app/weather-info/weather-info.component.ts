import { Component, inject, Input } from '@angular/core';
import { AddressViewModel } from '../core/services/models/address-models';
import { CommonModule } from '@angular/common';
import { WheaterViewModelService } from '../core/view-model-services/weather-view-model.service';
import { WeatherViewModel } from '../core/services/models/weather-models';

@Component({
  selector: 'app-weather-info',
  imports: [CommonModule],
  templateUrl: './weather-info.component.html',
  styleUrl: './weather-info.component.scss',
})
export class WeatherInfoComponent {
  private vms = inject(WheaterViewModelService)

  @Input() set _address(address: AddressViewModel){
    // setto date di default
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    this.getWeatherInfoByDates(address, sevenDaysAgo, today);
  }


  getWeatherInfoByDates(ad: AddressViewModel, startDate: Date, endDate: Date){
    this.vms.getWeatherByDatesAndCoordinates(ad.latitude!, ad.longitude!, startDate, endDate).subscribe({
      next: (response?: WeatherViewModel) => {
        if(response){
          console.log(`dati meteo ricevuti per: ${ad.address}`);
          console.log(response);
        }
      }
    })
  }



}
