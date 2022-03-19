import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IUser } from '../user';
import { Observable, observable } from 'rxjs';

interface Parameters {
  endpoint: string;
  headers: HttpHeaders | null;
  body: HttpParams | null;
  query: Array<Object> | null;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //TODO: change for remote url
  apiUrl: string = 'https://localhost:7056/api/users/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.apiCall({
      endpoint: '',
      headers: null,
      body: null,
      query: null,
    });
  }

  apiCall(params: Parameters): Observable<any> {
    let url: string =
      this.apiUrl +
      params.endpoint +
      (params.query ? '?' + params.query?.join('&') : '');
    return this.http.get<any>(url, {
      headers: params.headers!,
      params: params.body!,
    });
  }

  verifyUser(email: string, password: string): Observable<IUser> {
    //TODO: hash password
    //TODO: payload in body instead
    return this.apiCall({
      endpoint: `verify/${email}`,
      headers: new HttpHeaders({ password: password }),
      body: null,
      query: null,
    });
  }
}
