export class UserAccount {
  id: string;
  firstName: string;
  lastName: string;
  skills: string;
  email: string;
  phone: string;
  password: string;
  city: string;
  state: string;
  country: string;
  roles: Roles;
  workingLocation: any ;
}

export interface Roles {
  user?: boolean;
  provider?: boolean;
  admin?:  boolean;
}
