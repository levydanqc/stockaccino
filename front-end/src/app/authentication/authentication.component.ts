import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export type EditorType = 'login' | 'signin' | 'reset';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent {
  editor: EditorType = 'login';

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  pwd: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  constructor() {}

  get showLogin() {
    return this.editor == 'login';
  }
  get showSignin() {
    return this.editor == 'signin';
  }
  get showReset() {
    return this.editor == 'reset';
  }

  public switchForm(type: EditorType) {
    this.editor = type;
  }

  onSignIn() {
    this.editor = "login";
    location.reload();
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
    }
  }

  getEmailError = (): string => {
    const email = this.form.get('email') as FormControl;
    if (email.hasError('required')) {
      return 'Vous devez entrer une adresse email';
    }
    return email.hasError('email') ? "L'adresse email n'est pas valide" : '';
  };

  getPwdError = (): string => {
    const pwd = this.form.get('pwd') as FormControl;
    if (pwd.hasError('required')) {
      return 'Vous devez entrer un mot de passe';
    }
    return pwd.hasError('minlength')
      ? 'Le mot de passe doit contenir au moins 6 caractères'
      : '';
  };
}
