import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent implements OnInit {
  emptyObservable$ = new Observable<string>(subscriber => {
    subscriber.next('Empty 1');
    subscriber.next('Empty 2');
    setTimeout(() => {
      subscriber.next('Empty 3');
    }, 2000);
    setTimeout(() => subscriber.error(new Error('Failure!')), 4000);
  });

  observable$ = new Observable(subscriber => {
    console.log('Observable executed!');
    subscriber.next('Alice');
    setTimeout(() => subscriber.next('Ben'), 2000);
    setTimeout(() => subscriber.next('Charlie'), 4000);
  });

  interval$ = new Observable<number>(subscriber => {
    let counter = 1;
    const intervalId = setInterval(() => {
      subscriber.next(counter++);
    }, 2000);
    // We have to clean the interval (memory leak, even on unsubscribe)
    return () => {
      clearInterval(intervalId);
    }
  });


  observer = {
    next: (value: any) => console.log(value)
  }

  constructor() {
  }

  ngOnInit(): void {

  }

  handleNormalObservable(): void {
    const subscription = this.observable$.subscribe(this.observer);
    setTimeout(() => subscription.unsubscribe(), 3000);
  }

  handleEmptyObservable(): void {
    const emptySubscription = this.emptyObservable$.subscribe({
      "next": (value: any) => console.log(value),
      "error": err => console.log(err.message),
      "complete": () => console.log('Completed!')
    });
  }

  handleIntervalObservable(): void {
    const intervalSubscription = this.interval$.subscribe({
      "next": (value: any) => console.log(value)
    })
    setTimeout(() => {
      console.log('Unsubscribed!');
      intervalSubscription.unsubscribe();
    }, 7000);
  }

}


