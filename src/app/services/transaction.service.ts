import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models';
import { GenericService } from './generic.service';
import { RoleService } from './role.service';
import { Observable } from 'rxjs';
import { UxService } from './ux.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private _txnApi: GenericService<Transaction>;

  constructor(private http: HttpClient,
    private roleService: RoleService,
    private uxService: UxService) {
    this._txnApi = new GenericService(this.http, this.roleService, this.uxService);
  }

  add(amount, transactionId): Observable<Transaction> {
    return this._txnApi.create('transactions/add', { amount: amount, transactionId: transactionId })
  }

  out(phone, coins): Observable<Transaction> {
    return this._txnApi.create('transactions/out', { phone: phone, coins: coins })
  }

  refund(transaction: Transaction): Observable<Transaction> {
    return this._txnApi.create('transactions/refund', { transaction: transaction })
  }

  resolve(transaction: Transaction): Observable<Transaction> {
    return this._txnApi.create('transactions/resolve', { transaction: transaction })
  }

  search(query): Observable<Transaction[]> {
    return this._txnApi.search(`transactions`, query)
  }

}
