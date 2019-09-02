import { VehicleType } from './../pages/request-service/request-service.model';
import { ServiceProvider } from './serviceProvider';

export class ServiceRequest{
  bookingDate?:Date;
  comment?: string ;
  acknowledgedBy?: string;
  id: string ;
  location?: any;
  service: IdName;
  vehicleType: VehicleType;
  user: UserNameSurname;
  requestDate?:Date;
  bookingTimeRangeStart?: number;
  bookingTimeRangeEnd?: number;
  providerId?: string;
  provider?: ServiceProvider;
  addedOptions: any[];
  price: any;
  status: string;

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
  phoneNumber: string;
  id: string;
  name: string  ;
  surname?: string;
}
