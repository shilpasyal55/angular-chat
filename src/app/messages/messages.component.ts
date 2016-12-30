import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { Broadcaster } from 'ng2-cable/js/index';
import { MessageService } from '../message.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
@ViewChild('scrollContainer') private scrollContainer: ElementRef;

  public messages: any[] = [];
  public page: number = 1;
  public currentSender: any;
  public message: any = {};

  constructor(private messageService: MessageService,
              private broadcaster: Broadcaster, private _router : Router) {
  }

  ngOnInit() {
    this.checkUser();
    this.loadMessages();
    this.initEvents();
  }

  loadMessages() {
    this.messageService.query(this.page).subscribe(
      (messages) => {
        this.messages = messages.reverse().concat(this.messages);
      }
    );
  }


  createMessage() {
    this.message['user_id'] = this.currentSender;
    this.messageService.create({message: this.message}).subscribe(
      ()=> {
        this.message = {};
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
    this.loadMessages();
  }

  initEvents() {
    this.broadcaster.on<string>('CreateMessage').subscribe(
      message => {
        this.messages.push(message);
        this.scrollToBottom();
      }
    );
  }

  scrollToBottom() {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }
}
