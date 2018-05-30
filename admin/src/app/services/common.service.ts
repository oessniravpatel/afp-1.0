import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';

@Injectable()
export class CommonService {

  constructor(private http: Http, private globals: Globals) { }

  get_permissiondata(permission){ 
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'Common/get_permissiondata', permission, this.globals.headerpath)
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

