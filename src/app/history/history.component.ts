import { Component, OnInit } from '@angular/core';
import { Transaction } from '../models';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  displayedColumns: string[] = ['label', 'coins', 'date', 'status'];
  transactions: Transaction[];

  constructor(private api: TransactionService) { }

  ngOnInit() {
    this.getData()
  }

  getData() {
    this.getTransactions()
    let this_new = this
    setTimeout(function () {
      this_new.getData()
    }, 30000);
  }

  getTransactions() {
    this.api.search({ my: true }).subscribe(items => {
      this.transactions = items
    })
  }

}
