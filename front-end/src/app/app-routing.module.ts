import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
    data: { title: 'Login' },
  },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'dashboard', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
