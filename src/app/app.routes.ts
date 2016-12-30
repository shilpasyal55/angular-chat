import { Routes, RouterModule } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import {SignupComponent} from './signup/signup.component';
import { LoginComponent } from './login/login.component';
const routing: Routes = [
{path: '', pathMatch: 'full',redirectTo: 'messages'},
  {path: 'messages', component: MessagesComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
];

export const routes = RouterModule.forRoot(routing);
