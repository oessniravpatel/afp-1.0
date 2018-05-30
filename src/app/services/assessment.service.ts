import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
@Injectable()
export class AssessmentService {

  constructor(private http: HttpClient,private globals: Globals) { }

  getAllksa(UserId) 
  { debugger
	let promise = new Promise((resolve, reject) => { 
    this.http.get(this.globals.baseAPIUrl + 'Assessment/getAllKSA/'+UserId)
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

  saveKsa(ksaEntity)
  { debugger
	let promise = new Promise((resolve, reject) => { 
    this.http.post(this.globals.baseAPIUrl + 'Assessment/saveKsa',ksaEntity)
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

  finalSubmit(CAssessmentId)
  {debugger
	let promise = new Promise((resolve, reject) => { 
    this.http.get(this.globals.baseAPIUrl + 'Assessment/finalSubmit/'+CAssessmentId)
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

  testKsa() 
  { debugger
	let promise = new Promise((resolve, reject) => { 
    this.http.get(this.globals.baseAPIUrl + 'AssessmentDetails/test')
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
