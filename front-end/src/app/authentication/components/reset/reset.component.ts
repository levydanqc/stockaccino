import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

export type EditorType = 'request' | 'confirm' | 'reset';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit{
  editor: EditorType = 'request';
  code?: number;
  @Input() getEmailError!: () => string;
  form!: FormGroup;
  email!: FormControl;
  codeForm: FormControl = new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]);
  pwd: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)])
  
  @Output()
  formSubmit = new EventEmitter<string>();
  @Output()
  formReset = new EventEmitter<string>();

  constructor(
    private controlContainer: ControlContainer,
    private _userService: UserService,
  ) {}

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.email = this.form.get('email') as FormControl;
    this.form.addControl('code', this.codeForm);
    this.form.addControl('pwd', this.pwd);
  }

  showRequest() {
    return this.editor == 'request';
  }
  showConfirm() {
    return this.editor == 'confirm';
  }
  showReset() {
    return this.editor == 'reset';
  }

  submit(event: string) {
    this.formSubmit.emit();
    if (event === 'reset')
      this.reset();
    else if (event ==='confirm') {
      if (this.form.get('code')?.valid)
        this.confirm();
    }
    else if (event === 'request') {
      console.log(this.form.get('email'));
      if (this.form.get('email')?.valid)
        this.request();
    }
  }

  request() {
    this.editor = 'confirm';
    this.code = Math.floor(100000 + Math.random() * 900000);
  }

  confirm() {
    if (this.code === Number(this.codeForm.value))
      this.editor = 'reset';
    else
      this.codeForm.setErrors({invalid: true});
  }

  reset() {
    this._userService
      .getUserByEmail(this.email.value)
      .subscribe((data) => {
        this._userService.updateUser(
          data.Id,
          undefined,
          undefined,
          undefined,
          this.pwd.value,
        );
      });
    this.formReset.emit();
  }

  getCodeError() {
    let code = this.form.get('code');
    if (code?.hasError('required'))
      return 'Vous devez entrer le code';
    else if (code?.hasError('invalid'))
      return 'Le code ne corresponds pas';
    return code?.hasError('pattern') ? "Le code ne doit contenir que des chiffres." : '';
  }

  getPwdError = (): string => {
    if (this.pwd.hasError('required'))
      return 'Vous devez entrer un mot de passe';
    return this.pwd.hasError('minlength')
      ? 'Le mot de passe doit contenir au moins 6 caractères'
      : '';
  };
}
