import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../../user';
import { UserService } from 'src/app/service/user.service';


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
  public users : IUser[] = [];
  hide: boolean = true;

  constructor(private controlContainer: ControlContainer, private _userService: UserService) {}

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.form.addControl('pwd', this.pwd);
    this.email = this.form.get('email') as FormControl;
    this.password = this.form.get('pwd') as FormControl;
    this._userService.getUsers().subscribe(data => this.users = data)
  }

  onSubmit() {
    console.log("========================================");
    console.log("Courriel: ", this.email.value);
    console.log("Mot de passe: ", this.password.value);
    console.log("========================================");

    console.log("Users: ", this.users);


  }

  // Retourne true si l'utilisateur s'est bien connecté, false si le email ou mot de passe est incorrect.
  // verifyUser(email: string, password: string) {
  //   var estValide = false;

  //   HttpClient.


  //   if (estValide) {
  //     return true;
  //   }
  //   else return false;
  // }
  
}
