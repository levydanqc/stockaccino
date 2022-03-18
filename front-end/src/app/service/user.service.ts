import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../user';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = "https://localhost:7056/api/users/";
  }

  getUsers(): Observable<IUser[]>{
    return this.http.get<IUser[]>(this.apiUrl);
  }


  verifyUser(email: string, password: string) {
    var verifyUrl = this.apiUrl + `verify/${email}`;
    return this.http.get(verifyUrl, {
      headers: {password: password}
    });
  }
}
