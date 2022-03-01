import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  isLoggingIn: boolean = true;
  hide: boolean = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  pwd = new FormControl('', [Validators.required, Validators.minLength(6)]);
  nom = new FormControl('', [Validators.required]);
  prenom = new FormControl('', [Validators.required]);
  constructor() {}

  getEmailError() {
    if (this.email.hasError('required')) {
      return 'Vous devez entrer une adresse email';
    }
    return this.email.hasError('email')
      ? "L'adresse email n'est pas valide"
      : '';
  }
  getPwdError() {
    if (this.pwd.hasError('required')) {
      return 'Vous devez entrer un mot de passe';
    }
    return this.pwd.hasError('minlength')
      ? 'Le mot de passe doit contenir au moins 6 caractères'
      : '';
  }
  getNomError() {
    if (this.nom.hasError('required')) {
      return 'Vous devez entrer un nom';
    }
    return '';
  }
  getPrenomError() {
    if (this.prenom.hasError('required')) {
      return 'Vous devez entrer un prénom';
    }
    return '';
  }

  ngOnInit(): void {}
}
