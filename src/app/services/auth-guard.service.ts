import { Injectable } from '@angular/core';
import { CanActivate,RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Globals } from '.././globals';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService : AuthService,private router: Router, private globals: Globals) { }

  canActivate(route,state:RouterStateSnapshot) { 
	  this.globals.currentLink=state.url;
	if(state.url=='/welcome_register'){   // new header component show
	
		this.globals.logohome = true;
	
	} else {
		
		this.globals.logohome = false;
	
	}
	if(state.url=='/' ||state.url=='/welcome_register'){   // new header component show
		this.globals.headerhome = true;
		
		
	} else {
		this.globals.headerhome = false;
	
		
	}
	if(state.url=='/' ){   // new header component show
	
		
		this.globals.footerhome = true;
	} else {
		
	
		this.globals.footerhome = false;
	}
	  if(this.authService.isLoggedIn()==true){
		
		
			if(state.url.split('/')[2] != undefined){
				this.globals.currentLink = '/'+state.url.split('/')[1]+'/'+state.url.split('/')[2];
			} else {
				this.globals.currentLink = '/'+state.url.split('/')[1];
			} 
			
		  if(state.url=='/login'||(state.url.split('/')[1]=='register' && state.url.split('/')[2]==undefined)||state.url=='/invitation'||state.url=='/'||state.url=='/forgotpassword'||state.url.split('/')[1]=='resetpass'){
			  //this.globals.IsLoggedIn = false;
			  this.globals.IsLoggedIn = true;
			  this.router.navigate(['/dashboard']);
			  return false;
		  } else {
				this.globals.IsLoggedIn = true;
				if(this.globals.authData.RoleId==4){
					return true;
				} else if(this.globals.authData.RoleId==1 || this.globals.authData.RoleId==2){
					if(state.url=='/dashboard'||state.url=='/welcome_register'||state.url=='assessment_details'||state.url.split('/')[1]=='assessment'||state.url.split('/')[1]=='thankyou'||state.url.split('/')[1]=='user-assessment-details'){
						this.router.navigate(['/sales-admin-dashboard']);
			  			return false;
					} else {
						return true;
					}					
				} else if(this.globals.authData.RoleId==3){
					if(state.url=='/sales-admin-dashboard'||state.url.split('/')[1]=='user-assessment-list'||state.url.split('/')[1]=='sales-user-details'||state.url.split('/')[1]=='report'||state.url=='/viewreport'||state.url=='/usercompany'||state.url=='/list-user-assessment/list'){
						this.router.navigate(['/dashboard']);
			  			return false;
					} else {
						return true;
					}	
				}			  
		  }		  
	  } else {
			
		   if(state.url=='/login' || state.url.split('/')[1]=='resetpass'||(state.url.split('/')[1]=='register' && state.url.split('/')[2]==undefined)||state.url=='/invitation'||state.url=='/'||state.url=='/forgotpassword'||state.url.split('/')[1]=='resetpass'){
			  if(state.url=='/login'){
				this.globals.check_login = true;
			  }			   
			   this.globals.IsLoggedIn = false;
			   return true;
		   } else {
			   this.globals.IsLoggedIn = false;
			   this.router.navigate(['/']);
			   return false;
		   }		  
	  }
  }
  
}
