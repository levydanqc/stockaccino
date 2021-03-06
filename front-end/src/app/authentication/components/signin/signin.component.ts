import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { EditorType } from '../../authentication.component';
import { ToastrService } from 'ngx-toastr';

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
  estUtilise: boolean = true;
  @Output()
  authSubmit = new EventEmitter<string>();
  @Output()
  authSignIn = new EventEmitter<string>();

  constructor(
    private controlContainer: ControlContainer,
    private _userService: UserService,
    private toastr: ToastrService
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
    this.authSubmit.emit();
    if (this.form.valid) {
      if (event == 'signin') {
        if (this.estUtilise) {
          this.error = 'Cette adresse courriel est déjà utilisée.';
        } else {
          const that = this;
          this._userService.postUser(
            this.email.value,
            this.pwd.value,
            this.nom.value,
            this.prenom.value
          ).subscribe({
            next() {
              that.authSignIn.emit();
            },
            error() {
              that.toastr.error('Le serveur rencontre une erreur au moment de traiter votre demande.');
            }
          });
        }
      }
    }
  }

  verifyEmail() {
    if (this.email.value != '' && !this.email.hasError('email')) {
      this._userService.verifyEmail(this.email.value).subscribe((data: any) => {
        if (data) this.estUtilise = true;
        else this.estUtilise = false;
      });
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
