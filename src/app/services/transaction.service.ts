import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models';
import { GenericService } from './generic.service';
import { RoleService } from './role.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private _txnApi: GenericService<Transaction>;

  constructor(private http: HttpClient,
    private roleService: RoleService) {
    this._txnApi = new GenericService(this.http, this.roleService);
  }

  add(amount, transactionId): Observable<Transaction> {
    return this._txnApi.create('transactions/add', { amount: amount, transactionId: transactionId })
  }

  out(phone, coins): Observable<Transaction> {
    return this._txnApi.create('transactions/out', { phone: phone, coins: coins })
  }

}
