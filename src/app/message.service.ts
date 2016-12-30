import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Headers} from '@angular/http';


@Injectable()
export class MessageService {
  constructor(private http: Http) {
  }
private url = "http://localhost:3000";

  query(page:any,chat_room_id:any) {
    let g_url = this.url + `/api/v1/messages?chat_room_id=${chat_room_id}&page=${page}`;
    return this.http.get(g_url).map(res => {
      return res.json();
    });
  }

  queryrooms(page:any) {
    let g_url = this.url + `/api/v1/chat_rooms?page=${page}`;
    return this.http.get(g_url).map(res => {
      return res.json();
    });
  }

  create(message:any) {
    let p_url = this.url + '/api/v1/messages';
    return this.http.post(p_url, message).map(res => {
      return res.json();
    });
  }

  createroom(chat_room:any) {
    let p_url = this.url + '/api/v1/chat_rooms';
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(p_url, chat_room,{ headers : headers}).map(res => {
      return res.json();
    });
  }

  postUserData(email,password){
    let user = JSON.stringify({"user":
        {
          "email" : email,
          "password" : password
        }}); 
    let p_url = this.url + "/api/v1/users";
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(p_url,user,{ headers : headers}) 
    .map(res => res.json())
  }

  authenticateUser(email,password){
    let user = JSON.stringify({"user":
        {
          "email" : email,
          "password" : password
        }});
    let p_url = this.url + "/api/v1/authenticate";
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(p_url,user,{ headers : headers})
    .map(res => res.json())
    }
}
