import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
  hide: boolean = true;
  @Output()
  onSubmit = new EventEmitter<string>();

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.form.addControl('nom', this.nom);
    this.form.addControl('prenom', this.prenom);
    this.form.addControl('pwd', this.pwd);
    this.email = this.form.get('email') as FormControl;
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
