import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IUser } from '../user';
import { Observable, observable, TimeoutError } from 'rxjs';

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

  // Retourne tous les utilisateurs.
  getUsers(): Observable<IUser[]> {
    return this.apiCall({
      endpoint: '',
      headers: null,
      body: null,
      query: null
    });
  }

  // Vérifier si un utilisateur existe avec cette addresse courriel.
  // Retourne true si l'adresse courriel est déjà utilisée, false si elle est libre.
  getUserByEmail(email: string): boolean {
    // BUG: Meme si je modifie estUtilise plus bas dans le code, cette fonctione retourne
    // *toujours* estUtilise comme etant false (puisqu'il est initialisé ici)
    let estUtilise: boolean = false; // a false pour tester la creation.
    this.apiCall({
      endpoint: email,
      headers: null,
      body: null,
      query: null
    }).subscribe(
      (data) => {
        console.log("utilisé");
        estUtilise = true;
      },
      (error) => {
        console.log("pas utilisé");
        estUtilise = false;
      }
    );
    return estUtilise;
  }

  postUser(email: string, password: string, nom: string, prenom: string) {
    let user: IUser = {
      Email: email,
      Prenom: prenom,
      Nom: nom,
      Password: password,
      Username: prenom + nom,
      Id: "" // FIXME: Ici, il ne devrait pas y avoir d'id, mais l'enlever cause une chaine de problemes
    }
    console.log("en train de creer le user dans le service");
    this.http.post(this.apiUrl, user);
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
