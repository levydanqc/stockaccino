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
  emailUnavailable!: boolean;
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
        console.log("Variable emailUnavailable: ", this.emailUnavailable);
        if (this.emailUnavailable) {
          this.error = "Cette adresse courriel est déjà utilisée."
        }
        else {
          // TODO: Créer l'utilisateur
          console.log("Creation du user effectue.");
          
          // FIXME: Ne crée pas l'utilisateur. La route backend n'est pas appelée.
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

  verifyEmail() {
    this.emailUnavailable = this._userService.getUserByEmail(this.email.value);
    // FIXME: Ici, il faudrait afficher un message d'erreur dans le formulaire, mais
    //        _userService.getUserByEmail va toujours retourner false directement, que le email soit
    //        valide ou pas. Voir dans user.service.ts, au niveau de la fonction getUSerByEmail.

    // Bref, emailUnavailable est toujours false, meme si la console nous affiche réellement si
    // l'adresse courriel est utilisée ou non.
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
