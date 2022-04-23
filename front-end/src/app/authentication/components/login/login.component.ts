import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
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
  authSubmit = new EventEmitter<string>();

  constructor(
    private controlContainer: ControlContainer,
    private _userService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  submit() {
    this.authSubmit.emit();
    if (this.form.valid) {
        this._userService
          .login(this.email.value, this.password.value)
          .subscribe(
            (data) => {
              if (data) {
                this.cookieService.set('token', data.Token || "");
                this.router.navigate(['/']);
              }
              else { this.invalid = true; }
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
