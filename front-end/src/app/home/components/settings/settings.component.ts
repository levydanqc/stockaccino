import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

export type Mode = 'show' | 'modify';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  currentMode: Mode = 'show';
  isLoading = true;
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
  });

  constructor(
    private cookieService: CookieService,
    private _userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._userService
      .getUserById()
      .subscribe((data) => {
        this.isLoading = false;
        this.form.get('email')?.setValue(data.Email);
        this.form.get('prenom')?.setValue(data.Prenom);
        this.form.get('nom')?.setValue(data.Nom);
      });
  }

  isShow() {
    return this.currentMode == 'show';
  }

  placeholder(input: string) {
    return this.form.get(input)?.value;
  }

  value(input: string) {
    if (input == 'email') {
      return this.isShow() ? this.form.get('email')?.value : '';
    } else if (input == 'prenom') {
      return this.isShow() ? this.form.get('prenom')?.value : '';
    } else if (input == 'nom') {
      return this.isShow() ? this.form.get('nom')?.value : '';
    }
    return '';
  }

  deconnexion() {
    this.cookieService.delete('token');
    this.toastr.success('Vous avez été déconnecté.', "Succès");
    location.reload();
  }

  submitForm() {
    if (this.form.valid) {
      this._userService.updateUser(
        this.form.get('email')?.value,
        this.form.get('nom')?.value,
        this.form.get('prenom')?.value
      );
      this.switch('show');
      this.toastr.success('Modifications enregistrées.', "Succès");
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
