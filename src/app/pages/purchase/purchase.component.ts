import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { UxService } from '../../services/ux.service';
import { Tenant } from '../../models';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  transactionId: string
  amount: number
  tenant: Tenant

  constructor(private auth: RoleService,
    private transactionService: TransactionService,
    private router: Router,
    private uxService: UxService) {
    this.tenant = auth.currentTenant()
  }

  ngOnInit() {
  }

  copy(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
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
    if (this.amount > 20000) {
      this.uxService.handleError("Limit is 20,000")
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
