import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Friend } from 'src/app/classes/friend';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/classes/user';
import { ToastrService } from 'ngx-toastr';

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
    private _userService: UserService,
    private toastr: ToastrService
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
    this.toastr.success('Compte a été ajouté à vos amitiés.', "Succès");
  }

  refuse(email: string) {
    this.requetes = this.requetes?.filter(requete => { return requete.Email !== email });
    this.requetesString = this.requetesString?.filter(requete => { return requete !== email });
    this._userService.refuseRequest(email);
    this.toastr.success('Ce compte a été supprimé de vos requêtes d\'amitié.', "Succès");
  }

  add() {
    if (this.form.get('email')?.value !== '') {
      if (this.form.valid) {
        if (this.emailList.includes(this.form.get('email')?.value)) {
          if (this.form.get('email')?.value === this.userEmail) {
            this.toastr.error(`Vous ne pouvez pas vous envoyer une requête.`, 'Erreur');
          }
          else {
            if (this.amisString?.includes(this.form.get('email')?.value) || this.requetesString?.includes(this.form.get('email')?.value)) {
              this.toastr.error('Ce compte est déjà dans vos listes.', 'Erreur');
            }
            else {
              this._userService.addFriend(this.form.get('email')?.value);
              this.form.reset();
              this.toastr.success('Demande d\'amitié envoyée.', 'Succès');
            }
          }
        }
        else {
          this.toastr.error('Ce compte n\'existe pas.', 'Erreur');
        }
      }
    }
  }

  delete(email: string) {
    this.amis = this.amis?.filter(ami => { return ami.Email !== email });
    this.amisString = this.amisString?.filter(ami => { return ami !== email });
    this._userService.removeFriend(email);
    this.toastr.success('Le compte a été retiré de vos amitiés.', "Succès");
  } 

  ngOnInit(): void {
    setTimeout(() => {
      this.fetchData();
    }, 3000);
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
        if (this.amisString && this.amisString.length > 0) {
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
        if (this.requetesString && this.requetesString.length > 0) {
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
