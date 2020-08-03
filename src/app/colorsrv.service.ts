import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';

export interface VoteResult {
  r: string;
  g: string;
  b: string;
  hex: string;

}
export interface Vote {
  action: string;
  color: string;

}
@Injectable({
  providedIn: 'root'
})
export class ColorsrvService {

  public voteResults: Subject<VoteResult>;
 // public vote: Subject<Vote>;
 public vote: Subject<MessageEvent>;
  url = 'wss://ws.colorchooser.iamcly.de/';
  messages: string[] = [];
  message = '#D3D3D3';


  constructor( private wsService: WebsocketService) {

    wsService.connect()
      .subscribe(evt => {
        const dt = JSON.parse(evt.data);
        console.log('event' , dt.hex);

        this.message = dt.hex;
        console.log('update event' , this.message);
        this.messages.push(dt.hex);
      });

    /*this.voteResults = (wsService.connect().map(
      (response: MessageEvent): VoteResult => {
        const data = JSON.parse(response.data);
        console.log('ws data' , data);
        return {
           r: data.body.r,
           g: data.body.g,
           b: data.body.b,
           hex: data.body.hex,
        };
      }
    ) as Subject<VoteResult>);*/

   /* this.vote = (wsService.connect(this.url).map(
      //(response: MessageEvent): Vote => {
        (response  => {
        const data = JSON.parse(response.data);
        console.log('ws data' , data);
        return data;
        return {
           action: data.action,
           color: data.color
        };
      }
    )));*/
    //) as Subject<Vote>);

  }
  sendMessage(message: string) {
    this.wsService.sendMessage(message);
  }
  getMessage(message: string) {
    return this.messages;
  }



}
