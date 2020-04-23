import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models';
import { LocalStorageService } from './local-storage.service';
import { GenericService } from './generic.service';
import { IAuth } from './auth.interface';
import { Tenant } from '../models/tenant.model';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UxService } from './ux.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService implements IAuth {

  private _authApi: GenericService<any>;
  private _tenantApi: GenericService<Tenant>;
  private _user: User
  private _tenant: Tenant
  private _userSubject = new Subject<User>();
  private _tenantSubject = new Subject<Tenant>();

  public tenantChanges = this._tenantSubject.asObservable();
  public userChanges = this._userSubject.asObservable();

  constructor(private localDb: LocalStorageService,
    private http: HttpClient,
    private router: Router,
    private uxService: UxService) {
    this._authApi = new GenericService(this.http, this, this.uxService);
    this._tenantApi = new GenericService(this.http, this, this.uxService);
    this.setTenant()
  }

  login(phone, password) {
    this._authApi.create('users/login', { phone: phone, password: password }).subscribe(user => {
      this._user = user;
      this.localDb.update('user', this._user);
      this._userSubject.next(this._user)
      this._tenant = user.tenant;
      this.localDb.update('tenant', this._tenant);
      this._tenantSubject.next(this._tenant)
      this.uxService.showInfo("Succefully Logged In")
      this.router.navigate(["home"])
    })
  }

  confirm(phone, otp) {
    this._authApi.create('users/confirm', { phone: phone, otp: otp }).subscribe(user => {
      this._user = user;
      this.localDb.update('user', this._user);
      this._userSubject.next(this._user)
      this._tenant = user.tenant;
      this.localDb.update('tenant', this._tenant);
      this._tenantSubject.next(this._tenant)
      this.uxService.showInfo("Registered Succefully")
      this.router.navigate(["home"])
    })
  }

  register(user): Observable<any> {
    return this._authApi.create('users/create', user)
  }

  codeExists(code: String): Boolean {
    let result = true
    this._authApi.get(`users/codeExists/${code}`).subscribe(response => {
      if (!response || response.exists == undefined) {
        result = true
      }
      result = !response.exists
    })
    return result
  }

  phoneExists(phone: number): Boolean {
    let result = true
    this._authApi.get(`users/phoneExists/${phone}`).subscribe(response => {
      if (!response || response.exists == undefined) {
        result = true
      }
      result = !response.exists
    })
    return result
  }

  currentTenant(): Tenant {
    if (this._tenant) {
      return this._tenant;
    }

    const savedTenant = this.localDb.get('tenant');

    if (!savedTenant) {
      return null
    }

    this._tenant = new Tenant(savedTenant)

    return this._tenant;

  }

  currentUser(): User {

    if (this._user && !this._user.session) {
      this._user = null
      return null
    }

    if (this._user) {
      return this._user;
    }

    const savedUser = this.localDb.get('user');

    if (!savedUser || !savedUser.session) {
      this._user = null
      return null
    }

    this._user = new User(savedUser)

    return this._user;
  }

  hasPermission(permissions: string | string[]): boolean {
    return true
  }

  setTenant() {

    const code = environment.tenant

    this._tenantApi.get('tenants/' + code).subscribe(tenant => {
      this.localDb.update('tenant', tenant);
      this._tenant = tenant
      this._tenantSubject.next(this._tenant)
    })

  }

  changeUser(user: User) {
    user.session = this._user.session
    this.localDb.update('user', user);
    this._user = user
    this._userSubject.next(this._user)
  }

  logout() {
    this._authApi.get(`users/logout/${this._user.session.id}`).subscribe()
    const tenant = this.localDb.get('tenant');
    this.localDb.clear();
    this.localDb.update('tenant', tenant);
    this._userSubject.next(null);
    this._userSubject.next(null);
    this.uxService.showInfo("Logged Out Succefully")
    this.router.navigate(["/"])
  }

}
