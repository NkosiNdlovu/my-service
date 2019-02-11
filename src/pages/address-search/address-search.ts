import { Component, NgZone } from '@angular/core';
import { ViewController } from 'ionic-angular';

declare var google;

@Component({
  selector: "address-search",
  templateUrl: "address-search.html"
})
export class AddressSearchPage {
  autocompleteItems;
  autocomplete;
  geo: any;

  service = new google.maps.places.AutocompleteService();

  constructor(public viewCtrl: ViewController, private zone: NgZone) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ""
    };
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
    this.geo = item;
    console.log(this.geo)
    this.geoCode(this.geo); //convert Address to lat and long
  }

  updateSearch() {
    if (this.autocomplete.query == "") {
      this.autocompleteItems = [];
      return;
    }

    let me = this;
    this.service.getPlacePredictions(
      {
        input: this.autocomplete.query,
        componentRestrictions: {
          country: "za"
        }
      },
      (predictions, status) => {
        me.autocompleteItems = [];

        me.zone.run(() => {
          if (predictions != null) {
            predictions.forEach(prediction => {
              me.autocompleteItems.push(prediction.description);
            });
          }
        });
      }
    );
  }

  //convert Address string to lat and long
  geoCode(address: any) {
    let geocoder = new google.maps.Geocoder();
    console.log(address)
    geocoder.geocode({ address: address }, (results, status) => {

      let latitude = results[0].geometry.location.lat();
      let longitude = results[0].geometry.location.lng();

      this.viewCtrl.dismiss({
        latitude: latitude,
        longitude: longitude,
        address: address,
        useCurrentLocation: false
      });
    });
  }

  useCurrentLocation(){
    this.viewCtrl.dismiss({
      useCurrentLocation: false
    });
  }
}
