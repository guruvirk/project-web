import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { UxService } from '../../services/ux.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  phone: number
  amount: number
  tnc: Boolean
  upi: string

  constructor(private auth: RoleService,
    private transactionService: TransactionService,
    private router: Router,
    private uxService: UxService) { }

  ngOnInit() {
  }

  sell() {
    if (!this.auth.currentUser().sellLimit) {
      this.uxService.handleError("Limit Exausted for Today")
      return
    }
    if (!this.phone && !this.upi) {
      this.uxService.handleError("Paytm Mobile No or UPI is required")
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
    if (!this.tnc) {
      this.uxService.handleError("Please accept T&C")
      return
    }
    this.transactionService.out(this.phone, this.upi, this.amount).subscribe(transaction => {
      if (transaction && transaction.status == "pending") {
        this.uxService.showInfo(`${transaction.coins} Coins Sell Request Submitted`)
        let user = this.auth.currentUser()
        user.coins = transaction.user.coins
        user.sellLimit = transaction.user.sellLimit
        this.auth.changeUser(user)
        this.router.navigate(["home"])
      }
    })
  }

}
