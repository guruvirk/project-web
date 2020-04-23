import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { Router } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { UxService } from '../services/ux.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  phone: number
  amount: number
  tnc: Boolean

  constructor(private auth: RoleService,
    private transactionService: TransactionService,
    private router: Router,
    private uxService: UxService) { }

  ngOnInit() {
  }

  sell() {
    if (!this.phone) {
      this.uxService.handleError("Paytm Mobile No is required")
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
    this.transactionService.out(this.phone, this.amount).subscribe(transaction => {
      if (transaction && transaction.status == "pending") {
        this.uxService.showInfo(`${transaction.coins} Coins Sell Request Submitted`)
        this.auth.changeUser(transaction.user)
        this.router.navigate(["home"])
      }
    })
  }

}
