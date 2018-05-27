import { Component, ElementRef, ViewChild } from "@angular/core";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import { AngularFirestore } from "angularfire2/firestore";
import { NavController, AlertController, NavParams } from "ionic-angular";
import { Observable } from "rxjs/Observable";

declare var google;

@Component({
  selector: "page-map",
  templateUrl: "map.html"
})
export class MapPage {
  currentPosition$: Observable<Geoposition>;
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
    console.log(this.serviceRequests);
  }

  ionViewDidLoad() {
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

  ngOnViewDidLoad() {
    // this.currentPosition$.
  }

  createMapView() {
    let context = this;

    this.currentPosition$ = this.geolocation.watchPosition();

    this.currentPosition$.subscribe(
      resp => {
        alert("doing what");
        // set center
        if (
          context.serviceRequests.length == 1 &&
          context.serviceRequests[0].location
        ) {
          context.mapCenter = {
            lat: context.serviceRequests[0].location.latitude,
            lng: context.serviceRequests[0].location.longitude
          };
        } else {
          context.mapCenter = {
            lat: resp.coords.latitude,
            lng: resp.coords.longitude
          };
        }

        // create map
        context.initMap();
      },
      error => {
        // set center
        if (
          context.serviceRequests.length == 1 &&
          context.serviceRequests[0].location
        ) {
          context.mapCenter = {
            lat: context.serviceRequests[0].location.latitude,
            lng: context.serviceRequests[0].location.longitude
          };
        } else {
          context.mapCenter = { lat: -25.73134, lng: 28.21837 };
        }

        // create map
        context.initMap();
        let alert = this.alertCtrl.create({
          title: "Success!",
          subTitle:
            "Unable to access you location, please turn on you location",
          buttons: ["Dismiss"]
        });
        alert.present();
      }
    );
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
    let sizeX = 36;
    let sizeY = 52;

    let icon = {
      url: "assets/img/car-marker.svg",
      size: new google.maps.Size(sizeX, sizeY),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(sizeX / 2, sizeY / 2)
    };

    let m = new google.maps.Marker({
      position: position,
      title: "",
      icon: icon
    });
    m.setMap(this.map);
  }

  initMap() {
    let context = this;
    if (!this.mapCenter) {
      this.mapCenter = { lat: -25.73134, lng: 28.21837 };
    }

    console.log(this.mapCenter);

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: this.mapCenter,
      mapTypeControl: false,
      zoomControl: true,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    });

    this.directionsDisplay.setMap(this.map);

    this.serviceRequests.forEach(request => {
      context.addMarkersToMap(request);
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
