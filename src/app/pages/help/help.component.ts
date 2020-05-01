import { Component, OnInit } from '@angular/core';
import { Tenant } from '../../models';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  tenant: Tenant

  constructor(private auth: RoleService) {
    this.tenant = auth.currentTenant()
  }

  ngOnInit() {
  }

}
