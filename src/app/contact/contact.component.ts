import { Component } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  constructor(private notify: NotificationService) {}
  sendNotification(data: any) {
    console.log('service called', data);
    this.notify.sendNotification(data?.value);
  }
}
