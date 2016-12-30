import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router  } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _router:Router) {
    
   }

  ngOnInit() {
  }

  logout(){
  	Cookie.deleteAll();
  	this._router.navigateByUrl('/signup')
  }

}
