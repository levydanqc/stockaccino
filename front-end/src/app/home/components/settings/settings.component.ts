import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  email!: string;
  prenom!: string;
  nom!: string;
  currentMode!: string;
  errorEmail?: string;
  public form!: FormGroup;
  emailForm!: FormControl;

  constructor(
    private cookieService: CookieService,
    private _userService: UserService,
    private controlContainer: ControlContainer,
    ) {}

  ngOnInit(): void {
    this._userService.getUserById(this.cookieService.get("id")).subscribe(data => {
      this.email = data.Email;
      this.prenom = data.Prenom;
      this.nom = data.Nom;
    });
    this.currentMode = "show";
    this.form = this.controlContainer.control as FormGroup;
    this.form.addControl('emailForm', this.emailForm);
    this.emailForm = this.form.get('emailForm') as FormControl;
  }

  submitForm() {
    let email!: string;
    let prenom!: string;
    let nom!: string;

    console.log("Value du formControl email: ", this.emailForm.value);

    if ((<HTMLInputElement>document.getElementById("email")).value != "") {
      if (!this.validerEmail((<HTMLInputElement>document.getElementById("email")).value)) {
        this.errorEmail = "L'adresse courriel est invalide.";
      }
      else {
        email = (<HTMLInputElement>document.getElementById("email")).value;
        this.errorEmail = undefined;
      }
    }
    if ((<HTMLInputElement>document.getElementById("prenom")).value != "") {
      prenom = (<HTMLInputElement>document.getElementById("prenom")).value;
    }
    if ((<HTMLInputElement>document.getElementById("nom")).value != "") {
      nom = (<HTMLInputElement>document.getElementById("nom")).value;
    }

    if (this.errorEmail == undefined && email) {
      this._userService.updateUser(this.cookieService.get("id"), email, nom, prenom);
      setTimeout(()=>{
        window.location.reload();
      }, 100);
      this.switchToShow();
    }
    else if (this.errorEmail == undefined){
      this._userService.updateUser(this.cookieService.get("id"), undefined, nom, prenom);
      setTimeout(()=>{
        window.location.reload();
      }, 100);
      this.switchToShow();
    }
  }

  switchToModify() {
    this.currentMode = "modify";
  }

  switchToShow() {
    this.currentMode = "show";
  }

  validerEmail(email: string): boolean {
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regexp.test(email))
      return true;
    else return false;
  }
}
