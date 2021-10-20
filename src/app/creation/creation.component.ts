import { Component, OnInit } from '@angular/core';
import {Observable, of, from, fromEvent, timer, interval, forkJoin, combineLatest} from 'rxjs';
import {ajax} from "rxjs/ajax";

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit {
  names$ = new Observable<string>(subscriber => {
    subscriber.next('Alice');
    subscriber.next('Ben');
    subscriber.next('Charlie');
    subscriber.complete();
  })

  name: string = '';
  nation: string = '';
  food: string = '';
  sentence: string = '';

  constructor() { }

  ngOnInit(): void {
    this.fromEventFunction();
  }

  onOfFunction() {
    of('Alice', 'Ben', 'Charlie').subscribe(value => console.log(value));
  }

  onNewObservableFunction() {
    this.names$.subscribe({
      next: value => console.log(value),
      complete: () => console.log('Completed')
    });
  };

  ownOf(...args: string[]): Observable<string> {
    return new Observable<string>(subscriber => {
      for(let i = 0; i < args.length; i++) {
        subscriber.next(args[i]);
      }
      subscriber.complete();
    });
  };

  onOwnOf() {
    this.ownOf('Alice', 'Ben', 'Charlie').subscribe({
      next: value => console.log(value),
      complete: () => console.log('Completed')
    });
  }

  fromFunction() {
    from(['Alice', 'Ben', 'Charlie']).subscribe({
      next: value => console.log(value),
      complete: () => console.log('Completed')
    })
  }

  fromPromiseFunction() {
    const somePromise = new Promise((resolve, reject) => {
      // resolve('Resolved!');
      reject('Rejected!');
    });

    const observableFromPromise$ = from(somePromise);

    observableFromPromise$.subscribe({
      next: value => console.log(value),
      error: err => console.log('Error:', err),
      complete: () => console.log('Completed')
    })
  }

  fromEventFunction() {
    const triggerButton = document.querySelector('#trigger-button');
    // @ts-ignore
    const triggerClick$ = new Observable(subscriber => {
      // @ts-ignore
      triggerButton.addEventListener('click', event => {
        subscriber.next(event);
      })
    })
    // @ts-ignore
    /*fromEvent(triggerButton, 'click').subscribe(
      // @ts-ignore
      event => console.log(event.type, event.x, event.y)
    );*/

    const subscription = triggerClick$.subscribe(
      // @ts-ignore
      event => console.log(event.type, event.x, event.y)
    );

    setTimeout(() => {
      console.log('Unsubscribe!');
      subscription.unsubscribe();
    }, 5000);
  }

  onTimer() {
    console.log('Timer started!');
    timer(2000).subscribe({
      next: value => console.log(value),
      complete: () => console.log('Completed!')
    });
  }

  onInterval() {
    const subscription = interval(1000).subscribe({
      next: value => console.log(value),
      complete: () => console.log('Completed!')
    });

    setTimeout(() => {
      subscription.unsubscribe();
      console.log('Interval unsubscribed!');
    }, 5000);
  }

  onForkJoin() {
    const randomName$ = ajax('https://random-data-api.com/api/name/random_name');
    const randomNation$ = ajax('https://random-data-api.com/api/nation/random_nation');
    const randomFood$ = ajax('https://random-data-api.com/api/food/random_food');

    forkJoin([randomName$, randomNation$, randomFood$]).subscribe(
      ([nameAjax, nationAjax, foodAjax]) => {
        this.name = nameAjax.response.name;
        this.nation = nationAjax.response.nationality;
        this.food = foodAjax.response.dish;
        this.sentence = `${this.name} is ${this.nation} and likes to eat ${this.food}!`;
      }
    );
  }

  onErrorForkJoin() {
    const a$ = new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next('A');
        subscriber.complete();
      }, 3000);

      return () => {
        console.log('A teardown')
      }
    })

    const b$ = new Observable(subscriber => {
      setTimeout(() => {
        subscriber.error('Failure!');
      }, 5000);

      return () => {
        console.log(('B teardown'));
      }
    })

    forkJoin([a$, b$]).subscribe({
      next: value => console.log(value),
      error: err => console.log('Error:', err)
    });
  }

  onCombineLatest() {
    const temperatureInput = document.getElementById('temperature-input');
    const conversionDropdown = document.getElementById('conversion-dropdown');
    const resultText = document.getElementById('result-text');

    // @ts-ignore
    const temperatureInputEvent$ = fromEvent(temperatureInput, 'input');
    // @ts-ignore
    const conversionInputEvent$ = fromEvent(conversionDropdown, 'input');

    combineLatest([temperatureInputEvent$, conversionInputEvent$]).subscribe(
      // @ts-ignore
      ([temperatureInputEvent, conversionInputEvent]) => {
        // @ts-ignore
        const temperature = Number(temperatureInputEvent.target['value']);
        // @ts-ignore
        const conversion = conversionInputEvent.target['value'];

        let result: number;
        if (conversion === 'f-to-c') {
          result = (temperature - 32) * 5/9;
        } else if (conversion === 'c-to-f') {
          result = temperature * 9/5 + 32;
        }

        // @ts-ignore
        resultText.innerText = String(result);

        console.log(
          temperature,
          conversion
        );
      }
    )
  }

}
