import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import { UxService } from '../../services/ux.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  phone: Number
  password: String

  constructor(private auth: RoleService,
    private router: Router,
    private uxService: UxService) { }

  ngOnInit() {
    if (this.auth.currentUser()) {
      this.router.navigate(["home"])
    }
  }

  login() {
    if (!this.phone) {
      this.uxService.handleError("Mobile No is Required")
      return
    }
    if (this.phone < 1000000000) {
      this.uxService.handleError("Invalid Mobile No")
      return
    }
    if (!this.password) {
      this.uxService.handleError("Password is Required")
      return
    }
    this.auth.login(this.phone, this.password)
  }

}
