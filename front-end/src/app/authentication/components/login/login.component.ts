import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, Form, FormControl, FormGroup } from '@angular/forms';
import { IUser } from '../../../user';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() getEmailError!: () => string;
  @Input() getPwdError!: () => string;
  @Input() pwd!: FormControl;
  public form!: FormGroup;
  email!: FormControl;
  password!: FormControl;
  private users : IUser[] = [];
  //user!: IUser;
  hide: boolean = true;
  invalid: boolean = false;

  constructor(private controlContainer: ControlContainer, private _userService: UserService,
    private router: Router, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.form.addControl('pwd', this.pwd);
    this.email = this.form.get('email') as FormControl;
    this.password = this.form.get('pwd') as FormControl;
    this._userService.getUsers().subscribe(data => this.users = data)
    //this._userService.verifyUser(this.email.value, this.password.value).subscribe(data => this.user = data)
  }

  onSubmit() {
    var estValide = this.verifyUser(this.email.value, this.password.value);
    console.log("EstValide: ", estValide);
    if (estValide) {
      this.router.navigate(['/']);
      this.cookieService.delete('UserEmail');
      this.cookieService.set('UserEmail', this.email.value)
    }
    else {
      console.log("Connection refusée.");
      this.invalid = true;
    }
  }

  // Retourne true si l'utilisateur s'est bien connecté, false si le email ou mot de passe est incorrect.
  verifyUser(email: string, password: string) {
    var estValide = false;
    this.users.forEach(user => {
      if (user.Email == email && user.Password == password)
        estValide = true;
    });
    if (estValide)
      return true;
    return false;
  }
  
}
