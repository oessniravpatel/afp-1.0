import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
@Injectable()
export class RolepermissionService {

  constructor(private http: HttpClient, private globals: Globals) { }

  getDefault(){  
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + 'RolePermission/getDefault')
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

    getRolePermission(roleId){  
      let promise = new Promise((resolve, reject) => {
        this.http.get(this.globals.baseAPIUrl + 'RolePermission/getRolePermission/' + roleId)
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

      update_permission(permission){  debugger
        let promise = new Promise((resolve, reject) => {
          this.http.post(this.globals.baseAPIUrl + 'RolePermission/update_permission', permission)
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
