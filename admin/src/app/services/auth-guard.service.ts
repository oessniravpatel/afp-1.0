import { Injectable } from '@angular/core';
import { CanActivate,RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Globals } from '.././globals';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService : AuthService,private router: Router, private globals: Globals) { }

  canActivate(route,state:RouterStateSnapshot) { 
	  if(this.authService.isLoggedIn()==true){
			if(state.url.split('/')[2] != undefined){
				this.globals.currentLink = '/'+state.url.split('/')[1]+'/'+state.url.split('/')[2];
			} else {
				this.globals.currentLink = '/'+state.url.split('/')[1];
			}
		  if(state.url=='/login'){
			  this.globals.IsLoggedIn = false;
			  this.router.navigate(['/']);
			  return false;
		  } else {
			  this.globals.IsLoggedIn = true;
			  return true;
		  }		  
	  } else {
		   if(state.url=='/login'||state.url=='/access-denied'){
			  this.globals.IsLoggedIn = false;
			  return true;
		   } else {
			   this.globals.IsLoggedIn = false;
			   this.router.navigate(['/login']);
			   return false;
		   }		  
	  }
  }
  
}
