export class AddressModel {
  results?: ResultModel[];

  constructor(data?: AddressModel) {
    if (data) {
      this.results = data.results;
    }
  }
}

export class ResultModel {
  formatted?: string;
  geometry?: Geometry;

  constructor(data?: ResultModel) {
    if (data) {
      this.formatted = data.formatted;
      this.geometry = data.geometry;
    }
  }

  toViewModel(): AddressViewModel {
    let vm: AddressViewModel = new AddressViewModel({
      id: Math.floor(Math.random() * 100) + 1,
      address: this.formatted,
      latitude: this.geometry?.lat,
      longitude: this.geometry?.lng,
    });
    return vm;
  }
}

export class Geometry {
  lat?: number;
  lng?: number;

  constructor(data?: Geometry) {
    if (data) {
      this.lat = data.lat;
      this.lng = data.lng;
    }
  }
}

export class AddressViewModel {
  id?: string | number;
  address?: string;
  latitude?: number;
  longitude?: number;

  constructor(data?: AddressViewModel) {
    if (data) {
      this.id = data.id;
      this.address = data.address;
      this.latitude = data.latitude;
      this.longitude = data.longitude;
    }
  }
}
