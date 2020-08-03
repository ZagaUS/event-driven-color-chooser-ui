import { Component , ViewChild , ElementRef, Renderer2 , OnInit , AfterViewInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { WebsocketService } from '../websocket.service';
// import { ColorsrvService } from '../colorsrv.service';

import * as Rx from 'rxjs/Rx';
import { Observable, Subject } from 'rxjs/Rx';
import {interval} from 'rxjs/internal/observable/interval';
import {startWith, switchMap} from 'rxjs/operators';

export interface Vote {
  action: string;
  color: string;

}
export interface VoteResult {
  r: string;
  g: string;
  b: string;
  hex: string;

}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit , AfterViewInit {
  clr = '#D3D3D3';
  url = 'wss://ws.colorchooser.iamcly.de';
  messages: string[] = [];
  myDiv;
  r = '0';
  b = '0';
  g = '0';

 @ViewChild('my-square') divView: ElementRef;

  constructor(  public wsService: WebsocketService ,
                public element: ElementRef ) {
  }

   ngAfterViewInit(){
    this.myDiv = this.element.nativeElement.querySelector('.my-square');
    console.log('view', this.divView);
    this.myDiv.style.backgroundColor = this.clr ;
    }

  ngOnInit(){

   this.wsService.connect()
   .subscribe(evt => {
     const dt = JSON.parse(evt.data);
     console.log('event' , evt);
     this.clr = dt.hex;
     this.r = dt.r;
     this.b = dt.b;
     this.g = dt.g;
     this.messages.push(dt.hex);
   });

   console.log('Response from websocket: ' + this.messages);
  }
  changeColors(cl){

    const val = {
      action: 'vote',
      color: cl
    };
    this.wsService.sendMessage(JSON.stringify(val));
    console.log('new message from client to websocket: ', JSON.stringify(val));

  }
}
