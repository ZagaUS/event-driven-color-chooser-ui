import { Component , OnInit } from '@angular/core';
import { ColorsrvService } from '../colorsrv.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  clr = '#555555';
  r   = 0
  g   = 0
  b   = 0

  constructor( private colorsrvService: ColorsrvService) {
    colorsrvService.getSubject().subscribe(evt => {
      if (evt.data) {
        let payload = JSON.parse(evt.data);
        this.clr = payload.hex || this.clr;
        this.r   = payload.r || this.r
        this.g   = payload.g || this.g
        this.b   = payload.b || this.b
      }
    });
  }

  ngOnInit(){}

  changeColors(cl){
    this.colorsrvService.sendMessage(JSON.stringify({
      action: 'vote',
      color: cl
    }));
  }
}
