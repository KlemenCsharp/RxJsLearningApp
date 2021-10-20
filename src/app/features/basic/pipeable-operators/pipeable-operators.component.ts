import { Component, OnInit } from '@angular/core';
import {EMPTY, fromEvent, Observable, of} from "rxjs";
import {NewsItem} from "../models/news-item";
import {debounceTime, filter, map, catchError, concatMap} from "rxjs/operators";
import {ajax} from "rxjs/ajax";

@Component({
  selector: 'app-pipeable-operators',
  templateUrl: './pipeable-operators.component.html',
  styleUrls: ['./pipeable-operators.component.css']
})
export class PipeableOperatorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.onFODynamicExample()
  }

  onFilter() {
    const newsFeed$ = new Observable<NewsItem>(subscriber => {
      setTimeout(() => subscriber.next({category: 'Business', content: 'A'}), 1000);
      setTimeout(() => subscriber.next({category: 'Sports', content: 'B'}), 3000);
      setTimeout(() => subscriber.next({category: 'Business', content: 'C'}), 4000);
      setTimeout(() => subscriber.next({category: 'Sports', content: 'D'}), 6000);
      setTimeout(() => subscriber.next({category: 'Business', content: 'E'}), 7000);
    })

    const sportsNewFeed$ = newsFeed$.pipe(
      filter(item => item.category === 'Sports')
    );

    sportsNewFeed$.subscribe(res => console.log(res));
  }

  onMap() {
    const randomFirstName$ = ajax('https://random-data-api.com/api/name/random_name').pipe(
      map(ajaxResponse => ajaxResponse.response.first_name)
    );

    randomFirstName$.subscribe(
      value => console.log(value)
    )
  }

  onDebounceTime() {
    const sliderInput = document.getElementById('debounceTimeSlider');
    // @ts-ignore
    fromEvent(sliderInput, 'input').pipe(
      debounceTime(2000),
      // @ts-ignore
      map(event => event.target['value'])
    ).subscribe(value => console.log(value));
  }

  onCatchError() {
    const failingHttpRequest$ = new Observable(subscriber => {
      setTimeout(() => {
        subscriber.error(new Error('Timeout'));
      }, 3000);
    })

    console.log('App started!')

    failingHttpRequest$.pipe(
      catchError(error => EMPTY)
    ).subscribe(
      value => console.log(value)
    );
  }

  onFOStaticExample() {
    const source$ = new Observable(subscriber => {
      setTimeout(() => subscriber.next('A'),2000);
      setTimeout(() => subscriber.next('B'),5000);
    });

    console.log('App has started!');
    source$.pipe(
      concatMap(value => of(1,2))
    ).subscribe(value => console.log(value));
  }

  onFODynamicExample() {
    const endpointInput = document.getElementById('dynamic-input');
    const fetchButton = document.getElementById('dynamic-button');

    // @ts-ignore
    fromEvent(fetchButton, 'click').pipe(
      // @ts-ignore
      map(() => endpointInput.value),
      concatMap(value =>
        ajax(`https://random-data-api.com/api/${value}/random_${value}`)
          .pipe(
            catchError(error => of(`Could not fetch data: ${error}`))
          )
      )
    ).subscribe({
      next: value => console.log(value),
      error: err => console.log('Error', err),
      complete: () => console.log('Completed!')
    })
  }


}
