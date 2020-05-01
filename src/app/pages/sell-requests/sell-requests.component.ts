import { Component, OnInit, OnDestroy } from '@angular/core';
import { Transaction } from '../../models';
import { TransactionService } from '../../services/transaction.service';
import { UxService } from '../../services/ux.service';

@Component({
  selector: 'app-sell-requests',
  templateUrl: './sell-requests.component.html',
  styleUrls: ['./sell-requests.component.css']
})
export class SellRequestsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['label', 'mobile', 'coins', 'date', 'action'];
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
    }, 100000));
  }

  getTransactions() {
    this.api.search({ status: ["pending", "initiated"], type: "out" }).subscribe(items => {
      this.transactions = items
    })
  }

  initiate(transaction: Transaction) {
    this.api.initiate(transaction).subscribe(() => {
      this.uxService.showInfo("Updated Successfully")
      this.getTransactions()
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
