import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  isLogged: boolean = false;

  token: object;

  constructor(public _http: HttpClient, public _router: Router) { }

  login(username: string, password: string): void {
    this._http.post(`http://localhost:3000/login`,
      {
        "username": username,
        "password": password
      }, {
      headers: new HttpHeaders({ "x-requested-with": "XMLHTTPResponse" })
    }).subscribe((result) => {
      this.token = result;
      if (this.token["logged"] === true) {
        this.isLogged = true;
        this._router.navigateByUrl("events");
      }
      else{
        console.log("loggin not ok");
      }
    })
  }

  register(username: string, password: string): void {
    console.log(username, password);
    this._http.post(`http://localhost:3000/register`,
      {
        "username": username,
        "password": password
      }, {
      headers: new HttpHeaders({ "x-requested-with": "XMLHTTPResponse" })
    }).subscribe((result) => {
      this.token = result;
      if (this.token["userRegistered"] === true) {
        this.isLogged = true;
        this._router.navigateByUrl("events");
      }
    })
  }

  logout(): void {
    this.isLogged = false;
  }

}
