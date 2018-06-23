import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

@Injectable()
export class LocationTracker {

  constructor() {
    console.log('Hello LocationTracker Provider');
  }

}
