import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string
  age: number
  phone: number
  code: string
  password: string
  confirmPassword: string
  tnc: Boolean
  codeValid: Boolean = false
  phoneValid: Boolean = false

  constructor(private auth: RoleService,
    private router: Router) { }

  ngOnInit() {
  }

  checkPhoneValid() {
    if (this.phone) {
      this.phoneValid = this.auth.phoneExists(this.phone)
    }
  }

  checkCodeValid() {
    if (this.code) {
      this.codeValid = this.auth.codeExists(this.code)
    }
  }

  register() {
    if (!this.codeValid) {
      return "Username is already taken"
    }
    if (!this.phoneValid) {
      return "Mobile No is already taken"
    }
    if (!this.tnc) {
      return "Please accept T&C"
    }
    if (this.confirmPassword != this.password) {
      return "Password Does't Match"
    }
    this.auth.register({
      name: this.name,
      age: this.age,
      password: this.password,
      code: this.code,
      phone: this.phone,
    }).subscribe(response => {
      if (response && response.id) {
        this.router.navigate(["confirm"])
      }
      else {
        return "Error While Registering"
      }
    })
  }

}
