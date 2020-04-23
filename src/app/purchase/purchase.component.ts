import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { Router } from '@angular/router';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  transactionId: string
  amount: number

  constructor(private auth: RoleService,
    private transactionService: TransactionService,
    private router: Router) { }

  ngOnInit() {
  }

  add() {
    if (!this.transactionId) {
      return "Transaction Id is required"
    }
    if (!this.amount || this.amount < 1) {
      return "Amount is required"
    }
    if (this.amount > 10000) {
      return "Limit is 10,000"
    }
    this.transactionService.add(this.amount, this.transactionId).subscribe(transaction => {
      if (transaction && transaction.status == "done") {
        this.auth.changeUser(transaction.user)
        this.router.navigate(["home"])
      }
    })
  }

}
