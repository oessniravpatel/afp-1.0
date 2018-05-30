import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class RegisterService {

 constructor( private http: Http,private globals: Globals) { }


 add(RegisterEntity){  
   debugger
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'Register/addRegister', RegisterEntity, this.globals.headerpath)
      .toPromise()
      .then( 
        res => { // Success 
			let result = res.json();
			if(result && result.token){
				localStorage.setItem('token',result.token);				
				this.globals.authData = new JwtHelper().decodeToken(result.token);
			}
		  resolve(res.json());
        },
        msg => { // Error
		  reject(msg.json());
        }
      );
	});		
	return promise;
  }

 
 
//  add(data)
//   {
//    let promise = new Promise((resolve, reject) => {
//      this.http.post(this.globals.baseAPIUrl + 'Register/addRegister', data, this.globals.headerpath)
//        .toPromise()
//        .then(
//          res => { // Success
//            resolve(res.json());
//          },
//            msg => { // Error
//        reject(msg);
//          }
//        );
//    });		
//    return promise;
//    }
   
   
   getAllCountry()
  {
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Register/getAllCountry' , this.globals.headerpath)
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
   
  getCompany(token)
  {
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Register/getCompany/' + token, this.globals.headerpath)
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
  getAllState(){
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Register/getAllState',  this.globals.headerpath)
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
   getStateList(CountryId){
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Register/getStateList/' + CountryId, this.globals.headerpath)
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
    
getById(userId){debugger
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Register/getById/' + userId, this.globals.headerpath)
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
  getAll()
   {
   let promise = new Promise((resolve, reject) => {
     this.http.get(this.globals.baseAPIUrl + 'Invitation/getAll', this.globals.headerpath)
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
