import { Component, OnInit } from '@angular/core';
import {TestService} from "../test.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-hot-cold',
  templateUrl: './hot-cold.component.html',
  styleUrls: ['./hot-cold.component.css']
})
export class HotColdComponent implements OnInit {


  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.handleHotObservable();
  }

  handleColdObservable() {
    this.testService.getColdObservable().subscribe(res => console.log(res.first_name));
  }

  handleHotObservable() {
    const hotButton = document.getElementById('hot');
    const hotClick$ = new Observable(subscriber => {
      // @ts-ignore
      hotButton.addEventListener('click', (event) => {
        subscriber.next(event);
      })
    })
    // @ts-ignore
    hotClick$.subscribe(event => console.log(event.type, event.x, event.y));
  }

}
