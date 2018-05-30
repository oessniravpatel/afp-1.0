import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
@Injectable()
export class KsaService {

  constructor(private http: HttpClient, private globals: Globals) { }

  add(ksaEntity){ debugger
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'KSA/add', ksaEntity)
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
    
  delete(del){debugger
	let promise = new Promise((resolve, reject) => {		
    this.http.post(this.globals.baseAPIUrl + 'KSA/delete',del)
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

  getAll(){ 
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'KSA/getAll')
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
  
  getById(KSAId){
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'KSA/getById/' + KSAId)
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

  getCAreaList(){
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'KSA/getCAreaList')
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


