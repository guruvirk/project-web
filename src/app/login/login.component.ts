import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  phone: Number
  password: String

  constructor(private auth: RoleService,
    private router: Router, ) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.phone, this.password)
  }

}
