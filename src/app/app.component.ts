import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddressFormComponent } from "./features/weather/components/address-form.component";
import { AddressViewModel } from './core/models/address-models';
import { WeatherInfoComponent } from "./weather-info/weather-info.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AddressFormComponent, WeatherInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app-test-fervo-group';
}
