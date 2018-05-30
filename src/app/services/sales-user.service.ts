import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
@Injectable()
export class SalesUserService {

  constructor(private http: HttpClient,private globals: Globals) { }
  getUserAssessDetail(CAssessmentId) 
  { 
	let promise = new Promise((resolve, reject) => { 
    this.http.get(this.globals.baseAPIUrl + 'Salesuser/getUserAssessDetail/'+CAssessmentId)
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

  getUserReport(UserId) 
  { 
	let promise = new Promise((resolve, reject) => { 
    this.http.get(this.globals.baseAPIUrl + 'Salesuser/getUserReport/'+UserId)
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
