import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { RoleService } from './role.service';
import { Observable } from 'rxjs';
import { UxService } from './ux.service';
import { Bid } from '../models/bid';
import { Contest } from '../models/contest';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  private _api: GenericService<Bid>;

  constructor(private http: HttpClient,
    private roleService: RoleService,
    private uxService: UxService) {
    this._api = new GenericService(this.http, this.roleService, this.uxService);
  }

  create(contest: Contest): Observable<Bid> {
    return this._api.create('bids/create', { contest: contest })
  }

  approve(bid: Bid): Observable<Bid> {
    return this._api.create('bids/approve', { bid: bid })
  }

  cancel(id): Observable<Bid> {
    return this._api.delete(`bids/${id}`)
  }

}
