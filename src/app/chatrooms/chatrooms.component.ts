import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Broadcaster } from 'ng2-cable/js/index';
import {MessageService} from '../message.service';
import { Router  } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'app-chatrooms',
  templateUrl: './chatrooms.component.html',
  styleUrls: ['./chatrooms.component.css'],
  providers : [MessageService]
})
export class ChatroomsComponent implements OnInit {

  @ViewChild('scrollContainer') private scrollContainer: ElementRef;

  public chat_rooms: any[] = [];
  public page: number = 1;
  public currentSender: any;
  public chat_room: any = {};

  constructor(private messageService: MessageService,
              private broadcaster: Broadcaster, private _router : Router) {
  }

  ngOnInit() {
    this.checkUser();
    this.loadChatRooms();
    // this.initEvents();
  }

  loadChatRooms() {
    this.messageService.queryrooms(this.page).subscribe(
      (chat_rooms) => {
        this.chat_rooms = chat_rooms.reverse().concat(this.chat_rooms);
      }
    );
  }


  createChatRoom() {
    this.chat_room['user_id'] = this.currentSender;
    this.messageService.createroom({chat_room: this.chat_room}).subscribe(
      ()=> {
        this.chat_room = {};
        this.scrollToBottom();

      }
    );
  }

  checkUser() {
    if (this.getCurrentSender()) {
      this.currentSender = this.getCurrentSender();
    } else {
      this._router.navigateByUrl('/signup')
    }
  }

  getCurrentSender() {
    return Cookie.get('id');
  }

  nextPage() {
    this.page += 1;
    this.loadChatRooms();
  }

  enterChat(chat_room_id){
    this._router.navigate(['/messages',chat_room_id])
  }

  // initEvents() {
  //   this.broadcaster.on<string>('CreateMessage').subscribe(
  //     message => {
  //       this.messages.push(message);
  //       this.scrollToBottom();
  //     }
  //   );
  // }

  scrollToBottom() {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }

}
