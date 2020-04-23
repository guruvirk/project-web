import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { Router } from '@angular/router';
import { TransactionService } from '../services/transaction.service';

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
    private router: Router) { }

  ngOnInit() {
  }

  sell() {
    if (!this.phone) {
      return "Paytm Mobile No is required"
    }
    if (!this.amount || this.amount < 1) {
      return "Amount is required"
    }
    if (this.amount > 10000) {
      return "Limit is 10,000"
    }
    if (!this.tnc) {
      return "Please accept T&C"
    }
    this.transactionService.out(this.phone, this.amount).subscribe(transaction => {
      if (transaction && transaction.status == "pending") {
        this.auth.changeUser(transaction.user)
        this.router.navigate(["home"])
      }
    })
  }

}
