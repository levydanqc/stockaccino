import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { EditorType } from '../../authentication.component';

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
  editorType!: EditorType;
  nom: FormControl = new FormControl('', [Validators.required]);
  prenom: FormControl = new FormControl('', [Validators.required]);
  confirmPwd: FormControl = new FormControl('');
  error?: string;
  hide: boolean = true;
  @Output()
  authSubmit = new EventEmitter<string>();
  @Output()
  authSignIn = new EventEmitter<string>();

  constructor(
    private controlContainer: ControlContainer,
    private _userService: UserService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.form.addControl('nom', this.nom);
    this.form.addControl('prenom', this.prenom);
    this.form.addControl('pwd', this.pwd);
    this.form.addControl('confirmPwd', this.confirmPwd);
    this.email = this.form.get('email') as FormControl;
    this.cookieService.delete('estUtilise');
  }

  submit(event: string) {
    this.authSubmit.emit();
    if (this.form.valid) {
      if (event == 'signin') {
        if (this.cookieService.get('estUtilise') === 'true') {
          this.error = 'Cette adresse courriel est déjà utilisée.';
        } else {
          this._userService.postUser(
            this.email.value,
            this.pwd.value,
            this.nom.value,
            this.prenom.value,
          );

          this.cookieService.delete('estUtilise');
          this.authSignIn.emit();
        }
      }
    }
  }

  verifyEmail() {
    this._userService.verifyEmail(this.email.value);
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
