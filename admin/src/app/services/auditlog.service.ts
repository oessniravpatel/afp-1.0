import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AuditlogService {
  constructor(private http: HttpClient, private globals: Globals) { 
  }

  getEmailLog(){     
	let promise = new Promise((resolve, reject) => {     
    this.http.get(this.globals.baseAPIUrl + 'AuditLog/getEmailLog')
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

  getLoginLog(){     
    let promise = new Promise((resolve, reject) => {     
      this.http.get(this.globals.baseAPIUrl + 'AuditLog/getLoginLog')
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
    
    getActivityLog(){     
      let promise = new Promise((resolve, reject) => {     
        this.http.get(this.globals.baseAPIUrl + 'AuditLog/getActivityLog')
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


