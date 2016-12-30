import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
import {MessageService} from '../message.service';
import { Router  } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers : [MessageService]
})
export class SignupComponent implements OnInit {
  
  userForm : FormGroup;	
  public data : string ;
  public error_msg;
  public cookiedata;
  constructor(private _fb: FormBuilder, private _messageservice : MessageService, private _router : Router) { }

  subscribeToFormChangesAndSetValidity() {
      const myFormValueChanges$ = this.userForm.controls["passwords"].valueChanges;

      myFormValueChanges$.subscribe(x => {
          if(x.password === x.confirmPassword) {
              this.userForm.controls["passwords"].setErrors(null);
          } else {
              this.userForm.controls["passwords"].setErrors({ "notValid" : true});
          }
      });
  }

  ngOnInit() {
    this.userForm = this._fb.group({
    'email' : [null,Validators.required],
    passwords: this._fb.group({
        password: ['', Validators.compose([Validators.required,Validators.minLength(6)])],
        confirmPassword: ['', Validators.required]
        })
    })

    this.subscribeToFormChangesAndSetValidity();
  }

  login(){
    this._router.navigate(['/login'])
  }

  submitUser()
  { 
  	this._messageservice.postUserData(this.userForm.value.email,this.userForm.value.passwords.password)
                      .subscribe(
                              data => {this.data = JSON.stringify(data);
                                        alert(this.data);
                                        Cookie.set('id',data.id)
                                        this._router.navigate(['/messages']) 
                                      },
                              error => {console.log(JSON.stringify(error));
                                         this.error_msg = error._body;
                                         alert(this.error_msg);
                                        },
                              () => console.log(Cookie.get("id"))
                        );

}
}
