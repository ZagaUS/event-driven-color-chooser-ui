import { Injectable } from '@angular/core';
// import * as Rx from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Observer} from 'rxjs/Observer';


@Injectable({
  providedIn: 'root'
})


export class WebsocketService {
// private subject: Rx.Subject<MessageEvent>;
private subject: Subject<any> ;

private ws: WebSocket;

  constructor() { }

 // public connect(url): Rx.Subject<MessageEvent> {
  public connect() {
    if (!this.subject) {
      this.subject = this.create();
      console.log('Successfully connected: ' );
    }else {
      console.log('Successfully else connected: ' );
    }
    return this.subject;
  }
  // public create(url): Rx.Subject<MessageEvent> {
    public create() {
     this.ws = new WebSocket('wss://ws.colorchooser.iamcly.de/');
    // tslint:disable-next-line: only-arrow-functions
     this.ws.onerror = function(error) {
      console.log('WebSocket Error: ' + error);
    };
    // tslint:disable-next-line: only-arrow-functions
     this.ws.onopen = function(open) {
      console.log('WebSocket open: ' + open);
     // console.log('WebSocket readt: ' + this.ws.readyState);
    };
    // tslint:disable-next-line: only-arrow-functions
     this.ws.onmessage = function(event) {
      console.log('WebSocket onmessage: ' + event);
      // console.log('WebSocket on message status: ' + this.ws.readyState);
    };
    // tslint:disable-next-line: deprecation
     const observable = Observable.create(
      (obs: Observer<MessageEvent>) => {
        this.ws.onmessage = obs.next.bind(obs);
        this.ws.onerror = obs.error.bind(obs);
        // ws.onmessage = obs.next.bind(obs);
        this.ws.onclose = obs.complete.bind(obs);
        // return ws.onopen.bind(ws);
        return this.ws.close.bind(this.ws);
      }
    );
     console.log('open' , this.ws.readyState );

     const observer  = {
      // tslint:disable-next-line: ban-types
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
    // tslint:disable-next-line: deprecation
     return Subject.create(observer, observable );
  }
  sendMessage(message: string) {
    console.log(message);
    this.ws.send(message);
  }
}
