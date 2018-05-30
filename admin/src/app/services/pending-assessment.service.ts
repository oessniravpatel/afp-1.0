import { Injectable } from '@angular/core';
import { Http } from '@angular//http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
@Injectable()
export class PendingAssessmentService {

  constructor(private http: HttpClient, private globals: Globals) { }

  getPendingAssessment(){   debugger  
    let promise = new Promise((resolve, reject) => {     
      this.http.get(this.globals.baseAPIUrl + 'Dashboard/getPendingAssessment')
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
