import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Observer} from 'rxjs/Observer';

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {
  private subject: Subject<any>;
  private ws: WebSocket;
  constructor() { }

  public connect() {
    if (!this.subject) {
      this.subject = this.create();
      console.log('Successfully connected: ' );
    }else {
      console.log('Successfully else connected: ' );
    }
    return this.subject;
  }

  public create() {
    this.ws = new WebSocket('wss://ws.colorchooser.iamcly.de/');
    this.ws.onerror = function(error) {
      console.log('WebSocket Error: ' + error);
    };

    this.ws.onopen = function(open) {
      console.log('WebSocket open: ' + open);
    };

    this.ws.onmessage = function(event) {
      console.log('WebSocket onmessage: ' + event);
    };

    const observable = Observable.create(
      (obs: Observer<MessageEvent>) => {
        this.ws.onmessage = obs.next.bind(obs);
        this.ws.onerror   = obs.error.bind(obs);
        this.ws.onclose   = obs.complete.bind(obs);
        return this.ws.close.bind(this.ws);
      }
    );

    console.log('open' , this.ws.readyState );

    const observer = {
      next: (data: Object) => {
        console.log('open' , this.ws.readyState );

        if ( this.ws.readyState === WebSocket.OPEN){
          console.log('open' , data );
          this.ws.send(JSON.stringify(data));
        }else {
          console.log('close' , data );
        }
      }
    };

    return Subject.create(observer, observable);
  }
  
  sendMessage(message: string) {
    console.log(message);
    this.ws.send(message);
  }
}
