import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
import { debug } from 'util';

@Injectable()
export class DomainService {
  constructor(private http: HttpClient, private globals: Globals) { 
  }

  add(domainEntity){
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'Domain/add', domainEntity)
      .toPromise()
      .then(
        res => { // Success
          resolve(res);
        },
        msg => { // Error
		  reject(msg);
        }
      );
	});		
	return promise;
  }
  
  delete(del){
	let promise = new Promise((resolve, reject) => {		
    this.http.post(this.globals.baseAPIUrl + 'Domain/delete',del)
      .toPromise()
      .then(
        res => { // Success
          resolve(res);
        },
        msg => { // Error
		  reject(msg);
        }
      );
	});		
	return promise;
  }

  
  getAll(){    debugger 
	let promise = new Promise((resolve, reject) => {     
    this.http.get(this.globals.baseAPIUrl + 'Domain/getAll')
      .toPromise()
      .then(
        res => { // Success
          resolve(res);
        },
        msg => { // Error
          console.log(msg.message);
          console.log(msg.error);
		  reject(msg);
        }
      );
  });	
	return promise;
  }
  
  getById(DomainId){ 
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Domain/getById/' + DomainId)
      .toPromise()
      .then(
        res => { // Success
          resolve(res);
        },
        msg => { // Error
		  reject(msg);
        }
      );
	});		
	return promise;
  }  

}
