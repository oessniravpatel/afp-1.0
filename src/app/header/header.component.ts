import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit
 {

  constructor(  private authService: AuthService,private router: Router,private globals: Globals) { }

  ngOnInit() { }
    logout()
    { 
        var panel={'Userid':this.globals.authData.UserId,'paneltype':0};
        this.authService.logout(panel)
	//.map(res => res.json())
      .then((data) => 
      {
        this.globals.isLoading = true;
        window.location.href = '/login';
            
      }, 
      (error) => 
      {
        alert('error');
      });
          
    }
    register()
    {
      window.location.href = '/invitation';
    }
    home()
    {
      this.globals.check_login=false;
      this.router.navigate(['/dashboard']);
    }
    log()
    {
      window.location.href = '/login';
    }
}
