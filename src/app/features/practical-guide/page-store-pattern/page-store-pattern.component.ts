import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { User } from '../../../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-store-pattern',
  templateUrl: './page-store-pattern.component.html',
  styleUrls: ['./page-store-pattern.component.css'],
})
export class PageStorePatternComponent implements OnInit {
  chiefUser$!: Observable<User[]>;
  // @ts-ignore
  users$: Observable<User[]>;

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.users$ = this.store.users$;
    // this.chiefUser$ = this.store.selectChiefUser();
  }
}
