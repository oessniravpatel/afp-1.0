import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class Globals { debugger

  constructor() { }

  baseAPIUrl: string = 'http://localhost/AFP/api/';  
  headerpath: string = "{'Content-Type': 'application/json','Accept': 'application/json'}";
  IsLoggedIn: boolean = false;
  isLoading: boolean = false;
  currentLink: string = '';
  authData = localStorage.getItem('token') ? new JwtHelper().decodeToken(localStorage.getItem('token')):null;
  msgflag = false;
  message = '';
  type = '';
  check_login = false;
  headerhome = false;
  footerhome = false;
  logohome = false;
  
}