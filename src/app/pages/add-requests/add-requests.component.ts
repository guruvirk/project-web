import { Component, OnInit, OnDestroy } from '@angular/core';
import { Transaction } from '../../models';
import { TransactionService } from '../../services/transaction.service';
import { UxService } from '../../services/ux.service';

@Component({
  selector: 'app-add-requests',
  templateUrl: './add-requests.component.html',
  styleUrls: ['./add-requests.component.css']
})
export class AddRequestsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['label', 'mobile', 'transactionId', 'coins', 'date', 'cancel', 'verify'];
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
    this.api.search({ status: ["pending"], type: "add" }).subscribe(items => {
      this.transactions = items
    })
  }

  resolve(transaction: Transaction) {
    this.api.resolveAdd(transaction).subscribe(() => {
      this.uxService.showInfo("Updated Successfully")
      this.getTransactions()
    })
  }


  refund(transaction: Transaction) {
    this.api.cancel(transaction).subscribe(() => {
      this.uxService.showInfo("Updated Successfully")
      this.getTransactions()
    })
  }

}
