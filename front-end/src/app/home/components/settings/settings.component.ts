import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

export type Mode = 'show' | 'modify';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  currentMode: string = 'show';
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
  });

  constructor(
    private cookieService: CookieService,
    private _userService: UserService,
  ) {}

  ngOnInit(): void {
    this._userService
      .getUserById(this.cookieService.get('id'))
      .subscribe((data) => {
        this.form.get('email')?.setValue(data.Email);
        this.form.get('prenom')?.setValue(data.Prenom);
        this.form.get('nom')?.setValue(data.Nom);
      });
  }

  isShow() {
    return this.currentMode == 'show';
  }

  placeholder(input: string) {
    if (input == 'email') {
      return this.isShow() ? '' : this.form.get('email');
    } else if (input == 'prenom') {
      return this.isShow() ? '' : this.form.get('prenom');
    } else if (input == 'nom') {
      return this.isShow() ? '' : this.form.get('nom');
    }
    return '';
  }

  value(input: string) {
    if (input == 'email') {
      return this.isShow() ? this.form.get('email') : '';
    } else if (input == 'prenom') {
      return this.isShow() ? this.form.get('prenom') : '';
    } else if (input == 'nom') {
      return this.isShow() ? this.form.get('nom') : '';
    }
    return '';
  }

  submitForm() {
    if (this.form.valid) {
      this._userService.updateUser(
        this.cookieService.get('id'),
        this.form.get('email')?.value,
        this.form.get('nom')?.value,
        this.form.get('prenom')?.value
      );
      setTimeout(() => {
        window.location.reload();
      }, 100);
      this.switch('show');
    }
  }

  getEmailError = (): string => {
    const email = this.form.get('email') as FormControl;
    if (email.hasError('required')) {
      return 'Vous devez entrer une adresse email';
    }
    return email.hasError('email') ? "L'adresse email n'est pas valide" : '';
  };

  switch(mode: Mode) {
    this.currentMode = mode;
  }
}
