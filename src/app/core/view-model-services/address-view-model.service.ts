import { inject, Injectable } from "@angular/core";
import { AddressRestService } from "../rest-services/address-rest.service";
import { catchError, map, Observable, of } from "rxjs";
import { AddressModel, AddressViewModel, ResultModel } from "../models/address-models";

@Injectable({providedIn: 'root'})
export class AddressViewModelService {
    private restService = inject(AddressRestService);

    getAddressesListByName(address: string): Observable<AddressViewModel[]> {
        return this.restService.getAddressesListByName(address).pipe(
          map((response: AddressModel) => {
            if (!response || !response.results) return [] as AddressViewModel[];
      
            const listConverted: AddressViewModel[] = response.results.map(
              (model: ResultModel) => new ResultModel(model).toViewModel()
            );
            return this._filter(address, listConverted);
          }),
          catchError((error) => {
            console.error('Errore durante il recupero degli indirizzi:', error);
            return of([]);
          })
        );
      }

    private _filter(name: string, list: AddressViewModel[]): AddressViewModel[] {
        const filterValue = name.toLowerCase();
    
        return list.filter((add: AddressViewModel) =>
          add.address?.toLowerCase().includes(filterValue)
        );
      }

}