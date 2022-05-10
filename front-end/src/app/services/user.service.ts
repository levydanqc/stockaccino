import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../classes/users/user';
import { UserDto } from '../classes/users/userDto';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Constants } from '../../assets/constants';
import { TokenDto } from '../classes/users/tokenDTO';

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
  apiUrl = Constants.USER_URL;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  // Retourne tous les utilisateurs.
  getUsers(): Observable<User[]> {
    return this.apiCall({
      endpoint: '',
      headers: new HttpHeaders({
        Authorization: 'bearer ' + this.cookieService.get('token'),
      }),
      body: null,
      query: null,
    });
  }

  verifyEmail(email: string): any {
    return this.apiCall({
      endpoint: email,
      headers: null,
      body: null,
      query: null,
    });
  }

  getUserByEmail(email: string): Observable<User> {
    return this.apiCall({
      endpoint: `${email}`,
      headers: null,
      body: null,
      query: null,
    });
  }

  getUserById(): Observable<User> {
    return this.apiCall({
      endpoint: 'findById',
      headers: new HttpHeaders({
        Authorization: 'bearer ' + this.cookieService.get('token'),
      }),
      body: null,
      query: null,
    });
  }

  watchStock(symbol: string) {
    this.http
      .put(`${this.apiUrl}watch/${symbol}`, null, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + this.cookieService.get('token'),
        }),
      })
      .subscribe((res) => {});
  }

  unwatchStock(symbol: string) {
    this.http
      .put(`${this.apiUrl}unwatch/${symbol}`, null, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + this.cookieService.get('token'),
        }),
      })
      .subscribe((res) => {});
  }

  refuseRequest(email: string) {
    this.http
      .put(`${this.apiUrl}refuse/${email}`, null, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + this.cookieService.get('token'),
        }),
      })
      .subscribe((res) => {});
  }

  acceptRequest(email: string) {
    this.http
      .put(`${this.apiUrl}accept/${email}`, null, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + this.cookieService.get('token'),
        }),
      })
      .subscribe((res) => {});
  }

  removeFriend(email: string) {
    this.http
      .put(`${this.apiUrl}removeFriend/${email}`, null, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + this.cookieService.get('token'),
        }),
      })
      .subscribe((res) => {});
  }

  addFriend(email: string) {
    this.http
      .put(`${this.apiUrl}sendRequest/${email}`, null, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + this.cookieService.get('token'),
        }),
      })
      .subscribe((res) => {});
  }

  updateUser(email?: string, nom?: string, prenom?: string, password?: string) {
    let user!: User;
    this.getUserById().subscribe((data) => {
      user = data;
      if (email) {
        user.Email = email;
      }
      if (nom) {
        console.log(user);
        user.Nom = nom;
      }
      if (prenom) {
        user.Prenom = prenom;
      }
      if (password) {
        user.Password = password;
      }
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'bearer ' + this.cookieService.get('token'),
        }),
      };
      this.http
        .put(this.apiUrl + 'update', user, httpOptions)
        .subscribe((res) => {});
    });
  }

  postUser(email: string, password: string, nom: string, prenom: string) {
    let user: User = {
      Email: email,
      Prenom: prenom,
      Nom: nom,
      Password: password,
      Stocks: [],
      Amis: [],
      Requetes: [],
      Notifications: [],
    };
    this.http.post(this.apiUrl, user).subscribe((res) => {});
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

  verifyUser(email: string, password: string): Observable<User> {
    return this.apiCall({
      endpoint: `verify/${email}`,
      headers: new HttpHeaders({ password: password }),
      body: null,
      query: null,
    });
  }

  login(email: string, password: string): Observable<TokenDto> {
    let user: UserDto = {
      Email: email,
      Password: password,
    };
    return this.http.post<TokenDto>(this.apiUrl + 'login', user);
  }
}
