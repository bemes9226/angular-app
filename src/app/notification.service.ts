import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public notifySubj = new Subject();
  behsubj = new BehaviorSubject('Initial Message');
  constructor() {}
  sendNotification(message: any) {
    console.log('service called', message);
    this.notifySubj.next(message);
  }
  sendDefaultNotification(message: any) {
    this.behsubj.next(message);
  }
}
