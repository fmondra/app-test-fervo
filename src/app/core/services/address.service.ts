import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddressViewModel } from '../models/address-models';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private addressSubject = new BehaviorSubject<AddressViewModel | null>(null);

  constructor() {}

  setAddress(value: AddressViewModel): void {
    console.log('setting address on service -> ', value);
    this.addressSubject.next(value);
  }

  getAddress(): Observable<AddressViewModel | null> {
    return this.addressSubject.asObservable();
  }

  clearAddress(): void {
    this.addressSubject.next(null);
  }
}
