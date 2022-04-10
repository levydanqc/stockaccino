import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';
import { Friend } from 'src/app/classes/friend';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  amisString?: string[];
  amis?: Array<Friend> = new Array<Friend>();
  requetesString?: string[];
  requetes?: Array<Friend> = new Array<Friend>();
  hasAmis?: boolean;
  hasRequetes?: boolean;

  constructor(
    private cookieService: CookieService,
    private _userService: UserService,
    private router: Router,
  ) {}

  accept(email: string, prenom: string, nom: string) {
    this.requetes = this.requetes?.filter(requete => { return requete.Email !== email });
    let newlyAdded: Friend = {
      Email: email,
      Prenom: prenom,
      Nom: nom,
    };
    this.amis?.push(newlyAdded);
    // TODO: Call api pour delete la request des requetes
    // TODO: Call api pour ajouter l'ami dans la liste d'amis
  }

  refuse(email: string) {
    this.requetes = this.requetes?.filter(requete => { return requete.Email !== email });
    //TODO: Call api pour delete la requete
  }

  delete(email: string) {
    this.amis = this.amis?.filter(ami => { return ami.Email !== email });
    //TODO: Call api pour delete l'ami
  }

  ngOnInit(): void {
    this._userService
      .getUserById(this.cookieService.get('id'))
      .subscribe((data: any) => {
        this.amisString = data.Amis;
        if (this.amisString)
          if (this.amisString.length > 0) {
            this.amisString.forEach(ami => {
              this._userService
              .getUserByEmail(ami)
              .subscribe((data: any) => {
                let friend: Friend = {
                  Email: ami,
                  Prenom: data.Prenom,
                  Nom: data.Nom,
                };
                this.amis?.push(friend);
              });
            });
          }
        this.requetesString = data.Requetes;
        if (this.requetesString)
          if (this.requetesString.length > 0) {
            this.requetesString.forEach(requete => {
              this._userService
              .getUserByEmail(requete)
              .subscribe((data: any) => {
                let friend: Friend = {
                  Email: requete,
                  Prenom: data.Prenom,
                  Nom: data.Nom,
                }
                this.requetes?.push(friend);
              });
            });
          }
      });
  }
}
