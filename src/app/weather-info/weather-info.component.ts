import { Component, Input } from '@angular/core';
import { AddressViewModel } from '../core/services/models/address-models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-info',
  imports: [
    CommonModule
  ],
  templateUrl: './weather-info.component.html',
  styleUrl: './weather-info.component.scss'
})
export class WeatherInfoComponent {
  @Input() address: AddressViewModel | undefined;


}
