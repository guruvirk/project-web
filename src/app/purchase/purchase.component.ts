import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { Router } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { UxService } from '../services/ux.service';

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
    private router: Router,
    private uxService: UxService) { }

  ngOnInit() {
  }

  add() {
    if (!this.transactionId) {
      this.uxService.handleError("Transaction Id is required")
      return
    }
    if (!this.amount || this.amount < 1) {
      this.uxService.handleError("Amount is required")
      return
    }
    if (this.amount > 10000) {
      this.uxService.handleError("Limit is 10,000")
      return
    }
    this.transactionService.add(this.amount, this.transactionId).subscribe(transaction => {
      if (transaction && transaction.status == "done") {
        this.uxService.showInfo(`${transaction.coins} Coins Added Succesfully`)
        let user = this.auth.currentUser()
        user.coins = transaction.user.coins
        this.auth.changeUser(user)
        this.router.navigate(["home"])
      }
    })
  }

}
