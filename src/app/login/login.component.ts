import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
import {MessageService} from '../message.service';
import { Router  } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [MessageService]
})
export class LoginComponent implements OnInit {

  userForm : FormGroup;	
  public data : string ;
  public cookiedata;
  constructor(private _fb: FormBuilder, private _messageservice : MessageService, private _router : Router) { }

  ngOnInit() {
    this.userForm = this._fb.group({
    'email' : [null,Validators.required],
    'password' : [null,Validators.required] 
    })
  }

  submitUser()
  {
  	this._messageservice.authenticateUser(this.userForm.value.email,this.userForm.value.password)
                      .subscribe(
                              data => {this.data = JSON.stringify(data);
                                        alert(this.data);
                                        Cookie.set('id',data.id)
                                     },

                              error => {console.log(JSON.stringify(error));
                                        },

                              () => {
                                   this._router.navigate(["/chatrooms"]);                
                                        
                                    }
                        );

}

}
