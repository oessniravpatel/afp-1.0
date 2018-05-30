import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
@Injectable()
export class SettingsService {

  constructor(private http: HttpClient, private globals: Globals) { }

  add(teamsizeEntity){ 
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'Settings/addTeamSize', teamsizeEntity)
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

  addRemainigDays(rdaysEntity){  
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Settings/addRemainigDays', rdaysEntity)
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

  update_config(configEntity){ 
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.globals.baseAPIUrl + 'Settings/updateConfiguration', configEntity)
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

    update_email(configEntity){ 
      let promise = new Promise((resolve, reject) => {
        this.http.post(this.globals.baseAPIUrl + 'Settings/updateEmail', configEntity)
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
    this.http.post(this.globals.baseAPIUrl + 'Settings/deleteTeamSize',del)
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
  
  getAll(UserId){ 
    debugger
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Settings/getAll/' + UserId)
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

  getTeamSizeList(){ 
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + 'Settings/getTeamSizeList')
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
  
  // getById(TeamSizeId){
	// let promise = new Promise((resolve, reject) => {
  //   this.http.get(this.globals.baseAPIUrl + 'Settings/getById/' + TeamSizeId)
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

}

