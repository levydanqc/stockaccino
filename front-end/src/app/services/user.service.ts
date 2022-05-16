import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../classes/users/user';
import { UserDto } from '../classes/users/userDto';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Constants } from '../../assets/constants';
import { TokenDto } from '../classes/users/tokenDTO';
import { Notification } from '../classes/users/notification';

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
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  // Retourne tous les utilisateurs.
  getUsers(): Observable<User[]> {
    return this.apiCall({
      endpoint: '',
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.cookieService.get('token'),
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
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      }),
      body: null,
      query: null,
    });
  }

  watchStock(symbol: string) {
    this.http
      .put(`${Constants.USER_URL}watch/${symbol}`, null, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.cookieService.get('token'),
        }),
      })
      .subscribe((res) => {});
  }

  unwatchStock(symbol: string) {
    this.http
      .put(`${Constants.USER_URL}unwatch/${symbol}`, null, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.cookieService.get('token'),
        }),
      })
      .subscribe((res) => {});
  }

  refuseRequest(email: string) {
    this.http
      .put(`${Constants.USER_URL}refuse/${email}`, null, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.cookieService.get('token'),
        }),
      })
      .subscribe((res) => {});
  }

  acceptRequest(email: string) {
    this.http
      .put(`${Constants.USER_URL}accept/${email}`, null, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.cookieService.get('token'),
        }),
      })
      .subscribe((res) => {});
  }

  removeFriend(email: string) {
    this.http
      .put(`${Constants.USER_URL}removeFriend/${email}`, null, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.cookieService.get('token'),
        }),
      })
      .subscribe((res) => {});
  }

  addFriend(email: string) {
    this.http
      .put(`${Constants.USER_URL}sendRequest/${email}`, null, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.cookieService.get('token'),
        }),
      })
      .subscribe((res) => {});
  }

  updateUser(email?: string, nom?: string, prenom?: string, password?: string) {
    let user: User;
    if (password) {
      this.getUserByEmail(email!).subscribe((data) => {
        user = data;
        user.Password = password;

        const httpOptions = {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.cookieService.get('token'),
          }),
        };
        this.http
          .put(Constants.USER_URL + 'update', user, httpOptions)
          .subscribe();
      });
    }
    else {
      this.getUserById().subscribe((data) => {
        user = data;
  
        if (email) {
          user.Email = email;
        }
  
        if (nom) {
          user.Nom = nom;
        }
  
        if (prenom) {
          user.Prenom = prenom;
        }
        
        user.Password = undefined;
  
        const httpOptions = {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.cookieService.get('token'),
          }),
        };
        this.http
          .put(Constants.USER_URL + 'update', user, httpOptions)
          .subscribe();
      });
    }
  }

  postUser(email: string, password: string, nom: string, prenom: string): Observable<any> {
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

    return this.http.post(Constants.USER_URL, user);
  }

  apiCall(params: Parameters): Observable<any> {
    let url: string =
      Constants.USER_URL +
      params.endpoint +
      (params.query ? '?' + params.query?.join('&') : '');
    return this.http.get<any>(url, {
      headers: params.headers!,
      params: params.body!,
    });
  }

  login(email: string, password: string): Observable<TokenDto> {
    let user: UserDto = {
      Email: email,
      Password: password,
    };
    return this.http.post<TokenDto>(Constants.USER_URL + 'login', user);
  }

  updateNotification(notification: Notification) {
    return this.http.put(
      `${Constants.USER_URL}notification/update/`,
      notification,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.cookieService.get('token'),
        }),
      }
    );
  }

  notify(email: string, notification: Notification) {
    return this.http
      .post(`${Constants.USER_URL}notification/notify/${email}`, notification, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.cookieService.get('token'),
        }),
      })
      .subscribe((res) => {});
  }
}
