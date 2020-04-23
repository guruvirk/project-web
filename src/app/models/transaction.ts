import { User } from './user.model';

export class Transaction {

  id: string;
  date: Date;
  type: string;
  user: User;
  status: string;
  coins: Number;
  accNo: Number;
  transactionId: string;

  constructor(obj?: any) {
    if (!obj) {
      return;
    }

    this.id = obj.id;
    this.date = obj.date;
    this.type = obj.type;
    this.user = obj.user;
    this.status = obj.status;
    this.user = new User(obj.user);
    this.coins = obj.coins;
    this.transactionId = obj.transactionId;
    this.accNo = obj.accNo;

  }
}
