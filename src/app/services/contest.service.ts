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
  private _upload: GenericService<String>;

  constructor(private http: HttpClient,
    private roleService: RoleService,
    private uxService: UxService) {
    this._api = new GenericService(this.http, this.roleService, this.uxService);
    this._upload = new GenericService(this.http, this.roleService, this.uxService);
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

  upload(file: File): Observable<String> {
    return this._upload.upload(`upload`, file)
  }

  roomCode(code, contest: Contest): Observable<Contest> {
    return this._api.create('contests/roomCode', { contest: contest, roomCode: code })
  }

  guestResult(model: any): Observable<Contest> {
    return this._api.create('contests/guestResult', model)
  }

  hostResult(model: any): Observable<Contest> {
    return this._api.create('contests/hostResult', model)
  }

  conflictResult(contest: Contest, result: string): Observable<Contest> {
    return this._api.create('contests/conflictResult', { contest: contest, result: result })
  }

  cancelRequestResult(contest: Contest, result: string): Observable<Contest> {
    return this._api.create('contests/cancelRequestResult', { contest: contest, result: result })
  }

}
