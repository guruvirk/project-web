import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuth } from './auth.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericService<TModel> {

  constructor(
    private http: HttpClient,
    private _auth: IAuth, ) { }

  create(url, model): Observable<TModel> {
    return this.http.post<TModel>(`${environment.url}/${url}`, model, { headers: this.getHeaders() })
  }

  get(url): Observable<TModel> {
    return this.http.get<TModel>(`${environment.url}/${url}`, { headers: this.getHeaders() })
  }

  search(url): Observable<TModel> {
    return this.http.get<TModel>(`${environment.url}/${url}`, { headers: this.getHeaders() })
  }

  update(url, model): Observable<TModel> {
    return this.http.put<TModel>(`${environment.url}/${url}`, model, { headers: this.getHeaders() })
  }

  delete(url): Observable<TModel> {
    return this.http.delete<TModel>(`${environment.url}/${url}`, { headers: this.getHeaders() })
  }

  getHeaders(): HttpHeaders {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');


    if (this._auth) {
      
      const user = this._auth.currentUser();
      const tenant = this._auth.currentTenant();

      if (user && user.session && user.session.id) {
        headers = headers.set('x-session', user.session.id);
      }

      if (tenant && tenant.code) {
        headers = headers.set('x-tenant', tenant.code);
      }

    }

    return headers
  }
}
