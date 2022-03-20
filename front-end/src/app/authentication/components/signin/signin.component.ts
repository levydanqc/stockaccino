import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  @Input() getEmailError!: () => string;
  @Input() getPwdError!: () => string;
  @Input() pwd!: FormControl;
  public form!: FormGroup;
  email!: FormControl;
  nom: FormControl = new FormControl('', [Validators.required]);
  prenom: FormControl = new FormControl('', [Validators.required]);
  confirmPwd: FormControl = new FormControl('');
  error!: string;
  hide: boolean = true;
  @Output()
  onSubmit = new EventEmitter<string>();

  constructor(
      private controlContainer: ControlContainer, private _userService: UserService, private router: Router
    ) {}

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.form.addControl('nom', this.nom);
    this.form.addControl('prenom', this.prenom);
    this.form.addControl('pwd', this.pwd);
    this.form.addControl('confirmPwd', this.confirmPwd);
    this.email = this.form.get('email') as FormControl;
  }

  submit(event: string) {
    this.onSubmit.emit();
    if (this.form.valid) {
      if (event == 'signin') {
        let emailUnavailable: boolean = this._userService.getUserByEmail(this.email.value);
        console.log("Le email est déjà utilisé: ", emailUnavailable);
        if (emailUnavailable) {
          this.error = "Cette adresse courriel est déjà utilisée."
        }
        else {
          // TODO: Créer l'utilisateur
          console.log("Creation du user effectue.");
          
          this._userService.postUser(
            this.email.value,
            this.pwd.value,
            this.nom.value,
            this.prenom.value
          );

          // TODO: Rediriger l'utilisateur
          this.router.navigate(['/']); // FIXME: Ne redirige pas vers Connexion
        }
      }
    }
  }

  matchPwd() {
    if (this.pwd.value != this.confirmPwd.value) {
      this.confirmPwd.setErrors({
        matching: true,
      });
    }
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

  getConfirmPwdError() {
    if (
      this.confirmPwd.hasError('matching') ||
      this.confirmPwd.hasError('required')
    ) {
      return 'Les mots de passe ne correspondent pas';
    }
    return '';
  }
}
