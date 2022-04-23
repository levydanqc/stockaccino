import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';
import { Friend } from 'src/app/classes/friend';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
})
export class SocialComponent implements OnInit {
  userEmail?: string;
  amisString?: string[];
  amis?: Array<Friend> = new Array<Friend>();
  requetesString?: string[];
  requetes?: Array<Friend> = new Array<Friend>();
  hasAmis?: boolean;
  hasRequetes?: boolean;
  expandCode?: string = 'expand_less';
  confirmation: string = '';
  emailList: Array<string> = new Array<string>();
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email]),
  });

  constructor(
    private cookieService: CookieService,
    private _userService: UserService,
  ) {}

  showHide() {
    if (this.expandCode === 'expand_less') this.expandCode = 'expand_more';
    else if (this.expandCode === 'expand_more') this.expandCode = 'expand_less';
  }

  accept(email: string, prenom: string, nom: string) {
    this.requetes = this.requetes?.filter(requete => { return requete.Email !== email });
    this.requetesString = this.requetesString?.filter(requete => { return requete !== email });
    let newlyAdded: Friend = {
      Email: email,
      Prenom: prenom,
      Nom: nom,
    };
    this.amis?.push(newlyAdded);
    this.amisString?.push(email);
    this._userService.acceptRequest(email);
  }

  refuse(email: string) {
    this.requetes = this.requetes?.filter(requete => { return requete.Email !== email });
    this.requetesString = this.requetesString?.filter(requete => { return requete !== email });
    this._userService.refuseRequest(email);
  }

  add() {
    if (this.form.get('email')?.value !== '') {
      if (this.form.valid) {
        if (this.emailList.includes(this.form.get('email')?.value)) {
          if (this.form.get('email')?.value === this.userEmail) {
            this.confirmation = "Vous ne pouvez pas vous envoyer une requête.";
            setTimeout(() => {
              this.confirmation = '';
            }, 3000);
          }
          else {
            if (this.amisString?.includes(this.form.get('email')?.value) || this.requetesString?.includes(this.form.get('email')?.value)) {
              this.confirmation = "Ce compte est déjà dans vos listes!";
              setTimeout(() => {
                this.confirmation = '';
              }, 3000);
            }
            else {
              this._userService.addFriend(this.form.get('email')?.value);
              this.form.reset();
              this.confirmation = "Demande d'amitié envoyée!";
              setTimeout(() => {
                this.confirmation = '';
              }, 3000);
            }
          }
        }
        else {
          this.confirmation = "Compte inexistant.";
          setTimeout(() => {
            this.confirmation = '';
          }, 3000);
        }
      }
    }
  }

  delete(email: string) {
    this.amis = this.amis?.filter(ami => { return ami.Email !== email });
    this.amisString = this.amisString?.filter(ami => { return ami !== email });
    this._userService.removeFriend(email);
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this._userService
    .getUsers()
    .subscribe((data: any) => {
      let users: Array<User> = data;
      users.forEach(user => {
        this.emailList.push(user.Email);
      });
    });
    this._userService
      .getUserById()
      .subscribe((data: any) => {
        this.userEmail = data.Email;
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

  getEmailError = (): string => {
    const email = this.form.get('email') as FormControl;
    return email.hasError('email') ? "L'adresse email n'est pas valide" : '';
  };
}
