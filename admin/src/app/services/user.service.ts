import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserService {

   constructor(private http: HttpClient, private globals: Globals) { }

   add(userEntity){ debugger
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'User/addUser', userEntity)
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
  
  
  //list all users
  getAllUser(){
	  debugger
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'User/getAllUserList')
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
  //list all users
  getAllDefaultData(){
	  debugger
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'User/getAllDefaultData')
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
  
  
  //delete User
  deleteUser(del){  debugger
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'User/deleteUser',del)
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
  
  
   getById(userId){
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'User/getById/' + userId)
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

   //list project all status
  // getAllState(){
	// let promise = new Promise((resolve, reject) => {
  //   this.http.get(this.globals.baseAPIUrl + 'User/getAllState')
  //     .toPromise()
  //     .then(
  //       res => { // Success
  //         resolve(res);
  //       },
  //       msg => { // Error
	// 	  reject(msg);
  //       }
  //     );
	// });		
	// return promise;
  // }
  
  //  getAllCompany(){
	 
	// let promise = new Promise((resolve, reject) => {
  //   this.http.get(this.globals.baseAPIUrl + 'User/getAllCompany')
  //     .toPromise()
  //     .then(
  //       res => { // Success
  //         resolve(res);
  //       },
  //       msg => { // Error
	// 	  reject(msg);
  //       }
  //     );
	// });		
	// return promise;
  // }
  
  
  // getAllRole(){ debugger
	// let promise = new Promise((resolve, reject) => {
  //   this.http.get(this.globals.baseAPIUrl + 'User/getAllRole')
  //     .toPromise()
  //     .then(
  //       res => { // Success
  //         resolve(res);
  //       },
  //       msg => { // Error
	// 	  reject(msg);
  //       }
  //     );
	// });		
	// return promise;
  // }
  
  // getAllCountry()
  // {debugger
	// let promise = new Promise((resolve, reject) => {
  //   this.http.get(this.globals.baseAPIUrl + 'User/getAllCountry')
  //     .toPromise()
  //     .then(
  //       res => { // Success
  //         resolve(res);
  //       },
  //       msg => { // Error
	// 	  reject(msg);
  //       }
  //     );
	// });		
	// return promise;
  // }
  
  getStateList(CountryId){ 
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'User/getStateList/' + CountryId)
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
