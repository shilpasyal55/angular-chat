import { Component } from '@angular/core';
import { Ng2Cable, Broadcaster } from 'ng2-cable/js/index';
import 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private ng2cable: Ng2Cable,
            private broadcaster: Broadcaster) {
    this.ng2cable.subscribe('http://localhost:3000/cable', 'ChatChannel'); // for development need to change url to http://localhost:3000/cable
  }
}
