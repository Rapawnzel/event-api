import { Component, OnInit } from '@angular/core';
import { blogBasicDB } from '../../../shared/data/blog/blog-basic/column'
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/service/events.service';
@Component({
  selector: 'app-column-no-sidebar',
  templateUrl: './column-no-sidebar.component.html',
  styleUrls: ['./column-no-sidebar.component.scss']
})
export class ColumnNoSidebarComponent implements OnInit {
  
  data: object;
  subscription: Subscription;
  //post: object[] = this._data.post;

  constructor(
    public _http: HttpClient,
    public _events: EventsService,
    public _path: ActivatedRoute
  ) {
    this.subscription = this._events.data.subscribe(
      (newValue) => { this.data = newValue })
  }

  ngOnInit() {
    this._events.httpGet();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
