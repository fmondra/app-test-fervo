import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddressModel } from "../services/models/address-models";

@Injectable({providedIn: 'root'})
export class AddressRestService {
    private http = inject(HttpClient); 
    private apiKey: string = '9273ab4109d242e1ab898ed270f46a67';

    getAddressesListByName(addressName: string): Observable<AddressModel>{
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(addressName)}&key=${this.apiKey}&language=it&pretty=1`;
        return this.http.get<AddressModel>(`${url}`);
    }

}