import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
@Injectable()
export class CompetencyAreaService {

  constructor(private http: HttpClient, private globals: Globals) { }

  add(areaEntity){ debugger
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'Competency_Area/add', areaEntity)
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
    this.http.post(this.globals.baseAPIUrl + 'Competency_Area/delete',del)
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
    this.http.get(this.globals.baseAPIUrl + 'Competency_Area/getAll')
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
  
  getById(Competency_AreaId){
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Competency_Area/getById/' + Competency_AreaId)
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

   getDomainList(){
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Competency_Area/getDomainList')
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

