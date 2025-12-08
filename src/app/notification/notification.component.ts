import { Component } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {
  data: any = '';
  defaultdata: any = '';
  constructor(private notify: NotificationService) {}
  ngOnInit() {
    this.notify.notifySubj.subscribe((message) => {
      this.data = message;
      console.log('service called1', message);
    });
    this.notify.behsubj.subscribe((message) => {
      this.defaultdata = message;
      console.log('service called2', message);
    });
    const obs = new Observable((subscriber) => {
      subscriber.next('observable data 1');
      subscriber.next('observable data 2');
    });
    obs.subscribe((data) => console.log('data from observable', data));
  }
}
