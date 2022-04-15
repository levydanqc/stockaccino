import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../classes/user';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Constants } from '../../assets/constants';

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
      headers: null,
      body: null,
      query: null,
    });
  }

  verifyEmail(email: string) {
    this.apiCall({
      endpoint: email,
      headers: null,
      body: null,
      query: null,
    }).subscribe(
      (data) => {
        this.cookieService.set('estUtilise', 'true');
      },
      (error) => {
        this.cookieService.set('estUtilise', 'false');
      }
    );
  }

  getUserByEmail(email: string): Observable<User> {
    return this.apiCall({
      endpoint: `${email}`,
      headers: null,
      body: null,
      query: null,
    });
  }

  getUserById(id: string): Observable<User> {
    return this.apiCall({
      endpoint: `findById/${id}`,
      headers: null,
      body: null,
      query: null,
    });
  }

  watchStock(id: string, symbol: string) {
    this.http
      .put(`${this.apiUrl}watch/${symbol}`, `\"${id}\"`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .subscribe((res) => {});
  }

  unwatchStock(id: string, symbol: string) {
    this.http
      .put(`${this.apiUrl}unwatch/${symbol}`, `\"${id}\"`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .subscribe((res) => {});
  }

  updateUser(
    id: string,
    email?: string,
    nom?: string,
    prenom?: string,
    password?: string
  ) {
    let user!: User;
    this.getUserById(id).subscribe((data) => {
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
      this.http.put(this.apiUrl + id, user).subscribe((res) => {});
    });
  }

  postUser(email: string, password: string, nom: string, prenom: string) {
    let user: User = {
      Email: email,
      Prenom: prenom,
      Nom: nom,
      Password: password,
      Stocks: [],
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

  // Verifie si le email et le mot de passe sont corrects pour l'utilisateur
  // qui tente une connexion.
  verifyUser(email: string, password: string): Observable<User> {
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
