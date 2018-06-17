import { NULL_EXPR } from "@angular/compiler/src/output/output_ast";
import { ServiceProvider } from "./serviceProvider";

export class ServiceRequest{
  bookingDate?:Date;
  comment?: string ;
  acknowledgedBy?: string;
  id: string ;
  location?: any;
  service: IdName;
  vehicleType: IdName;
  user: UserNameSurname;
  requestDate?:Date;
  bookingTimeRangeStart?: number;
  bookingTimeRangeEnd?: number;
  providerId?: string;
  provider?: ServiceProvider;

  constructor(){
    this.bookingDate = null;
    this.comment = null;
    this.location = null;
    this.service = null;
    this.user = null;
    this.requestDate = null;
    this.bookingTimeRangeEnd = null;
    this.bookingTimeRangeStart = null;
    this.providerId = null;
    this.provider = null;
  }
}

export class IdName{
  id:string;
  name:string;
}

export class UserNameSurname{
  id: string;
  name: string  ;
  surname?: string;
}

export class Guid {
  static newGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
      });
  }
}
