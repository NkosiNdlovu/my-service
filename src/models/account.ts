export class UserAccount {
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
}

export interface Roles {
  user?: boolean;
  provider?: boolean;
  admin?:  boolean;
}
