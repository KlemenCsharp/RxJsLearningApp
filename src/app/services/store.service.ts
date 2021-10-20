import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  configUrl = 'https://jsonplaceholder.typicode.com';
  subject = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this.subject.asObservable();

  constructor(private http: HttpClient) {}

  init() {
    return this.http
      .get<User[]>(this.configUrl + '/users')
      .pipe(tap(() => console.log('HTTP request executed!')))
      .subscribe((users) => this.subject.next(users));
  }
}
