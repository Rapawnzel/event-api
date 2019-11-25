import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  data: Subject<object> = new Subject<object>();


  constructor(
    public _http: HttpClient,
  ) { }

  httpGet() {
    let url = 'http://localhost:3000/events'

    this._http.get(url,
    {headers: new HttpHeaders({'x-requested-with': 'XMLHttpResponse', "Content-Type" : "application/json"})}
    )
    .subscribe( 
      (result) => {this.data.next(result)}
    )
  }
}
