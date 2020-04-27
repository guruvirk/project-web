import { Component } from '@angular/core';
import { RoleService } from './services/role.service';
import { User } from './models';
import { Tenant } from './models/tenant.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUser: User;
  currentTenant: Tenant;

  constructor(
    public auth: RoleService,
    private roter: Router
  ) {
    this.auth.userChanges.subscribe((user) => {
      this.currentUser = user;
    });
    this.auth.tenantChanges.subscribe((tenant) => {
      this.currentTenant = tenant;
    });
  }

  ngOnInit(): void {
    this.currentUser = this.auth.currentUser();
    this.currentTenant = this.auth.currentTenant();
    if(this.currentUser){
      this.roter.navigate(["home"])
    }
  }

  logout(){
    this.auth.logout()
  }
}
