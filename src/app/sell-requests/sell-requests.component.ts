import { Component, OnInit } from '@angular/core';
import { Transaction } from '../models';
import { TransactionService } from '../services/transaction.service';
import { UxService } from '../services/ux.service';

@Component({
  selector: 'app-sell-requests',
  templateUrl: './sell-requests.component.html',
  styleUrls: ['./sell-requests.component.css']
})
export class SellRequestsComponent implements OnInit {

  displayedColumns: string[] = ['label', 'mobile', 'coins', 'date', 'action'];
  transactions: Transaction[];

  constructor(private api: TransactionService,
    private uxService: UxService) { }

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
    this.api.search({ status: "pending", type: "out" }).subscribe(items => {
      this.transactions = items
    })
  }

  resolve(transaction: Transaction) {
    this.api.resolve(transaction).subscribe(() => {
      this.uxService.showInfo("Updated Successfully")
      this.getTransactions()
    })
  }

  refund(transaction: Transaction) {
    this.api.refund(transaction).subscribe(() => {
      this.uxService.showInfo("Updated Successfully")
      this.getTransactions()
    })
  }

}
