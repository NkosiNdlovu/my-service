import { Component, ElementRef, ViewChild } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation";
import { AngularFirestore } from "angularfire2/firestore";
import { NavController, AlertController, NavParams } from "ionic-angular";

declare var google;

@Component({
  selector: "page-map",
  templateUrl: "map.html"
})
export class MapPage {
  @ViewChild("map") mapElement: ElementRef;
  map: any;
  start = "chicago, il";
  end = "chicago, il";
  serviceRequests: any;

  serviceRequest: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  mapCenter: any;

  constructor(
    public navCtrl: NavController,
    public db: AngularFirestore,
    public geolocation: Geolocation,
    private alertCtrl: AlertController,
    public navParams: NavParams
  ) {
    let context = this;

    this.serviceRequests = [];

    this.serviceRequests = navParams.get("serviceRequests");
  }

  ionViewDidLoad() {
    console.log(this.serviceRequests);
    let context = this;
    if (!this.serviceRequests) {
      this.db
        .collection("/serviceRequests")
        .valueChanges()
        .subscribe(data => {
          this.serviceRequests = data;
          context.createMapView();
        });
    } else {

      context.createMapView();

    }
  }

  createMapView() {
    let context = this;
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        alert(resp.coords.latitude);
        context.mapCenter = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        };
        context.initMap();
      })
      .catch(error => {
        context.mapCenter = { lat: -25.73134, lng: 28.21837 };
        context.initMap();
        let alert = this.alertCtrl.create({
          title: "Success!",
          subTitle:
            "Unable to access you location, please turn on you location",
          buttons: ["Dismiss"]
        });
        alert.present();
      });
  }
  showCurrentLocation() {
    this.geolocation.watchPosition().subscribe(
      position => {
        if (!position.coords) {
          return;
        }

        let latLng = new google.maps.LatLng(
          position.coords.longitude,
          position.coords.latitude
        );

        let marker = new google.maps.Marker({
          map: this.map,
          icon: new google.maps.MarkerImage(
            "//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png",
            new google.maps.Size(22, 22),
            new google.maps.Point(0, 18),
            new google.maps.Point(11, 11)
          ),
          position: latLng
        });

        let content = "<h4>You are here</h4>";
        this.addInfoWindow(marker, content);
      },
      err => {
        console.log(err);
      }
    );
  }
  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, "click", () => {
      infoWindow.open(this.map, marker);
    });
  }
  addMarkersToMap(request) {
    if (!request.location) {
      return;
    }

    var position = new google.maps.LatLng(
      request.location.latitude,
      request.location.longitude
    );
    var m = new google.maps.Marker({ position: position, title: "" });
    m.setMap(this.map);
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: this.mapCenter
    });

    this.directionsDisplay.setMap(this.map);

    this.serviceRequests.forEach(request => {
      this.addMarkersToMap(request);
    });

    this.showCurrentLocation();
  }

  calculateAndDisplayRoute() {
    this.directionsService.route(
      {
        origin: this.start,
        destination: this.end,
        travelMode: "DRIVING"
      },
      (response, status) => {
        if (status === "OK") {
          this.directionsDisplay.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
}
