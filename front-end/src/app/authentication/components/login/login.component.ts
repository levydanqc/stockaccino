import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, Form, FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Input() getEmailError!: () => string;
  @Input() getPwdError!: () => string;
  @Input() pwd!: FormControl;
  public form!: FormGroup;
  email!: FormControl;
  password!: FormControl;
  hide: boolean = true;
  invalid!: boolean;
  @Output()
  onSubmit = new EventEmitter<string>();

  constructor(
    private controlContainer: ControlContainer,
    private _userService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  submit() {
    console.log('submit');
    this.onSubmit.emit();
    if (this.form.valid) {
      // TODO: https://github.com/levydanqc/stockaccino/issues/7
      let user = this._userService
        .verifyUser(this.email.value, this.password.value)
        .subscribe(
          (data) => {
            console.log(data);
            this.cookieService.set('id', data.Id);
            this.router.navigate(['/']);
          },
          (error) => {
            this.invalid = true;
          }
        );
    }
  }

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.form.addControl('pwd', this.pwd);
    this.email = this.form.get('email') as FormControl;
    this.password = this.form.get('pwd') as FormControl;
  }
}
