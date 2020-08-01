import { Component , OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { WebsocketService } from '../websocket.service';
import { ColorsrvService } from '../colorsrv.service';

import * as Rx from 'rxjs/Rx';
import { Observable, Subject } from "rxjs/Rx";
import {interval} from "rxjs/internal/observable/interval";
import {startWith, switchMap} from "rxjs/operators";

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


export class HomePage implements OnInit {
  changeColor = 'success';
  colors: string[] = ['#000000', '#db0f0f', '#0fbf0f', '#35a3e8', '#FFFFFF'];
  color: string[] = ['yellow', 'blue', 'red', '', '#FFFFFF'];
  clr = '#D3D3D3';
  currentColor: string = this.colors[1];
  message = '';
  //messages = [];
  currentUser = '';
  subject: Rx.Subject<VoteResult>;
  subjectVote: Rx.Subject<Vote>;
  url = 'wss://ws.colorchooser.iamcly.de';
  messages: string[] = [];

  constructor( private colorsrvService: ColorsrvService) {
    this.changeColor = 'my-special-color';
    }

  ngOnInit(){

    this.messages = this.colorsrvService.messages;
    console.log('Response from websocket: ' + this.messages);
    /*this.colorsrvService.voteResults.subscribe(msg => {
      console.log('Response from websocket: ' + msg);
    });*/


  }
  changeColors1(cl){
    console.log(cl);
    if ( cl === 'r'){
      console.log('red');
      this.clr = '#f53d3d' ;
    }
    if ( cl === 'g'){
      console.log('green');

      this.clr = '#32db64' ;
     }
    if ( cl === 'b' ){
      console.log('red');
      this.clr = '#488aff' ;
     }

  }
  switchColor(index: number) {
    this.currentColor = this.colors[index];
  }
  changeColors(cl){

    const val = {
      action: 'vote',
      color: cl
    };
    //this.colorsrvService.vote.next(val);

    console.log('new message from client to websocket: ', cl);

  }
}
