import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddressFormComponent } from "./features/weather/components/address-form.component";
import { AddressViewModel } from './core/services/models/address-models';
import { WeatherInfoComponent } from "./weather-info/weather-info.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AddressFormComponent, WeatherInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app-test-fervo-group';

  addressForChild: AddressViewModel = new AddressViewModel({id: 100, address: 'Via Carlo Citerni, 43044 Parma PR, Italia', latitude: 44.7813559, longitude: 10.2603056});

  onAddressSelected($event: AddressViewModel){
    console.log('address received from child ', $event);
    this.addressForChild = $event;
  }
}
