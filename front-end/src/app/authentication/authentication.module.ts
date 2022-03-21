import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './components/login/login.component';
import { ResetComponent } from './components/reset/reset.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';

import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    SigninComponent,
    ResetComponent,
  ],
  imports: [CommonModule, AuthenticationRoutingModule, MaterialModule],
})
export class AuthenticationModule {}
