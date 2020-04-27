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
  hostImage: string;
  hostCancelReason: string;
  hostVideo: string;
  guestResult: string;
  guestImage: string;
  guestCancelReason: string;
  guestVideo: string;
  bids: Bid[];
  applied: Boolean;
  result: string;

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
    this.hostImage = obj.hostImage;
    this.hostCancelReason = obj.hostCancelReason;
    this.hostVideo = obj.hostVideo;
    this.guestImage = obj.guestImage;
    this.guestCancelReason = obj.guestCancelReason;
    this.guestVideo = obj.guestVideo;
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
