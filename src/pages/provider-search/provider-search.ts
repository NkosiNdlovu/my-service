import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFirestore } from "angularfire2/firestore";
import { ServiceProvider } from "../../models/serviceProvider";

// @IonicPage()
@Component({
  selector: "page-provider-search",
  templateUrl: "provider-search.html"
})
export class ProviderSearchPage {
  searchText: string;
  providers: Array<ServiceProvider>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFirestore
  ) {}

  ionViewDidLoad() {
    this.db
    .collection("/serviceProviders")
    .valueChanges()
    .subscribe((data: Array<ServiceProvider>) => {
      this.providers = data;
    });
  }

  onSearchInput(event) {

    this.db
      .collection("/serviceProviders", ref =>
        ref.where("name", "==", this.searchText)
      )
      .valueChanges()
      .subscribe((data: Array<ServiceProvider>) => {
        this.providers = data;
      });
  }

  onSearchCancel(event) {}
}
