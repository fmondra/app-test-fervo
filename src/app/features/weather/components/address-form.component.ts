import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AutoComplete, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { AddressViewModel } from '../../../core/models/address-models';
import { AddressViewModelService } from '../../../core/view-model-services/address-view-model.service';
import { AddressService } from '../../../core/services/address.service';

@Component({
  selector: 'app-address-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    AutoComplete,
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss',
})
export class AddressFormComponent {
  private vms = inject(AddressViewModelService);
  private fb = inject(FormBuilder);
  private service = inject(AddressService);

  @Output() addressSelectedOutput = new EventEmitter<AddressViewModel>();


  form: FormGroup;
  addressList: AddressViewModel[] = [];
  suggestions: { name: string; code: string }[] = [];

  destroy$ = new Subject<void>();

  constructor() {
    this.form = this.fb.group({
      address: new FormControl(),
    });
    this.createSubscriptions();

    //default address
    const addressForChild: AddressViewModel = new AddressViewModel({id: 100, address: 'Via Carlo Citerni, 43044 Parma PR, Italia', latitude: 44.7813559, longitude: 10.2603056});
    this.service.setAddress(addressForChild!)
  }

  createSubscriptions() {
    this.form
      .get('address')
      ?.valueChanges.pipe(
        takeUntil(this.destroy$),
        filter((val) => val && val.length > 3),
        distinctUntilChanged(),
        debounceTime(200),
        switchMap((val: string) => {
          // valorizzo la lista dei suggerimenti
          return this.vms.getAddressesListByName(val).pipe(
            map((list: AddressViewModel[]) => {
              this.addressList = list;
              this.suggestions = list.map((item) => ({
                name: item.address ?? '',
                code: item.id !== undefined ? item.id.toString() : '',
              }));
              return list;
            })
          );
        })
      )
      .subscribe({
        next: (val) => {
          // console.log('val ', val);
        },
      });
  }

  displayFn(address: AddressViewModel): string {
    return address.address || '';
  }

  onSelectedAddress($event: AutoCompleteSelectEvent) {
    const addressCode = $event.value.code;
    const address = this.addressList.find(add => add.id?.toString() === addressCode);
    // this.addressSelectedOutput.emit(address);
    this.service.setAddress(address!)

  }
}
