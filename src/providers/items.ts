import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

import { Item } from '../models/item';
import { Api } from './api';

@Injectable()
export class Items {

  constructor( public api: Api) {
  }

  query(params?: any) {
    return this.api.get('/items', params)
      .map(resp => resp.json());
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
