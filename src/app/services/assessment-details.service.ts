import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
@Injectable()
export class AssessmentDetailsService {

 constructor(  private http: HttpClient,private globals: Globals) { }
  add(AsmtDetailsEntity)
  {debugger
   let promise = new Promise((resolve, reject) => {
     this.http.post(this.globals.baseAPIUrl + 'AssessmentDetails/add', AsmtDetailsEntity)
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

  getTeamSize(){	 
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'AssessmentDetails/getAllTeamSize')
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

  CheckAssessment(UserId){
  let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'AssessmentDetails/CheckAssessment/'+UserId)
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
