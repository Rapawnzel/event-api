import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  constructor(public _users: UsersService) { }

  isLogged: boolean = this._users.isLogged;

  loginInComp() {
    let enteredUsername = (<HTMLInputElement>document.querySelectorAll("#username")[0]).value;
    let enteredPassword = (<HTMLInputElement>document.querySelectorAll("#review")[0]).value;
    this._users.login(enteredUsername, enteredPassword)
  }

}
