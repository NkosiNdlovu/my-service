import { Component, NgZone } from "@angular/core";
import { ViewController, NavParams } from "ionic-angular";
import { CarWashOption } from "./car-wash-models";

declare var google;

@Component({
  selector: "car-wash-options",
  templateUrl: "car-wash-options.html"
})
export class CarWashOptionsPage {
  selectedCarWashPrice = 95;
  options: Array<CarWashOption>;
  constructor(public viewCtrl: ViewController, params: NavParams) {
    this.selectedCarWashPrice = params.get("selectedCarWashPrice");
    this.options = [];
    this.options.push({
      name: "Hand polishing",
      price: 45,
      selected: false
    });

    this.options.push({
      name: "Engine Cleaning",
      price: 35,
      selected: false
    });
  }

  getTotalPrice() {
    let total = this.options
      .filter(o => o.selected == true)
      .map(o => o.price)
      .reduce((sum, current) => sum + current, 0);

    total += this.selectedCarWashPrice;

    return total;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submit() {
    this.viewCtrl.dismiss(this.options);
  }
}
