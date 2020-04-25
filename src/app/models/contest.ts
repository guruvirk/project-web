import { User } from './user.model';
import { Transaction } from './transaction';
import { Bid } from './bid';

export class Contest {

  id: string;
  date: Date;
  host: User;
  guest: User;
  wineer: User;
  hostTransaction: Transaction;
  guestTransaction: Transaction;
  status: string;
  coins: Number;
  roomCode: string;
  hostResult: string;
  guestResult: string;
  bids: Bid[];
  applied: Boolean;

  constructor(obj?: any) {
    if (!obj) {
      return;
    }

    this.id = obj.id;
    this.date = obj.date;
    this.roomCode = obj.roomCode;
    this.status = obj.status;
    this.host = new User(obj.host);
    this.guest = new User(obj.guest);
    this.wineer = new User(obj.wineer);
    this.hostTransaction = new Transaction(obj.hostTransaction);
    this.guestTransaction = new Transaction(obj.guestTransaction);
    this.coins = obj.coins;
    this.hostResult = obj.hostResult;
    this.guestResult = obj.guestResult;
    this.bids = []

    if (obj.status && obj.status == "published") {
      if (obj.bids) {
        obj.bids.forEach((item) => {
          this.bids.push(new Bid(item));
        });
      }
    }

  }
}
