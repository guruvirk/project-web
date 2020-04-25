import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { RoleService } from './role.service';
import { Observable } from 'rxjs';
import { UxService } from './ux.service';
import { Contest } from '../models/contest';

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  private _api: GenericService<Contest>;

  constructor(private http: HttpClient,
    private roleService: RoleService,
    private uxService: UxService) {
    this._api = new GenericService(this.http, this.roleService, this.uxService);
  }

  create(coins): Observable<Contest> {
    return this._api.create('contests/create', { coins: coins })
  }

  get(id): Observable<Contest> {
    return this._api.get(`contests/${id}`)
  }

  cancel(id): Observable<Contest> {
    return this._api.delete(`contests/${id}`)
  }

  search(query): Observable<Contest[]> {
    return this._api.search(`contests`, query)
  }

  roomCode(code, contest: Contest): Observable<Contest> {
    return this._api.create('contests/roomCode', { contest: contest, roomCode: code })
  }

}
