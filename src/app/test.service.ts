import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getColdObservable(): Observable<any> {
    return this.http.get('https://random-data-api.com/api/name/random_name');
  }
}
