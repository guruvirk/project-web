import { Component, OnInit, OnDestroy } from '@angular/core';
import { Transaction } from '../models';
import { TransactionService } from '../services/transaction.service';
import { UxService } from '../services/ux.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['label', 'coins', 'date', 'status'];
  transactions: Transaction[];
  timeOutIDs: any[] = [];

  constructor(private api: TransactionService,
    private uxService: UxService) { }

  ngOnInit() {
    this.getData()
  }

  ngOnDestroy(): void {
    this.timeOutIDs.forEach(id => clearTimeout(id));
  }

  getData() {
    this.getTransactions()
    let this_new = this
    this.timeOutIDs.push(
    setTimeout(function () {
      this_new.getData()
    }, 30000)
    );
  }

  getTransactions() {
    this.api.search({ my: true }).subscribe(items => {
      this.transactions = items
    })
  }

  cancel(transaction: Transaction) {
    this.api.cancel(transaction).subscribe(() => {
      this.uxService.showInfo("Updated Successfully")
      this.getTransactions()
    })
  }

}
