import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddressFormComponent } from "./features/weather/components/address-form.component";
import { AddressViewModel } from './core/services/models/address-models';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AddressFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app-test-fervo-group';

  onAddressSelected($event: AddressViewModel){
    console.log('address received from child ', $event);
  }
}
