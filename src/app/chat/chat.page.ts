import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  message = '';
  messages = [];
  currentUser = '';
 
  constructor(private socket: Socket, private toastCtrl: ToastController) { }
 
  ngOnInit() {
    this.socket.connect();
    const name = `user-${new Date().getTime()}`;
    this.currentUser = name;

    this.socket.emit('set-name', name);
    this.socket.fromEvent('users-changed').subscribe(data => {
      const user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
 
    this.socket.fromEvent('message').subscribe(message => {
      this.messages.push(message);
    });
  }
 
  sendMessage() {
    this.socket.emit('send-message', { text: this.message });
    this.message = '';
  }
 
  ionViewWillLeave() {
    this.socket.disconnect();
  }
 
  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();

}
}
