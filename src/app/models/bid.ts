import { User } from './user.model';
import { Contest } from './contest';

export class Bid {

    id: string;
    date: Date;
    guest: User;
    contest: Contest;
    status: string;

    constructor(obj?: any) {
        if (!obj) {
            return;
        }

        this.id = obj.id;
        this.date = obj.date;
        this.status = obj.status;
        this.guest = new User(obj.guest);
        this.contest = new Contest(obj.contest);
    }
}
