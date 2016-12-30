import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
     ReactiveFormsModule,
     FormsModule
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
