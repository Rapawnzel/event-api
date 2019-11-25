import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{

  constructor(public _data: UsersService) { }

  isLogged: boolean = this._data.isLogged;

  registerInComp() {
    let enteredUsername = (<HTMLInputElement>document.querySelectorAll("#username")[0]).value;
    let enteredPassword = (<HTMLInputElement>document.querySelectorAll("#review")[0]).value;
    this._data.register(enteredUsername, enteredPassword);
  }

}
