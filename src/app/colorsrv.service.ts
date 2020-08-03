import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import {Subject} from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})

export class ColorsrvService {
  subject: Subject<any>;

  constructor( private wsService: WebsocketService) {
    this.subject = wsService.connect();
  }
  
  sendMessage(message: string) {
    this.wsService.sendMessage(message);
  }

  getSubject() {
    return this.subject;
  }
}
