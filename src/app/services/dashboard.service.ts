import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
@Injectable()
export class DashboardService {

  constructor( private http: HttpClient,private globals: Globals) { }

  getAllAssement(UserId) 
  { debugger
	let promise = new Promise((resolve, reject) => { 
    this.http.get(this.globals.baseAPIUrl + 'DashboardUser/getAllAssement/'+UserId)

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

  getUserAssessDetail(CAssessmentId) 
  { debugger
	let promise = new Promise((resolve, reject) => { 
    this.http.get(this.globals.baseAPIUrl + 'DashboardUser/getUserAssessDetail/'+CAssessmentId)
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
