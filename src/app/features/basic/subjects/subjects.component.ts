import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, fromEvent, Subject} from "rxjs";
import {map, withLatestFrom} from 'rxjs/operators';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.onSubject();
    this.onBehaviourSubject();
  }

  onSubject() {
    const emitButton = document.getElementById('emit');
    const inputElement = document.getElementById('value-input');
    const subscribeButton = document.getElementById('subscribe');

    const value$ = new Subject<string>();
    // @ts-ignore
    fromEvent(emitButton, 'click').pipe(
      // @ts-ignore
      map(() => inputElement.value)
    ).subscribe(value$);
    // @ts-ignore
    fromEvent(subscribeButton, 'click').subscribe(
      () => {
        console.log('New Subscription');
        value$.subscribe(value => console.log(value));
      }
    )
  }

  onBehaviourSubject() {
    const loggedInSpan = document.getElementById('span');
    const loginButton = document.getElementById('login-button');
    const logoutButton = document.getElementById('logout-button');
    const printStateButton = document.getElementById('print-state-button');

    const isLoggedIn$ = new BehaviorSubject<boolean>(false);
    // @ts-ignore
    fromEvent(loginButton, 'click').subscribe(() => isLoggedIn$.next(true));
    // @ts-ignore
    fromEvent(logoutButton, 'click').subscribe(() => isLoggedIn$.next(false));


    // Navigation bar
    isLoggedIn$.subscribe(
      // @ts-ignore
      isLoggedIn => loggedInSpan.innerText = isLoggedIn.toString()
    )

    // Buttons
    isLoggedIn$.subscribe(isLoggedIn => {
      // @ts-ignore
      logoutButton.style.display = isLoggedIn ? 'block' : 'none';
      // @ts-ignore
      loginButton.style.display = !isLoggedIn ? 'block' : 'none';
    })

    // @ts-ignore
    fromEvent(printStateButton, 'click').pipe(
      withLatestFrom(isLoggedIn$)
    ).subscribe(
      ([event, isLoggedIn]) => console.log('User is logged in:', isLoggedIn)
    )
  }

}
