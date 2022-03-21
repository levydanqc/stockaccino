import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../classes/user';
import { IUserPost } from '../classes/userPost';
import { Observable, observable, TimeoutError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

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

  postUser(email: string, password: string, nom: string, prenom: string) {
    let user: IUserPost = {
      Email: email,
      Prenom: prenom,
      Nom: nom,
      Password: password,
      Username: prenom + nom,
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
