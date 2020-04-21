import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models';
import { LocalStorageService } from './local-storage.service';
import { GenericService } from './generic.service';
import { IAuth } from './auth.interface';
import { Tenant } from '../models/tenant.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleService implements IAuth {

  private _authApi: GenericService<any>;
  private _user: User
  private _tenant: Tenant
  private _userSubject = new Subject<User>();
  private _tenantSubject = new Subject<Tenant>();

  public tenantChanges = this._tenantSubject.asObservable();
  public userChanges = this._userSubject.asObservable();

  constructor(private localDb: LocalStorageService,
    private http: HttpClient,
    private router: Router) {
    this._authApi = new GenericService(this.http, this);
  }

  login(phone, password) {
    this._authApi.create('users/login', { phone: phone, password: password }).subscribe(user => {
      this._user = user;
      this.localDb.update('user', this._user);
      this._userSubject.next(this._user)
      this.router.navigate(["home"])
    })
  }

  currentTenant(): Tenant {
    if (this._tenant) {
      return this._tenant;
    }

    const savedTenant = this.localDb.get('tenant') || new Tenant({ code: "ludo" });

    if (!savedTenant) {
      return null
    }

    this._tenant = new Tenant(savedTenant)
    this._tenantSubject.next(this._tenant)

    return this._tenant;
  }

  currentUser(): User {
    if (this._user) {
      return this._user;
    }

    const savedUser = this.localDb.get('user');

    if (!savedUser) {
      return null
    }

    this._user = new User(savedUser)

    return this._user;
  }

  hasPermission(permissions: string | string[]): boolean {
    return true
  }

}
