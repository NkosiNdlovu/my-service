import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceRequest } from '../../models/serviceRequest';

@Injectable()
export class RequestProvider {

  currentServiceRequest: ServiceRequest;

  constructor() {
  }

}
