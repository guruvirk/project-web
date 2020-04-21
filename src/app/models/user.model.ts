import { Session } from './session.model';

export class User {

  id: string;
  code: string;
  firstName: string;
  lastName: string;
  dob: Date;
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
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.status = obj.status;
    this.dob = obj.dob;
    this.bloodGroup = obj.bloodGroup;
    this.gender = obj.gender;
    this.session = new Session(obj.session);

  }
}
