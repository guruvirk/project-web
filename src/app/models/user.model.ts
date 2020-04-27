import { Session } from './session.model';
import { Tenant } from '.';

export class User {

  id: string;
  code: string;
  name: string;
  dob: Date;
  age: Number;
  bloodGroup: any;
  gender: any;
  phone: string;
  email: string;
  status: string;
  timeStamp: Date;
  session: Session;
  coins: Number;
  tenant: Tenant;
  permissions: String[]

  constructor(obj?: any) {
    if (!obj) {
      return;
    }

    this.id = obj.id;
    this.code = obj.code;
    this.email = obj.email;
    this.phone = obj.phone;
    this.name = obj.name;
    this.status = obj.status;
    this.dob = obj.dob;
    this.age = obj.age;
    this.bloodGroup = obj.bloodGroup;
    this.gender = obj.gender;
    this.session = new Session(obj.session);
    this.coins = obj.coins;
    this.tenant = new Tenant(obj.tenant);
    this.permissions = obj.permissions || []
  }
}
