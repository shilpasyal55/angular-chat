import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Ng2Cable, Broadcaster } from 'ng2-cable/js/index';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import {SignupComponent} from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [BrowserModule,ReactiveFormsModule, HttpModule, routes, FormsModule, InfiniteScrollModule],
  declarations: [
    AppComponent,
    MessagesComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent
  ],
  providers: [
    MessageService,
    Ng2Cable,
    Broadcaster
  ],
  bootstrap: [AppComponent]

})

export class AppModule { }
