import { Session } from './session.model';

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

  }
}
