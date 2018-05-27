import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class LocationTracker {

  constructor(public http: Http) {
    console.log('Hello LocationTracker Provider');
  }

}
