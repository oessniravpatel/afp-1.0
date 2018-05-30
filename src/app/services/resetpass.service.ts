import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';


@Injectable()
export class ResetpassService {

   constructor( private http: Http,private globals: Globals) { }
   
   
  add(UserId){
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'Resetpass/resetuserpass', UserId, this.globals.headerpath)
      .toPromise()
      .then(
        res => { // Success
          resolve(res.json());
        },
        msg => { // Error
		  reject(msg);
        }
      );
	});		
	return promise;
  }
   
   getResetlink(UserId){
	  debugger
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'Resetpass/resetpasslink',UserId,  this.globals.headerpath)
      .toPromise()
      .then(
        res => { // Success
          resolve(res.json());
        },
        msg => { // Error
		  reject(msg);
        }
      );
	});		
	return promise;
  }
  
   getResetlink2(UserId){
	  debugger
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'Resetpass/resetpasslink2',UserId,  this.globals.headerpath)
      .toPromise()
      .then(
        res => { // Success
          resolve(res.json());
        },
        msg => { // Error
		  reject(msg);
        }
      );
	});		
	return promise;
  }

}
