import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AsyncSubject, ReplaySubject } from 'rxjs';
import { ContactComponent } from "./contact/contact.component";
import { NotificationComponent } from "./notification/notification.component";

interface Section {
  id: number;
  title: string;
  selectedOption: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, ContactComponent, NotificationComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-app';
  sections: Section[] = [
    { id: 1, title: 'Section 1', selectedOption: 'Option A' },
    { id: 2, title: 'Section 2', selectedOption: 'Option B' },
    // Add more sections as needed
  ];

  options = ['Option A', 'Option B', 'Option C'];

  ngOnInit() {
    //async observable
    let obj = new AsyncSubject();
    obj.next('heelo');
    obj.next('bheme');
    obj.complete();
    obj.subscribe((d) => console.log('sdf', d));

    let replaysubj = new ReplaySubject(2);
    replaysubj.next('first');
    replaysubj.next('second');
    replaysubj.next('four');
    replaysubj.next('five');
    replaysubj.subscribe((d) => console.log('replay subject', d));
    let asyncObs = new AsyncSubject<string>();
    asyncObs.subscribe((d) => console.log(d + ' from async observable'));
    this.getCache('https://jsonplaceholder.typicode.com/todos/1').subscribe(
      (data: any) => console.log('data from getCache:', data)
    );
  }
  getCache(url: string) {
    const cache: any = {};
    cache[url] = new AsyncSubject();
    if (!cache[url]) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          cache[url].next(data);

          console.log('fetched data:', cache);
          cache[url].complete();
        });
    }
    return cache[url].asObservable();
  }
}
