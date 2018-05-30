import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,private globals: Globals, private authService: AuthService) { }

  ngOnInit() {
  }
  logout()
    { 
        var admin={'Userid':this.globals.authData.UserId,'paneltype':1};
        this.authService.logout(admin)
	//.map(res => res.json())
      .then((data) => 
      {
        this.globals.isLoading = true;
        window.location.href = '/login';
            
      }, 
      (error) => 
      {
       // alert('error');
      });
          
    }
  // logout(){	 
  //   this.authService.logout();
  //   this.globals.isLoading = true;
  //   window.location.href = '/login';		
  // }

}
